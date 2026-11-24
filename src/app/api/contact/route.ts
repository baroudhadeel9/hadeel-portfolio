import { NextRequest, NextResponse } from 'next/server';
import { ContactFormSchema } from '@/lib/schemas';

// In-Memory Rate Limiting (Best-effort on serverless platforms like Vercel)
// On serverless, memory persists only for the lifetime of a lambda instance.
// For strict cross-region rate limiting at scale, an external store (Upstash/Redis) can be attached.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    // 1. IP-Based Rate Limiting
    const forwardedFor = req.headers.get('x-forwarded-for');
    const clientIp = forwardedFor ? forwardedFor.split(',')[0]?.trim() || 'unknown' : 'local';

    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: 'تم تجاوز الحد الأقصى للمحاولات. يرجى المحاولة بعد 15 دقيقة / Rate limit exceeded. Try again in 15 minutes.',
        },
        { status: 429 }
      );
    }

    // 2. Parse & Validate Payload
    const rawBody = await req.json();

    // 3. Honeypot Spam Prevention Check
    // If a bot filled out the hidden botField, pretend it succeeded to prevent bot retry adaptations
    if (rawBody.botField && String(rawBody.botField).trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Message processed successfully',
      });
    }

    const validation = ContactFormSchema.safeParse(rawBody);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { name, email, projectType, message } = validation.data;

    // 4. Server-Side Secret Verification
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error('Critical Security Error: WEB3FORMS_ACCESS_KEY is not configured on the server.');
      return NextResponse.json(
        {
          success: false,
          error: 'Server email dispatch is misconfigured.',
        },
        { status: 500 }
      );
    }

    // 5. Secure Backend Dispatch to Web3Forms
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        project_type: projectType,
        message,
        subject: `New Portfolio Inquiry: ${projectType} from ${name}`,
        from_name: `${name} (Hadeel Baroud Portfolio)`,
      }),
    });

    const result = await response.json();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Message delivered to inbox successfully',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.message || 'Failed to dispatch message via email provider',
        },
        { status: 502 }
      );
    }
  } catch (error) {
    console.error('API Contact Route Error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'An internal server error occurred while processing contact inquiry',
      },
      { status: 500 }
    );
  }
}

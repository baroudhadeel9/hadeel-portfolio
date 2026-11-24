import { SkillDetail } from '@/components/skills/types';

export const skillDetailsMap: Record<string, Partial<SkillDetail>> = {
  'AI Agents & Structured Tool Calling': {
    id: 'ai-agents',
    runtime: 'Modern LLMs / Structured Tool Calling Engine',
    benchmark: 'Zero Hallucination with Zod Schemas',
    role: { 
      ar: 'استدعاء النماذج الذكية وهيكلة مخرجات JSON وتكامل أدوات الوكلاء البرمجية (Agentic Tools).', 
      en: 'Structured JSON generation, dynamic prompt tuning, and agentic tool invocation.' 
    },
    projectLink: { name: 'المساعد الذكي في منصة Coach Space' },
    codeLang: 'typescript',
    codeSnippet: `import { executeAgentTool, SeatSchema } from '@/lib/ai-agent';

export async function allocateSmartSeat(req: ReservationIntent) {
  const response = await executeAgentTool({
    tool: 'reserve_seat',
    description: 'Locks seat atomically with optimistic rollback',
    inputSchema: SeatSchema,
    payload: { userId: req.userId, hall: req.hall }
  });
  return response;
}`,
    bulletPoints: {
      ar: [
        'بناء وكلاء أذكياء قادرين على استدعاء دوال برمجية محددة بدقة (Structured Tool Calling)',
        'هندسة مطالبات متقدمة (Advanced Prompting) لضمان دقة الإجابات وخفض استهلاك الـ Tokens',
        'تدقيق صارم على مخرجات النماذج باستخدام Schemas معتمدة'
      ],
      en: [
        'Architected tool-calling agents with strict Zod schema validation',
        'Engineered optimized system prompts reducing token overhead and hallucinations',
        'Integrated real-time function calling into mission-critical workflows'
      ]
    }
  },

  'Prompt Engineering & Tool Use': {
    id: 'prompt-eng',
    runtime: 'Few-Shot & Chain-of-Thought System',
    benchmark: 'Zero Hallucination with Schemas',
    role: {
      ar: 'صياغة التعليمات الهندسية الدقيقة وتوجيه النماذج للالتزام الصارم بقواعد العمل.',
      en: 'System instruction tuning, structured schemas, and zero-hallucination guardrails.'
    },
    projectLink: { name: 'نظام الاستشارة الذكي في Coach Space' },
    codeLang: 'typescript',
    codeSnippet: `const SYSTEM_PROMPT = \`
You are an architectural assistant for EduHub Gaza.
Rules:
1. Always validate laptop charger wattage (< 65W for solar health).
2. Never confirm reservations without pessimistic DB lock.
3. Emit output strictly complying with ReservationSchema.
\`;`,
    bulletPoints: {
      ar: [
        'توجيه النماذج التوليدية للامتثال الصارم لقواعد الطاقة الشمسية المحدودة في غزة',
        'تقنيات التفكير المتسلسل (Chain-of-Thought) لحل التضاربات المعقدة في الحجوزات',
        'تأمين المدخلات ضد هجمات كسر السياق (Prompt Injection Defense)'
      ],
      en: [
        'Constrained LLM reasoning to adhere to solar battery threshold limits in Gaza',
        'Leveraged Chain-of-Thought chains for automated conflict resolution in bookings',
        'Hardened agent prompts against jailbreaks and prompt injection attempts'
      ]
    }
  },

  'AI-Powered Code Automation': {
    id: 'ai-code-automation',
    runtime: 'Agentic CLI & Autonomous Workflows',
    benchmark: '4x Engineering Velocity',
    role: {
      ar: 'أتمتة دورة حياة التطوير البرمجي واختبار الوحدات البرمجية آلياً.',
      en: 'Accelerating refactoring, regression testing, and CI/CD validation via agent CLI.'
    },
    projectLink: { name: 'بيئة تطوير مشروعي EduHub و Coach Space' },
    codeLang: 'bash',
    codeSnippet: `# Automated regression & schema validation workflow
agent-cli --prompt "Refactor seat booking transaction to use DB::transaction with lockForUpdate" \\
          --verify-schemas \\
          --output-format json`,
    bulletPoints: {
      ar: [
        'تسريع فحص وتدقيق الأكواد واكتشاف الثغرات المعمارية مبكراً',
        'أتمتة كتابة اختبارات التكامل والوحدات (Unit & Integration Tests)',
        'تطبيق أفضل ممارسات Git وعمليات الـ Pull Requests المنظمة'
      ],
      en: [
        'Automated static analysis and early architectural defect discovery',
        'Synthesized test suites with robust coverage for edge cases',
        'Streamlined Git branches, clean atomic commits, and pull requests'
      ]
    }
  },

  'LLM Integration in Web Apps': {
    id: 'llm-web',
    runtime: 'Vercel AI SDK / SSE Streaming',
    benchmark: 'Fluid Streaming UI at 60fps',
    role: {
      ar: 'ربط واجهات الويب بنماذج الذكاء الاصطناعي مع تدفق لحظي للبيانات (SSE).',
      en: 'Real-time Server-Sent Events streaming directly into responsive React UI.'
    },
    projectLink: { name: 'محرر ومساعد المحتوى في Coach Space CMS' },
    codeLang: 'typescript',
    codeSnippet: `// Next.js Route Handler for Streaming AI Output
export async function POST(req: Request) {
  const { prompt } = await req.json();
  const stream = await createLLMStream({
    prompt,
    temperature: 0.2,
    maxTokens: 500
  });
  return new Response(stream.toReadableStream());
}`,
    bulletPoints: {
      ar: [
        'بث فوري للكلمات (Token Streaming) يمنح المستخدم استجابة مرئية فورية بدون انتظار',
        'إدارة التخزين المؤقت (Caching) للاستعلامات الشائعة لخفض التكاليف',
        'تصميم واجهات تدعم التراجع وإيقاف التوليد في أي لحظة'
      ],
      en: [
        'Zero-wait streaming responses with smooth React state transitions',
        'Implemented semantic caching layers for repeated administrative queries',
        'User-controlled cancellation via AbortController'
      ]
    }
  },

  'React 19 & Next.js (App Router)': {
    id: 'nextjs',
    runtime: 'Next.js 16.4 / React 19 / Turbopack',
    benchmark: '180ms TTFB / Partial Pre-rendering',
    role: {
      ar: 'معمارية الـ Server Components والتصيير الجزئي (PPR) مع أداء خفيف وفائق السرعة.',
      en: 'React Server Components, dynamic streaming, and zero client bundle overhead.'
    },
    projectLink: { name: 'منصة EduHub Gaza + منصة Coach Space', url: 'https://gazaeduhub.com' },
    codeLang: 'typescript',
    codeSnippet: `// Server Component with Optimized Parallel Streaming
export default async function WorkshopPage({ params }: { params: { id: string } }) {
  const workshopPromise = getWorkshopData(params.id);
  const seatsPromise = getLiveSeatAvailability(params.id);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12">
      <Suspense fallback={<WorkshopHeaderSkeleton />}>
        <WorkshopHeader promise={workshopPromise} />
      </Suspense>
      <Suspense fallback={<SeatGridSkeleton />}>
        <SmartSeatGrid promise={seatsPromise} realTime />
      </Suspense>
    </main>
  );
}`,
    bulletPoints: {
      ar: [
        'اعتماد أحدث إصدارات React 19 والـ Actions لإدارة النماذج والبيانات بسلاسة',
        'فصل منطق الخادم (Server Components) عن الواجهة التفاعلية لتقليل حجم الحزمة للعميل',
        'تحسين أوقات التحميل عبر Turbopack والتحميل المسبق الذكي للمسارات'
      ],
      en: [
        'Adopted React 19 server actions for declarative form submissions and data sync',
        'Strict separation between Server Components and client interactivity',
        'Sub-200ms initial page paint powered by Turbopack engine optimizations'
      ]
    }
  },

  'Tailwind CSS & Responsive UI': {
    id: 'tailwind',
    runtime: 'Tailwind CSS v4 Engine',
    benchmark: '0ms Runtime Overhead / Perfect Lighthouse',
    role: {
      ar: 'بناء نظم تصميم متكاملة ومتوافقة مع كل الشاشات والهواتف بدون أي تضخم في الأكواد.',
      en: 'Utility-first modern design token systems with fluid typography and dark/light palettes.'
    },
    projectLink: { name: 'مطبق في جميع واجهات المشاريع المنفذة' },
    codeLang: 'css',
    codeSnippet: `@theme {
  --font-cairo: var(--font-cairo), sans-serif;
  --font-jakarta: var(--font-jakarta), sans-serif;
  --color-brand-primary: #4f46e5;
  --color-brand-surface: #f8fafc;
  --shadow-subtle: 0 1px 3px 0 rgb(0 0 0 / 0.05);
}`,
    bulletPoints: {
      ar: [
        'تصميم متجاوب بالكامل يبدأ من شاشات الهواتف الصغيرة حتى شاشات الـ 4K',
        'نظام ألوان وتدرجات هادئة وعصرية مريحة للعين ومطابقة لمعايير WCAG لإمكانية الوصول',
        'استخدام متغيرات CSS الحديثة للتحويل السريع بين اللغات والاتجاهات'
      ],
      en: [
        'Mobile-first responsive fluid layouts spanning mobile to ultra-wide displays',
        'Strict accessibility contrast adhering to WCAG 2.1 AA standards',
        'Zero-runtime overhead compiling into hyper-compact utility stylesheets'
      ]
    }
  },

  'TypeScript & Zod Validation': {
    id: 'typescript-zod',
    runtime: 'TypeScript 5.x / Zod Schema Engine',
    benchmark: '100% Type Coverage / Zero Runtime Crashes',
    role: {
      ar: 'حماية شاملة لكافة مسارات البيانات ونقاط الاتصال بالـ API ومنع أخطاء الـ Type Error.',
      en: 'End-to-end schema validation guarding against corrupted payloads and edge cases.'
    },
    projectLink: { name: 'نظام التحقق في منصة EduHub و Coach Space' },
    codeLang: 'typescript',
    codeSnippet: `import { z } from 'zod';

export const ReservationPayloadSchema = z.object({
  seatId: z.string().uuid(),
  userId: z.string().min(5),
  chargerWattage: z.number().max(65, 'Laptop wattage must not exceed 65W for solar capacity'),
  timeSlot: z.enum(['morning', 'evening', 'full-day'])
});

export type ReservationPayload = z.infer<typeof ReservationPayloadSchema>;`,
    bulletPoints: {
      ar: [
        'تدقيق صارم على طرف العميل وطرف الخادم بنفس الـ Schema الموحدة',
        'حماية المنظومة من بيانات الدخول المشوهة أو الثغرات المتعلقة بأنواع المدخلات',
        'تحسين تجربة التطوير مع إكمال تلقائي (IntelliSense) فائق الدقة'
      ],
      en: [
        'Unified schema validation executed across both client forms and server routes',
        'Zero runtime type regressions through strict compiler flag enforcement',
        'Instant autocompletion and compiler hints accelerating team refactoring'
      ]
    }
  },

  'Bilingual i18n & RTL Layouts': {
    id: 'i18n-rtl',
    runtime: 'Dynamic RTL/LTR Switching Engine',
    benchmark: 'Seamless 0ms Layout Flip',
    role: {
      ar: 'دعم أصيل ومتكامل للغتين العربية (RTL) والإنجليزية (LTR) مع مراعاة تفاصيل الخطوط.',
      en: 'Native bidirectional layout architecture with dynamic font switching.'
    },
    projectLink: { name: 'معرض الأعمال الشخصي + Coach Space + EduHub' },
    codeLang: 'typescript',
    codeSnippet: `// Dynamic Direction and Typography Engine
useEffect(() => {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.style.fontFamily = lang === 'ar' 
    ? 'var(--font-cairo), sans-serif' 
    : 'var(--font-jakarta), sans-serif';
}, [lang]);`,
    bulletPoints: {
      ar: [
        'معالجة دقيقة للمسافات وهوامش الأزرار والـ Flex/Grid تلقائياً عند تغيير اللغة',
        'خطوط عصرية (Cairo للعربية و Plus Jakarta Sans للإنجليزية) تضمن أقصى درجات القراءة',
        'هيكلة قواميس الترجمة في ملفات JSON منظمة وسهلة التعديل والإضافة'
      ],
      en: [
        'Bi-directional CSS logic automatically flipping paddings, flex orders, and icons',
        'Tailored typography pairing crisp Arabic fonts with modern Latin sans-serifs',
        'Clean dictionary separation with localized fallback mechanisms'
      ]
    }
  },

  'Modern JavaScript (ES6+)': {
    id: 'javascript',
    runtime: 'V8 Engine / Modern ES2024+',
    benchmark: 'Microsecond Execution',
    role: {
      ar: 'برمجة واجهات فائقة الخفة بدون مكتبات زائدة واستثمار إمكانيات المتصفح الحديث.',
      en: 'Vanilla ES6+ patterns, asynchronous streams, and lightweight client persistence.'
    },
    projectLink: { name: 'تطبيق TO-Do Task Manager على Vercel', url: 'https://to-do-rho-rouge.vercel.app' },
    codeLang: 'javascript',
    codeSnippet: `// Zero-dependency Local Storage Synced Task Engine
const syncTaskStorage = (task) => {
  const current = JSON.parse(localStorage.getItem('tasks') || '[]');
  const updated = [{ ...task, id: crypto.randomUUID(), createdAt: Date.now() }, ...current];
  localStorage.setItem('tasks', JSON.stringify(updated));
  window.dispatchEvent(new Event('storage-update'));
};`,
    bulletPoints: {
      ar: [
        'معتمدة عبر 4 شهادات تدريبية تخصصية في جافاسكريبت المتقدمة',
        'إتقان الـ Async/Await والـ Event Loop وإدارة الذاكرة والـ Closures',
        'بناء تطبيقات صفرية الاعتماديات (Zero-dependency) تعمل بسرعة مذهلة'
      ],
      en: [
        'Backed by 4 specialized advanced JavaScript certification credentials',
        'Deep mastery of Async/Await, Microtask Queue, Closures, and memory profiling',
        'Engineered zero-dependency web applications with instant browser boot'
      ]
    }
  },

  'State Management & Performance': {
    id: 'state-perf',
    runtime: 'Zustand / React Context / Optimistic UI',
    benchmark: 'Instant <16ms UI Updates',
    role: {
      ar: 'تحديثات متفائلة (Optimistic UI) وإدارة نظيفة لحالة التطبيق بدون إعادة تصيير زائدة.',
      en: 'Predictable state machines, optimistic UI updates, and memoized selector pipelines.'
    },
    projectLink: { name: 'سلة المشتريات ومسارات التعلم في Coach Space' },
    codeLang: 'typescript',
    codeSnippet: `// Optimistic Seat Reservation State
const useSeatStore = create((set) => ({
  seats: initialSeats,
  optimisticBook: (seatId) => set((state) => ({
    seats: state.seats.map(s => s.id === seatId ? { ...s, status: 'reserved' } : s)
  }))
}));`,
    bulletPoints: {
      ar: [
        'تطبيق التحديث المتفائل: يشعر المستخدم بحدوث الحجز فوراً بينما يتم التثبيت في الخلفية',
        'تقليل عمليات إعادة التصيير (Re-renders) عبر التجزئة الدقيقة للـ Context',
        'مراقبة الأداء واختبار مقاييس Core Web Vitals (LCP, INP, CLS)'
      ],
      en: [
        'Optimistic updates providing zero perceived latency for critical user actions',
        'Eliminated unnecessary tree re-renders through fine-grained selectors',
        'Continuous monitoring of Core Web Vitals scores with green benchmarks'
      ]
    }
  },

  'Supabase & PostgreSQL Cloud': {
    id: 'supabase-pg',
    runtime: 'PostgreSQL 15 / Supabase Cloud (eu-west-1)',
    benchmark: '12ms Direct DB Query / High Availability',
    role: {
      ar: 'قاعدة بيانات علائقية سحابية موحدة مع حماية الصفوف (RLS) ومزامنة فورية للبيانات.',
      en: 'Relational data persistence with strict Row-Level Security and real-time subscriptions.'
    },
    projectLink: { name: 'قاعدة بيانات منصة EduHub و Coach Space' },
    codeLang: 'sql',
    codeSnippet: `-- Row Level Security (RLS) Policy for Students
CREATE POLICY "Students can only read their approved reservations"
ON reservations
FOR SELECT
USING (auth.uid() = user_id AND status = 'approved');

CREATE INDEX idx_reservations_seat_date ON reservations(seat_id, reservation_date);`,
    bulletPoints: {
      ar: [
        'حماية على مستوى الصفوف (Row Level Security) تضمن أمان بيانات كل طالب ومستخدم',
        'فهارس متقدمة (Indexes) لتسريع استعلامات الجداول الضخمة إلى بضعة أجزاء من الألف من الثانية',
        'ربط سحابي مستقر في أيرلندا (eu-west-1) مع نسخ احتياطي دائم'
      ],
      en: [
        'Audited Row-Level Security (RLS) ensuring strict tenant isolation',
        'Optimized composite indexes reducing seat lookup queries to sub-15ms',
        'Cloud-hosted resilient persistence in Ireland region with automated replication'
      ]
    }
  },

  'Laravel 11 REST API': {
    id: 'laravel-api',
    runtime: 'PHP 8.3 / Laravel 11 / Sanctum',
    benchmark: '45ms API Endpoint Response',
    role: {
      ar: 'خادم الباك إند المركزي لمعالجة العمليات الحساسة وإدارة الجلسات والأمان.',
      en: 'Central API gateway enforcing business rules, Sanctum authentication, and rate-limiting.'
    },
    projectLink: { name: 'خادم الباك إند لمنصة EduHub Gaza' },
    codeLang: 'php',
    codeSnippet: `// Pessimistic DB Locking to prevent double bookings
public function reserveSeat(Request $request)
{
    return DB::transaction(function () use ($request) {
        $seat = Seat::where('id', $request->seat_id)
                    ->lockForUpdate()
                    ->firstOrFail();

        if ($seat->is_occupied) {
            return response()->json(['error' => 'Seat occupied'], 409);
        }

        $seat->update(['is_occupied' => true, 'booked_by' => auth()->id()]);
        return response()->json(['success' => true]);
    });
}`,
    bulletPoints: {
      ar: [
        'منع حجز المقعد نفسه مرتين عبر القفل التشاؤمي (lockForUpdate) في قاعدة البيانات',
        'توثيق وإصدار توكنات آمنة للمستخدمين والمشرفين عبر Laravel Sanctum',
        'هيكلة برمجية نظيفة تعتمد على الـ Services و Controllers و Form Requests'
      ],
      en: [
        'Prevented seat double-booking collisions via atomic pessimistic locks (lockForUpdate)',
        'Secured endpoint authorizations using lightweight Laravel Sanctum bearer tokens',
        'Structured modular service layers isolating HTTP transport from business workflows'
      ]
    }
  },

  'Node.js & Express REST APIs': {
    id: 'nodejs-express',
    runtime: 'Node.js LTS / Express / TypeScript',
    benchmark: 'Non-blocking Event-Driven I/O',
    role: {
      ar: 'بناء خوادم وسيطة خفيفة وخدمات مصغرة لمعالجة البيانات والربط مع الخدمات السحابية.',
      en: 'Lightweight asynchronous microservices, webhook dispatchers, and API proxies.'
    },
    projectLink: { name: 'خدمات التكامل والوكلاء البرمجية' },
    codeLang: 'typescript',
    codeSnippet: `// Express Secure Reverse Proxy with Rate Limiting
import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();
app.use('/api/', rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.post('/api/webhook/brevo', async (req, res) => {
  // Process email status asynchronously
  res.status(202).json({ received: true });
});`,
    bulletPoints: {
      ar: [
        'معالجة الـ Webhooks الواردة من بوابات البريد والرسائل (Brevo API) بكفاءة',
        'تأمين نقاط الاتصال عبر محددات السرعة (Rate Limiting) وحزم Helmet',
        'معالجة غير متزامنة (Non-blocking I/O) تضمن عدم توقف الخادم تحت الضغط'
      ],
      en: [
        'Scalable asynchronous webhook handling for email/SMS transactional triggers',
        'Hardened endpoints with IP rate limiters, CORS whitelisting, and Helmet headers',
        'Non-blocking event loop utilization maintaining high concurrency throughput'
      ]
    }
  },

  'Python & Data Algorithms': {
    id: 'python-algo',
    runtime: 'Python 3.12 / NumPy / Pandas',
    benchmark: 'Verified Algorithms Rigor',
    role: {
      ar: 'تحليل البيانات، أتمتة المهام الحسابية، وحل المسائل البرمجية المعقدة.',
      en: 'Data transformation scripts, algorithmic efficiency, and automation routines.'
    },
    projectLink: { name: 'معتمد رسمياً بشهادة STEP (30 ساعة تدريبية)' },
    codeLang: 'python',
    codeSnippet: `# Optimization of solar battery capacity allocation
def optimize_seat_quotas(applicants: list[dict], max_wattage: int) -> list[str]:
    sorted_applicants = sorted(
        applicants, 
        key=lambda x: (-x['priority_score'], x['wattage'])
    )
    allocated = []
    current_wattage = 0
    for a in sorted_applicants:
        if current_wattage + a['wattage'] <= max_wattage:
            allocated.append(a['id'])
            current_wattage += a['wattage']
    return allocated`,
    bulletPoints: {
      ar: [
        'معتمدة رسمياً بشهادة معتمدة من برنامج STEP المتخصص (30 ساعة تدريبية)',
        'إتقان هياكل البيانات (Stacks, Queues, Graphs, Hash Maps) والخوارزميات',
        'بناء نصوص أتمتة برمجية لمعالجة وتنظيف البيانات وتصدير التقارير'
      ],
      en: [
        'Certified completion of STEP Intensive 30-Hour Python & Data program',
        'Fluency in data structures, Big-O complexity analysis, and heuristic search',
        'Automated ETL scripts for sanitizing operational telemetry and exports'
      ]
    }
  },

  'Software Architecture Design': {
    id: 'arch-design',
    runtime: 'Clean Architecture / Domain-Driven Design',
    benchmark: 'High Cohesion / Loose Coupling',
    role: {
      ar: 'فصل طبقات النظام وتصميم أنظمة برمجية قابلة للصيانة والتوسع لسنوات قادمة.',
      en: 'Strict boundary decoupling, testability, and architectural patterns.'
    },
    projectLink: { name: 'معتمد بشهادة كود ماب 2026 (144 ساعة تدريبية)' },
    codeLang: 'typescript',
    codeSnippet: `// Dependency Inversion: UI depends on abstraction, not implementation
export interface ISeatReservationService {
  reserve(seatId: string, userId: string): Promise<Result<Reservation>>;
  cancel(reservationId: string): Promise<Result<void>>;
}

export class SeatBookingUseCase {
  constructor(private readonly service: ISeatReservationService) {}
  
  async execute(dto: BookingDTO) {
    return this.service.reserve(dto.seatId, dto.userId);
  }
}`,
    bulletPoints: {
      ar: [
        'معتمدة بشهادة كود ماب 2026 المكثفة (144 ساعة تدريبية متخصصة)',
        'فصل منطق العمل (Domain Business Logic) عن واجهات العرض ومكتبات قواعد البيانات',
        'تصميم برمجيات مرنة يمكن استبدال أي طبقة فيها دون التأثير على استقرار النظام'
      ],
      en: [
        'Certified via CodeMap 2026 Intensive Fellowship (144 accredited hours)',
        'Decoupled core domain logic from specific UI frameworks and ORMs',
        'Engineered enterprise systems resilient to library migrations and tech pivots'
      ]
    }
  },

  'Clean Code & Code Mapping': {
    id: 'clean-code',
    runtime: 'SOLID Principles / Refactoring',
    benchmark: 'Audited Readability & Maintainability',
    role: {
      ar: 'كتابة أكواد نظيفة ذاتية التوثيق تلتزم بمبادئ SOLID وتقلل تكلفة الصيانة المستقبلية.',
      en: 'Self-documenting codebase architecture, automated linters, and low cognitive load.'
    },
    projectLink: { name: 'معتمد في كود ماب 2026 ومطبق في جميع المشاريع' },
    codeLang: 'typescript',
    codeSnippet: `// Single Responsibility & Explicit Intent
class ChargerWattageGuard {
  static readonly MAX_SAFE_WATTAGE = 65;

  static assertSafe(wattage: number): void {
    if (wattage > this.MAX_SAFE_WATTAGE) {
      throw new ExcessiveWattageException(
        \`Charger wattage (\${wattage}W) exceeds solar threshold of \${this.MAX_SAFE_WATTAGE}W\`
      );
    }
  }
}`,
    bulletPoints: {
      ar: [
        'الالتزام الصارم بمبادئ SOLID الخمسة لتصميم كائنات برمجية واضحة ومحددة المسؤولية',
        'تسميات معبرة للمتغيرات والدوال تجعل الكود سهل الفهم لأي مهندس ينضم للفريق',
        'مراجعة دورية للأكواد (Code Review) لمنع تراكم الديون التقنية (Technical Debt)'
      ],
      en: [
        'Strict adherence to SOLID principles ensuring modular, focused software units',
        'Self-documenting declarative naming reducing onboarding friction for teams',
        'Proactive refactoring cycles preventing technical debt accumulation'
      ]
    }
  },

  'Git & Collaborative Workflows': {
    id: 'git-collab',
    runtime: 'Git / GitHub Flow / Conventional Commits',
    benchmark: 'Zero Conflict Merges',
    role: {
      ar: 'إدارة الفروع البرمجية، توثيق التغييرات، وتنظيم عمليات الدمج والـ Releases.',
      en: 'Branching strategies, semantic release management, and peer review hygiene.'
    },
    projectLink: { name: 'مستودعات مشاريع Hadeel-Baroud على GitHub' },
    codeLang: 'bash',
    codeSnippet: `# Clean Conventional Commit Workflow
git checkout -b feature/pessimistic-seat-locking
git commit -m "feat(booking): implement lockForUpdate on seat allocation"
git commit -m "test(booking): add concurrency conflict regression test"
git push origin feature/pessimistic-seat-locking`,
    bulletPoints: {
      ar: [
        'استخدام الـ Conventional Commits لتوثيق تاريخ التغييرات بوضوح ودقة',
        'إدارة التفرعات (Feature Branches) والدمج السلس دون تضاربات برمجية',
        'تنظيم مستودعات GitHub مع توثيق شامل في ملفات README و Schemas'
      ],
      en: [
        'Semantic conventional commit standards powering automated changelogs',
        'Disciplined branch isolation preventing regressions in production pipelines',
        'Exemplary GitHub repository hygiene with complete architectural documentation'
      ]
    }
  },

  'Scalable Systems Engineering': {
    id: 'systems-eng',
    runtime: 'Computer Systems Degree / Al-Azhar Rigor',
    benchmark: 'Deep Hardware & Software Synergy',
    role: {
      ar: 'فهم عميق لكيفية عمل المعالج، الذاكرة، والشبكات لبناء برمجيات عالية الكفاءة.',
      en: 'Holistic computing perspective blending hardware limits, concurrency, and web scale.'
    },
    projectLink: { name: 'تخصص هندسة أنظمة الحاسوب — جامعة الأزهر بغزة' },
    codeLang: 'c',
    codeSnippet: `// Deep understanding of memory layout & concurrency primitives
typedef struct {
    uint32_t seat_id;
    uint8_t  is_locked;
    uint64_t locked_timestamp;
} AtomicSeatSlot;`,
    bulletPoints: {
      ar: [
        'خريجة هندسة أنظمة الحاسوب بمرتبة شرف — جامعة الأزهر بغزة',
        'إدراك عملي للتزامن (Concurrency)، الـ Deadlocks، وكفاءة استهلاك الذاكرة',
        'القدرة على حل التحديات التقنية غير التقليدية بحلول برمجية مبتكرة'
      ],
      en: [
        'Computer Systems Engineering degree with academic distinction — Al-Azhar University',
        'Practical grasp of concurrency primitives, deadlock prevention, and cache locality',
        'Proven capability to solve non-trivial constraints with software'
      ]
    }
  }
};

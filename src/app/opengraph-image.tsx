import { ImageResponse } from 'next/og';

export const alt = 'Eng. Hadeel Emad Baroud — Computer Systems Engineer & Full-Stack Developer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#090D16',
          backgroundImage:
            'radial-gradient(circle at 85% 15%, rgba(99, 102, 241, 0.25) 0%, transparent 50%), radial-gradient(circle at 15% 85%, rgba(14, 165, 233, 0.2) 0%, transparent 45%)',
          padding: '70px 80px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
        }}
      >
        {/* Top Header Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              color: '#818CF8',
              fontSize: '22px',
              fontWeight: 800,
            }}
          >
            HB
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '14px',
              fontWeight: 600,
              color: '#CBD5E1',
            }}
          >
            <span>Computer Systems Engineering · Al-Azhar University</span>
          </div>
        </div>

        {/* Center Main Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div
            style={{
              fontSize: '56px',
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E2E8F0 100%)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Eng. Hadeel Emad Baroud
          </div>
          <div
            style={{
              fontSize: '26px',
              fontWeight: 700,
              color: '#818CF8',
              letterSpacing: '0.01em',
            }}
          >
            Computer Systems Engineer & Full-Stack Architect
          </div>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 500,
              color: '#94A3B8',
              maxWidth: '850px',
              lineHeight: 1.4,
            }}
          >
            Engineering scalable web architectures (Next.js 16, React 19, Laravel 11) & AI agent integrations.
          </div>
        </div>

        {/* Bottom Feature Pills */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {['Next.js 16 App Router', 'React 19', 'Laravel 11', 'AI Agents', 'Full-Stack EdTech'].map(
            (tech, i) => (
              <div
                key={i}
                style={{
                  padding: '6px 14px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid #334155',
                  fontSize: '13px',
                  fontWeight: 600,
                  color: '#CBD5E1',
                }}
              >
                {tech}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

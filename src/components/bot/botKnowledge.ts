export interface BotAction {
  label: string;
  action: () => void;
  link?: string;
}

export interface BotResponseResult {
  text: string;
  actions?: BotAction[];
}

export const getInitialBotGreeting = (isAr: boolean): string => {
  return isAr
    ? `مرحباً بك! 👋 أنا الوكيل والمساعد الذكي للمهندسة **هديل بارود** (مهندسة أنظمة حاسوب ومطورة Full-Stack).

يسعدني إجابتك على أي استفسار حول:
• معمارية مشاريعها الحية (**EduHub Gaza** و **Coach Space**).
• تقنياتها في الـ Frontend (React 19 & Next.js 16) والـ Backend (Laravel 11 & Supabase).
• شهاداتها واعتماداتها الموثقة (320+ ساعة تدريب هندسي).
• أو مساعدتك في تخطيط معمارية مشروعك القادم وتقدير مدته!`
    : `Welcome! 👋 I am the AI Agent representing **Eng. Hadeel Baroud** (Computer Systems Engineer & Full-Stack Developer).

I can answer any technical questions regarding:
• Architecture of her live systems (**EduHub Gaza** & **Coach Space**).
• Her modern stack (Next.js 16, React 19, Laravel 11, Supabase).
• Her accredited credentials & 320+ training hours.
• Or guide you through planning your upcoming project architecture!`;
};

export const getQuickQuestions = (isAr: boolean) => {
  return isAr
    ? [
        { label: '🚀 كيف بنيتِ منصة EduHub ومعماريتها؟', query: 'كيف تم بناء منصة EduHub وما هي معماريتها؟' },
        { label: '⚡ ما هي خبرات هديل في Next.js 16 و React 19؟', query: 'ما هي خبرات هديل في Next.js 16 و React 19؟' },
        { label: '📜 ما هي شهادات واعتمادات هديل البرمجية؟', query: 'ما هي شهادات واعتمادات هديل البرمجية؟' },
        { label: '💼 هل هديل متاحة للعمل الحر أو التوظيف؟', query: 'هل هديل متاحة للمشاريع الحرة أو التوظيف؟' },
        { label: '📐 ساعدني في تخطيط معمارية مشروع جديد', query: 'ساعدني في تخطيط معمارية مشروعي الجديد' }
      ]
    : [
        { label: '🚀 How was EduHub Gaza engineered?', query: 'How was EduHub Gaza engineered and architected?' },
        { label: '⚡ What is Hadeel’s Next.js 16 expertise?', query: 'What is Hadeel’s expertise in Next.js 16 & React 19?' },
        { label: '📜 What are her verified certifications?', query: 'What are Hadeel’s verified certifications?' },
        { label: '💼 Is Hadeel open for freelance work?', query: 'Is Hadeel available for freelance or employment?' },
        { label: '📐 Help me plan a new project architecture', query: 'Help me plan my new software architecture' }
      ];
};

export const generateAIResponse = (
  userQuery: string,
  isAr: boolean,
  profile: any,
  closeBotAndScroll: (sectionId: string) => void
): BotResponseResult => {
  const q = userQuery.toLowerCase().trim();

  // 1. EduHub Gaza Question
  if (q.includes('eduhub') || q.includes('إديوهب') || q.includes('غزة') || q.includes('حجز') || q.includes('طاقة')) {
    return {
      text: isAr
        ? `**منصة EduHub Gaza** هي أحد أبرز المشاريع الإنتاجية للمهندسة هديل ([gazaeduhub.com](https://gazaeduhub.com)):

• **المعمارية المتكاملة:** واجهة بـ **Next.js 16 (App Router)** و **React 19** مربوطة بخادم **Laravel 11 REST API** وقاعدة بيانات **PostgreSQL** سحابية في أيرلندا.
• **حل التزامن وتضارب الحجوزات:** تم تطبيق القفل التشاؤمي (**Pessimistic Locking / lockForUpdate**) في قاعدة البيانات لضمان عدم حجز المقعد الواحد مرتين في نفس اللحظة.
• **ابتكار حل لمشكلة الكهرباء في غزة:** تدقيق قدرة شواحن الحواسيب (أقل من 65W) لحماية منظومة بطاريات الطاقة الشمسية.
• **دعم اللغتين:** تجربة ثنائية كاملة (عربي RTL وإنجليزي LTR).`
        : `**EduHub Gaza** is one of Eng. Hadeel's flagship live production systems ([gazaeduhub.com](https://gazaeduhub.com)):

• **End-to-End Architecture:** Built with **Next.js 16 (App Router)** and **React 19**, backed by a resilient **Laravel 11 REST API Gateway** and Ireland **PostgreSQL** cloud persistence.
• **Concurrency Safety:** Implemented pessimistic database locking (**lockForUpdate**) to guarantee zero seat overlap during peak reservation bursts.
• **Civic Tech Innovation:** Automated screening of laptop charger wattages (<65W) to safeguard solar battery health amid energy shortages in Gaza.
• **Bilingual Duality:** Native RTL and LTR support with localized fallbacks.`,
      actions: [
        { label: isAr ? 'معاينة منصة EduHub الحية ↗' : 'Visit Live EduHub ↗', action: () => window.open('https://gazaeduhub.com', '_blank') },
        { label: isAr ? 'الانتقال لقسم المشاريع' : 'Go to Projects', action: () => closeBotAndScroll('projects') }
      ]
    };
  }

  // 2. Coach Space Question
  if (q.includes('coach') || q.includes('كوتش') || q.includes('تعليم') || q.includes('lms') || q.includes('شهادة')) {
    return {
      text: isAr
        ? `**منصة Coach Space** هي منصة LMS وتدريب متكاملة متعددة الأدوار:

• **المستخدمون:** بوابات منفصلة للطلاب، المدربين، والإدارة.
• **المميزات الهندسية:** مسارات تعلم تفاعلية (My Path)، سلة مشتريات ودفع، وتوليد فوري لشهادات التخرج بصيغة **PDF** بضغطة زر عبر المتصفح.
• **التقنيات:** Next.js 15 و React 19، Redux Toolkit لإدارة الحالة، Cloudinary للوسائط، و Firebase Admin.`
        : `**Coach Space** is a multi-role EdTech and Learning Management System (LMS):

• **Role-Based Portals:** Dedicated experiences for Students, Instructors, and Administrators.
• **Key Engineering:** Dynamic course players, checkout flows, and real-time client-side PDF certificate generation.
• **Stack:** Next.js 15, React 19, Redux Toolkit, Cloudinary, and Firebase Admin.`,
      actions: [
        { label: isAr ? 'معاينة مشروع Coach Space ↗' : 'Visit Coach Space ↗', action: () => window.open('https://coachspace-five.vercel.app', '_blank') }
      ]
    };
  }

  // 3. AI & Agentic Engineering Question
  if (q.includes('ذكاء') || q.includes('ai') || q.includes('prompt') || q.includes('agent') || q.includes('وكيل')) {
    return {
      text: isAr
        ? `**خبرات هديل في الذكاء الاصطناعي (AI & Agentic Engineering):**

• **بناء الوكلاء الأذكياء:** استدعاء دوال برمجية محددة بدقة (**Structured Tool Calling**) مع التحقق من Schemas عبر Zod.
• **هندسة المطالبات (Prompt Engineering):** صياغة تعليمات نظام متقدمة تضمن مخرجات JSON مهيكلة، مع منع الهلوسة وحماية النماذج ضد حقن الأوامر.
• **تكامل النماذج التوليدية في الويب:** ربط واجهات React بتدفقات البيانات الحية (SSE Token Streaming) لاستجابة فائقة السرعة بدون أي تأخير.`
        : `**Hadeel’s AI & Agentic Engineering Mastery:**

• **Agentic Workflows:** Autonomous tool calling with strict Zod schema validation and deterministic execution.
• **Prompt Engineering:** Designing structured JSON schemas, few-shot guardrails, and zero-hallucination prompts.
• **Streaming Web LLMs:** Real-time Server-Sent Events (SSE) streaming integrated smoothly into React 19 client interfaces.`,
      actions: [
        { label: isAr ? 'استعراض مصفوفة المهارات' : 'Inspect Skills Matrix', action: () => closeBotAndScroll('skills') }
      ]
    };
  }

  // 4. Frontend & Next.js / React 19 Question
  if (q.includes('react') || q.includes('next') || q.includes('frontend') || q.includes('واجهات') || q.includes('typescript') || q.includes('tailwind')) {
    return {
      text: isAr
        ? `**الخبرة في تطوير الواجهات الحديثة (Modern Frontend):**

• **React 19 & Next.js 16 (App Router):** إتقان معمارية الـ Server Components والتصيير الجزئي (PPR) وسرعة استجابة أول بايت بأقل من 180ms.
• **Tailwind CSS 4:** بناء أنظمة ألوان وتصميم متجاوبة (Design Tokens) خالية تماماً من تضخم وقت التشغيل (Zero-runtime).
• **TypeScript & Zod:** تدقيق صارم وشامل لمنع الأخطاء البرمجية (Type Safety).
• **دعم ثنائي اللغة أصيل:** ضبط فوري لاتجاهات RTL و LTR مع مراعاة دقة الخطوط العربية والإنجليزية.`
        : `**Modern Frontend Engineering Mastery:**

• **React 19 & Next.js 16 (App Router):** Server Components, Partial Pre-rendering, and sub-200ms TTFB.
• **Tailwind CSS 4:** Zero-runtime utility design token systems with fluid typography.
• **TypeScript & Zod:** Strict end-to-end type safety eliminating runtime crashes.
• **Bilingual i18n:** Seamless dynamic RTL and LTR direction switching.`,
      actions: [
        { label: isAr ? 'استعراض مصفوفة المهارات' : 'Inspect Skills Matrix', action: () => closeBotAndScroll('skills') }
      ]
    };
  }

  // 5. Backend & Database Question
  if (q.includes('backend') || q.includes('laravel') || q.includes('supabase') || q.includes('postgres') || q.includes('باك') || q.includes('بيانات')) {
    return {
      text: isAr
        ? `**خبرة الباك إند وقواعد البيانات (Backend & Cloud DB):**

• **Laravel 11 REST API:** إدارة التوثيق والأمان بـ Sanctum، وبناء بوابات API معمارية نظيفة وسريعة.
• **قواعد بيانات Supabase & PostgreSQL:** ربط سحابي مستقر في أيرلندا (eu-west-1)، مع تفعيل حماية الصفوف (**Row Level Security - RLS**) لخصوصية كل مستخدم.
• **إدارة التزامن (Concurrency):** منع حجز السجلات المكررة بالقفل التشاؤمي (**DB::transaction & lockForUpdate**).`
        : `**Backend & Cloud Database Architecture:**

• **Laravel 11 REST API:** Lightweight Sanctum authentication, robust middlewares, and clean service layers.
• **Supabase & PostgreSQL Cloud:** Ireland-hosted persistence with strict Row-Level Security (RLS) policies.
• **Concurrency & Locking:** Pessimistic locking (**lockForUpdate**) ensuring collision-free data updates under load.`
    };
  }

  // 6. Certifications & Academics
  if (q.includes('شهادة') || q.includes('شهادات') || q.includes('أزهر') || q.includes('جامعة') || q.includes('cert') || q.includes('degree')) {
    return {
      text: isAr
        ? `**الخلفية الأكاديمية والاعتمادات الرسمية:**

• **الدرجة الجامعية:** **هندسة أنظمة الحاسوب — جامعة الأزهر بغزة**.
• **شهادات واعتمادات مهنية موثقة (+320 ساعة تدريبية):**
  1. زمالة **كود ماب 2026 (CodeMap)** في معمارية البرمجيات وهندسة النظم (144 ساعة).
  2. برنامج **تطوير الواجهات الاحترافي CODE TECH** (120 ساعة عملية).
  3. برنامج **STEP المتخصص في بايثون وهياكل البيانات** (30 ساعة).
  4. 4 شهادات تخصصية متقدمة في جافاسكريبت الحديثة (ES6+).
  5. شهادة الرخصة الدولية لقيادة الحاسوب (**ICDL**) معتمدة من البورد الكندي و ISO 21001.`
        : `**Academic & Professional Credentials:**

• **Degree:** Computer Systems Engineering at **Al-Azhar University, Gaza**.
• **Verified Accreditations (+320 training hours):**
  1. **CodeMap 2026 Software Architecture** Fellowship (144 accredited hours).
  2. **CODE TECH Professional Frontend** Program (120 hands-on hours).
  3. **STEP Intensive Python & Data Algorithms** (30 hours).
  4. 4 Advanced Core JavaScript certifications.
  5. International **ICDL** certification licensed by Canadian Board & ISO 21001.`,
      actions: [
        { label: isAr ? 'تصفح كتاب الشهادات التفاعلي ↗' : 'Open 3D Certificates Book ↗', action: () => closeBotAndScroll('certificates') }
      ]
    };
  }

  // 7. Contact, Availability & Hiring
  if (q.includes('تواصل') || q.includes('واتس') || q.includes('إيميل') || q.includes('توظيف') || q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('work') || q.includes('متاحة')) {
    return {
      text: isAr
        ? `**المهندسة هديل بارود متاحة حالياً للمشاريع الحرة (Freelance)، وتطوير الأنظمة الكاملة، والتوظيف عن بُعد:**

• **واتساب مباشر:** \`${profile.contact.phone}\`
• **البريد الإلكتروني:** \`${profile.contact.email}\`
• **حساب لينكد إن:** [linkedin.com/in/hadeel-baroud](https://www.linkedin.com/in/hadeel-baroud)
• **مستودعات GitHub:** [github.com/Hadeel-Baroud](https://github.com/Hadeel-Baroud)

يسعدها دائماً مناقشة فكرة مشروعك وتحويلها إلى نظام متقن وسلس!`
        : `**Eng. Hadeel Baroud is currently open for freelance projects, full-stack contracts, and remote engineering opportunities:**

• **Direct WhatsApp:** \`${profile.contact.phone}\`
• **Direct Email:** \`${profile.contact.email}\`
• **LinkedIn Profile:** [linkedin.com/in/hadeel-baroud](https://www.linkedin.com/in/hadeel-baroud)
• **GitHub Repositories:** [github.com/Hadeel-Baroud](https://github.com/Hadeel-Baroud)`,
      actions: [
        { label: isAr ? 'محادثة عبر واتساب فورا 💬' : 'Chat on WhatsApp 💬', action: () => { const num = profile?.contact?.phoneIntl?.replace('+', '') || '970598642728'; window.open(`https://wa.me/${num}`, '_blank'); } },
        { label: isAr ? 'الانتقال لنموذج التواصل' : 'Go to Contact Form', action: () => closeBotAndScroll('contact') }
      ]
    };
  }

  // 8. Help Me Plan a Project
  if (q.includes('مشروع') || q.includes('تخطيط') || q.includes('plan') || q.includes('تكلفة') || q.includes('مدة') || q.includes('scope')) {
    return {
      text: isAr
        ? `**يسعدني مساعدتك في تخطيط معمارية مشروعك! 📐**

لبناء نظام برمجي قوي وسريع، توصي المهندسة هديل بالمعمارية التالية:
• **الواجهة الأمامية (Frontend):** Next.js 16 و React 19 مع Tailwind CSS لضمان سرعة تصفح فائقة وتوافق 100% مع الهواتف وجميع الشاشات ودعم كامل للعربية والإنجليزية.
• **الخادم والـ API (Backend):** Laravel 11 REST API مع توثيق Sanctum لضمان أعلى معايير الأمان.
• **قاعدة البيانات (Database):** Supabase PostgreSQL السحابية مع حماية على مستوى الصفوف (RLS).
• **الذكاء الاصطناعي (AI):** ربط بنماذج الذكاء الاصطناعي الحديثة لأتمتة المهام الذكية واستدعاء الدوال.
• **الجدول الزمني التقديري:** يستغرق تسليم النظام الأولي بين **2 إلى 4 أسابيع** حسب الميزات المطلوبة.`
        : `**I’d love to guide your project architecture! 📐**

For a robust, production-ready system, Eng. Hadeel recommends:
• **Frontend:** Next.js 16 + React 19 + Tailwind CSS for instant page loads and bilingual RTL/LTR.
• **Backend:** Laravel 11 REST API with Sanctum bearer auth.
• **Persistence:** Supabase Cloud PostgreSQL with Row-Level Security (RLS).
• **AI Module:** Modern generative LLM APIs for structured agentic workflows.
• **Estimated Delivery:** Typically between **2 to 4 weeks** based on scope.`,
      actions: [
        { label: isAr ? 'إرسال تفاصيل مشروعك لهديل ✉️' : 'Send Project Details ✉️', action: () => closeBotAndScroll('contact') }
      ]
    };
  }

  // Fallback General Response
  return {
    text: isAr
      ? `شكراً لسؤالك! بخصوص هذا الموضوع، تمتلك المهندسة هديل خبرة عملية معمقة كمهندسة أنظمة حاسوب ومطورة Full-Stack.

يمكنك سؤالها مباشرة عن أي متطلبات برمجية مخصصة عبر واتساب أو البريد الإلكتروني، أو اختيار أحد المواضيع السريعة أدناه.`
      : `Thank you for reaching out! Eng. Hadeel brings deep systems architecture and full-stack engineering expertise to every engagement.

Feel free to connect directly via WhatsApp or email, or explore the quick links below.`
  };
};

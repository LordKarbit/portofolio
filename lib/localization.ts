import type { Experience, Profile, Project, Skill } from "@/lib/content";

export type Locale = "id" | "en" | "zh";

export function resolveLocale(value: string | string[] | undefined): Locale {
  const candidate = Array.isArray(value) ? value[0] : value;
  return candidate === "en" || candidate === "zh" ? candidate : "id";
}

export function withLocale(path: string, locale: Locale) {
  if (locale === "id") return path;
  const [base, hash] = path.split("#");
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}lang=${locale}${hash ? `#${hash}` : ""}`;
}

export const localeHtmlLang: Record<Locale, string> = { id: "id", en: "en", zh: "zh-CN" };

export const uiCopy = {
  id: {
    nav: { home: "Beranda", capabilities: "Keahlian", work: "Portofolio", resume: "Resume", contact: "Kontak", downloadCv: "Unduh CV", homeAria: "Beranda Samsul Arifin", navAria: "Navigasi utama", languageAria: "Pilih bahasa" },
    hero: {
      kicker: "Operations systems · Process improvement · AI automation",
      hello: "Halo, saya",
      roles: ["Operations Systems Specialist.", "Process Improvement Specialist.", "AI Automation Practitioner."],
      roleSummary: "Operations Systems and Automation Specialist.",
      viewWork: "Lihat sistem yang saya rancang",
      discuss: "Bahas peluang kerja",
      connect: "Terhubung dengan saya",
      strengths: "Kemampuan inti",
      role: "Peran",
      based: "Berbasis di",
      location: "Sidoarjo, Indonesia",
      photo: "Foto profesional Samsul Arifin",
      photoRegion: "Foto Samsul Arifin",
      scroll: "Gulir ke pencapaian berikutnya",
      whatsapp: "Halo Samsul, saya melihat portofolio Anda dan ingin membahas peluang kolaborasi.",
    },
    proofAria: "Ringkasan pencapaian",
    capabilities: { eyebrow: "Yang saya kerjakan", title: "Dari proses lapangan menjadi sistem kerja.", intro: "Saya memahami pekerjaan tim, merumuskan aturan dan kontrol, lalu menggunakan AI serta teknologi web untuk mewujudkan solusi yang dapat dipakai." },
    work: { eyebrow: "Proyek pilihan", title: "Sistem operasional yang saya rancang dan wujudkan.", intro: "GeoLead, Kayou POS, KLWT Surveyor, dan Narotama menangani lead generation, retail multi-booth, survei lapangan, serta workforce operations.", read: "Baca studi kasus", open: "Buka", image: "Tampilan" },
    about: { eyebrow: "Profil", title: "Saya membawa konteks operasi ke dalam setiap sistem.", openLinkedin: "Buka LinkedIn", skills: "Kemampuan & alat kerja" },
    journey: { eyebrow: "Perjalanan profesional", title: "Lima tahun memperbaiki proses melalui operasi, data, dan sistem.", intro: "Riwayat ini menjelaskan konteks di balik produk yang saya bangun: return operations, sales leadership, analisis data, logistik, dan kontrol proses.", latest: "Karier terbaru", latestTitle: "Produk & operasi", foundation: "Fondasi karier", foundationTitle: "Data & kontrol proses" },
    legacy: { eyebrow: "Fondasi data & otomasi", title: "Alat kerja yang berkembang menjadi produk.", intro: "Sales tools, KPI monitoring, dan reporting automation menjadi fondasi cara saya mengubah kebutuhan harian menjadi workflow yang lebih tertib." },
    contact: { eyebrow: "Mari berbicara", title: "Butuh orang yang memahami operasi dan mampu mewujudkannya menjadi sistem?", action: "Hubungi saya" },
    footer: "Operations systems, process improvement, dan AI-assisted automation.",
    case: { missing: "Studi kasus tidak ditemukan", suffix: "Studi Kasus Samsul Arifin", back: "Kembali ke semua karya", year: "Tahun", role: "Peran", proof: "Bukti utama", challenge: "Tantangan", challengeTitle: "Masalah yang perlu dipecahkan", approach: "Pendekatan", approachTitle: "Dari proses ke sistem", outcome: "Hasil", outcomeTitle: "Apa yang berubah", scope: "Cakupan solusi", scopeTitle: "Bagian yang saya bangun", privacy: "Catatan privasi", next: "Studi kasus berikutnya" },
  },
  en: {
    nav: { home: "Home", capabilities: "Expertise", work: "Portfolio", resume: "Resume", contact: "Contact", downloadCv: "Download CV", homeAria: "Samsul Arifin home", navAria: "Primary navigation", languageAria: "Choose language" },
    hero: {
      kicker: "Operations systems · Process improvement · AI automation",
      hello: "Hi, I’m",
      roles: ["Operations Systems Specialist.", "Process Improvement Specialist.", "AI Automation Practitioner."],
      roleSummary: "Operations Systems and Automation Specialist.",
      viewWork: "See the systems I designed",
      discuss: "Discuss an opportunity",
      connect: "Connect with me",
      strengths: "Core strengths",
      role: "Role",
      based: "Based in",
      location: "Sidoarjo, Indonesia",
      photo: "Professional portrait of Samsul Arifin",
      photoRegion: "Portrait of Samsul Arifin",
      scroll: "Scroll to selected results",
      whatsapp: "Hi Samsul, I found your portfolio and would like to discuss a potential collaboration.",
    },
    proofAria: "Selected results",
    capabilities: { eyebrow: "What I do", title: "I turn frontline processes into working systems.", intro: "I study how teams work, define the rules and controls, then use AI and web technology to deliver tools they can use." },
    work: { eyebrow: "Selected work", title: "Operational systems I shaped and delivered.", intro: "GeoLead, Kayou POS, KLWT Surveyor, and Narotama support lead generation, multi-booth retail, field research, and workforce operations.", read: "Read the case study", open: "Open", image: "Interface of" },
    about: { eyebrow: "Profile", title: "I bring operational context into every system.", openLinkedin: "Open LinkedIn", skills: "Capabilities & tools" },
    journey: { eyebrow: "Professional journey", title: "Five years improving work through operations, data, and systems.", intro: "My experience across returns, sales leadership, analytics, logistics, and process control provides the operating context behind each product.", latest: "Recent experience", latestTitle: "Products & operations", foundation: "Career foundation", foundationTitle: "Data & process control" },
    legacy: { eyebrow: "Data & automation foundation", title: "Internal tools that grew into product thinking.", intro: "Sales tools, KPI monitoring, and reporting automation taught me how to turn daily operational needs into controlled workflows." },
    contact: { eyebrow: "Let’s talk", title: "Need someone who understands operations and can turn them into a working system?", action: "Contact me" },
    footer: "Operations systems, process improvement, and AI-assisted automation.",
    case: { missing: "Case study not found", suffix: "Samsul Arifin Case Study", back: "Back to all work", year: "Year", role: "Role", proof: "Key proof", challenge: "Challenge", challengeTitle: "The problem to solve", approach: "Approach", approachTitle: "From process to system", outcome: "Outcome", outcomeTitle: "What changed", scope: "Solution scope", scopeTitle: "What I built", privacy: "Privacy note", next: "Next case study" },
  },
  zh: {
    nav: { home: "首页", capabilities: "专长", work: "作品", resume: "履历", contact: "联系", downloadCv: "下载简历", homeAria: "Samsul Arifin 首页", navAria: "主导航", languageAria: "选择语言" },
    hero: {
      kicker: "运营系统 · 流程改进 · AI 自动化",
      hello: "你好，我是",
      roles: ["运营系统专家。", "流程改进专家。", "AI 自动化实践者。"],
      roleSummary: "运营系统与自动化专家。",
      viewWork: "查看我设计的系统",
      discuss: "洽谈工作机会",
      connect: "与我联系",
      strengths: "核心能力",
      role: "专业方向",
      based: "常驻地点",
      location: "印度尼西亚 泗水周边",
      photo: "Samsul Arifin 职业形象照",
      photoRegion: "Samsul Arifin 形象照",
      scroll: "向下浏览代表性成果",
      whatsapp: "你好 Samsul，我看过你的作品集，希望和你讨论合作机会。",
    },
    proofAria: "代表性成果",
    capabilities: { eyebrow: "我的工作", title: "把一线流程转化为可落地的系统。", intro: "我先梳理团队的实际工作方式，明确规则与控制点，再借助 AI 和 Web 技术交付可用工具。" },
    work: { eyebrow: "精选项目", title: "我规划并落地的运营系统。", intro: "GeoLead、Kayou POS、KLWT Surveyor 与 Narotama 分别服务于客户开发、多展位零售、市场调研和员工管理。", read: "阅读案例", open: "打开", image: "界面：" },
    about: { eyebrow: "个人简介", title: "我把真实运营场景写进每一套系统。", openLinkedin: "查看 LinkedIn", skills: "能力与工具" },
    journey: { eyebrow: "职业经历", title: "五年间，我用运营、数据与系统持续改进工作流程。", intro: "退货、销售管理、数据分析、物流与流程控制的经历，为我设计产品提供了完整的运营背景。", latest: "近期经历", latestTitle: "产品与运营", foundation: "职业基础", foundationTitle: "数据与流程控制" },
    legacy: { eyebrow: "数据与自动化基础", title: "从内部工具积累产品方法。", intro: "销售工具、KPI 监控和报表自动化，让我学会把日常运营需求转化为有规则、可追踪的工作流。" },
    contact: { eyebrow: "欢迎联系", title: "需要一位理解运营，并能把流程落地成系统的人吗？", action: "联系我" },
    footer: "专注运营系统、流程改进与 AI 辅助自动化。",
    case: { missing: "未找到该项目案例", suffix: "Samsul Arifin 项目案例", back: "返回全部作品", year: "年份", role: "职责", proof: "关键成果", challenge: "挑战", challengeTitle: "需要解决的问题", approach: "方法", approachTitle: "从流程到系统", outcome: "成果", outcomeTitle: "带来的改变", scope: "方案范围", scopeTitle: "我负责构建的部分", privacy: "隐私说明", next: "下一个项目案例" },
  },
} as const;

const localizedProfile: Record<Exclude<Locale, "id">, Partial<Profile>> = {
  en: {
    role: "Operations Systems & Automation Specialist",
    intro: "I map frontline processes, define workflows and controls, then use AI to turn them into working applications. I own the operational requirements, process logic, data validation, and quality of the final system.",
    about: "I have spent more than five years working across returns, sales, logistics, inventory, and reporting. For each application, I investigate the problem, define requirements and workflows, set controls, test edge cases, and check the result against the team’s real work. AI speeds up technical execution; I remain accountable for operational decisions and system quality.",
    location: "Sidoarjo, East Java, Indonesia",
    availability: "Open to Business Process Improvement, Operational Excellence, Business Systems, and Operations Transformation roles, as well as operational automation projects.",
  },
  zh: {
    role: "运营系统与自动化专家",
    intro: "我梳理一线流程，明确工作流和控制点，再借助 AI 将方案落地为应用。我对运营需求、流程逻辑、数据校验和最终系统质量负责。",
    about: "我在退货、销售、物流、库存和报表领域积累了五年以上经验。每个应用项目都从实际问题出发：我定义需求与工作流，设置控制点，测试边界场景，并根据团队的真实工作方式验收结果。AI 帮助我加快技术执行，运营判断与系统质量由我负责。",
    location: "印度尼西亚 东爪哇省 Sidoarjo",
    availability: "目前关注业务流程改进、卓越运营、业务系统与运营转型岗位，也承接运营自动化项目。",
  },
};

export function localizeProfile(profile: Profile, locale: Locale): Profile {
  return locale === "id" ? profile : { ...profile, ...localizedProfile[locale] };
}

export const localizedProofPoints = {
  id: [
    { value: "70+", label: "pengguna aktif sales tools" },
    { value: "5% → 2,8%", label: "rasio biaya logistik" },
    { value: "Rp1,3 miliar", label: "backlog retur dituntaskan" },
    { value: "4", label: "produk operasional unggulan" },
  ],
  en: [
    { value: "70+", label: "active sales-tool users" },
    { value: "5% → 2.8%", label: "logistics cost ratio" },
    { value: "IDR 1.3B", label: "returns backlog resolved" },
    { value: "4", label: "flagship operational products" },
  ],
  zh: [
    { value: "70+", label: "销售工具活跃用户" },
    { value: "5% → 2.8%", label: "物流成本占比" },
    { value: "13亿印尼盾", label: "一周内清理退货积压" },
    { value: "4", label: "核心运营产品" },
  ],
};

export const localizedCapabilities = {
  id: [
    { number: "01", title: "Process discovery & workflow design", copy: "Saya menggali cara kerja aktual, lalu memetakan peran, aturan, handoff, risiko, dan pengecualian menjadi requirement yang dapat diuji." },
    { number: "02", title: "Operational control & visibility", copy: "Saya menetapkan validasi, hak akses, audit trail, KPI, dan laporan agar tim bekerja dengan data yang konsisten dan mudah ditelusuri." },
    { number: "03", title: "AI-assisted solution delivery", copy: "Saya mengarahkan AI untuk membuat prototipe dan aplikasi, lalu memeriksa alur, data, edge case, keamanan dasar, serta hasil terhadap kebutuhan pengguna." },
  ],
  en: [
    { number: "01", title: "Process discovery & workflow design", copy: "I observe the real workflow, then turn roles, rules, handoffs, risks, and exceptions into requirements the team can test." },
    { number: "02", title: "Operational control & visibility", copy: "I define validation, access rules, audit trails, KPIs, and reports so teams work from consistent, traceable data." },
    { number: "03", title: "AI-assisted solution delivery", copy: "I direct AI to build prototypes and applications, then verify the workflow, data, edge cases, baseline security, and fit with user needs." },
  ],
  zh: [
    { number: "01", title: "流程调研与工作流设计", copy: "我观察真实作业方式，把角色、规则、交接、风险和例外整理成团队可以验证的需求。" },
    { number: "02", title: "运营控制与过程可视化", copy: "我定义数据校验、权限、审计记录、KPI 和报表，让团队基于一致且可追踪的数据工作。" },
    { number: "03", title: "AI 辅助方案交付", copy: "我指导 AI 构建原型和应用，并检查流程、数据、边界场景、基础安全和用户需求匹配度。" },
  ],
};

const projectTranslations: Record<Exclude<Locale, "id">, Record<string, Partial<Project>>> = {
  en: {
    geolead: {
      eyebrow: "Geospatial lead-generation SaaS",
      summary: "A Google Maps prospecting system that uses verified administrative boundaries, from area selection to sales-ready lead exports.",
      metric: "83,518 raw village polygons indexed",
      role: "Operations discovery, product direction, workflow design, and AI-assisted solution delivery",
      challenge: "Google Maps search results do not follow administrative boundaries with enough precision. Sales teams need verifiable coverage, a controlled search process, and reusable output.",
      approach: "I designed an operator desktop that combines visible browser search, administrative polygon selection, business-location validation, mission queues, and Excel export. The commercial site manages licensing, vouchers, checkout, and installer delivery.",
      outcome: "The result is a sellable product with an end-to-end flow from acquisition and licence activation to mission execution and audit. Its national boundary index covers 38 provinces and 83,518 raw village polygons.",
      features: ["Region selection down to village level with polygon-based result filtering", "Safety controls for CAPTCHA pauses, controlled stops, ETA, audit, and manifests", "Structured Excel exports ready for sales follow-up", "Supabase-based licensing, checkout, vouchers, and installer delivery"],
    },
    "kayou-pos": {
      eyebrow: "Multi-booth retail operations",
      summary: "One controlled flow for sales, attendance, stock, transfers, day close, and reporting across multiple booths.",
      metric: "6 role-based workflows",
      role: "Operations architecture, requirements, workflow design, and AI-assisted solution delivery",
      challenge: "Multi-booth retail needs reliable control over sales, attendance, stock movements, and cash reconciliation without slowing teams that use different devices and uneven connectivity.",
      approach: "I mapped the flow from Area Manager to booth staff, then brought POS, attendance, inbound stock, transfers, inventory, day close, and reports into one PWA with hierarchical access and offline queues.",
      outcome: "Kayou now has one operational source of truth for six role groups, with more consistent transaction and stock records from area level to each booth.",
      features: ["Responsive POS with offline queues and receipt printing", "Location and photo-based attendance", "Tiered stock transfers from area to booth", "Day close with cash evidence, variance checks, reports, and CSV exports"],
      disclosure: "This case study uses development-environment screens. Account and transaction data remain private.",
    },
    "klwt-surveyor": {
      eyebrow: "Field survey & market intelligence",
      summary: "A field-survey operations platform with assignments, GPS and photo evidence, layered verification, and duplicate detection.",
      metric: "5 operational roles connected",
      role: "Field-workflow research, product direction, validation design, and AI-assisted solution delivery",
      challenge: "Automotive-parts market research requires field assignments, visit evidence, address quality, verification, and consolidated insight. Separate spreadsheets made duplicates and follow-up hard to control.",
      approach: "I designed a five-role workflow for Head, Manager, Surveyor, Verificator, and Admin. It covers assignments, GPS and photo evidence, contact validation, duplicate scoring, revisions, market intelligence, and PWA notifications.",
      outcome: "The survey process now follows one traceable data chain from assignment to verified lead and market analysis, giving management a clear view of progress and data quality.",
      features: ["Survey assignment and field-progress monitoring", "GPS, photo, time, and enriched address evidence", "Layered verification, duplicate scoring, and revision loops", "Market-intelligence dashboards, import/export, and push notifications"],
      disclosure: "Numbers shown in screenshots come from a demo environment and do not represent published business results.",
    },
    narotama: {
      eyebrow: "Freelance · workforce operations",
      summary: "A field-workforce attendance and HR application with geofencing, selfies, offline queues, shifts, overtime, leave, corrections, and policy audits.",
      metric: "GPS + geofence + selfie evidence",
      role: "Business-process discovery, product direction, and AI-assisted application delivery for PT Cahaya Putra Narotama",
      challenge: "The company needed trusted field attendance and an HR workspace for schedules, contracts, overtime, leave, corrections, payroll periods, and reports.",
      approach: "I mapped employee, HR, and super-admin needs, then directed a mobile experience using GPS, geofencing, selfies, server time, device binding, and offline queues. The system also covers policy, audit, and period controls.",
      outcome: "One application now connects employee attendance evidence with HR administration, reporting, and auditable policy controls.",
      features: ["Clock-in and clock-out with GPS, geofence, selfie, and server time", "Offline queue, device binding, shifts, overtime, leave, and corrections", "HR dashboard, master data, contracts, reports, and bulk processes", "Policy controls, period locks, audit trails, MySQL, and object storage"],
      disclosure: "Internal company information, employee data, and sensitive implementation details are excluded from this public case study.",
    },
  },
  zh: {
    geolead: {
      eyebrow: "地理空间获客 SaaS 与自动化",
      summary: "一套基于已验证行政边界的 Google Maps 客户开发系统，覆盖区域选择、商户校验和销售线索导出。",
      metric: "已索引 83,518 个村级原始多边形",
      role: "运营调研、产品方向、工作流设计与 AI 辅助方案交付",
      challenge: "Google Maps 搜索结果无法精确遵循行政边界。销售团队需要可验证的区域覆盖、受控的搜索流程，以及可以重复使用的输出数据。",
      approach: "我设计了一套操作端桌面程序，整合可视化浏览器搜索、行政区多边形选择、商户位置校验、任务队列和 Excel 导出。商业网站负责许可证、优惠券、结账和安装包交付。",
      outcome: "项目形成了可公开销售的完整产品，覆盖获客、许可证激活、任务执行和结果审计。全国边界索引包含 38 个省和 83,518 个村级原始多边形。",
      features: ["支持省、市、区县到村级的区域选择与多边形过滤", "包含 CAPTCHA 暂停、受控停止、预计耗时、审计和清单等安全控制", "按销售跟进需求生成结构化 Excel 线索", "基于 Supabase 的许可证、结账、优惠券和安装包交付"],
    },
    "kayou-pos": {
      eyebrow: "多展位零售运营",
      summary: "用一套受控流程管理多个展位的销售、考勤、库存、调拨、日结和报表。",
      metric: "6 套基于角色的工作流",
      role: "运营架构、需求定义、工作流设计与 AI 辅助方案交付",
      challenge: "多展位零售需要准确控制交易、考勤、库存流转和现金核对，同时还要适应不同设备和不稳定的网络连接。",
      approach: "我梳理了从区域经理到展位员工的完整流程，把 POS、考勤、入库、调拨、库存、日结和报表整合进一套 PWA，并设置分级权限与离线队列。",
      outcome: "Kayou 获得了一套服务六类角色的统一运营系统，区域和展位层面的交易与库存记录更加一致。",
      features: ["支持离线队列和小票打印的响应式 POS", "基于位置与照片的考勤", "从区域到展位的分级库存调拨", "包含现金凭证、差异校验、报表与 CSV 导出的日结流程"],
      disclosure: "本案例展示开发环境界面，账户和交易数据未对外公开。",
    },
    "klwt-surveyor": {
      eyebrow: "外勤调研与市场情报",
      summary: "一套包含任务分配、GPS 与照片凭证、分层审核和重复检测的外勤调研平台。",
      metric: "连接 5 类运营角色",
      role: "外勤流程研究、产品方向、校验设计与 AI 辅助方案交付",
      challenge: "汽车零部件市场调研涉及外勤任务、到访凭证、地址质量、审核和洞察汇总。分散的表格让重复数据和后续跟进难以控制。",
      approach: "我为负责人、经理、调研员、审核员和管理员设计了五角色工作流，覆盖任务、GPS 与照片凭证、联系人校验、重复评分、修订、市场情报和 PWA 通知。",
      outcome: "调研工作形成了从任务到已验证线索和市场分析的可追踪数据链，管理层可以查看进度与数据质量。",
      features: ["调研任务分配与外勤进度监控", "GPS、照片、时间和地址补全凭证", "分层审核、重复评分与修订闭环", "市场情报看板、导入导出与推送通知"],
      disclosure: "截图中的数字来自演示环境，不代表已公布的业务成果。",
    },
    narotama: {
      eyebrow: "自由职业项目 · 员工运营",
      summary: "面向外勤团队的考勤与人力资源应用，支持电子围栏、自拍凭证、离线队列、班次、加班、请假、修正和制度审计。",
      metric: "GPS + 电子围栏 + 自拍凭证",
      role: "为 PT Cahaya Putra Narotama 负责业务流程调研、产品方向与 AI 辅助应用交付",
      challenge: "公司需要可信的外勤考勤，同时需要 HR 在同一系统中管理排班、合同、加班、请假、修正、周期和报表。",
      approach: "我梳理员工、HR 和超级管理员的需求，指导构建包含 GPS、电子围栏、自拍、服务器时间、设备绑定和离线队列的移动端体验，并加入制度、审计和周期控制。",
      outcome: "一套应用将员工出勤凭证与 HR 管理、报表和可审计的制度控制连接起来。",
      features: ["基于 GPS、电子围栏、自拍和服务器时间的上下班打卡", "离线队列、设备绑定、班次、加班、请假与修正", "HR 看板、主数据、合同、报表与批量处理", "制度控制、周期锁定、审计记录、MySQL 与对象存储"],
      disclosure: "公开案例不包含公司内部信息、员工数据和敏感实施细节。",
    },
  },
};

export function localizeProjects(projects: Project[], locale: Locale): Project[] {
  if (locale === "id") return projects;
  return projects.map((project) => ({ ...project, ...projectTranslations[locale][project.slug] }));
}

export function localizeProject(project: Project, locale: Locale): Project {
  return locale === "id" ? project : { ...project, ...projectTranslations[locale][project.slug] };
}

const experienceTranslations: Record<Exclude<Locale, "id">, Record<string, Partial<Experience>>> = {
  en: {
    "Xingyun Group": { period: "Jan 2025 – present", summary: "Connecting order fulfilment, logistics, sales operations, inventory, and internal-tool development.", achievements: ["Supported 100% order-fulfilment SLA achievement in Q1 2025", "Reduced the logistics cost ratio from 5% in Q4 2024 to 2.8% in Q1 2025", "Built an integrated sales tool used by more than 70 active users"] },
    Polibeli: { period: "May – Dec 2024", summary: "Monitored field activity, KPIs, sales productivity, GMV, and regional execution quality.", achievements: ["Built KPI monitoring and field-activity reporting applications", "Insights from the system supported three Best Regional Manager awards"] },
    GOTOKO: { period: "Dec 2022 – May 2023", summary: "Turned sales-performance data into daily monitoring and decision-support tools.", achievements: ["Reached the national number-one achievement ranking in Q1 2023", "Developed a chatbot and reports that gave teams faster access to information"] },
    ULA: { period: "Dec 2021 – Mar 2023", summary: "Managed returns operations, fraud analysis, backlog resolution, and process control.", achievements: ["Identified risk and fraud patterns in the returns process", "Coordinated the resolution of an IDR 1.3 billion returns backlog within one week"] },
  },
  zh: {
    "Xingyun Group": { period: "2025年1月 – 至今", title: "高级运营专员", summary: "负责衔接订单履约、物流、销售运营、库存和内部工具开发。", achievements: ["支持团队在 2025 年第一季度实现 100% 订单履约 SLA", "将物流成本占比从 2024 年第四季度的 5% 降至 2025 年第一季度的 2.8%", "构建一体化销售工具，活跃用户超过 70 人"] },
    Polibeli: { period: "2024年5月 – 12月", title: "区域销售经理助理", summary: "监控外勤活动、KPI、销售效率、GMV 和区域执行质量。", achievements: ["构建 KPI 监控与外勤活动报表应用", "系统提供的分析支持区域经理三次获得最佳区域经理称号"] },
    GOTOKO: { period: "2022年12月 – 2023年5月", title: "数据分析师", summary: "把销售绩效数据转化为日常监控和决策工具。", achievements: ["2023 年第一季度绩效达成率位列全国第一", "开发聊天机器人和报表，缩短团队获取信息的时间"] },
    ULA: { period: "2021年12月 – 2023年3月", title: "退货运营专员 / 主管", summary: "负责退货运营、欺诈分析、积压处理协调和流程控制。", achievements: ["识别退货流程中的风险与欺诈模式", "协调团队在一周内清理价值 13 亿印尼盾的退货积压"] },
  },
};

export function localizeExperiences(experiences: Experience[], locale: Locale): Experience[] {
  if (locale === "id") return experiences;
  return experiences.map((experience) => ({ ...experience, ...experienceTranslations[locale][experience.company] }));
}

const skillTranslations: Record<Exclude<Locale, "id">, Record<string, string>> = {
  en: {},
  zh: {
    "Business process mapping": "业务流程梳理",
    "SOP & operational controls": "SOP 与运营控制",
    "Requirements & UAT": "需求定义与用户验收测试",
    "KPI & performance systems": "KPI 与绩效系统",
    "Excel & Google Sheets": "Excel 与 Google Sheets",
    Tableau: "Tableau",
    "Apps Script & AppSheet": "Apps Script 与 AppSheet",
    "AI-assisted workflow automation": "AI 辅助工作流自动化",
    "PWA & offline workflows": "PWA 与离线工作流",
    "Product scoping & QA": "产品范围与质量验证",
    "Next.js & React": "Next.js 与 React",
    "Supabase & SQL": "Supabase 与 SQL",
  },
};

export function localizeSkills(skills: Skill[], locale: Locale): Skill[] {
  if (locale === "id" || locale === "en") return skills;
  return skills.map((skill) => ({ ...skill, name: skillTranslations.zh[skill.name] ?? skill.name }));
}

export function localizeSkillCategory(category: string, locale: Locale) {
  if (locale !== "zh") return category;
  return ({ Operations: "运营", Strategy: "策略", Data: "数据", Automation: "自动化", Delivery: "交付", Product: "产品" } as Record<string, string>)[category] ?? category;
}

export const localizedLegacy = {
  id: [
    { title: "Sales Tools Ecosystem", copy: "AppSheet, Google Sheets, dan Tableau untuk registrasi toko, visit report, konsinyasi, pembayaran, recall, feedback, serta kontrol berbasis peran.", image: "/images/legacy/sales-tools.png", pdf: "/documents/sales-tools.pdf" },
    { title: "KPI Monitoring", copy: "Monitoring sales regional, aktivitas harian, GMV, peta toko, dan analisis kategori produk untuk memusatkan coaching pada area yang tertinggal.", image: "/images/legacy/kpi-monitoring.png", pdf: "/documents/kpi-monitoring.pdf" },
    { title: "Reporting & Automation", copy: "Tableau, formula spreadsheet lintas sumber, serta Apps Script untuk memangkas pekerjaan pelaporan dan input data berulang.", image: "/images/legacy/tableau-reporting.png", pdf: "/documents/tableau-portfolio.pdf" },
  ],
  en: [
    { title: "Sales Tools Ecosystem", copy: "AppSheet, Google Sheets, and Tableau for store registration, visit reports, consignment, payments, recalls, feedback, and role-based controls.", image: "/images/legacy/sales-tools.png", pdf: "/documents/sales-tools.pdf" },
    { title: "KPI Monitoring", copy: "Regional sales, daily activity, GMV, store maps, and category analysis that helped managers focus coaching on underperforming areas.", image: "/images/legacy/kpi-monitoring.png", pdf: "/documents/kpi-monitoring.pdf" },
    { title: "Reporting & Automation", copy: "Tableau, cross-source spreadsheet formulas, and Apps Script that reduced repetitive reporting and data entry.", image: "/images/legacy/tableau-reporting.png", pdf: "/documents/tableau-portfolio.pdf" },
  ],
  zh: [
    { title: "销售工具体系", copy: "使用 AppSheet、Google Sheets 和 Tableau 管理门店注册、拜访报告、寄售、付款、召回、反馈与角色权限。", image: "/images/legacy/sales-tools.png", pdf: "/documents/sales-tools.pdf" },
    { title: "KPI 监控", copy: "整合区域销售、每日活动、GMV、门店地图和品类分析，帮助经理聚焦表现落后的区域。", image: "/images/legacy/kpi-monitoring.png", pdf: "/documents/kpi-monitoring.pdf" },
    { title: "报表与自动化", copy: "通过 Tableau、跨数据源表格公式和 Apps Script，减少重复报表与数据录入工作。", image: "/images/legacy/tableau-reporting.png", pdf: "/documents/tableau-portfolio.pdf" },
  ],
};

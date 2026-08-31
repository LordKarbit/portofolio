export type Profile = {
  slug: string;
  name: string;
  role: string;
  intro: string;
  about: string;
  location: string;
  email: string;
  phone: string;
  linkedin: string;
  availability: string;
};

export type Project = {
  id?: string;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  metric: string;
  image: string;
  tags: string[];
  featured: boolean;
  published?: boolean;
  sortOrder?: number;
  year: string;
  role: string;
  challenge: string;
  approach: string;
  outcome: string;
  features: string[];
  disclosure?: string;
};

export type Experience = {
  id?: string;
  period: string;
  title: string;
  company: string;
  summary: string;
  achievements: string[];
  sortOrder: number;
  published?: boolean;
};

export type Skill = {
  id?: string;
  name: string;
  category: string;
  sortOrder: number;
  published?: boolean;
};

export const profile: Profile = {
  slug: "samsul-arifin",
  name: "Samsul Arifin",
  role: "Operations Systems & Automation Specialist",
  intro:
    "Saya memetakan proses lapangan, menetapkan workflow dan kontrol, lalu menggunakan AI untuk mewujudkannya menjadi aplikasi. Saya bertanggung jawab atas kebutuhan operasional, logika proses, validasi data, dan kualitas hasil.",
  about:
    "Saya bekerja lebih dari lima tahun di return operations, sales, logistik, inventory, dan reporting. Dalam setiap aplikasi, saya memahami masalah, menyusun requirement dan workflow, menetapkan kontrol, menguji edge case, serta memastikan hasilnya sesuai cara tim bekerja. Saya memakai AI untuk mempercepat eksekusi teknis. Keputusan operasional dan standar mutu sistem tetap saya pegang.",
  location: "Sidoarjo, Jawa Timur, Indonesia",
  email: "syamsul.ar313@gmail.com",
  phone: "+62 821-3860-7205",
  linkedin: "https://www.linkedin.com/in/samsul-arifin-328aa918b/",
  availability: "Terbuka untuk peran Business Process Improvement, Operational Excellence, Business Systems, Operations Transformation, serta proyek otomasi operasional.",
};

export const proofPoints = [
  { value: "70+", label: "pengguna aktif sales tools" },
  { value: "5% → 2,8%", label: "rasio biaya logistik" },
  { value: "Rp1,3 miliar", label: "backlog retur dituntaskan" },
  { value: "4", label: "produk operasional unggulan" },
];

export const projects: Project[] = [
  {
    slug: "geolead",
    title: "GeoLead",
    eyebrow: "Produk SaaS & otomasi geospasial",
    summary:
      "Sistem akuisisi prospek Google Maps berbasis batas wilayah terverifikasi, dari pemilihan area hingga ekspor lead yang siap ditindaklanjuti.",
    metric: "83.518 polygon desa raw terindeks",
    image: "/images/projects/geolead.jpg",
    tags: ["Next.js", "Python", "Supabase", "Geospatial"],
    featured: true,
    published: true,
    sortOrder: 1,
    year: "2026",
    role: "Operations discovery, product direction, workflow design, dan AI-assisted solution delivery",
    challenge:
      "Pencarian bisnis di Google Maps tidak mengikuti batas administrasi secara presisi. Tim sales membutuhkan cakupan wilayah yang dapat diverifikasi, proses yang aman, dan hasil yang mudah dipakai kembali.",
    approach:
      "Saya merancang desktop operator yang menggabungkan pencarian terlihat di browser, pemilihan polygon administrasi, validasi posisi bisnis, antrean misi, serta ekspor Excel. Situs komersialnya menangani lisensi, voucher, checkout, dan distribusi installer.",
    outcome:
      "Terbentuk produk yang dapat dijual secara umum dengan alur end-to-end dari akuisisi, aktivasi lisensi, eksekusi misi, hingga audit hasil. Indeks batas nasional memuat 38 provinsi dan 83.518 polygon desa raw sebagai fondasi penyaringan wilayah.",
    features: [
      "Seleksi wilayah bertingkat hingga desa dan polygon gate untuk hasil pencarian",
      "Kontrol aman: jeda CAPTCHA, stop terkontrol, ETA, audit, dan manifest",
      "Ekspor lead ke Excel dengan struktur yang siap ditindaklanjuti",
      "Licensing berbasis Supabase, checkout, voucher, dan installer delivery",
    ],
  },
  {
    slug: "kayou-pos",
    title: "Kayou POS",
    eyebrow: "Multi-booth retail operations",
    summary:
      "Satu alur untuk transaksi, absensi, stok, transfer barang, tutup hari, dan laporan pada banyak booth dengan kontrol berbasis peran.",
    metric: "6 alur kerja berbasis peran",
    image: "/images/projects/kayou.png",
    tags: ["Next.js", "PWA", "Offline-first", "RBAC"],
    featured: true,
    published: true,
    sortOrder: 2,
    year: "2026",
    role: "Operations architecture, requirements, workflow design, dan AI-assisted solution delivery",
    challenge:
      "Operasi penjualan pada banyak booth membutuhkan kontrol transaksi, kehadiran, perpindahan stok, dan rekonsiliasi kas tanpa menghambat tim yang bekerja dari perangkat berbeda dan koneksi yang tidak selalu stabil.",
    approach:
      "Saya memetakan alur dari Area Manager hingga penjaga booth, lalu menggabungkan POS, attendance, inbound, transfer, inventory, close-day, dan report ke satu PWA dengan kontrol akses hierarkis serta antrean offline.",
    outcome:
      "Kayou memperoleh satu sumber kerja operasional untuk enam kelompok peran, dengan jejak transaksi dan stok yang lebih konsisten dari level area hingga booth.",
    features: [
      "POS responsif dengan antrean offline dan cetak struk",
      "Absensi berbasis lokasi dan foto",
      "Transfer stok berjenjang dari area hingga booth",
      "Tutup hari dengan bukti kas, selisih, laporan, dan ekspor CSV",
    ],
    disclosure: "Studi kasus menggunakan tampilan lingkungan pengembangan; data akun dan transaksi tidak dipublikasikan.",
  },
  {
    slug: "klwt-surveyor",
    title: "KLWT Surveyor",
    eyebrow: "Field survey & market intelligence",
    summary:
      "Platform operasional survei merchant dengan penugasan, bukti GPS dan foto, verifikasi berlapis, serta deteksi duplikasi.",
    metric: "5 peran operasional terhubung",
    image: "/images/projects/klwt.png",
    tags: ["React", "PWA", "Maps", "Workflow"],
    featured: true,
    published: true,
    sortOrder: 3,
    year: "2026",
    role: "Field-workflow research, product direction, validation design, dan AI-assisted solution delivery",
    challenge:
      "Survei pasar sparepart mobil melibatkan penugasan lapangan, bukti kunjungan, kualitas alamat, verifikasi, dan konsolidasi insight. Spreadsheet terpisah membuat duplikasi dan tindak lanjut sulit dikendalikan.",
    approach:
      "Saya merancang workflow lima peran: Head, Manager, Surveyor, Verificator, dan Admin. Sistem mencakup assignment, GPS dan foto, validasi kontak, duplicate scoring, revisi, market intelligence, serta notifikasi PWA.",
    outcome:
      "Proses survei menjadi satu rantai data yang dapat ditelusuri dari penugasan hingga lead terverifikasi dan analisis pasar, sekaligus memberi manajemen visibilitas terhadap progres dan kualitas data.",
    features: [
      "Penugasan survei dan monitoring progres lapangan",
      "Bukti GPS, foto, waktu, serta pengayaan alamat",
      "Verifikasi bertingkat, duplicate scoring, dan revision loop",
      "Dashboard market intelligence, impor-ekspor, dan push notification",
    ],
    disclosure: "Angka pada screenshot berasal dari lingkungan demo/simulasi dan tidak diposisikan sebagai hasil bisnis aktual.",
  },
  {
    slug: "narotama",
    title: "Narotama Workforce",
    eyebrow: "Freelance | workforce operations",
    summary:
      "Aplikasi absensi dan HR untuk tim lapangan: geofence, selfie, antrean offline, shift, lembur, cuti, koreksi, dan audit kebijakan.",
    metric: "GPS + geofence + bukti selfie",
    image: "/images/projects/narotama.png",
    tags: ["Next.js", "MySQL", "Cloud Storage", "Security"],
    featured: true,
    published: true,
    sortOrder: 4,
    year: "2026",
    role: "Business-process discovery, product direction, dan AI-assisted application delivery untuk PT Cahaya Putra Narotama",
    challenge:
      "Perusahaan membutuhkan absensi lapangan yang dapat dipercaya sekaligus panel HR untuk mengelola jadwal, kontrak, lembur, cuti, koreksi, periode, dan laporan dari satu sistem.",
    approach:
      "Saya memetakan kebutuhan karyawan, HR, dan superadmin, lalu mengarahkan pembuatan pengalaman mobile dengan GPS, geofence, selfie, waktu server, binding perangkat, dan antrean offline. Sistem juga mencakup kebijakan, audit, dan kontrol periode.",
    outcome:
      "Satu aplikasi menghubungkan bukti kehadiran karyawan dengan proses administrasi HR, laporan, dan kontrol kebijakan yang dapat diaudit.",
    features: [
      "Clock-in/out dengan GPS, geofence, selfie, dan waktu server",
      "Offline queue, device binding, shift, lembur, cuti, dan koreksi",
      "HR dashboard, master data, kontrak, laporan, dan proses bulk",
      "Policy control, period lock, audit trail, MySQL, dan object storage",
    ],
    disclosure: "Informasi internal perusahaan, data karyawan, dan implementasi sensitif tidak disertakan dalam studi kasus publik.",
  },
];

export const experiences: Experience[] = [
  {
    period: "Jan 2025 – sekarang",
    title: "Senior Operations Specialist",
    company: "Xingyun Group",
    summary: "Menghubungkan order fulfillment, logistik, sales operations, inventory, dan pengembangan alat kerja.",
    achievements: [
      "Mendukung pencapaian 100% SLA order fulfillment pada Q1 2025",
      "Menurunkan rasio biaya logistik dari 5% pada Q4 2024 menjadi 2,8% pada Q1 2025",
      "Membangun sales tools terpadu yang digunakan 70+ pengguna aktif",
    ],
    sortOrder: 1,
    published: true,
  },
  {
    period: "Mei – Des 2024",
    title: "Assistant Regional Sales Manager",
    company: "Polibeli",
    summary: "Memantau aktivitas lapangan, KPI, produktivitas sales, GMV, dan kualitas eksekusi regional.",
    achievements: [
      "Membangun KPI monitoring dan aplikasi pelaporan aktivitas lapangan",
      "Insight yang dihasilkan mendukung pencapaian Best Regional Manager tiga kali",
    ],
    sortOrder: 2,
    published: true,
  },
  {
    period: "Des 2022 – Mei 2023",
    title: "Data Analyst",
    company: "GOTOKO",
    summary: "Mengolah data performa penjualan menjadi monitoring dan alat bantu keputusan harian.",
    achievements: [
      "Meraih peringkat nasional #1 untuk achievement pada Q1 2023",
      "Mengembangkan chatbot dan reporting untuk mempercepat akses informasi tim",
    ],
    sortOrder: 3,
    published: true,
  },
  {
    period: "Des 2021 – Mar 2023",
    title: "Return Staff / Supervisor",
    company: "ULA",
    summary: "Menangani return operations, analisis fraud, koordinasi penyelesaian backlog, dan kontrol proses.",
    achievements: [
      "Mengidentifikasi pola risiko dan fraud pada proses retur",
      "Mengoordinasikan penyelesaian backlog retur senilai Rp1,3 miliar dalam satu minggu",
    ],
    sortOrder: 4,
    published: true,
  },
];

export const skills: Skill[] = [
  { name: "Business process mapping", category: "Operations", sortOrder: 1, published: true },
  { name: "SOP & operational controls", category: "Operations", sortOrder: 2, published: true },
  { name: "Requirements & UAT", category: "Operations", sortOrder: 3, published: true },
  { name: "KPI & performance systems", category: "Data", sortOrder: 4, published: true },
  { name: "Excel & Google Sheets", category: "Data", sortOrder: 5, published: true },
  { name: "Tableau", category: "Data", sortOrder: 6, published: true },
  { name: "Apps Script & AppSheet", category: "Automation", sortOrder: 7, published: true },
  { name: "AI-assisted workflow automation", category: "Automation", sortOrder: 8, published: true },
  { name: "PWA & offline workflows", category: "Automation", sortOrder: 9, published: true },
  { name: "Product scoping & QA", category: "Delivery", sortOrder: 10, published: true },
  { name: "Next.js & React", category: "Delivery", sortOrder: 11, published: true },
  { name: "Supabase & SQL", category: "Delivery", sortOrder: 12, published: true },
];

export const capabilities = [
  {
    number: "01",
    title: "Process discovery & workflow design",
    copy: "Saya menggali cara kerja aktual, lalu memetakan peran, aturan, handoff, risiko, dan pengecualian menjadi requirement yang dapat diuji.",
  },
  {
    number: "02",
    title: "Operational control & visibility",
    copy: "Saya menetapkan validasi, hak akses, audit trail, KPI, dan laporan agar tim bekerja dengan data yang konsisten dan mudah ditelusuri.",
  },
  {
    number: "03",
    title: "AI-assisted solution delivery",
    copy: "Saya mengarahkan AI untuk membuat prototipe dan aplikasi, lalu memeriksa alur, data, edge case, keamanan dasar, serta hasil terhadap kebutuhan pengguna.",
  },
];

export const legacyWork = [
  {
    title: "Sales Tools Ecosystem",
    copy: "AppSheet, Google Sheets, dan Tableau untuk registrasi toko, visit report, konsinyasi, pembayaran, recall, feedback, serta kontrol berbasis peran.",
    image: "/images/legacy/sales-tools.png",
  },
  {
    title: "KPI Monitoring",
    copy: "Monitoring sales regional, aktivitas harian, GMV, peta toko, dan analisis kategori produk untuk memusatkan coaching pada area yang tertinggal.",
    image: "/images/legacy/kpi-monitoring.png",
  },
  {
    title: "Reporting & Automation",
    copy: "Tableau, formula spreadsheet lintas sumber, serta Apps Script untuk memangkas pekerjaan pelaporan dan input data berulang.",
    image: "/images/legacy/tableau-reporting.png",
  },
];

from pathlib import Path
import shutil

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"
OUTPUT_PATH = OUTPUT_DIR / "Samsul-Arifin-CV-ATS.pdf"
PUBLIC_PATH = ROOT / "public" / "Samsul-Arifin-CV.pdf"

ACCENT = colors.HexColor("#FF014F")
INK = colors.HexColor("#20242A")
MUTED = colors.HexColor("#5D646D")
RULE = colors.HexColor("#D9DDE2")


def register_fonts() -> None:
    fonts = {
        "Arial": Path(r"C:\Windows\Fonts\arial.ttf"),
        "Arial-Bold": Path(r"C:\Windows\Fonts\arialbd.ttf"),
        "Arial-Italic": Path(r"C:\Windows\Fonts\ariali.ttf"),
    }
    for name, path in fonts.items():
        if not path.exists():
            raise FileNotFoundError(f"Required ATS-safe font not found: {path}")
        pdfmetrics.registerFont(TTFont(name, str(path)))


def metadata(canvas, _doc) -> None:
    canvas.setTitle("Samsul Arifin - Operations Systems and Automation Specialist")
    canvas.setAuthor("Samsul Arifin")
    canvas.setSubject(
        "ATS-friendly resume for Business Process Improvement, Operational Excellence, "
        "Business Systems, and Operations Transformation roles"
    )
    canvas.setKeywords(
        "operations systems, business process improvement, operational excellence, "
        "business systems analyst, workflow automation, requirements gathering, UAT, "
        "KPI, logistics, inventory, sales operations, process mapping"
    )


def build_styles():
    sample = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "Name",
            parent=sample["Normal"],
            fontName="Arial-Bold",
            fontSize=23,
            leading=25,
            textColor=INK,
            spaceAfter=2,
        ),
        "role": ParagraphStyle(
            "Role",
            parent=sample["Normal"],
            fontName="Arial-Bold",
            fontSize=11,
            leading=13,
            tracking=0.35,
            textColor=ACCENT,
            spaceAfter=2,
        ),
        "target": ParagraphStyle(
            "Target",
            parent=sample["Normal"],
            fontName="Arial",
            fontSize=8.8,
            leading=11,
            textColor=MUTED,
            spaceAfter=5,
        ),
        "contact": ParagraphStyle(
            "Contact",
            parent=sample["Normal"],
            fontName="Arial",
            fontSize=8.25,
            leading=10.3,
            textColor=INK,
            spaceAfter=8,
        ),
        "section": ParagraphStyle(
            "Section",
            parent=sample["Normal"],
            fontName="Arial-Bold",
            fontSize=10.2,
            leading=12,
            tracking=0.55,
            textColor=INK,
            spaceBefore=5,
            spaceAfter=2,
        ),
        "summary": ParagraphStyle(
            "Summary",
            parent=sample["Normal"],
            fontName="Arial",
            fontSize=9.15,
            leading=11.9,
            textColor=INK,
            spaceAfter=5,
        ),
        "job": ParagraphStyle(
            "Job",
            parent=sample["Normal"],
            fontName="Arial-Bold",
            fontSize=9.75,
            leading=11.7,
            textColor=INK,
            spaceBefore=4.5,
            spaceAfter=0.5,
        ),
        "meta": ParagraphStyle(
            "Meta",
            parent=sample["Normal"],
            fontName="Arial-Italic",
            fontSize=8.55,
            leading=10.4,
            textColor=MUTED,
            spaceAfter=1.3,
        ),
        "bullet": ParagraphStyle(
            "Bullet",
            parent=sample["Normal"],
            fontName="Arial",
            fontSize=8.85,
            leading=11.3,
            textColor=INK,
            leftIndent=9,
            firstLineIndent=-7,
            spaceAfter=1.25,
        ),
        "project": ParagraphStyle(
            "Project",
            parent=sample["Normal"],
            fontName="Arial-Bold",
            fontSize=9.65,
            leading=11.7,
            textColor=INK,
            spaceBefore=4.5,
            spaceAfter=0.5,
        ),
        "skill": ParagraphStyle(
            "Skill",
            parent=sample["Normal"],
            fontName="Arial",
            fontSize=8.75,
            leading=11.15,
            textColor=INK,
            spaceAfter=2,
        ),
        "education": ParagraphStyle(
            "Education",
            parent=sample["Normal"],
            fontName="Arial",
            fontSize=8.95,
            leading=11.5,
            textColor=INK,
            spaceAfter=2,
        ),
        "page_identity": ParagraphStyle(
            "PageIdentity",
            parent=sample["Normal"],
            fontName="Arial-Bold",
            fontSize=8.4,
            leading=10.5,
            textColor=MUTED,
            spaceAfter=5,
        ),
    }


def section(title: str, styles) -> list:
    return [
        Paragraph(title.upper(), styles["section"]),
        HRFlowable(width="100%", thickness=0.65, color=ACCENT, spaceBefore=0, spaceAfter=2.5),
    ]


def bullet(text: str, styles) -> Paragraph:
    return Paragraph(f"- {text}", styles["bullet"])


def job(role: str, company: str, place_and_period: str, bullets: list[str], styles) -> KeepTogether:
    parts = [
        Paragraph(f"{role} | {company}", styles["job"]),
        Paragraph(place_and_period, styles["meta"]),
    ]
    parts.extend(bullet(item, styles) for item in bullets)
    return KeepTogether(parts)


def project(title: str, descriptor: str, bullets: list[str], styles) -> KeepTogether:
    parts = [
        Paragraph(f"{title} | {descriptor}", styles["project"]),
    ]
    parts.extend(bullet(item, styles) for item in bullets)
    return KeepTogether(parts)


def build_pdf() -> None:
    register_fonts()
    styles = build_styles()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_PATH.parent.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT_PATH),
        pagesize=A4,
        leftMargin=15 * mm,
        rightMargin=15 * mm,
        topMargin=13.5 * mm,
        bottomMargin=13.5 * mm,
        title="Samsul Arifin - Operations Systems and Automation Specialist",
        author="Samsul Arifin",
        subject="ATS-friendly professional resume",
    )

    story = [
        Paragraph("SAMSUL ARIFIN", styles["name"]),
        Paragraph("OPERATIONS SYSTEMS &amp; AUTOMATION SPECIALIST", styles["role"]),
        Paragraph(
            "Business Process Improvement | Operational Excellence | Business Systems | AI-Assisted Workflow Automation",
            styles["target"],
        ),
        Paragraph(
            "Sidoarjo, East Java, Indonesia | +62 821-3860-7205 | "
            '<link href="mailto:syamsul.ar313@gmail.com" color="#20242A">syamsul.ar313@gmail.com</link><br/>'
            '<link href="https://www.samsularifin.cc" color="#20242A">samsularifin.cc</link> | '
            '<link href="https://www.linkedin.com/in/samsul-arifin-328aa918b/" color="#20242A">linkedin.com/in/samsul-arifin-328aa918b</link>',
            styles["contact"],
        ),
    ]

    story.extend(section("Professional Summary", styles))
    story.append(
        Paragraph(
            "Operations systems specialist with 5+ years across order fulfillment, logistics, sales operations, inventory, returns, field operations, and reporting. Translates frontline processes into requirements, workflows, controls, KPI systems, and testable acceptance criteria, then uses AI-assisted delivery and business tools to implement practical applications. Track record includes supporting 100% order-fulfillment SLA in Q1 2025, reducing the logistics cost ratio from 5.0% to 2.8%, enabling sales tools for 70+ active users, and coordinating closure of an IDR 1.3 billion returns backlog in one week.",
            styles["summary"],
        )
    )

    story.extend(section("Professional Experience", styles))
    story.append(
        job(
            "Senior Operations Specialist",
            "Xingyun Group",
            "Indonesia | Jan 2025 - Present",
            [
                "Connected order fulfillment, logistics, sales operations, inventory visibility, and operational controls; supported 100% order fulfillment within SLA throughout Q1 2025.",
                "Improved delivery planning using vehicle capacity and product volume, reducing the logistics cost ratio from 5.0% in Q4 2024 to 2.8% in Q1 2025.",
                "Defined requirements and workflows for integrated sales tools used by 70+ active users across Channel PIC, Regional Manager, Area Manager, and Business Development roles.",
                "Maintained accurate order entry and multi-warehouse stock visibility to support fulfillment and customer-facing availability.",
            ],
            styles,
        )
    )
    story.append(
        job(
            "Assistant Regional Sales Manager",
            "Polibeli",
            "East Java | May 2024 - Dec 2024",
            [
                "Built KPI monitoring and field-activity reporting with Google Sheets, Apps Script, AppSheet, and Tableau, providing daily visibility into sales activity, GMV, product trends, and achievement gaps.",
                "Translated regional performance data into operational insights that supported three Best Regional Manager awards during Q3-Q4 2024.",
            ],
            styles,
        )
    )
    story.append(
        job(
            "Data Analyst",
            "GOTOKO",
            "Sidoarjo and Gresik | Dec 2022 - May 2023",
            [
                "Analyzed FMCG product trends and customer history by cluster; the resulting execution strategy contributed to the Sidoarjo cluster ranking #1 nationally for achievement in Q1 2023.",
                "Developed a chatbot and reporting hub for stock, order, and customer information across Sales, Warehouse, and Logistics teams.",
            ],
            styles,
        )
    )
    story.append(
        job(
            "Return Operations Staff / Supervisor",
            "ULA",
            "Pasuruan and Surabaya | Dec 2021 - Mar 2023",
            [
                "Investigated customer-rejected items and identified fraud and operational risk patterns to help prevent losses.",
                "Coordinated product tracing, hub retrieval, and 3PL claims to close an IDR 1.3 billion returns backlog within one week.",
            ],
            styles,
        )
    )

    story.extend(section("Skills", styles))
    story.extend(
        [
            Paragraph(
                "<b>Process Improvement:</b> Business process mapping; SOP design; operational controls; root-cause analysis; continuous improvement; requirements gathering; acceptance criteria; UAT; QA",
                styles["skill"],
            ),
            Paragraph(
                "<b>Operations:</b> Order fulfillment; logistics; inventory; sales operations; return operations; field operations; KPI and performance monitoring; cross-functional coordination",
                styles["skill"],
            ),
            Paragraph(
                "<b>Data and Reporting:</b> Microsoft Excel; Google Sheets; Tableau; SQL; operational reporting; data validation",
                styles["skill"],
            ),
            Paragraph(
                "<b>Automation and Delivery:</b> AppSheet; Apps Script; AI-assisted workflow automation; Next.js; React; Supabase; PWA; offline workflows; role-based access control",
                styles["skill"],
            ),
        ]
    )

    story.extend(section("Education", styles))
    story.append(
        Paragraph(
            "<b>Bachelor of Law (S.H.)</b> | UIN Sunan Ampel Surabaya | Graduated 2018 | GPA 3.49 / 4.00",
            styles["education"],
        )
    )

    story.append(PageBreak())
    story.append(
        Paragraph(
            "SAMSUL ARIFIN | OPERATIONS SYSTEMS &amp; AUTOMATION SPECIALIST | SAMSULARIFIN.CC",
            styles["page_identity"],
        )
    )
    story.extend(section("Selected Operations Systems", styles))
    story.append(
        project(
            "GeoLead",
            "Geospatial Lead Acquisition SaaS | 2026",
            [
                "Designed an end-to-end workflow for Google Maps lead acquisition using verified administrative boundaries, including territory selection, polygon validation, mission queues, audit manifests, and Excel export.",
                "Directed AI-assisted solution delivery for the operator application and commercial licensing flow; indexed 83,518 raw village polygons across 38 provinces as the geographic validation foundation.",
            ],
            styles,
        )
    )
    story.append(
        project(
            "Kayou POS",
            "Multi-Booth Retail Operations | 2026",
            [
                "Mapped workflows for six role groups and unified point of sale, attendance, inventory, stock transfer, day-close, and reporting in one role-based PWA.",
                "Defined offline queues, location and photo evidence, cash reconciliation, access controls, and operational reporting for multi-device booth operations.",
            ],
            styles,
        )
    )
    story.append(
        project(
            "KLWT Surveyor",
            "Field Survey and Market Intelligence | 2026",
            [
                "Designed a five-role field workflow connecting assignment, GPS and photo evidence, address validation, verification, revision, and market-intelligence reporting.",
                "Specified duplicate scoring, auditability, import-export, and PWA notifications to improve control over survey progress and data quality.",
            ],
            styles,
        )
    )
    story.append(
        project(
            "Narotama Workforce",
            "Workforce Attendance and HR Operations | 2026",
            [
                "Mapped employee, HR, and administrator workflows for GPS and geofence attendance, selfie evidence, shifts, overtime, leave, corrections, contracts, and reporting.",
                "Defined offline queues, device binding, server time, period locks, policy controls, and audit trails for PT Cahaya Putra Narotama.",
            ],
            styles,
        )
    )

    story.extend(section("Delivery Approach", styles))
    story.extend(
        [
            bullet(
                "Own operations discovery and current-state mapping across users, handoffs, data, risks, and exceptions.",
                styles,
            ),
            bullet(
                "Convert operating needs into roles, business rules, controls, requirements, acceptance criteria, and UAT scenarios.",
                styles,
            ),
            bullet(
                "Use AI to accelerate prototyping and implementation while retaining responsibility for validation, quality control, and fitness for operational use.",
                styles,
            ),
        ]
    )

    story.append(Spacer(1, 3 * mm))
    story.append(HRFlowable(width="100%", thickness=0.4, color=RULE, spaceBefore=0, spaceAfter=2))
    story.append(
        Paragraph(
            "Portfolio and detailed case studies: "
            '<link href="https://www.samsularifin.cc" color="#FF014F">https://www.samsularifin.cc</link>',
            styles["skill"],
        )
    )

    doc.build(story, onFirstPage=metadata, onLaterPages=metadata)
    shutil.copy2(OUTPUT_PATH, PUBLIC_PATH)
    print(f"Created: {OUTPUT_PATH}")
    print(f"Synced:  {PUBLIC_PATH}")


if __name__ == "__main__":
    build_pdf()

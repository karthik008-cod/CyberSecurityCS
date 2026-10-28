# Cyber Security Essentials - Case Study 5
## Cyber Stalking Through Social Media: Interactive Analysis & Defense Platform

### Overview
This project is an interactive, zero-dependency web application designed to systematically analyze and address all 7 tasks outlined in **Case Study 5: Cyber Stalking Through Social Media**.

---

### Structure & Task Mapping

| Tab / Section | Case Study Task | Functional / Interactive Component | Key Standards & Laws |
| :--- | :--- | :--- | :--- |
| **Task 1: Offense Analysis** | **Task 1**: Identify the cyber offense | Interactive behavior classifier, severity indicator, and statutory mapping | IPC 354D / BNS 78, IPC 506, IT Act 66E/66D |
| **Tasks 2 & 3: OSINT & Risk** | **Task 2**: Analyze how public info was exploited<br>**Task 3**: Identify victim risks | OSINT Breadcrumb Exploitation Simulator (Attacker terminal) + 4-Factor Risk Matrix & Threat Score Calculator | OSINT profiling, physical, psychological, academic, digital risks |
| **Task 4: Evidence Locker** | **Task 4**: Recommend evidence-preservation measures | Digital Evidence Intake Form with **Screenshot Upload (PNG/JPG)**, Clickable Lightbox Modal, **Inline Record Editing**, and NIST SP 800-86 Chain-of-Custody Dossier Exporter | NIST SP 800-86, uncropped screenshots, permanent URLs |
| **Task 5: Countermeasures** | **Task 5**: Suggest technical and behavioral countermeasures | Dual-Pillar Interactive Hardening Checklist (Pillar A: Technical, Pillar B: Behavioral) with progress bar | 2FA (TOTP), EXIF stripping, zero engagement, lag posting |
| **Task 6: Reporting & Legal** | **Task 6**: Discuss reporting and legal considerations | 3-Tier Escalation Model + Automated Formal Police & ICC Complaint Letter Generator with print/export | cybercrime.gov.in (1930), ICC, Section 91 CrPC / 94 BNSS |
| **Task 7: Student Awareness** | **Task 7**: Develop an awareness strategy for students | **Dynamic Randomized 3-Question Quiz** (from a 12-question bank with instant refresh/retry) + 3-Phase Campus Awareness Blueprint + Pocket Emergency Card | Peer cyber ambassadors, induction modules, 24/7 hotline |

---

### How to Run Locally

You can open the web application in any modern web browser without needing any build tools, node modules, or external internet connections:

1. **Option A (Direct File Opening):**
   Double-click `index.html` in your file explorer or open:
   ```
   d:/Yuvaan/160124737164/CS Case Study/index.html
   ```

2. **Option B (Local Web Server):**
   Run the following command in PowerShell:
   ```powershell
   cd "d:\Yuvaan\160124737164\CS Case Study"
   python -m http.server 8080
   ```
   Then navigate to `http://localhost:8080` in your web browser.

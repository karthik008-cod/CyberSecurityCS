/**
 * Cyber Security Essentials - Case Study 5
 * Interactive Logic: Dynamic Quiz, Evidence Locker with Upload & Edit
 */

// Simulated forensically timestamped mock SVG screenshots
const mockSvg1 = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="420" height="260" viewBox="0 0 420 260">
  <rect width="420" height="260" fill="#0f172a" rx="8"/>
  <rect width="420" height="28" fill="#1e293b"/>
  <text x="14" y="19" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="bold">14:30</text>
  <text x="365" y="19" fill="#94a3b8" font-family="sans-serif" font-size="11">84% 🔋</text>
  <rect y="28" width="420" height="38" fill="#1e293b" opacity="0.8"/>
  <circle cx="28" cy="47" r="12" fill="#334155"/>
  <text x="48" y="52" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="bold">@shadow_stalker_99</text>
  <rect x="20" y="85" width="330" height="65" rx="10" fill="#334155"/>
  <text x="32" y="108" fill="#f8fafc" font-family="sans-serif" font-size="12">I saw you at North Campus library in your</text>
  <text x="32" y="126" fill="#f8fafc" font-family="sans-serif" font-size="12">blue hoodie at 2 PM. You cannot ignore me.</text>
  <text x="300" y="142" fill="#94a3b8" font-family="sans-serif" font-size="10">14:30</text>
  <rect x="20" y="195" width="380" height="32" rx="4" fill="#1e3a8a" opacity="0.3"/>
  <text x="30" y="216" fill="#60a5fa" font-family="monospace" font-size="11">EVIDENCE CAPTURE: INSTAGRAM DM [SHA-256 VERIFIED]</text>
</svg>
`);

const mockSvg2 = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="420" height="260" viewBox="0 0 420 260">
  <rect width="420" height="260" fill="#000000" rx="8"/>
  <rect width="420" height="28" fill="#18181b"/>
  <text x="14" y="19" fill="#a1a1aa" font-family="sans-serif" font-size="11" font-weight="bold">09:15</text>
  <text x="365" y="19" fill="#a1a1aa" font-family="sans-serif" font-size="11">92% 🔋</text>
  <rect y="28" width="420" height="38" fill="#18181b"/>
  <text x="20" y="53" fill="#ffffff" font-family="sans-serif" font-size="13" font-weight="bold">X &bull; Direct Message</text>
  <text x="20" y="86" fill="#71717a" font-family="sans-serif" font-size="11">From @anon_watcher_x</text>
  <rect x="20" y="98" width="330" height="65" rx="10" fill="#27272a"/>
  <text x="32" y="122" fill="#ffffff" font-family="sans-serif" font-size="12">Nice presentation in Room 304.</text>
  <text x="32" y="140" fill="#ffffff" font-family="sans-serif" font-size="12">Check your DMs before things escalate.</text>
  <text x="300" y="155" fill="#a1a1aa" font-family="sans-serif" font-size="10">09:15</text>
  <rect x="20" y="195" width="380" height="32" rx="4" fill="#1e3a8a" opacity="0.3"/>
  <text x="30" y="216" fill="#60a5fa" font-family="monospace" font-size="11">EVIDENCE CAPTURE: X DIRECT MESSAGE [VERIFIED]</text>
</svg>
`);

// Application State
const state = {
  evidence: [
    {
      id: "EV-01",
      time: "2026-10-21 14:30",
      platform: "Instagram",
      handle: "@shadow_stalker_99",
      text: "I saw you at North Campus library in your blue hoodie at 2 PM. You cannot ignore me.",
      screenshot: {
        name: "instagram_threat_dm_1430.png",
        data: mockSvg1
      }
    },
    {
      id: "EV-02",
      time: "2026-10-22 09:15",
      platform: "X (Twitter)",
      handle: "@anon_watcher_x",
      text: "Nice presentation in Room 304. Check your DMs before things escalate.",
      screenshot: {
        name: "x_mention_intimidation_0915.png",
        data: mockSvg2
      }
    }
  ]
};

// Current uploaded screenshot buffer for Add/Edit
let currentUploadedScreenshot = null;

// Dynamic Question Bank for Task 7 (12 Diverse Cyber Hygiene Questions)
const questionBank = [
  {
    id: "q_geotag",
    text: "When you visit a café, campus event, or party, when do you post about it?",
    options: [
      { text: "Live, with current location check-in and geotag", score: 0 },
      { text: "After leaving the venue (delayed / lag post)", score: 1 }
    ],
    advice: "Posting real-time locations allows stalkers to intercept your physical whereabouts."
  },
  {
    id: "q_profile_vis",
    text: "Who can view your tagged photos and friends/followers list on social media?",
    options: [
      { text: "Anyone (Public profile)", score: 0 },
      { text: "Approved close friends only (Private profile)", score: 1 }
    ],
    advice: "Public follower lists enable stalkers to map, profile, and harass your close peers."
  },
  {
    id: "q_dm_threat",
    text: "If an unknown account messages you repeatedly across platforms, what is your first action?",
    options: [
      { text: "Reply asking 'Who are you?' or argue back", score: 0 },
      { text: "Screenshot uncropped with time/battery, save profile URL, keep silent, and report", score: 1 }
    ],
    advice: "Never engage or negotiate; stalkers interpret any reply as positive reinforcement."
  },
  {
    id: "q_bio_details",
    text: "What personal details are currently visible in your public social media bio?",
    options: [
      { text: "College name, department, graduation year, or roll number", score: 0 },
      { text: "Pseudonym or general interests with no identifying academic details", score: 1 }
    ],
    advice: "Academic details allow adversaries to deduce your classroom and lab schedules."
  },
  {
    id: "q_mfa_type",
    text: "What type of Two-Factor Authentication (2FA) do you use on your email and accounts?",
    options: [
      { text: "Only SMS text messages or none", score: 0 },
      { text: "Authenticator App (Google Authenticator / Aegis / hardware key)", score: 1 }
    ],
    advice: "SMS OTPs are vulnerable to SIM-swap attacks; app-based TOTP keys are secure."
  },
  {
    id: "q_phish_contest",
    text: "You receive a DM saying 'Vote for me in this campus contest: bit.ly/camp-vote'. What do you do?",
    options: [
      { text: "Click it to support them right away", score: 0 },
      { text: "Avoid clicking and verify with the friend via a separate offline channel", score: 1 }
    ],
    advice: "Shortened links in DMs frequently lead to credential-harvesting phishing portals."
  },
  {
    id: "q_public_wifi",
    text: "When connecting to open, free public Wi-Fi at a café or station, how do you browse?",
    options: [
      { text: "Directly log into personal social accounts and student portals", score: 0 },
      { text: "Use cellular data or a trusted encrypted VPN for logins", score: 1 }
    ],
    advice: "Unencrypted public Wi-Fi allows packet interception and cookie hijacking."
  },
  {
    id: "q_lanyard_id",
    text: "A photo you took shows your college ID lanyard with student roll number on the desk. What do you do?",
    options: [
      { text: "Post it anyway; no one zooms into desk backgrounds", score: 0 },
      { text: "Crop, blur, or remove visible ID numbers before uploading", score: 1 }
    ],
    advice: "High-resolution photos allow stalkers to zoom into roll numbers and barcode identifiers."
  },
  {
    id: "q_pass_reuse",
    text: "How do you manage passwords across your college portal, social apps, and email?",
    options: [
      { text: "Use the same or slightly modified password for convenience", score: 0 },
      { text: "Unique, long passwords managed via a password manager", score: 1 }
    ],
    advice: "Password reuse allows a single breach to compromise your entire digital life."
  },
  {
    id: "q_exif_gps",
    text: "Does your smartphone camera embed exact GPS coordinates into the photos you take?",
    options: [
      { text: "Yes, 'Location tagging' is enabled in camera settings", score: 0 },
      { text: "Disabled in camera settings to prevent leaking GPS coordinates", score: 1 }
    ],
    advice: "EXIF metadata in uploaded photos exposes the exact latitude/longitude of your home."
  },
  {
    id: "q_friend_urgent",
    text: "A close friend's account suddenly sends you an urgent DM asking for money or login codes. What do you do?",
    options: [
      { text: "Send help immediately without second thought", score: 0 },
      { text: "Call or meet them in person to ensure their account wasn't hacked", score: 1 }
    ],
    advice: "Compromised accounts of friends are frequently weaponized by stalkers."
  },
  {
    id: "q_tag_approval",
    text: "What are your profile settings for photos where others tag you?",
    options: [
      { text: "Anyone can tag me and posts appear on my profile automatically", score: 0 },
      { text: "Tag review is enabled so I must manually approve tags", score: 1 }
    ],
    advice: "Tag review stops friends from inadvertently broadcasting your real-time presence."
  }
];

// Current active 3 random questions for Task 7
let activeQuizQuestions = [];

document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initTask1();
  initTask2();
  initTask3();
  initTask4();
  initTask5();
  initTask6();
  initTask7();

  // Initial renders
  renderTask1();
  renderTask2();
  renderTask3();
  renderTask4();
  renderTask5();
  loadRandomQuiz();
});

/* ---------------- Tabs Navigation ---------------- */
function initTabs() {
  const buttons = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");
      buttons.forEach(b => b.classList.toggle("active", b === btn));
      panels.forEach(p => p.classList.toggle("active", p.id === target));
      window.location.hash = target;
    });
  });

  if (window.location.hash) {
    const hash = window.location.hash.substring(1);
    const targetBtn = document.querySelector(`.tab-btn[data-tab="${hash}"]`);
    if (targetBtn) targetBtn.click();
  }
}

/* ---------------- Task 1: Offense Classifier ---------------- */
function initTask1() {
  document.querySelectorAll(".t1-symptom").forEach(cb => cb.addEventListener("change", renderTask1));
}

function renderTask1() {
  const checked = Array.from(document.querySelectorAll(".t1-symptom:checked")).map(cb => cb.value);
  const container = document.getElementById("t1-results");
  if (!container) return;

  if (checked.length === 0) {
    container.innerHTML = "<p style='color:var(--text-muted); font-size:13px;'>Check at least one behavior above.</p>";
    return;
  }

  const items = [];
  if (checked.includes("stalking")) {
    items.push({
      title: "Cyberstalking",
      law: "Section 354D IPC / Section 78 BNS",
      desc: "Persistent online surveillance and unwanted messages causing distress or fear.",
      pill: "pill-danger"
    });
  }
  if (checked.includes("threats")) {
    items.push({
      title: "Criminal Intimidation",
      law: "Section 506 IPC / Section 351 BNS",
      desc: "Direct messages threatening physical safety or reputation.",
      pill: "pill-danger"
    });
  }
  if (checked.includes("osint")) {
    items.push({
      title: "Privacy Violation & Doxxing",
      law: "Section 66E IT Act 2000",
      desc: "Weaponizing publicly posted schedules and photos for unauthorized tracking.",
      pill: "pill-warning"
    });
  }
  if (checked.includes("burners")) {
    items.push({
      title: "Identity Concealment",
      law: "Section 66D IT Act 2000",
      desc: "Using disposable burner personas to bypass platform blocks and deceive.",
      pill: "pill-info"
    });
  }

  container.innerHTML = items.map(item => `
    <div style="border-bottom:1px solid var(--border); padding-bottom:8px; margin-bottom:8px;">
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <strong>${item.title}</strong>
        <span class="pill ${item.pill}">${item.law}</span>
      </div>
      <p style="font-size:12.5px; color:var(--text-muted); margin-top:2px;">${item.desc}</p>
    </div>
  `).join("");
}

/* ---------------- Task 2: OSINT Exploitation ---------------- */
function initTask2() {
  document.querySelectorAll(".t2-post").forEach(cb => cb.addEventListener("change", renderTask2));
}

function renderTask2() {
  const checked = Array.from(document.querySelectorAll(".t2-post:checked")).map(cb => cb.value);
  const terminal = document.getElementById("t2-dossier");
  const fill = document.getElementById("t2-exposure-fill");
  const text = document.getElementById("t2-exposure-text");

  const pct = Math.round((checked.length / 5) * 100);
  fill.style.width = pct + "%";

  if (pct < 40) {
    text.className = "pill pill-success";
    text.innerText = pct + "% Low Exposure";
    fill.style.backgroundColor = "var(--success)";
  } else if (pct < 80) {
    text.className = "pill pill-warning";
    text.innerText = pct + "% Moderate Exposure";
    fill.style.backgroundColor = "var(--warning)";
  } else {
    text.className = "pill pill-danger";
    text.innerText = pct + "% Critical Stalker Intel";
    fill.style.backgroundColor = "var(--danger)";
  }

  if (checked.length === 0) {
    terminal.innerText = "[OSINT RECONNAISSANCE ENGINE]\nNo public posts selected.\nToggle posts on the left to see derived intelligence.";
    return;
  }

  let out = `[ADVERSARY RECONNAISSANCE INTEL]\n`;
  if (checked.includes("bio")) out += `[+] BIO LEAK: College name & engineering department identified.\n`;
  if (checked.includes("timetable")) out += `[+] SCHEDULE: Every Monday at 9:00 AM -> Room #304, Science Block.\n`;
  if (checked.includes("geotag")) out += `[+] LOCATION: Regular off-campus hangout -> Blue Bean Café.\n`;
  if (checked.includes("idcard")) out += `[+] CREDENTIALS: High-res zoom reveals student roll number & lab badge.\n`;
  if (checked.includes("friends")) out += `[+] SOCIAL GRAPH: 3 closest friends identified for secondary tracking.\n`;

  out += `\n>> ACTIONABLE INSIGHT: Attacker now knows exact physical routine & places to intercept.`;
  terminal.innerText = out;
}

/* ---------------- Task 3: Victim Risks ---------------- */
function initTask3() {
  document.querySelectorAll(".t3-input").forEach(sel => sel.addEventListener("change", renderTask3));
}

function renderTask3() {
  const p = parseInt(document.getElementById("t3-r-phys").value);
  const m = parseInt(document.getElementById("t3-r-psy").value);
  const d = parseInt(document.getElementById("t3-r-digi").value);
  const a = parseInt(document.getElementById("t3-r-acad").value);

  const score = Math.round((p * 0.35) + (m * 0.25) + (d * 0.20) + (a * 0.20));
  const pill = document.getElementById("t3-score-pill");
  const title = document.getElementById("t3-verdict-title");
  const body = document.getElementById("t3-verdict-body");

  pill.innerText = score + " / 100";
  if (score >= 70) {
    pill.className = "pill pill-danger";
    title.innerText = "Critical Threat (Immediate Escalation Required)";
    title.style.color = "var(--danger)";
    body.innerText = "Attacker exhibits real-time physical stalking knowledge. Immediate campus security escort and police FIR needed.";
  } else if (score >= 40) {
    pill.className = "pill pill-warning";
    title.innerText = "Elevated Risk (Active Intervention)";
    title.style.color = "var(--warning)";
    body.innerText = "Attacker is persistent across platforms. Lock down accounts, notify campus proctor, and preserve evidence.";
  } else {
    pill.className = "pill pill-success";
    title.innerText = "Low Risk (Precautionary)";
    title.style.color = "var(--success)";
    body.innerText = "Generic threats detected. Maintain zero response and enforce private account settings.";
  }
}

/* ---------------- Task 4: Evidence Locker with Upload & Edit ---------------- */
function initTask4() {
  // File input change listener
  const fileInput = document.getElementById("t4-in-file");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (evt) => {
          currentUploadedScreenshot = {
            name: file.name,
            data: evt.target.result
          };
          const previewDiv = document.getElementById("t4-file-preview");
          if (previewDiv) {
            previewDiv.innerHTML = `✔ Attached: <strong>${escapeHtml(file.name)}</strong> (${(file.size / 1024).toFixed(1)} KB)`;
          }
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Add / Update button
  const addBtn = document.getElementById("t4-add-btn");
  if (addBtn) {
    addBtn.addEventListener("click", handleSaveEvidence);
  }

  // Cancel edit button
  const cancelBtn = document.getElementById("t4-cancel-btn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", resetEvidenceForm);
  }

  // Export button
  const exportBtn = document.getElementById("t4-export-btn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportEvidenceDossier);
  }

  // Modal close handlers
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalOverlay = document.getElementById("screenshot-modal");
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeScreenshotModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeScreenshotModal();
    });
  }
}

function handleSaveEvidence() {
  const editId = document.getElementById("t4-edit-id").value.trim();
  const platform = document.getElementById("t4-in-platform").value.trim() || "Social Media";
  const handle = document.getElementById("t4-in-handle").value.trim() || "@unknown_account";
  const text = document.getElementById("t4-in-text").value.trim();

  if (!text) {
    alert("Please enter the message or threat content.");
    return;
  }

  if (editId) {
    // EDIT MODE: Update existing item
    const itemIndex = state.evidence.findIndex(item => item.id === editId);
    if (itemIndex !== -1) {
      state.evidence[itemIndex].platform = platform;
      state.evidence[itemIndex].handle = handle;
      state.evidence[itemIndex].text = text;

      // Update screenshot if a new one was uploaded
      if (currentUploadedScreenshot) {
        state.evidence[itemIndex].screenshot = currentUploadedScreenshot;
      }
    }
  } else {
    // ADD MODE: Insert new item
    const newId = "EV-0" + (state.evidence.length + 1);
    const nowTime = new Date().toISOString().replace("T", " ").substring(0, 16);

    // Fallback placeholder screenshot if none uploaded
    const screenshotObj = currentUploadedScreenshot || {
      name: `screenshot_${newId.toLowerCase()}.png`,
      data: generateCustomSvgScreenshot(newId, platform, handle, text, nowTime)
    };

    state.evidence.push({
      id: newId,
      time: nowTime,
      platform,
      handle,
      text,
      screenshot: screenshotObj
    });
  }

  resetEvidenceForm();
  renderTask4();
}

function resetEvidenceForm() {
  document.getElementById("t4-edit-id").value = "";
  document.getElementById("t4-in-platform").value = "";
  document.getElementById("t4-in-handle").value = "";
  document.getElementById("t4-in-text").value = "";
  document.getElementById("t4-in-file").value = "";
  document.getElementById("t4-file-preview").innerHTML = "";

  document.getElementById("t4-form-title").innerText = "Add New Incident Record:";
  document.getElementById("t4-mode-badge").style.display = "none";
  document.getElementById("t4-add-btn").innerText = "+ Save to Evidence Log";
  document.getElementById("t4-cancel-btn").style.display = "none";

  currentUploadedScreenshot = null;
}

window.editEvidence = function(id) {
  const item = state.evidence.find(ev => ev.id === id);
  if (!item) return;

  document.getElementById("t4-edit-id").value = item.id;
  document.getElementById("t4-in-platform").value = item.platform;
  document.getElementById("t4-in-handle").value = item.handle;
  document.getElementById("t4-in-text").value = item.text;

  // Show status of attached screenshot
  const previewDiv = document.getElementById("t4-file-preview");
  if (item.screenshot) {
    previewDiv.innerHTML = `Current file: <strong>${escapeHtml(item.screenshot.name || "screenshot.png")}</strong>. Select a new image below if you wish to replace it.`;
  } else {
    previewDiv.innerHTML = "";
  }

  document.getElementById("t4-form-title").innerText = `Edit Incident Record [${item.id}]:`;
  document.getElementById("t4-mode-badge").style.display = "inline-block";
  document.getElementById("t4-add-btn").innerText = "💾 Update Evidence Record";
  document.getElementById("t4-cancel-btn").style.display = "inline-flex";

  // Scroll to form
  document.getElementById("t4-form-container").scrollIntoView({ behavior: "smooth", block: "center" });
};

window.deleteEvidence = function(id) {
  if (confirm(`Are you sure you want to delete evidence record ${id}?`)) {
    const idx = state.evidence.findIndex(item => item.id === id);
    if (idx !== -1) {
      state.evidence.splice(idx, 1);
      // If currently editing this item, reset form
      if (document.getElementById("t4-edit-id").value === id) {
        resetEvidenceForm();
      }
      renderTask4();
    }
  }
};

window.viewScreenshot = function(id) {
  const item = state.evidence.find(ev => ev.id === id);
  if (!item || !item.screenshot) return;

  const modal = document.getElementById("screenshot-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalMeta = document.getElementById("modal-meta");

  modalTitle.innerText = `Evidence Screenshot: ${item.id} (${item.platform})`;
  modalImg.src = item.screenshot.data;
  modalMeta.innerHTML = `
    <strong>Target Handle:</strong> <code>${escapeHtml(item.handle)}</code> | <strong>Timestamp:</strong> ${item.time}<br>
    <strong>Message:</strong> "${escapeHtml(item.text)}"<br>
    <strong>File Reference:</strong> ${escapeHtml(item.screenshot.name || "screenshot.png")} &bull; <span style="color:var(--success);">Forensic integrity preserved (clock, status bar visible)</span>
  `;

  modal.style.display = "flex";
};

function closeScreenshotModal() {
  const modal = document.getElementById("screenshot-modal");
  if (modal) modal.style.display = "none";
}

function renderTask4() {
  const tbody = document.getElementById("t4-table-body");
  if (!tbody) return;

  if (state.evidence.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; color:var(--text-muted); padding:16px;">No incident evidence logged yet. Use the form below to record an incident.</td></tr>`;
    return;
  }

  tbody.innerHTML = state.evidence.map(ev => {
    const screenshotCell = ev.screenshot
      ? `
        <div class="thumb-preview-wrap">
          <img src="${ev.screenshot.data}" alt="Screenshot" class="thumb-img" onclick="viewScreenshot('${ev.id}')" title="Click to view full screenshot">
          <span class="thumb-link" onclick="viewScreenshot('${ev.id}')">View</span>
        </div>
      `
      : `<span style="color:var(--text-muted); font-size:11px;">None</span>`;

    return `
      <tr>
        <td><strong>${ev.id}</strong></td>
        <td>${ev.time}</td>
        <td><span class="pill pill-info">${ev.platform}</span></td>
        <td><code>${escapeHtml(ev.handle)}</code></td>
        <td>${escapeHtml(ev.text)}</td>
        <td>${screenshotCell}</td>
        <td>
          <div class="table-actions">
            <button class="btn btn-outline btn-sm" onclick="editEvidence('${ev.id}')" title="Edit this record">✏️ Edit</button>
            <button class="btn btn-outline btn-sm" onclick="deleteEvidence('${ev.id}')" title="Delete this record" style="color:var(--danger);">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function exportEvidenceDossier() {
  const wrap = document.getElementById("t4-dossier-wrap");
  const out = document.getElementById("t4-dossier-text");

  let doc = `=== CYBER STALKING EVIDENCE DOSSIER (CHAIN OF CUSTODY) ===\n`;
  doc += `Date: ${new Date().toLocaleDateString()} | Total Preserved Records: ${state.evidence.length}\n`;
  doc += `Standards: NIST SP 800-86 Guide to Integrating Forensic Techniques\n\n`;

  state.evidence.forEach(item => {
    doc += `[${item.id}] ${item.time} | Platform: ${item.platform}\n`;
    doc += `     Stalker Handle: ${item.handle}\n`;
    doc += `     Threat Text   : "${item.text}"\n`;
    doc += `     Screenshot    : ${item.screenshot ? "Attached (" + (item.screenshot.name || "image") + ")" : "None"}\n`;
    doc += `     Integrity     : Uncropped status bar & device timestamps retained\n`;
    doc += `-----------------------------------------------------------\n`;
  });

  doc += `Verification Statement: Original threads preserved offline without provocation or tampering.`;
  out.innerText = doc;
  wrap.style.display = "block";
}

function generateCustomSvgScreenshot(id, platform, handle, text, time) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="420" height="260" viewBox="0 0 420 260">
      <rect width="420" height="260" fill="#0f172a" rx="8"/>
      <rect width="420" height="28" fill="#1e293b"/>
      <text x="14" y="19" fill="#94a3b8" font-family="sans-serif" font-size="11" font-weight="bold">${time.substring(11)}</text>
      <text x="365" y="19" fill="#94a3b8" font-family="sans-serif" font-size="11">90% 🔋</text>
      <rect y="28" width="420" height="38" fill="#1e293b" opacity="0.8"/>
      <circle cx="28" cy="47" r="12" fill="#3b82f6"/>
      <text x="48" y="52" fill="#f8fafc" font-family="sans-serif" font-size="13" font-weight="bold">${escapeXml(handle)}</text>
      <rect x="20" y="85" width="350" height="75" rx="10" fill="#334155"/>
      <text x="32" y="112" fill="#f8fafc" font-family="sans-serif" font-size="12">${escapeXml(text.substring(0, 48))}</text>
      <text x="32" y="130" fill="#f8fafc" font-family="sans-serif" font-size="12">${escapeXml(text.substring(48, 96))}</text>
      <text x="320" y="152" fill="#94a3b8" font-family="sans-serif" font-size="10">${time.substring(11)}</text>
      <rect x="20" y="200" width="380" height="30" rx="4" fill="#1e3a8a" opacity="0.3"/>
      <text x="30" y="220" fill="#60a5fa" font-family="monospace" font-size="11">EVIDENCE: ${id} &bull; ${escapeXml(platform).toUpperCase()} &bull; UNALTERED</text>
    </svg>
  `);
}

function escapeXml(str) {
  if (!str) return "";
  return str.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

/* ---------------- Task 5: Countermeasures ---------------- */
function initTask5() {
  document.querySelectorAll(".t5-cb").forEach(cb => cb.addEventListener("change", renderTask5));
}

function renderTask5() {
  const all = document.querySelectorAll(".t5-cb");
  const checked = document.querySelectorAll(".t5-cb:checked");
  const pct = Math.round((checked.length / all.length) * 100);

  const fill = document.getElementById("t5-prog-fill");
  const text = document.getElementById("t5-prog-text");

  fill.style.width = pct + "%";
  text.innerText = `${pct}% Protected (${checked.length} of ${all.length} actions)`;

  if (pct === 100) fill.style.backgroundColor = "var(--success)";
  else fill.style.backgroundColor = "var(--primary)";
}

/* ---------------- Task 6: Reporting & Legal ---------------- */
function initTask6() {
  const genBtn = document.getElementById("t6-gen-btn");
  if (genBtn) {
    genBtn.addEventListener("click", () => {
      const name = document.getElementById("t6-name").value.trim() || "Student";
      const inst = document.getElementById("t6-inst").value.trim() || "University";
      const wrap = document.getElementById("t6-wrap");
      const letter = document.getElementById("t6-letter");

      let txt = `FORMAL COMPLAINT: CYBERSTALKING & ONLINE HARASSMENT\n\n`;
      txt += `To: The Station House Officer (Cyber Crime Police Station) / Campus ICC\n`;
      txt += `Date: ${new Date().toLocaleDateString('en-GB')}\n\n`;
      txt += `Complainant: ${name}, ${inst}\n\n`;
      txt += `Sir/Madam,\n`;
      txt += `I am lodging a formal complaint against an unknown attacker sending repeated threatening messages across social media. The attacker has gathered information from my public posts (OSINT) to track my schedule and intimidate me.\n\n`;
      txt += `EVIDENCE ATTACHED (${state.evidence.length} Preserved Records):\n`;
      state.evidence.forEach(e => {
        txt += `- [${e.platform}] ${e.handle}: "${e.text}" (${e.time})\n`;
      });
      txt += `\nLEGAL SECTIONS APPLICABLE:\n`;
      txt += `- IPC Sec 354D / BNS Sec 78 (Electronic Stalking)\n`;
      txt += `- IPC Sec 506 / BNS Sec 351 (Criminal Intimidation)\n`;
      txt += `- IT Act 2000 Sec 66E (Violation of Privacy)\n\n`;
      txt += `PRAYER:\nKindly register this complaint, trace IP logs through intermediary platforms, and take necessary protective action.\n\n`;
      txt += `Yours faithfully,\n${name}`;

      letter.innerText = txt;
      wrap.style.display = "block";
    });
  }
}

/* ---------------- Task 7: Dynamic Student Hygiene Quiz ---------------- */
function initTask7() {
  const refreshBtn = document.getElementById("t7-refresh-btn");
  if (refreshBtn) {
    refreshBtn.addEventListener("click", loadRandomQuiz);
  }

  const retryBtn = document.getElementById("t7-retry-btn");
  if (retryBtn) {
    retryBtn.addEventListener("click", loadRandomQuiz);
  }

  const submitBtn = document.getElementById("t7-quiz-btn");
  if (submitBtn) {
    submitBtn.addEventListener("click", evaluateQuiz);
  }
}

function loadRandomQuiz() {
  const container = document.getElementById("t7-quiz-container");
  const resDiv = document.getElementById("t7-result");
  const retryBtn = document.getElementById("t7-retry-btn");

  if (!container) return;
  resDiv.innerHTML = "";
  if (retryBtn) retryBtn.style.display = "none";

  // Pick 3 random questions from questionBank
  const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
  activeQuizQuestions = shuffled.slice(0, 3);

  container.innerHTML = activeQuizQuestions.map((q, idx) => `
    <div style="margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid var(--border);">
      <label style="font-weight:600; margin-bottom:4px;">${idx + 1}. ${escapeHtml(q.text)}</label>
      ${q.options.map((opt, optIdx) => `
        <label style="font-weight:normal; display:flex; align-items:flex-start; gap:6px; font-size:13px; margin:4px 0; cursor:pointer;">
          <input type="radio" name="dq_${q.id}" value="${opt.score}" style="margin-top:2px;">
          <span>${escapeHtml(opt.text)}</span>
        </label>
      `).join("")}
    </div>
  `).join("");
}

function evaluateQuiz() {
  const res = document.getElementById("t7-result");
  const retryBtn = document.getElementById("t7-retry-btn");
  if (!activeQuizQuestions || activeQuizQuestions.length < 3) return;

  let totalScore = 0;
  let allAnswered = true;
  let adviceList = [];

  activeQuizQuestions.forEach(q => {
    const selected = document.querySelector(`input[name="dq_${q.id}"]:checked`);
    if (!selected) {
      allAnswered = false;
    } else {
      const val = parseInt(selected.value, 10);
      totalScore += val;
      if (val === 0) {
        adviceList.push(q.advice);
      }
    }
  });

  if (!allAnswered) {
    alert("Please answer all 3 questions before checking your score.");
    return;
  }

  let calloutClass = "callout-danger";
  let grade = "High Exposure Risk";

  if (totalScore === 3) {
    calloutClass = "callout-success";
    grade = "Excellent Digital Hygiene";
  } else if (totalScore >= 1) {
    calloutClass = "callout-warning";
    grade = "Moderate Exposure Risk";
  }

  let adviceHtml = "";
  if (adviceList.length > 0) {
    adviceHtml = `<ul style="margin-top:6px; padding-left:16px; font-size:12.5px;">${adviceList.map(a => `<li>${escapeHtml(a)}</li>`).join("")}</ul>`;
  } else {
    adviceHtml = `<p style="margin-top:4px; font-size:12.5px;">Great job! All responses reflect strong privacy and counter-surveillance protocols.</p>`;
  }

  res.innerHTML = `
    <div class="callout ${calloutClass}">
      <strong>Score: ${totalScore} / 3 &bull; ${grade}</strong>
      ${adviceHtml}
    </div>
  `;

  if (retryBtn) retryBtn.style.display = "inline-flex";
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

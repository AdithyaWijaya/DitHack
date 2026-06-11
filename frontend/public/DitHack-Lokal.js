// DitHack!
// Developer: ADITHYA

(function () {
  "use strict";

  // =====================================================
  // LICENSE SYSTEM
  // =====================================================

  const API_BASE_URL = "https://api-dithack.up.railway.app";
  const DEVICE_ID_KEY = "dithack_device_id";

  function getDeviceId() {
    let deviceId = localStorage.getItem(DEVICE_ID_KEY);
    if (deviceId) return deviceId;

    if (window.crypto && crypto.randomUUID) {
      deviceId = crypto.randomUUID();
    } else {
      deviceId =
        "dh-" +
        Date.now().toString(36) +
        "-" +
        Math.random().toString(36).slice(2, 12);
    }

    localStorage.setItem(DEVICE_ID_KEY, deviceId);
    return deviceId;
  }

  function getAuthHeaders() {
    return {
      Authorization: "Bearer " + localStorage.getItem("auth"),
      "x-device-id": getDeviceId(),
    };
  }

  function ensureFontAwesome() {
    if (document.getElementById("dithack-fontawesome")) return;

    const link = document.createElement("link");
    link.id = "dithack-fontawesome";
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css";
    document.head.appendChild(link);
  }

  async function readErrorMessage(response) {
    try {
      const data = await response.json();
      return data.detail || data.message || "Server error, hubungi admin!";
    } catch (error) {
      return "Server error, hubungi admin!";
    }
  }

  async function validateLicense(licenseCode) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/check/${encodeURIComponent(licenseCode)}`,
        {
          headers: {
            "x-device-id": getDeviceId(),
          },
        },
      );

      if (response.status === 404) {
        return { valid: false, message: "Token tidak valid!" };
      }

      if (response.status === 409) {
        return {
          valid: false,
          message: "Token sudah digunakan di perangkat lain",
        };
      }

      if (!response.ok) {
        return { valid: false, message: await readErrorMessage(response) };
      }

      const data = await response.json();

      const expiryDate = new Date(data.expired);
      const now = new Date();

      if (!data.active) {
        return { valid: false, message: "Token tidak aktif!" };
      }

      if (expiryDate < now) {
        return {
          valid: false,
          message: "Token sudah expired pada " + data.expired,
        };
      }

      return {
        valid: true,
        message: "Selamat datang " + data.owner + "!",
        owner: data.owner,
      };
    } catch (error) {
      console.error("[License] Validation error:", error);
      return {
        valid: false,
        message: "Error validasi Token. Pastikan terhubung internet!",
      };
    }
  }

  function createLicenseModal() {
    const existingModal = document.getElementById("dithack-license-modal");
    if (existingModal) existingModal.remove();
    ensureFontAwesome();

    const isMobile = window.innerWidth <= 480;

    const padding = isMobile ? "16px" : "20px";
    const titleSize = isMobile ? "18px" : "20px";
    const fontSize = isMobile ? "12px" : "13px";
    const inputPadding = isMobile ? "8px 10px" : "10px 12px";
    const buttonPadding = isMobile ? "8px" : "10px";
    const marginBottom = isMobile ? "8px" : "10px";
    const messageMarginTop = isMobile ? "4px" : "6px";
    const infoMarginTop = isMobile ? "6px" : "8px";
    const titleMarginBottom = isMobile ? "12px" : "14px";

    const overlay = document.createElement("div");
    overlay.id = "dithack-license-modal";
    overlay.style.cssText = `
            position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; bottom: 0 !important;
            background: rgba(0, 0, 0, 0.85) !important; display: flex !important; align-items: center !important;
            justify-content: center !important; z-index: 9999999 !important; font-family: 'Segoe UI', Inter, system-ui, sans-serif !important;
            padding: 10px !important;
        `;

    const modal = document.createElement("div");
    modal.style.cssText = `
            background: #ffffff !important;
            padding: ${padding} !important; border-radius: 10px !important; text-align: center !important;
            max-width: 350px !important; width: 90% !important; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
            border: 1px solid #ddd !important; height: auto !important; min-height: auto !important;
        `;

    const title = document.createElement("h2");
    title.textContent = "DitHack!";
    title.style.cssText = `color: #333 !important; margin: 0 0 ${titleMarginBottom} 0 !important; font-size: ${titleSize} !important; font-weight: bold !important;`;

    const input = document.createElement("input");
    input.type = "text";
    input.id = "dithack-license-input";
    input.placeholder = "Token Anda";
    input.style.cssText = `
            width: 100% !important; padding: ${inputPadding} !important; border-radius: 6px !important;
            border: 1px solid #000 !important; background: #fff !important;
            color: #333 !important; font-size: ${fontSize} !important; outline: none !important;
            box-sizing: border-box !important; margin-bottom: ${marginBottom} !important; text-align: center !important;
        `;

    const message = document.createElement("div");
    message.id = "dithack-license-message";
    message.style.cssText = `color: #d00 !important; font-size: ${fontSize} !important; margin-top: ${messageMarginTop} !important; min-height: 20px !important;`;

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Login";
    submitBtn.id = "dithack-license-submit";
    submitBtn.style.cssText = `
            width: 100% !important; padding: ${buttonPadding} !important; border-radius: 6px !important;
            border: none !important; background: #0066ff !important;
            color: white !important; font-size: ${fontSize} !important; font-weight: bold !important;
            cursor: pointer !important;
        `;

    const infoText = document.createElement("p");
    infoText.innerHTML =
      'Belum punya token? <a href="https://dithack.vercel.app" target="_blank" style="color: #4b4bfF; text-decoration: none;">Beli di sini</a>';
    infoText.style.cssText = `color: #666 !important; font-size: ${isMobile ? "11px" : "12px"} !important; margin-top: ${infoMarginTop} !important;`;

    modal.appendChild(title);
    modal.appendChild(input);
    modal.appendChild(submitBtn);
    modal.appendChild(message);
    modal.appendChild(infoText);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    submitBtn.onclick = async () => {
      const code = input.value.trim();
      if (!code) {
        message.textContent = "Masukkan Token terlebih dahulu!";
        message.style.color = "#ff6b6b";
        return;
      }

      submitBtn.textContent = "Memvalidasi...";
      submitBtn.disabled = true;
      submitBtn.style.opacity = "0.7";

      const result = await validateLicense(code);

      if (result.valid) {
        message.textContent = result.message;
        message.style.color = "#00aa00";
        submitBtn.textContent = "Aktif!";
        submitBtn.style.background = "#008800";

        localStorage.setItem("auth", code);

        setTimeout(() => {
          overlay.remove();
          initMainApp();
        }, 1500);
      } else {
        message.textContent = result.message;
        message.style.color = "#ff6b6b";
        submitBtn.textContent = "Login";
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1";
      }
    };

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        submitBtn.click();
      }
    });

    setTimeout(() => input.focus(), 100);

    return overlay;
  }

  function checkLicense() {
    createLicenseModal();
  }

  // =====================================================
  // PART 1: DETECTION BYPASS
  // =====================================================

  const originalAddEventListener = window.addEventListener;
  const originalDocumentAddEventListener = document.addEventListener;
  const originalEventTargetAddEventListener = EventTarget
    ? EventTarget.prototype.addEventListener
    : null;

  const blockedEvents = [
    "blur",
    "focus",
    "visibilitychange",
    "focusin",
    "focusout",
    "resize",
    "fullscreenchange",
    "fullscreenerror",
    "contextmenu",
  ];

  Object.defineProperty(document, "hidden", { get: function () { return false; }, configurable: false });
  Object.defineProperty(document, "visibilityState", { get: function () { return "visible"; }, configurable: false });
  Object.defineProperty(document, "onvisibilitychange", { get: function () { return null; }, set: function () {}, configurable: false });
  Object.defineProperty(window, "onfocus", { get: function () { return function () {}; }, set: function () {}, configurable: false });
  Object.defineProperty(window, "onblur", { get: function () { return function () {}; }, set: function () {}, configurable: false });
  Object.defineProperty(window, "onresize", { get: function () { return function () {}; }, set: function () {}, configurable: false });

  let mockWidth = window.innerWidth;
  let mockHeight = window.innerHeight;

  Object.defineProperty(window, "innerWidth", { get: function () { return mockWidth; }, configurable: true });
  Object.defineProperty(window, "innerHeight", { get: function () { return mockHeight; }, configurable: true });
  Object.defineProperty(window, "outerWidth", { get: function () { return mockWidth; }, configurable: true });
  Object.defineProperty(window, "outerHeight", { get: function () { return mockHeight; }, configurable: true });
  Object.defineProperty(screen, "width", { get: function () { return 1920; }, configurable: true });
  Object.defineProperty(screen, "height", { get: function () { return 1080; }, configurable: true });
  Object.defineProperty(screen, "availWidth", { get: function () { return 1920; }, configurable: true });
  Object.defineProperty(screen, "availHeight", { get: function () { return 1040; }, configurable: true });

  window.setMockDimensions = function (width, height) {
    mockWidth = width;
    mockHeight = height;
    console.log("[Bypass] Mock dimensions set to: " + width + "x" + height);
  };

  Object.defineProperty(document, "fullscreenElement", { get: function () { return document.createElement("div"); }, configurable: false });
  Object.defineProperty(document, "fullscreenEnabled", { get: function () { return false; }, configurable: false });
  Object.defineProperty(document, "onfullscreenchange", { get: function () { return function () {}; }, set: function () {}, configurable: false });
  Object.defineProperty(document, "onfullscreenerror", { get: function () { return function () {}; }, set: function () {}, configurable: false });

  Element.prototype.requestFullscreen = function () { return Promise.reject(new Error("Fullscreen request blocked")); };
  document.exitFullscreen = function () { return Promise.resolve(); };
  if (Element.prototype.webkitRequestFullscreen) Element.prototype.webkitRequestFullscreen = function () { return Promise.reject(new Error("Fullscreen request blocked")); };
  if (document.webkitExitFullscreen) document.webkitExitFullscreen = function () { return Promise.resolve(); };
  if (Element.prototype.mozRequestFullScreen) Element.prototype.mozRequestFullScreen = function () { return Promise.reject(new Error("Fullscreen request blocked")); };
  if (document.mozExitFullScreen) document.mozExitFullScreen = function () { return Promise.resolve(); };
  if (Element.prototype.msRequestFullscreen) Element.prototype.msRequestFullscreen = function () { return Promise.reject(new Error("Fullscreen request blocked")); };
  if (document.msExitFullscreen) document.msExitFullscreen = function () { return Promise.resolve(); };

  Object.defineProperty(document, "oncontextmenu", { get: function () { return function () {}; }, set: function () {}, configurable: false });
  Object.defineProperty(window, "oncontextmenu", { get: function () { return function () {}; }, set: function () {}, configurable: false });

  window.addEventListener = function (type, listener, options) {
    if (blockedEvents.indexOf(type) !== -1) return;
    return originalAddEventListener.call(this, type, listener, options);
  };

  document.addEventListener = function (type, listener, options) {
    if (blockedEvents.indexOf(type) !== -1) return;
    return originalDocumentAddEventListener.call(this, type, listener, options);
  };

  if (EventTarget && EventTarget.prototype && originalEventTargetAddEventListener) {
    EventTarget.prototype.addEventListener = function (type, listener, options) {
      if (blockedEvents.indexOf(type) !== -1) return;
      return originalEventTargetAddEventListener.call(this, type, listener, options);
    };
  }

  console.log("[Bypass] Detection bypass loaded successfully!");

  // =====================================================
  // PART 2: MAIN GUI SCRIPT
  // =====================================================

  const existingFrame = document.getElementById("quizizz-hack-frame");
  if (existingFrame) existingFrame.remove();

  const existingBtn = document.getElementById("quizizz-hack-toggle");
  if (existingBtn) existingBtn.remove();

  let cachedData = null;
  let isMinimized = false;
  let currentGameType = "quizizz";

  function createFrame() {
    ensureFontAwesome();

    const container = document.createElement("div");
    container.id = "quizizz-hack-frame";

    const isMobile = window.innerWidth <= 768;

    Object.assign(container.style, {
      position: "fixed",
      top: isMobile ? "10px" : "50px",
      right: isMobile ? "10px" : "50px",
      left: isMobile ? "10px" : "auto",
      width: isMobile ? "calc(100% - 20px)" : "360px",
      maxHeight: isMobile ? "70vh" : "500px",
      height: isMobile ? "auto" : "500px",
      backgroundColor: "#fff",
      borderRadius: isMobile ? "8px" : "12px",
      border: "2px solid #fbbf24",
      boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
      zIndex: "999999",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      fontFamily: "Inter, system-ui, sans-serif",
    });

    const header = document.createElement("div");
    Object.assign(header.style, {
      height: isMobile ? "40px" : "44px",
      minHeight: isMobile ? "40px" : "44px",
      backgroundColor: "#4b4bfF",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: isMobile ? "0 8px" : "0 10px",
      cursor: "move",
      userSelect: "none",
      flexShrink: "0",
    });

    const title = document.createElement("span");
    title.textContent = "DitHack!";
    title.style.cssText = `font-size: ${isMobile ? "14px" : "16px"}; font-weight: bold;`;
    header.appendChild(title);

    const logoutBtn = document.createElement("button");
    logoutBtn.type = "button";
    logoutBtn.title = "Logout";
    logoutBtn.innerHTML =
      '<i class="fa-solid fa-arrow-right-from-bracket" aria-hidden="true"></i>';
    logoutBtn.style.cssText = `
      margin-left: 8px; width: ${isMobile ? "30px" : "28px"}; height: ${isMobile ? "30px" : "28px"};
      display: inline-flex; align-items: center; justify-content: center;
      border: none; border-radius: 6px; background: rgba(255,255,255,0.2);
      color: white; cursor: pointer; font-size: ${isMobile ? "13px" : "12px"};
      flex-shrink: 0;
    `;
    header.appendChild(logoutBtn);

    const controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.gap = "8px";
    controls.style.marginLeft = "auto";

    const minimizeBtn = document.createElement("span");
    minimizeBtn.textContent = "—";
    minimizeBtn.style.cssText = `cursor: pointer; font-weight: bold; font-size: ${isMobile ? "18px" : "14px"}; padding: 4px 8px;`;

    const hideBtn = document.createElement("span");
    hideBtn.textContent = "✕";
    hideBtn.style.cssText = `cursor: pointer; padding: 6px 10px; background: rgba(255,255,255,0.2); border-radius: 6px; font-size: ${isMobile ? "14px" : "12px"};`;

    controls.appendChild(minimizeBtn);
    controls.appendChild(hideBtn);
    header.appendChild(controls);

    const content = document.createElement("div");
    content.id = "quizizz-content";
    Object.assign(content.style, {
      flex: "1",
      overflowY: "auto",
      padding: isMobile ? "8px" : "12px",
      backgroundColor: "#f9fafb",
      minHeight: "200px",
    });

    const searchWrap = document.createElement("div");
    Object.assign(searchWrap.style, {
      position: "sticky",
      top: "0",
      display: "flex",
      alignItems: "stretch",
      width: "100%",
      backgroundColor: "#f9fafb",
      marginBottom: isMobile ? "8px" : "12px",
      gap: "0px",
      height: "40px",
    });

    const searchBar = document.createElement("input");
    searchBar.type = "text";
    searchBar.placeholder = "Cari soal...";
    searchBar.style.cssText = `
            flex: 1 !important; padding: 8px 12px !important; border-radius: 8px 0 0 8px !important;
            border: 1px solid #ccc !important; border-right: none !important; font-size: 14px !important;
            height: 40px !important; line-height: 24px !important; box-sizing: border-box !important;
            outline: none !important; margin: 0 !important;
        `;

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "✕";
    clearBtn.style.cssText = `
            padding: 0 12px !important; background: #e5e7eb !important; border: 1px solid #ccc !important;
            border-left: none !important; border-radius: 0 8px 8px 0 !important; cursor: pointer !important;
            width: 40px !important; height: 40px !important; font-size: 14px !important; line-height: 40px !important;
            box-sizing: border-box !important; margin: 0 !important; display: flex !important;
            align-items: center !important; justify-content: center !important;
        `;

    searchWrap.appendChild(searchBar);
    searchWrap.appendChild(clearBtn);

    const resultsWrap = document.createElement("div");
    resultsWrap.id = "quizizz-results";
    resultsWrap.style.cssText = `display: flex; flex-direction: column; gap: ${isMobile ? "6px" : "8px"};`;

    content.appendChild(searchWrap);
    content.appendChild(resultsWrap);

    container.appendChild(header);
    container.appendChild(content);

    const resizeHandle = document.createElement("div");
    Object.assign(resizeHandle.style, {
      position: "absolute",
      bottom: "0",
      right: "0",
      width: isMobile ? "20px" : "15px",
      height: isMobile ? "20px" : "15px",
      cursor: "se-resize",
      background: "linear-gradient(135deg, transparent 50%, #4b4bfF 50%)",
      borderBottomRightRadius: isMobile ? "8px" : "12px",
    });

    container.appendChild(resizeHandle);
    document.body.appendChild(container);

    return {
      container,
      header,
      content,
      searchBar,
      clearBtn,
      resultsWrap,
      logoutBtn,
      minimizeBtn,
      hideBtn,
      resizeHandle,
    };
  }

  function createToggleButton() {
    const btn = document.createElement("button");
    btn.id = "quizizz-hack-toggle";

    // buat image icon
    const img = document.createElement("img");
    img.src = `${API_BASE_URL}/icon`;
    img.alt = "DitHack";
    img.style.cssText = `
        width: 42px !important;
        height: 42px !important;
        object-fit: contain !important;
        pointer-events: none !important;
    `;

    btn.appendChild(img);

    btn.style.cssText = `
        position: fixed !important;
        bottom: 20px !important;
        left: 20px !important;
        padding: 0 !important;
        background: transparent !important;
        border: none !important;
        border-radius: 50% !important;
        cursor: pointer !important;
        z-index: 999998 !important;
        opacity: 0 !important;
        transition: opacity 0.3s ease, transform 0.2s ease !important;
        width: 50px !important;
        height: 50px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        box-sizing: border-box !important;
        box-shadow: none !important;
    `;

    btn.addEventListener("touchstart", function () {
        btn.style.transform = "scale(0.95)";
    });

    btn.addEventListener("touchend", function () {
        btn.style.transform = "scale(1)";
    });

    btn.onclick = function () {
        const frame = document.getElementById("quizizz-hack-frame");
        if (frame) {
            frame.style.display = "flex";
            btn.style.opacity = "0";
        }
    };

    document.body.appendChild(btn);
    return btn;
}

  // =====================================================
  // FETCH FUNCTIONS
  // =====================================================

  function showLogoutConfirm(onConfirm) {
    const existingModal = document.getElementById("dithack-logout-modal");
    if (existingModal) existingModal.remove();

    const overlay = document.createElement("div");
    overlay.id = "dithack-logout-modal";
    overlay.style.cssText = `
      position: fixed !important; inset: 0 !important; z-index: 10000000 !important;
      background: rgba(0,0,0,0.6) !important; display: flex !important;
      align-items: center !important; justify-content: center !important;
      font-family: Inter, system-ui, sans-serif !important; padding: 14px !important;
    `;

    const modal = document.createElement("div");
    modal.style.cssText = `
      width: min(320px, 92vw) !important; background: #fff !important; color: #111827 !important;
      border-radius: 10px !important; border: 1px solid #e5e7eb !important;
      box-shadow: 0 12px 30px rgba(0,0,0,0.25) !important; padding: 18px !important;
      text-align: center !important;
    `;

    const title = document.createElement("div");
    title.textContent = "Logout DitHack?";
    title.style.cssText =
      "font-size:16px !important; font-weight:700 !important; margin-bottom:8px !important;";

    const text = document.createElement("div");
    text.textContent =
      "Token akan dilepas dari perangkat ini dan perlu login ulang untuk memakai DitHack.";
    text.style.cssText =
      "font-size:13px !important; line-height:1.45 !important; color:#4b5563 !important; margin-bottom:16px !important;";

    const actions = document.createElement("div");
    actions.style.cssText =
      "display:flex !important; gap:10px !important; justify-content:center !important;";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Batal";
    cancelBtn.style.cssText =
      "flex:1 !important; padding:10px !important; border:1px solid #d1d5db !important; border-radius:7px !important; background:#fff !important; color:#111827 !important; cursor:pointer !important; font-weight:600 !important;";

    const confirmBtn = document.createElement("button");
    confirmBtn.textContent = "Logout";
    confirmBtn.style.cssText =
      "flex:1 !important; padding:10px !important; border:none !important; border-radius:7px !important; background:#ef4444 !important; color:#fff !important; cursor:pointer !important; font-weight:700 !important;";

    cancelBtn.onclick = () => overlay.remove();
    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.remove();
    };
    confirmBtn.onclick = async () => {
      confirmBtn.disabled = true;
      confirmBtn.textContent = "Logout...";
      await onConfirm();
      overlay.remove();
    };

    actions.appendChild(cancelBtn);
    actions.appendChild(confirmBtn);
    modal.appendChild(title);
    modal.appendChild(text);
    modal.appendChild(actions);
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
  }

  async function logoutClient() {
    const token = localStorage.getItem("auth");
    if (token) {
      try {
        await fetch(`${API_BASE_URL}/logout`, {
          method: "POST",
          headers: getAuthHeaders(),
        });
      } catch (error) {
        console.error("[License] Logout error:", error);
      }
    }

    localStorage.removeItem("auth");
    document.getElementById("quizizz-hack-frame")?.remove();
    document.getElementById("quizizz-hack-toggle")?.remove();
    createLicenseModal();
  }

  async function fetchAnswers(pin) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/quizizz?pin=${encodeURIComponent(pin)}`,
        {
          headers: getAuthHeaders(),
        },
      );

      if (response.status === 409) {
        return { error: "Token sudah digunakan di perangkat lain" };
      }

      if (!response.ok) return null;

      const data = await response.json();
      if (!data) return null;

      return data;
    } catch (error) {
      console.error("Error fetching answers:", error);
      return null;
    }
  }

  async function fetchKahootAnswers(link) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/kahoot?link=${encodeURIComponent(link)}`,
        {
          headers: getAuthHeaders(),
        },
      );

      if (response.status === 409) {
        return { error: "Token sudah digunakan di perangkat lain" };
      }

      if (!response.ok) return null;

      const data = await response.json();
      if (!data || (data.answers && data.answers.length === 0)) return null;

      return data;
    } catch (error) {
      console.error("Error fetching Kahoot answers:", error);
      return null;
    }
  }

  // =====================================================
  // DATA NORMALIZER
  // Mendukung format JSON baru DAN format lama sekaligus
  // =====================================================

  /**
   * Normalisasi semua format respons API menjadi array standar:
   * [{ question: "teks", questionMedia: "url|null", answers: [{text, mediaUrl}], type, isBlank }]
   */
  function normalizeAnswers(raw) {
    if (!raw) return null;

    // ── FORMAT BARU ──────────────────────────────────────────────────
    // { success, answers: [{ question, options, answer, media, type }] }
    if (raw.success !== undefined && Array.isArray(raw.answers)) {
      return raw.answers.map((item) => {
        // Soal teks (strip HTML sederhana untuk search, tapi tampilkan raw)
        const questionText = item.question || "";

        // Gambar soal: ambil dari field `media` (array) di root item
        let questionMedia = null;
        if (Array.isArray(item.media) && item.media.length > 0) {
          const m = item.media.find((x) => x && x.url);
          if (m) questionMedia = m.url;
        } else if (item.media && item.media.url) {
          questionMedia = item.media.url;
        }

        // Jawaban yang benar: item.answer adalah array of index ke item.options
        const correctIndices = Array.isArray(item.answer) ? item.answer : [item.answer];
        const isBlank = item.type === "BLANK" || item.ignoreAnswers;

        let correctAnswers = [];

        if (isBlank) {
          // BLANK: tampilkan semua opsi (biasanya 1 opsi = jawaban isian)
          correctAnswers = (item.options || []).map((opt) => ({
            text: opt.text || "",
            mediaUrl: _extractOptMedia(opt),
          }));
        } else {
          // MCQ / MSQ: filter hanya opsi yang indexnya ada di answer[]
          correctAnswers = correctIndices
            .map((idx) => {
              const opt = item.options && item.options[idx];
              if (!opt) return null;
              return {
                text: opt.text || "",
                mediaUrl: _extractOptMedia(opt),
              };
            })
            .filter(Boolean);
        }

        return {
          question: questionText,
          questionMedia,
          answers: correctAnswers,
          type: item.type || "MCQ",
          layout: item.layout || null,
          multiAnswer: correctIndices.length > 1,
          isBlank,
        };
      });
    }

    // ── FORMAT LAMA ──────────────────────────────────────────────────
    // { data: { answers: [{ question:{text,media}, answers:[{text,media}] }] } }
    // atau { data: [...] } atau { answers: [...] }
    let legacyArr = null;
    if (raw.data && raw.data.answers) legacyArr = raw.data.answers;
    else if (Array.isArray(raw.data)) legacyArr = raw.data;
    else if (Array.isArray(raw.answers)) legacyArr = raw.answers;
    else if (Array.isArray(raw)) legacyArr = raw;

    if (legacyArr) {
      return legacyArr.map((item) => {
        const questionText =
          (item.question &&
            (item.question.text ||
              (item.question.structure && item.question.structure.text))) ||
          "";

        let questionMedia = null;
        if (item.question && item.question.image) {
          questionMedia = item.question.image;
        } else if (item.question && item.question.media) {
          const m = Array.isArray(item.question.media)
            ? item.question.media.find((x) => x && x.url)
            : item.question.media;
          if (m && m.url) questionMedia = m.url;
        } else if (item.question && item.question.structure && item.question.structure.media) {
          const m = item.question.structure.media;
          if (m && m.url) questionMedia = m.url;
        }

        const correctAnswers = (item.answers || []).map((a) => ({
          text: a.text || "",
          mediaUrl: _extractOptMedia(a),
        }));

        return {
          question: questionText,
          questionMedia,
          answers: correctAnswers,
          type: "MCQ",
          isBlank: false,
        };
      });
    }

    return null;
  }

  /** Helper: ekstrak URL gambar dari option/answer object */
  function _extractOptMedia(opt) {
    if (!opt) return null;
    if (opt.image && typeof opt.image === "string") return opt.image;
    if (opt.media) {
      if (typeof opt.media === "string") return opt.media;
      if (opt.media.url) return opt.media.url;
      if (Array.isArray(opt.media)) {
        const m = opt.media.find((x) => x && x.url);
        if (m) return m.url;
      }
    }
    return null;
  }

  // =====================================================
  // RENDER FUNCTIONS
  // =====================================================

  /**
   * Sanitasi HTML KaTeX dari Quizizz.
   *
   * Root cause dari JSON asli:
   * 1. Duplikat teks → <span class="katex-mathml"> berisi <math> MathML yang
   *    ditampilkan browser sebagai teks biasa di luar konteks halaman Quizizz
   * 2. Garis akar overflow → SVG KaTeX pakai width="400em", bergantung pada
   *    .hide-tail { overflow:hidden } milik CSS Quizizz yang tidak ada di frame kita
   */
  function sanitizeMathHTML(html) {
    if (!html) return "";

    const tmp = document.createElement("div");
    tmp.innerHTML = html;

    // Hapus script math inline (jaga-jaga)
    tmp.querySelectorAll('script[type="math/tex"], script[type="math/asciimath"]').forEach((s) => s.remove());

    // Hapus <blank> tag beserta <br> yang ada sebelumnya
    // (soal isian Quizizz: "Pertanyaan?<br><br><blank id="..."></blank>")
    tmp.querySelectorAll("blank").forEach((b) => {
      // Hapus <br> sebelum blank
      let prev = b.previousSibling;
      while (prev) {
        const toRemove = prev;
        prev = prev.previousSibling;
        if (toRemove.nodeName === "BR" ||
            (toRemove.nodeType === Node.TEXT_NODE && toRemove.textContent.trim() === "")) {
          toRemove.remove();
        } else {
          break;
        }
      }
      b.remove();
    });

    // FIX DUPLIKAT:
    // .katex-mathml adalah versi MathML untuk aksesibilitas/screen reader.
    // Di halaman Quizizz, CSS mereka menyembunyikannya (clip/position:absolute).
    // Di frame kita tidak ada CSS itu, jadi tampil sebagai teks duplikat.
    // Hapus katex-mathml sepenuhnya (source MathML, bukan rendered HTML)
    // Di halaman Quizizz ada CSS yang menyembunyikannya, di frame kita tidak ada
    tmp.querySelectorAll(".katex-mathml").forEach((el) => el.remove());

    // FIX GARIS AKAR: KaTeX CSS dari CDN sudah handle rendering,
    // tapi kita tetap perlu pastikan .hide-tail overflow:hidden (inline style
    // lebih kuat dari stylesheet eksternal untuk override konflik)
    tmp.querySelectorAll(".hide-tail").forEach((el) => {
      el.style.overflow = "hidden";
      el.style.display = "inline-block";
    });

    // katex-display: inline agar menyatu dengan teks soal
    tmp.querySelectorAll(".katex-display").forEach((el) => {
      el.style.display = "inline-block";
      el.style.margin = "0 0.1em";
      el.style.verticalAlign = "middle";
    });

    return tmp.innerHTML;
  }

  /**
   * Render kartu jawaban dari normalized array
   * @param {Array} normalizedAnswers - hasil normalizeAnswers()
   * @param {string} searchTerm
   * @param {string} accentColor - warna border kiri kartu
   */
  function renderNormalizedCards(normalizedAnswers, searchTerm = "", accentColor = "#4b4bfF") {
    const resultsWrap = document.getElementById("quizizz-results");
    if (!resultsWrap) return;

    resultsWrap.innerHTML = "";

    if (!normalizedAnswers || normalizedAnswers.length === 0) {
      resultsWrap.innerHTML =
        '<div style="text-align:center; color:#666; padding:20px;">Belum ada data jawaban</div>';
      return;
    }

    let filtered = normalizedAnswers;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = normalizedAnswers.filter((item) => {
        const q = item.question.replace(/<[^>]*>/g, "").toLowerCase();
        const a = item.answers.map((x) => x.text).join(" ").toLowerCase();
        return q.includes(term) || a.includes(term);
      });
    }

    if (filtered.length === 0) {
      resultsWrap.innerHTML =
        '<div style="text-align:center; color:#666; padding:20px;">Tidak ada hasil pencarian</div>';
      return;
    }

    filtered.forEach((item, index) => {
      const card = document.createElement("div");
      card.style.cssText = `
        background: white;
        border-radius: 8px;
        padding: 12px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        border-left: 4px solid ${accentColor};
        margin-bottom: 8px;
        overflow: hidden;
        box-sizing: border-box;
        width: 100%;
      `;

      // ── Nomor + label type ──
      let typeBadge = "";
      // Quizizz types
      if (item.type === "MSQ") {
        typeBadge = `<span style="background:#fef3c7; color:#d97706; font-size:10px; padding:1px 5px; border-radius:4px; margin-left:4px; font-weight:bold;">MULTI</span>`;
      } else if (item.type === "BLANK") {
        typeBadge = `<span style="background:#ede9fe; color:#7c3aed; font-size:10px; padding:1px 5px; border-radius:4px; margin-left:4px; font-weight:bold;">ISIAN</span>`;
      }
      // Kahoot types — layout TRUE_FALSE atau answer.length > 1 pada type "quiz"
      else if (item.layout === "TRUE_FALSE" || item.type === "true_false") {
        typeBadge = `<span style="background:#dbeafe; color:#1d4ed8; font-size:10px; padding:1px 5px; border-radius:4px; margin-left:4px; font-weight:bold;">B/S</span>`;
      } else if (item.type === "quiz" && item.multiAnswer) {
        typeBadge = `<span style="background:#fef3c7; color:#d97706; font-size:10px; padding:1px 5px; border-radius:4px; margin-left:4px; font-weight:bold;">MULTI</span>`;
      }

      // ── Gambar soal ──
      const questionImageHTML = item.questionMedia
        ? `<img src="${item.questionMedia}" 
              style="max-width:100%; border-radius:8px; margin-top:8px; display:block;"
              onerror="this.style.display='none'">`
        : "";

      // ── Jawaban ──
      let answersHTML = "";
      item.answers.forEach((ans) => {
        let inner = "";

        // Gambar jawaban (tampilkan di atas teks)
        if (ans.mediaUrl) {
          inner += `<img src="${ans.mediaUrl}" style="width:100%; height:auto; max-height:160px; object-fit:contain; border-radius:6px; margin-bottom:4px; display:block; box-sizing:border-box;" onerror="this.style.display='none'">`;
        }

        // Teks jawaban
        if (ans.text) {
          inner += `<div>${sanitizeMathHTML(ans.text)}</div>`;
        }

        if (inner) {
          answersHTML += `<div style="border:2px solid #22c55e; border-radius:8px; padding:8px 10px; background:#f0fdf4; margin-bottom:6px; font-size:13px; color:#10b981; font-weight:bold; word-wrap:break-word; overflow-wrap:break-word; box-sizing:border-box; overflow:hidden;">${inner}</div>`;
        }
      });

      if (!answersHTML) {
        answersHTML = `<div style="color:#999; font-size:12px; font-style:italic;">Tidak ada jawaban tersedia</div>`;
      }

      card.innerHTML = `
        <div style="font-size:14px; font-weight:600; color:#111; margin-bottom:8px; word-wrap:break-word; overflow-wrap:break-word; overflow:hidden;">
          <span style="background:#e5e7eb; padding:2px 6px; border-radius:4px; margin-right:5px; font-size:12px;">${index + 1}</span>
          ${typeBadge}
          <span class="dithack-nomath">${sanitizeMathHTML(item.question)}</span>
          ${questionImageHTML}
        </div>
        <div style="margin-top:8px; overflow:hidden;">
          <span class="math-answer dithack-nomath">${answersHTML}</span>
        </div>
      `;

      // Cegah KaTeX/MathJax Quizizz me-render ulang elemen kita
      // (KaTeX biasanya cari elemen yang belum punya class "katex" → sudah aman)
      // (MathJax biasanya cari elemen dengan class tertentu → tandai done)
      card.querySelectorAll("mjx-container, .MathJax").forEach((el) => {
        el.setAttribute("data-dithack-done", "1");
      });

      resultsWrap.appendChild(card);

      // Inject KaTeX CSS dari CDN (sekali saja) agar formula render sempurna
      if (!document.getElementById("dithack-katex-css")) {
        const link = document.createElement("link");
        link.id = "dithack-katex-css";
        link.rel = "stylesheet";
        link.href = "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
        document.head.appendChild(link);
      }

      // Inject override CSS (sekali saja) untuk fix overflow & hide duplikat
      if (!document.getElementById("dithack-math-fix-style")) {
        const style = document.createElement("style");
        style.id = "dithack-math-fix-style";
        style.textContent = `
          /* Sembunyikan katex-mathml (duplikat teks) */
          #quizizz-hack-frame .katex-mathml { display: none !important; }

          /* katex-display: inline agar menyatu dengan teks soal */
          #quizizz-hack-frame .katex-display {
            display: inline-block !important;
            margin: 0 0.15em !important;
            vertical-align: middle !important;
            max-width: 100% !important;
            overflow: hidden !important;
          }

          /* Kunci fix garis akar: .hide-tail harus overflow:hidden */
          #quizizz-hack-frame .hide-tail {
            overflow: hidden !important;
            display: inline-block !important;
          }

          /* SVG akar: width="400em" dihapus di JS, pastikan max-width via CSS */
          #quizizz-hack-frame .katex svg {
            max-width: 100% !important;
            width: auto !important;
          }

          /* Pastikan card tidak overflow */
          #quizizz-hack-frame .katex {
            max-width: 100% !important;
          }
        `;
        document.head.appendChild(style);
      }
    });
  }

  // ── Wrapper render Quizizz/Wayground (format baru + lama) ──
  function renderCards(searchTerm = "") {
    const normalized = normalizeAnswers(cachedData);
    renderNormalizedCards(normalized, searchTerm, "#4b4bfF");
  }

  // ── Wrapper render Kahoot ──
  function renderKahootCards(searchTerm = "") {
    const normalized = normalizeAnswers(cachedData);
    renderNormalizedCards(normalized, searchTerm, "#ff6b35");
  }

  // =====================================================
  // GAME TYPE SELECTOR
  // =====================================================

  function createGameTypeSelector(container) {
    const gameTypeSelector = document.createElement("div");
    gameTypeSelector.style.cssText =
      "display:flex; gap:8px; margin-bottom:12px; justify-content:center;";

    const quizizzBtn = document.createElement("button");
    quizizzBtn.textContent = "Wayground";
    quizizzBtn.dataset.type = "quizizz";
    quizizzBtn.style.cssText =
      "flex:1; padding:10px; background:#4b4bfF; color:white; border:none; border-radius:8px; cursor:pointer; font-size:14px; font-weight:bold;";

    const kahootBtn = document.createElement("button");
    kahootBtn.textContent = "Kahoot";
    kahootBtn.dataset.type = "kahoot";
    kahootBtn.style.cssText =
      "flex:1; padding:10px; background:#ccc; color:#333; border:none; border-radius:8px; cursor:pointer; font-size:14px; font-weight:bold;";

    gameTypeSelector.appendChild(quizizzBtn);
    gameTypeSelector.appendChild(kahootBtn);

    function updateGameTypeButtons(type) {
      currentGameType = type;
      if (type === "quizizz") {
        quizizzBtn.style.background = "#4b4bfF";
        quizizzBtn.style.color = "white";
        kahootBtn.style.background = "#ccc";
        kahootBtn.style.color = "#333";
        pinInput.placeholder = "Kode Game Wayground";
      } else {
        kahootBtn.style.background = "#ff6b35";
        kahootBtn.style.color = "white";
        quizizzBtn.style.background = "#ccc";
        quizizzBtn.style.color = "#333";
        pinInput.placeholder = "QuizID Kahoot";
      }
    }

    quizizzBtn.onclick = () => updateGameTypeButtons("quizizz");
    kahootBtn.onclick = () => updateGameTypeButtons("kahoot");

    const pinInput = document.createElement("input");
    pinInput.type = "text";
    pinInput.id = "quizizz-pin-input";
    pinInput.placeholder = "Kode Game Wayground";
    pinInput.style.cssText =
      "width:80%; padding:10px; border:1px solid #ccc; border-radius:8px; margin-bottom:10px; font-size:14px;";

    const fetchBtn = document.createElement("button");
    fetchBtn.id = "quizizz-fetch-btn";
    fetchBtn.textContent = "Ambil Jawaban";
    fetchBtn.style.cssText =
      "width:80%; padding:10px; background:#4b4bfF; color:white; border:none; border-radius:8px; cursor:pointer; font-size:14px;";

    fetchBtn.onclick = async () => {
      const inputValue = pinInput.value.trim();
      if (!inputValue) return;

      const resultsEl = document.getElementById("quizizz-results");
      resultsEl.innerHTML =
        '<div style="text-align:center; color:#666; padding:20px;">Memuat data...</div>';

      if (currentGameType === "quizizz") {
        cachedData = await fetchAnswers(inputValue);
        if (cachedData?.error) {
          resultsEl.innerHTML = `<div style="text-align:center; color:#ef4444; padding:20px;">${cachedData.error}</div>`;
          return;
        }
        const normalized = normalizeAnswers(cachedData);
        if (normalized && normalized.length > 0) {
          renderNormalizedCards(normalized, "", "#4b4bfF");
        } else {
          resultsEl.innerHTML =
            '<div style="text-align:center; color:#ef4444; padding:20px;">Gagal mengambil data</div>';
        }
      } else {
        cachedData = await fetchKahootAnswers(inputValue);
        if (cachedData?.error) {
          resultsEl.innerHTML = `<div style="text-align:center; color:#ef4444; padding:20px;">${cachedData.error}</div>`;
          return;
        }
        const normalized = normalizeAnswers(cachedData);
        if (normalized && normalized.length > 0) {
          renderNormalizedCards(normalized, "", "#ff6b35");
        } else {
          resultsEl.innerHTML =
            '<div style="text-align:center; color:#ef4444; padding:20px;">Gagal mengambil data</div>';
        }
      }
    };

    return { gameTypeSelector, pinInput, fetchBtn };
  }

  // =====================================================
  // MAIN APP INIT
  // =====================================================

  async function initMainApp() {
    const {
      container,
      header,
      content,
      searchBar,
      clearBtn,
      resultsWrap,
      logoutBtn,
      minimizeBtn,
      hideBtn,
      resizeHandle,
    } = createFrame();
    createToggleButton();

    let pin = "";
    const currentDomain = window.location.hostname;
    const isQuizizz = currentDomain.includes("quizizz");

    const urlParams = new URLSearchParams(window.location.search);
    const urlPin = urlParams.get("pin") || urlParams.get("gamePin");

    if (urlPin && isQuizizz) {
      pin = urlPin;
    } else if (isQuizizz) {
      const pinElement = document.querySelector(
        '[data-pin], .game-pin, [class*="pin"]',
      );
      if (pinElement) {
        pin =
          pinElement.textContent || pinElement.getAttribute("data-pin") || "";
      }
    }

    if (!pin || pin.length < 4) {
      const inputWrap = document.createElement("div");
      inputWrap.style.cssText = "padding:20px; text-align:center;";

      const { gameTypeSelector, pinInput, fetchBtn } =
        createGameTypeSelector(inputWrap);
      inputWrap.appendChild(gameTypeSelector);
      inputWrap.appendChild(pinInput);
      inputWrap.appendChild(fetchBtn);
      resultsWrap.appendChild(inputWrap);
    } else {
      const resultsEl = document.getElementById("quizizz-results");
      resultsEl.innerHTML =
        '<div style="text-align:center; color:#666; padding:20px;">Memuat data...</div>';
      cachedData = await fetchAnswers(pin);
      if (cachedData?.error) {
        resultsEl.innerHTML = `<div style="text-align:center; color:#ef4444; padding:20px;">${cachedData.error}</div>`;
        return;
      }

      const normalized = normalizeAnswers(cachedData);
      if (normalized && normalized.length > 0) {
        renderNormalizedCards(normalized, "", "#4b4bfF");
      } else {
        resultsWrap.innerHTML =
          '<div style="text-align:center; color:#ef4444; padding:20px;">Gagal mengambil data. Coba masukkan PIN manual.</div>';

        const inputWrap = document.createElement("div");
        inputWrap.style.cssText =
          "padding:20px; text-align:center; margin-top:10px;";

        const { gameTypeSelector, pinInput, fetchBtn } =
          createGameTypeSelector(inputWrap);
        inputWrap.appendChild(gameTypeSelector);
        inputWrap.appendChild(pinInput);
        inputWrap.appendChild(fetchBtn);
        resultsWrap.appendChild(inputWrap);
      }
    }

    // Search
    searchBar.addEventListener("input", function () {
      if (!cachedData) return; // belum ada data, jangan lakukan apa-apa
      const term = this.value;
      if (currentGameType === "kahoot") {
        renderKahootCards(term);
      } else {
        renderCards(term);
      }
    });

    // Clear
    clearBtn.addEventListener("click", function () {
      searchBar.value = "";
      if (!cachedData) return; // belum ada data, jangan lakukan apa-apa
      if (currentGameType === "kahoot") {
        renderKahootCards();
      } else {
        renderCards();
      }
    });

    logoutBtn.onclick = function () {
      showLogoutConfirm(logoutClient);
    };

    // Minimize
    minimizeBtn.onclick = function () {
      isMinimized = !isMinimized;
      const isMobile = window.innerWidth <= 768;
      if (isMinimized) {
        content.style.display = "none";
        container.style.height = isMobile ? "40px" : "44px";
        minimizeBtn.textContent = "▢";
      } else {
        content.style.display = "block";
        container.style.height = isMobile ? "auto" : "500px";
        container.style.maxHeight = isMobile ? "70vh" : "500px";
        minimizeBtn.textContent = "—";
      }
    };

    // Hide
    hideBtn.onclick = function () {
      container.style.display = "none";
      const toggleBtn = document.getElementById("quizizz-hack-toggle");
      if (toggleBtn) toggleBtn.style.opacity = "0.1";
    };

    // Drag (mouse)
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener("mousedown", function (e) {
      if (
        e.target === minimizeBtn ||
        e.target === hideBtn ||
        e.target === logoutBtn ||
        logoutBtn.contains(e.target)
      ) return;
      isDragging = true;
      offsetX = e.clientX - container.offsetLeft;
      offsetY = e.clientY - container.offsetTop;
      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", function (e) {
      if (!isDragging) return;
      container.style.left = e.clientX - offsetX + "px";
      container.style.top = e.clientY - offsetY + "px";
      container.style.right = "auto";
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
      document.body.style.userSelect = "auto";
    });

    // Drag (touch)
    header.addEventListener("touchstart", function (e) {
      if (
        e.target === minimizeBtn ||
        e.target === hideBtn ||
        e.target === logoutBtn ||
        logoutBtn.contains(e.target)
      ) return;
      const touch = e.touches[0];
      isDragging = true;
      offsetX = touch.clientX - container.offsetLeft;
      offsetY = touch.clientY - container.offsetTop;
    }, { passive: false });

    document.addEventListener("touchmove", function (e) {
      if (!isDragging) return;
      e.preventDefault();
      const touch = e.touches[0];
      container.style.left = touch.clientX - offsetX + "px";
      container.style.top = touch.clientY - offsetY + "px";
      container.style.right = "auto";
    }, { passive: false });

    document.addEventListener("touchend", function () { isDragging = false; });

    // Resize (mouse)
    let isResizing = false;
    let startX, startY, startWidth, startHeight;
    const minWidth = 200;
    const minHeight = 200;

    resizeHandle.addEventListener("mousedown", function (e) {
      e.preventDefault();
      e.stopPropagation();
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      startWidth = container.offsetWidth;
      startHeight = container.offsetHeight;
      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", function (e) {
      if (!isResizing) return;
      container.style.width = Math.max(minWidth, startWidth + (e.clientX - startX)) + "px";
      container.style.height = Math.max(minHeight, startHeight + (e.clientY - startY)) + "px";
      container.style.maxHeight = "none";
    });

    document.addEventListener("mouseup", function () {
      isResizing = false;
      document.body.style.userSelect = "auto";
    });

    // Resize (touch)
    resizeHandle.addEventListener("touchstart", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const touch = e.touches[0];
      isResizing = true;
      startX = touch.clientX;
      startY = touch.clientY;
      startWidth = container.offsetWidth;
      startHeight = container.offsetHeight;
    }, { passive: false });

    document.addEventListener("touchmove", function (e) {
      if (!isResizing) return;
      e.preventDefault();
      const touch = e.touches[0];
      container.style.width = Math.max(minWidth, startWidth + (touch.clientX - startX)) + "px";
      container.style.height = Math.max(minHeight, startHeight + (touch.clientY - startY)) + "px";
      container.style.maxHeight = "none";
    }, { passive: false });

    document.addEventListener("touchend", function () { isResizing = false; });
  }

  // Start
  checkLicense();

  console.log("DitHack loaded!");
})();

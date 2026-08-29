const API_BASE_URL = "https://api-dithack.up.railway.app"

let API_KEY = null;
let licenseData = [];
let licenseFilter = "all";
let editingLicCode = null;
let cacheQData = [];
let cacheKData = [];
let salesData = [];
let usageData = [];
let cheatnetworkData = [];
let cheatnetworkOptions = [];
let editingCheatnetworkId = null;
let usageFilter = "all";
let chartRevenue = null,
  chartLicense = null,
  chartUsage = null;
let confirmCallback = null;
let currentPage = "dashboard";

async function api(path, opts = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...opts,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...(opts.headers || {}),
    },
  });
  if (!res.ok) {
    const e = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(e.detail || "Request gagal");
  }
  return res.json();
}

function toast(msg, type = "info") {
  const icons = {
    success: '<i class="fa-solid fa-square-check"></i>',
    error: '<i class="fa-solid fa-circle-xmark"></i>',
    info: '<i class="fa-solid fa-circle-info"></i>',
  };
  const el = document.createElement("div");
  el.className = `toast ${type}`;
  el.innerHTML = `<span>${icons[type]}</span><span>${msg}</span>`;
  el.onclick = () => el.remove();
  document.getElementById("toast-container").appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}
function openModal(id) {
  document.getElementById(id).style.display = "flex";
}

function confirm(title, msg, cb, isDestructive = true) {
  document.getElementById("confirm-title").textContent = title;
  document.getElementById("confirm-msg").textContent = msg;
  const okBtn = document.getElementById("confirm-ok-btn");
  okBtn.textContent = "Ya";
  okBtn.className = isDestructive ? "btn btn-danger" : "btn btn-primary";
  okBtn.onclick = () => {
    closeModal("modal-confirm");
    cb();
  };
  openModal("modal-confirm");
}

document.getElementById("login-btn").onclick = doLogin;
document.getElementById("login-pass").addEventListener("keydown", (e) => {
  if (e.key === "Enter") doLogin();
});

async function doLogin() {
  const btn = document.getElementById("login-btn");
  const user = document.getElementById("login-user").value.trim();
  const pass = document.getElementById("login-pass").value;
  const err = document.getElementById("login-error");

  if (!user || !pass) {
    err.style.display = "block";
    err.textContent = "Isi username dan password.";
    return;
  }

  btn.disabled = true;
  btn.innerHTML = '<span class="spin">⟳</span> Masuk...';
  err.style.display = "none";

  try {
    const data = await fetch(`${API_BASE_URL}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user, password: pass }),
    });
    if (!data.ok) throw new Error("wrong");
    const json = await data.json();
    API_KEY = json.api_key;
    sessionStorage.setItem("admin_key", API_KEY);
    sessionStorage.setItem("admin_user", user);
    startApp(user);
  } catch {
    err.style.display = "block";
    err.textContent = "Username atau password salah.";
  } finally {
    btn.disabled = false;
    btn.innerHTML = "Login";
  }
}

function startApp(user) {
  document.getElementById("login-screen").style.display = "none";
  document.getElementById("app").style.display = "flex";
  document.getElementById("user-name-display").textContent = user;
  document.getElementById("user-avatar").textContent = user
    .charAt(0)
    .toUpperCase();
  loadDashboard();
}

document.getElementById("logout-btn").onclick = () => {
  if (window.innerWidth <= 720) {
    sidebar.classList.remove("open");
    overlay.classList.remove("show");
  }

  confirm("Logout", "Yakin ingin keluar dari admin panel?", () => {
    sessionStorage.clear();
    API_KEY = null;
    document.getElementById("app").style.display = "none";
    document.getElementById("login-screen").style.display = "flex";
    document.getElementById("login-pass").value = "";
  });
};

document.querySelectorAll(".nav-item[data-page]").forEach((el) => {
  el.addEventListener("click", () => {
    navTo(el.dataset.page);
    if (window.innerWidth <= 720) {
      sidebar.classList.remove("open");
      overlay.classList.remove("show");
    }
  });
});

const menuToggle = document.getElementById("menu-toggle");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("sidebar-overlay");

menuToggle.onclick = () => {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("show");
};
overlay.onclick = () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
};

function navTo(page) {
  currentPage = page;
  document
    .querySelectorAll(".nav-item")
    .forEach((n) => n.classList.remove("active"));
  document
    .querySelector(`.nav-item[data-page="${page}"]`)
    ?.classList.add("active");
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(`page-${page}`)?.classList.add("active");

  const titles = {
    dashboard: "Dashboard",
    licenses: "Manajemen Token",
    devices: "Device",
    cache: "Cache Database",
    sales: "Log Penjualan",
    usage: "Log Penggunaan",
    cheatnetwork: "Usage CheatNetwork",
  };
  document.getElementById("page-title").textContent = titles[page] || page;

  if (page === "licenses") loadLicenses();
  if (page === "devices") loadDevices();
  if (page === "cache") {
    loadCacheQz();
    loadCacheKh();
  }
  if (page === "sales") loadSales();
  if (page === "usage") loadUsage();
  if (page === "cheatnetwork") loadCheatnetworkUsage();
}

function loadUsagePage() {
  navTo("usage");
}

document.getElementById("refresh-page-btn").onclick = refreshCurrentPage;

async function refreshCurrentPage() {
  const btn = document.getElementById("refresh-page-btn");
  btn.disabled = true;
  btn.classList.add("refreshing");

  try {
    if (currentPage === "dashboard") await loadDashboard();
    if (currentPage === "licenses") await loadLicenses();
    if (currentPage === "devices") await loadDevices();
    if (currentPage === "cache") {
      await Promise.all([loadCacheQz(), loadCacheKh()]);
    }
    if (currentPage === "sales") await loadSales();
    if (currentPage === "usage") await loadUsage();
    if (currentPage === "cheatnetwork") await loadCheatnetworkUsage();
  } finally {
    btn.disabled = false;
    btn.classList.remove("refreshing");
  }
}

async function loadDashboard() {
  try {
    const [stats, rev, usg] = await Promise.all([
      api("/api/admin/stats/dashboard"),
      api("/api/admin/stats/revenue"),
      api("/api/admin/stats/usage"),
    ]);
    renderStatCards(stats);
    renderRevenueChart(rev);
    renderLicenseChart(stats);
    renderUsageChart(usg);
    loadRecentActivity();
    document.getElementById("nav-badge-lic").textContent = stats.total_licenses;
  } catch (e) {
    toast("Gagal memuat dashboard: " + e.message, "error");
  }
}

function fmt(n) {
  return (Number(n) || 0).toLocaleString("id-ID");
}

function renderStatCards(s) {
  const cards = [
    {
      icon: '<i class="fa-solid fa-sack-dollar"></i>',
      label: "Total Pendapatan",
      value: fmt(s.total_revenue),
      meta: `Bulan ini: ${fmt(s.month_revenue)}`,
      color: "amber",
    },
    {
      icon: '<i class="fa-solid fa-box"></i>',
      label: "Total Penjualan",
      value: s.total_sales,
      meta: "semua waktu",
      color: "violet",
    },
    {
      icon: '<i class="fa-solid fa-key"></i>',
      label: "Jumlah Token",
      value: s.total_licenses,
      meta: `${s.active_licenses} aktif`,
      color: "blue",
    },
    {
      icon: '<i class="fa-solid fa-check"></i>',
      label: "Token Aktif",
      value: s.active_licenses,
      meta: `${s.expired_licenses} expired`,
      color: "green",
    },
    {
      icon: '<i class="fa-solid fa-satellite-dish"></i>',
      label: "API Hari Ini",
      value: s.usage_today,
      meta: `Total: ${s.usage_total}`,
      color: "cyan",
    },
    {
      icon: '<i class="fa-solid fa-mobile-screen"></i>',
      label: "Device Ter-bind",
      value: s.bound_licenses ?? "—",
      meta: `dari ${s.total_licenses} token`,
      color: "rose",
    },
  ];
  document.getElementById("stat-cards").innerHTML = cards
    .map(
      (c) => `
    <div class="stat-card ${c.color}">
      <div class="stat-icon">${c.icon}</div>
      <div class="stat-label">${c.label}</div>
      <div class="stat-value">${c.value}</div>
      <div class="stat-meta">${c.meta}</div>
    </div>`,
    )
    .join("");
}

function renderRevenueChart(data) {
  const ctx = document.getElementById("chart-revenue").getContext("2d");
  if (chartRevenue) chartRevenue.destroy();
  chartRevenue = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((d) => d.date.slice(5)),
      datasets: [
        {
          label: "Revenue",
          data: data.map((d) => d.total),
          borderColor: "#5B8DEF",
          backgroundColor: "rgba(91,141,239,.08)",
          borderWidth: 2,
          pointBackgroundColor: "#5B8DEF",
          pointRadius: 3,
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => fmt(ctx.raw) } },
      },
      scales: {
        x: {
          grid: { color: "#1a2540" },
          ticks: { color: "#8B98B8", font: { size: 10 } },
        },
        y: {
          grid: { color: "#1a2540" },
          ticks: {
            color: "#8B98B8",
            font: { size: 10 },
            callback: (v) => fmt(v),
          },
        },
      },
    },
  });
}

function renderLicenseChart(s) {
  const ctx = document.getElementById("chart-license").getContext("2d");
  if (chartLicense) chartLicense.destroy();
  chartLicense = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Aktif", "Expired", "Nonaktif"],
      datasets: [
        {
          data: [s.active_licenses, s.expired_licenses, s.inactive_licenses],
          backgroundColor: [
            "rgba(52,211,153,.8)",
            "rgba(251,191,36,.8)",
            "rgba(139,152,184,.4)",
          ],
          borderColor: "#111827",
          borderWidth: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#8B98B8", font: { size: 11 }, boxWidth: 12 },
        },
      },
    },
  });
}

function renderUsageChart(data) {
  const ctx = document.getElementById("chart-usage").getContext("2d");
  if (chartUsage) chartUsage.destroy();
  const days = [...new Set(data.map((d) => d.date.slice(5)))].sort();
  const qz = days.map((d) => {
    const r = data.find(
      (x) => x.date.slice(5) === d && x.endpoint === "quizizz",
    );
    return r ? r.count : 0;
  });
  const kh = days.map((d) => {
    const r = data.find(
      (x) => x.date.slice(5) === d && x.endpoint === "kahoot",
    );
    return r ? r.count : 0;
  });
  chartUsage = new Chart(ctx, {
    type: "bar",
    data: {
      labels: days,
      datasets: [
        {
          label: "Quizizz",
          data: qz,
          backgroundColor: "rgba(91,141,239,.7)",
          borderRadius: 4,
        },
        {
          label: "Kahoot",
          data: kh,
          backgroundColor: "rgba(34,211,238,.7)",
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: { color: "#8B98B8", font: { size: 11 }, boxWidth: 12 },
        },
      },
      scales: {
        x: {
          grid: { color: "#1a2540" },
          ticks: { color: "#8B98B8", font: { size: 10 } },
          stacked: true,
        },
        y: {
          grid: { color: "#1a2540" },
          ticks: { color: "#8B98B8", font: { size: 10 } },
          stacked: true,
        },
      },
    },
  });
}

async function loadRecentActivity() {
  try {
    const logs = await api("/api/admin/usage?limit=10");
    const container = document.getElementById("recent-activity");
    if (!logs.length) {
      container.innerHTML =
        '<div class="empty-state"><div class="empty-icon"><i class="fa-regular fa-clipboard"></i></div><div class="empty-desc">Belum ada aktivitas</div></div>';
      return;
    }
    container.innerHTML = logs
      .map(
        (l) => `
      <div class="activity-item">
        <div class="activity-dot" style="background:${l.endpoint === "quizizz" ? "var(--accent)" : "var(--cyan)"}"></div>
        <div class="activity-content">
          <div class="activity-text"><strong>${l.license_code}</strong> → ${l.endpoint} <span style="font-family:var(--font-mono);font-size:12px;color:var(--text-2)">[${l.pin}]</span></div>
          <div class="activity-time">${formatDate(l.created_at)}</div>
        </div>
        <span class="badge ${l.status_code === 200 ? "badge-green" : "badge-red"}">${l.status_code}</span>
      </div>`,
      )
      .join("");
  } catch {}
}

async function loadCheatnetworkUsage() {
  const container = document.getElementById("cheatnetwork-content");
  if (container) {
    container.innerHTML =
      '<div class="empty-state"><div class="empty-icon"><i class="fa-solid fa-hourglass"></i></div><div class="empty-desc">Memuat...</div></div>';
  }

  try {
    cheatnetworkData = await api("/api/admin/cheatnetwork/accounts");
    renderCheatnetworkUsage();
  } catch (e) {
    if (container) {
      container.innerHTML = `<div class="empty-state"><div class="empty-icon"><i class="fa-solid fa-circle-xmark"></i></div><div class="empty-title">Gagal memuat data</div><div class="empty-desc">${escHtml(e.message)}</div></div>`;
    }
    toast("Gagal memuat usage CheatNetwork: " + e.message, "error");
  }
}

function renderCheatnetworkUsage() {
  const accounts = Array.isArray(cheatnetworkData) ? cheatnetworkData : [];
  if (!accounts.length) {
    document.getElementById("cheatnetwork-content").innerHTML =
      '<div class="empty-state"><div class="empty-icon"><i class="fa-solid fa-cookie-bite"></i></div><div class="empty-title">Belum ada akun CheatNetwork</div></div>';
    return;
  }

  document.getElementById("cheatnetwork-content").innerHTML = `
    <div class="cn-account-grid">
      ${accounts.map(renderCheatnetworkAccountCard).join("")}
    </div>`;
}

function renderCheatnetworkAccountCard(account) {
  const usage = account.usage || {};
  const maxUses = Number(usage.max_uses) || 0;
  const uses = Number(usage.uses) || 0;
  const usesLeft = Number(usage.uses_left) || 0;
  const percent = maxUses > 0 ? Math.min(100, Math.round((uses / maxUses) * 100)) : 0;
  const userId = account.user_id || "—";
  const name = account.name || account.display_name || "Akun";
  const timestamp = usage.timestamp ? formatUnixMs(usage.timestamp) : "—";
  const statusBadge = account.active
    ? '<span class="badge badge-green">Aktif</span>'
    : '<span class="badge badge-gray">Nonaktif</span>';

  return `
    <div class="cn-account-box">
      <div class="cn-account-top">
        <div class="account-card-main">
          <div class="account-avatar">${escHtml(name.charAt(0).toUpperCase())}</div>
          <div class="account-identity">
            <div class="account-name">${escHtml(name)}</div>
            <div class="account-id mono">${escHtml(userId)}</div>
          </div>
        </div>
        <div class="cn-account-actions">
          <button class="btn btn-ghost btn-sm btn-icon" onclick="openCheatnetworkModal(${account.id})" title="Edit token cookie">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          <button class="btn btn-danger btn-sm btn-icon" onclick="deleteCheatnetworkAccount(${account.id})" title="Hapus akun cookie">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>

      <div class="cn-account-kpis">
        <div>
          <span>Uses</span>
          <strong>${fmt(uses)}</strong>
        </div>
        <div>
          <span>Max Uses</span>
          <strong>${fmt(maxUses)}</strong>
        </div>
        <div>
          <span>Uses Left</span>
          <strong>${fmt(usesLeft)}</strong>
        </div>
      </div>

      <div class="usage-meter" aria-label="Usage ${percent}%">
        <div class="usage-meter-fill" style="width:${percent}%"></div>
      </div>
      <div class="usage-meter-meta">
        <span>${statusBadge}</span>
        <span>${fmt(account.license_count)} lisensi</span>
        <span>${timestamp}</span>
      </div>
      ${account.ok ? "" : `<div class="cn-error">${escHtml(account.error || "Gagal memuat usage")}</div>`}
    </div>`;
}

async function loadCheatnetworkOptions() {
  cheatnetworkOptions = await api("/api/admin/cheatnetwork/accounts/options");
  return cheatnetworkOptions;
}

function renderCheatnetworkSelect(selectedId = null) {
  const select = document.getElementById("lic-cheatnetwork-account");
  if (!select) return;
  if (!cheatnetworkOptions.length) {
    select.innerHTML = '<option value="">Belum ada akun cookie aktif</option>';
    return;
  }
  select.innerHTML = cheatnetworkOptions
    .map((a) => {
      const selected = Number(selectedId) === Number(a.id) ? "selected" : "";
      return `<option value="${a.id}" ${selected}>${escHtml(a.label)}</option>`;
    })
    .join("");
}

async function openCheatnetworkModal(id = null) {
  editingCheatnetworkId = id;
  document.getElementById("cn-modal-title").textContent = id
    ? "Edit Akun CheatNetwork"
    : "Tambah Akun CheatNetwork";
  document.getElementById("cn-name").value = "";
  document.getElementById("cn-cookie-token").value = "";
  document.getElementById("cn-active").value = "true";

  if (id) {
    try {
      const account = await api(`/api/admin/cheatnetwork/accounts/${id}`);
      document.getElementById("cn-name").value = account.name || "";
      document.getElementById("cn-cookie-token").value = account.cookie_token || "";
      document.getElementById("cn-active").value = String(!!account.active);
    } catch (e) {
      toast(e.message, "error");
      return;
    }
  }
  openModal("modal-cheatnetwork");
}

async function saveCheatnetworkAccount() {
  const name = document.getElementById("cn-name").value.trim();
  const cookie_token = document.getElementById("cn-cookie-token").value.trim();
  const active = document.getElementById("cn-active").value === "true";
  if (!name || !cookie_token) {
    toast("Nama akun dan token cookie wajib diisi", "error");
    return;
  }

  const btn = document.getElementById("cn-save-btn");
  btn.disabled = true;
  try {
    if (editingCheatnetworkId) {
      await api(`/api/admin/cheatnetwork/accounts/${editingCheatnetworkId}`, {
        method: "PUT",
        body: JSON.stringify({ name, cookie_token, active }),
      });
      toast("Akun CheatNetwork diupdate", "success");
    } else {
      await api("/api/admin/cheatnetwork/accounts", {
        method: "POST",
        body: JSON.stringify({ name, cookie_token, active }),
      });
      toast("Akun CheatNetwork ditambahkan", "success");
    }
    closeModal("modal-cheatnetwork");
    await loadCheatnetworkUsage();
    cheatnetworkOptions = [];
  } catch (e) {
    toast(e.message, "error");
  } finally {
    btn.disabled = false;
  }
}

function deleteCheatnetworkAccount(id) {
  const account = cheatnetworkData.find((item) => Number(item.id) === Number(id));
  const name = account?.name || "akun ini";
  const linked = Number(account?.license_count) || 0;
  const linkedText = linked
    ? `\n\n${linked} lisensi yang memakai akun ini akan dilepas dari akun cookie tersebut.`
    : "";

  confirm(
    "Hapus Akun CheatNetwork",
    `Hapus akun cookie "${name}"? Token cookie akan ikut terhapus.${linkedText}`,
    async () => {
      try {
        const result = await api(`/api/admin/cheatnetwork/accounts/${id}`, {
          method: "DELETE",
        });
        const unlinked = Number(result.unlinked_licenses) || 0;
        toast(
          unlinked
            ? `Akun dihapus, ${unlinked} lisensi dilepas`
            : "Akun CheatNetwork dihapus",
          "success",
        );
        await loadCheatnetworkUsage();
        cheatnetworkOptions = [];
      } catch (e) {
        toast(e.message, "error");
      }
    },
  );
}

function formatUnixMs(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "—";
  return new Date(numeric).toLocaleString("id-ID", {
    timeZone: "Asia/Makassar",
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function loadLicenses() {
  try {
    const [licenses, options] = await Promise.all([
      api("/api/admin/licenses"),
      loadCheatnetworkOptions().catch(() => []),
    ]);
    licenseData = licenses;
    cheatnetworkOptions = options;
    renderLicenses();
  } catch (e) {
    toast("Gagal memuat lisensi: " + e.message, "error");
  }
}

function statusBadge(s) {
  if (s === "AKTIF") return '<span class="badge badge-green">Aktif</span>';
  if (s === "EXPIRED") return '<span class="badge badge-amber">Expired</span>';
  return '<span class="badge badge-gray">Nonaktif</span>';
}

function deviceBadge(l) {
  if (!l.is_bound) {
    return '<span class="badge badge-gray" title="Belum digunakan di device manapun"><i class="fa-solid fa-circle-question" style="margin-right:3px"></i>Bebas</span>';
  }
  const id = (l.device_id || "Unknown").substring(0, 28);
  const lastSeen = l.last_seen ? formatDate(l.last_seen) : "—";
  return `<span class="badge badge-blue device-badge-wrap" title="Device ID: ${escHtml(l.device_id || "")}\nBound: ${l.bound_at || "—"}\nLast seen: ${lastSeen}" style="cursor:default;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;display:inline-flex;align-items:center;gap:4px"><i class="fa-solid fa-mobile-screen"></i>${escHtml(id)}</span>`;
}

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderLicenses() {
  const q = document.getElementById("lic-search").value.toLowerCase();
  const filtered = licenseData.filter((l) => {
    const matchFilter =
      licenseFilter === "all" ||
      (licenseFilter === "UNBOUND" ? !l.is_bound : l.status === licenseFilter);
    const matchSearch =
      l.code.toLowerCase().includes(q) || l.owner.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const tbody = document.getElementById("lic-tbody");
  if (!filtered.length) {
    tbody.innerHTML =
      '<tr><td colspan="8"><div class="empty-state"><div class="empty-icon"><i class="fa-solid fa-key"></i></div><div class="empty-title">Tidak ada lisensi</div></div></td></tr>';
    return;
  }

  tbody.innerHTML = filtered
    .map(
      (l, i) => `
    <tr>
      <td class="mono text-muted">${i + 1}</td>
      <td><span class="mono">${escHtml(l.code)}</span></td>
      <td>${escHtml(l.owner)}</td>
      <td><span class="badge badge-cyan">${escHtml(l.cheatnetwork_account_name || "—")}</span></td>
      <td><span class="mono text-sm">${l.expired}</span></td>
      <td>${statusBadge(l.status)}</td>
      <td>${deviceBadge(l)}</td>
      <td>
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-sm btn-icon" onclick="editLicense('${escHtml(l.code)}')" title="Edit">
            <i class="fa-solid fa-pen-to-square"></i>
          </button>
          ${
            l.is_bound
              ? `<button class="btn btn-sm" style="background:rgba(251,191,36,.12);color:var(--amber);border:1px solid rgba(251,191,36,.25);padding:6px 10px;font-size:12px;" onclick="resetDevice('${escHtml(l.code)}')" title="Reset Device Binding">
                <i class="fa-solid fa-rotate-left"></i>
               </button>`
              : `<button class="btn btn-ghost btn-sm btn-icon" disabled title="Belum ada device ter-bind" style="opacity:.3;cursor:default">
                <i class="fa-solid fa-rotate-left"></i>
               </button>`
          }
          <button class="btn btn-danger btn-sm btn-icon" onclick="deleteLicense('${escHtml(l.code)}')" title="Hapus">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </td>
    </tr>`,
    )
    .join("");
}

function filterLicenses() {
  renderLicenses();
}

async function loadDevices() {
  try {
    licenseData = await api("/api/admin/licenses");
    renderDevices();
  } catch (e) {
    toast("Gagal memuat device: " + e.message, "error");
  }
}

function renderDevices() {
  const search = document.getElementById("device-search");
  const q = search ? search.value.toLowerCase() : "";
  const devices = licenseData
    .filter((l) => l.is_bound)
    .filter((l) => {
      const haystack = [
        l.code,
        l.device_id,
        l.device_name,
        l.bound_at,
        l.last_seen,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });

  const tbody = document.getElementById("device-tbody");
  if (!devices.length) {
    tbody.innerHTML = emptyRow(
      7,
      q ? "Tidak ada device ditemukan" : "Belum ada device ter-bind",
      '<i class="fa-solid fa-mobile-screen"></i>',
    );
    return;
  }

  tbody.innerHTML = devices
    .map(
      (l, i) => `
    <tr>
      <td class="mono text-muted">${i + 1}</td>
      <td><span class="mono">${escHtml(l.code)}</span></td>
      <td class="overflow-hidden"><span class="mono text-sm">${escHtml(l.device_id || "—")}</span></td>
      <td class="overflow-hidden text-sm">${escHtml(l.device_name || "—")}</td>
      <td><span class="mono text-sm text-muted">${formatDate(l.bound_at)}</span></td>
      <td><span class="mono text-sm text-muted">${formatDate(l.last_seen)}</span></td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="logoutDevice('${escHtml(l.code)}')" title="Logout Device">
          <i class="fa-solid fa-arrow-right-from-bracket"></i> Logout
        </button>
      </td>
    </tr>`,
    )
    .join("");
}

function filterDevices() {
  renderDevices();
}

function setLicenseFilter(f, el) {
  licenseFilter = f;
  document
    .querySelectorAll("[data-filter]")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  renderLicenses();
}

async function openLicenseModal(code = null) {
  editingLicCode = code;
  if (!cheatnetworkOptions.length) {
    try {
      await loadCheatnetworkOptions();
    } catch {
      cheatnetworkOptions = [];
    }
  }
  const lic = code ? licenseData.find((l) => l.code === code) : null;
  document.getElementById("lic-modal-title").textContent = code
    ? "Edit Token"
    : "Tambah Token";
  document.getElementById("lic-code").value = lic?.code || "";
  document.getElementById("lic-code").disabled = !!code;
  document.getElementById("lic-owner").value = lic?.owner || "";
  document.getElementById("lic-expired").value = lic?.expired || "";
  document.getElementById("lic-active").value = lic
    ? String(lic.active)
    : "true";
  renderCheatnetworkSelect(lic?.cheatnetwork_account_id || cheatnetworkOptions[0]?.id || null);
  openModal("modal-license");
}

function editLicense(code) {
  openLicenseModal(code);
}

async function saveLicense() {
  const code = document.getElementById("lic-code").value.trim();
  const owner = document.getElementById("lic-owner").value.trim();
  const expired = document.getElementById("lic-expired").value;
  const active = document.getElementById("lic-active").value === "true";
  const cheatnetworkAccountId = Number(document.getElementById("lic-cheatnetwork-account").value) || null;
  if (!code || !owner || !expired) {
    toast("Lengkapi semua field", "error");
    return;
  }
  if (!cheatnetworkAccountId) {
    toast("Pilih akun cookie CheatNetwork", "error");
    return;
  }

  const btn = document.getElementById("lic-save-btn");
  btn.disabled = true;
  try {
    if (editingLicCode) {
      await api(`/api/admin/licenses/${editingLicCode}`, {
        method: "PUT",
        body: JSON.stringify({
          code,
          owner,
          expired,
          active,
          cheatnetwork_account_id: cheatnetworkAccountId,
        }),
      });
      toast("Lisensi diupdate", "success");
    } else {
      await api("/api/admin/licenses", {
        method: "POST",
        body: JSON.stringify({
          code,
          owner,
          expired,
          active,
          cheatnetwork_account_id: cheatnetworkAccountId,
        }),
      });
      toast("Lisensi ditambahkan", "success");
    }
    closeModal("modal-license");
    await loadLicenses();
    if (document.getElementById("page-devices")?.classList.contains("active")) {
      renderDevices();
    }
  } catch (e) {
    toast(e.message, "error");
  } finally {
    btn.disabled = false;
  }
}

function deleteLicense(code) {
  confirm(
    "Hapus Lisensi",
    `Hapus lisensi "${code}"? Tindakan ini tidak bisa dibatalkan.`,
    async () => {
      try {
        await api(`/api/admin/licenses/${code}`, { method: "DELETE" });
        toast("Lisensi dihapus", "success");
        await loadLicenses();
        if (document.getElementById("page-devices")?.classList.contains("active")) {
          renderDevices();
        }
      } catch (e) {
        toast(e.message, "error");
      }
    },
  );
}

function resetDevice(code) {
  const lic = licenseData.find((l) => l.code === code);
  const deviceInfo = lic?.device_name
    ? `\n\nDevice saat ini:\n${lic.device_name.substring(0, 80)}`
    : "";

  confirm(
    "Reset Device Binding",
    `Reset binding untuk token "${code}"? Token akan bisa digunakan di perangkat baru.${deviceInfo}`,
    async () => {
      try {
        await api(`/api/admin/licenses/${code}/reset-device`, {
          method: "POST",
        });
        toast(`Device berhasil di-reset untuk "${code}"`, "success");
        await loadLicenses();
        if (document.getElementById("page-devices")?.classList.contains("active")) {
          renderDevices();
        }
      } catch (e) {
        toast(e.message, "error");
      }
    },
    false, 
  );
}

function logoutDevice(code) {
  const lic = licenseData.find((l) => l.code === code);
  const deviceInfo = lic?.device_id
    ? `\n\nDevice ID:\n${lic.device_id.substring(0, 120)}`
    : "";

  confirm(
    "Logout Device",
    `Logout device dari token "${code}"? Device akan dilepas dari token ini.${deviceInfo}`,
    async () => {
      try {
        await api(`/api/admin/licenses/${code}/reset-device`, {
          method: "POST",
        });
        toast(`Device logout dari token "${code}"`, "success");
        await loadLicenses();
        renderDevices();
      } catch (e) {
        toast(e.message, "error");
      }
    },
  );
}

function showDeviceDetail(code) {
  const lic = licenseData.find((l) => l.code === code);
  if (!lic || !lic.is_bound) return;
  
  toast(
    `Device: ${(lic.device_name || "").substring(0, 60)} | Last seen: ${formatDate(lic.last_seen)}`,
    "info",
  );
}

let activeCacheTab = "quizizz";

function switchCacheTab(tab, el) {
  activeCacheTab = tab;
  document
    .querySelectorAll("#page-cache .tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(`#page-cache .tab-btn[onclick*="${tab}"]`)
    .forEach((b) => b.classList.add("active"));
  document.getElementById("cache-quizizz-panel").style.display =
    tab === "quizizz" ? "block" : "none";
  document.getElementById("cache-kahoot-panel").style.display =
    tab === "kahoot" ? "block" : "none";
}

async function loadCacheQz() {
  try {
    cacheQData = await api("/api/admin/cache/quizizz");
    renderCacheQz();
  } catch {
    toast("Gagal load cache Quizizz", "error");
  }
}
async function loadCacheKh() {
  try {
    cacheKData = await api("/api/admin/cache/kahoot");
    renderCacheKh();
  } catch {
    toast("Gagal load cache Kahoot", "error");
  }
}

function renderCacheQz() {
  const q = document.getElementById("qz-search").value.toLowerCase();
  const data = cacheQData.filter((i) => i.pin.toLowerCase().includes(q));
  const tbody = document.getElementById("qz-tbody");
  if (!data.length) {
    tbody.innerHTML = emptyRow(4, "Tidak ada cache Quizizz");
    return;
  }
  tbody.innerHTML = data
    .map(
      (i, idx) => `
    <tr>
      <td class="mono text-muted">${idx + 1}</td>
      <td><span class="mono">${i.pin}</span></td>
      <td><span class="mono text-sm text-muted">${formatDate(i.updated_at)}</span></td>
      <td><button class="btn btn-danger btn-sm btn-icon" onclick="deleteCacheItem('quizizz','${i.pin}')" title="Hapus"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`,
    )
    .join("");
}

function renderCacheKh() {
  const q = document.getElementById("kh-search").value.toLowerCase();
  const data = cacheKData.filter((i) => i.pin.toLowerCase().includes(q));
  const tbody = document.getElementById("kh-tbody");
  if (!data.length) {
    tbody.innerHTML = emptyRow(4, "Tidak ada cache Kahoot");
    return;
  }
  tbody.innerHTML = data
    .map(
      (i, idx) => `
    <tr>
      <td class="mono text-muted">${idx + 1}</td>
      <td class="overflow-hidden"><span class="mono">${i.pin}</span></td>
      <td><span class="mono text-sm text-muted">${formatDate(i.updated_at)}</span></td>
      <td><button class="btn btn-danger btn-sm btn-icon" onclick="deleteCacheItem('kahoot','${i.pin}')" title="Hapus"><i class="fa-solid fa-trash"></i></button></td>
    </tr>`,
    )
    .join("");
}

function filterCache(prefix) {
  if (prefix === "qz") renderCacheQz();
  else renderCacheKh();
}

function deleteCacheItem(type, pin) {
  confirm("Hapus Cache", `Hapus cache "${pin}"?`, async () => {
    try {
      await api(`/api/admin/cache/${type}/${encodeURIComponent(pin)}`, {
        method: "DELETE",
      });
      toast("Cache dihapus", "success");
      if (type === "quizizz") loadCacheQz();
      else loadCacheKh();
    } catch (e) {
      toast(e.message, "error");
    }
  });
}

function clearCache(type) {
  confirm(
    "Hapus Semua Cache",
    `Hapus SEMUA cache ${type}? Semua request akan ambil data baru dari server.`,
    async () => {
      try {
        await api(`/api/admin/cache/${type}`, { method: "DELETE" });
        toast(`Cache ${type} dibersihkan`, "success");
        if (type === "quizizz") loadCacheQz();
        else loadCacheKh();
      } catch (e) {
        toast(e.message, "error");
      }
    },
  );
}

async function loadSales() {
  try {
    salesData = await api("/api/admin/sales");
    renderSales();
    renderSalesStats();
  } catch (e) {
    toast("Gagal memuat penjualan", "error");
  }
}

function renderSalesStats() {
  const total = salesData.reduce((s, x) => s + x.amount, 0);
  const now = new Date();
  const thisMonth = salesData.filter((x) => {
    const d = new Date(x.created_at);
    return (
      d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
    );
  });
  const monthTotal = thisMonth.reduce((s, x) => s + x.amount, 0);
  const methods = {};
  salesData.forEach((x) => {
    methods[x.payment_method] = (methods[x.payment_method] || 0) + 1;
  });
  const topMethod = Object.entries(methods).sort((a, b) => b[1] - a[1])[0];

  document.getElementById("sales-stats").innerHTML = `
    <div class="stat-card amber">
      <div class="stat-icon"><i class="fa-solid fa-sack-dollar"></i></div>
      <div class="stat-label">Total Pendapatan</div>
      <div class="stat-value">${fmt(total)}</div>
      <div class="stat-meta">${salesData.length} transaksi</div>
    </div>
    <div class="stat-card green">
      <div class="stat-icon"><i class="fa-solid fa-calendar"></i></div>
      <div class="stat-label">Bulan Ini</div>
      <div class="stat-value">${fmt(monthTotal)}</div>
      <div class="stat-meta">${thisMonth.length} transaksi</div>
    </div>
    <div class="stat-card violet">
      <div class="stat-icon"><i class="fa-solid fa-credit-card"></i></div>
      <div class="stat-label">Metode Terbanyak</div>
      <div class="stat-value" style="font-size:18px">${topMethod ? topMethod[0] : "—"}</div>
      <div class="stat-meta">${topMethod ? topMethod[1] + " transaksi" : "Belum ada"}</div>
    </div>`;
}

function renderSales() {
  const tbody = document.getElementById("sales-tbody");
  if (!salesData.length) {
    tbody.innerHTML = emptyRow(
      9,
      "Belum ada penjualan tercatat",
      '<i class="fa-solid fa-sack-dollar"></i>',
    );
    return;
  }
  tbody.innerHTML = salesData
    .map(
      (s, i) => `
    <tr>
      <td class="mono text-muted">${i + 1}</td>
      <td><span class="mono">${escHtml(s.license_code)}</span></td>
      <td>${escHtml(s.owner)}</td>
      <td><span class="mono text-sm">${s.phone || "—"}</span></td>
      <td><strong style="color:var(--emerald)">Rp ${s.amount.toLocaleString("id-ID")}</strong></td>
      <td><span class="badge badge-blue">${escHtml(s.payment_method)}</span></td>
      <td class="text-muted text-sm">${s.notes ? escHtml(s.notes) : "—"}</td>
      <td><span class="mono text-sm text-muted">${formatDate(s.created_at)}</span></td>
      <td>
        <button class="btn btn-danger btn-sm btn-icon" onclick="deleteSale(${s.id})" title="Hapus">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>`,
    )
    .join("");
}

function openSaleModal() {
  [
    "sale-code",
    "sale-owner",
    "sale-phone",
    "sale-amount",
    "sale-notes",
  ].forEach((id) => {
    document.getElementById(id).value = "";
  });
  openModal("modal-sale");
}

async function saveSale() {
  const code = document.getElementById("sale-code").value.trim();
  const owner = document.getElementById("sale-owner").value.trim();
  const phone = document.getElementById("sale-phone").value.trim();
  const amount = parseInt(document.getElementById("sale-amount").value) || 0;
  const method = document.getElementById("sale-method").value;
  const notes = document.getElementById("sale-notes").value.trim();

  if (!code || !owner || !phone) {
    toast("Kode, owner, dan phone wajib diisi", "error");
    return;
  }

  try {
    await api("/api/admin/sales", {
      method: "POST",
      body: JSON.stringify({
        license_code: code,
        owner,
        phone,
        amount,
        payment_method: method,
        notes: notes || null,
      }),
    });
    toast("Penjualan dicatat", "success");
    closeModal("modal-sale");
    loadSales();
  } catch (e) {
    toast(e.message, "error");
  }
}

function deleteSale(id) {
  confirm("Hapus Penjualan", "Hapus record ini?", async () => {
    try {
      await api(`/api/admin/sales/${id}`, { method: "DELETE" });
      toast("Dihapus", "success");
      loadSales();
    } catch (e) {
      toast(e.message, "error");
    }
  });
}

async function loadUsage() {
  try {
    usageData = await api("/api/admin/usage?limit=500");
    renderUsage();
  } catch (e) {
    toast("Gagal memuat usage log", "error");
  }
}

function renderUsage() {
  const q = document.getElementById("usage-search").value.toLowerCase();
  const filtered = usageData.filter((l) => {
    const matchFilter = usageFilter === "all" || l.endpoint === usageFilter;
    const matchSearch =
      l.license_code.toLowerCase().includes(q) ||
      l.pin.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const tbody = document.getElementById("usage-tbody");
  if (!filtered.length) {
    tbody.innerHTML = emptyRow(
      6,
      "Tidak ada log ditemukan",
      '<i class="fa-solid fa-chart-line"></i>',
    );
    return;
  }
  tbody.innerHTML = filtered
    .map(
      (l, i) => `
    <tr>
      <td class="mono text-muted">${i + 1}</td>
      <td><span class="mono">${escHtml(l.license_code)}</span></td>
      <td>${l.endpoint === "quizizz" ? '<span class="badge badge-blue">Quizizz</span>' : '<span class="badge badge-cyan">Kahoot</span>'}</td>
      <td class="overflow-hidden"><span class="mono text-sm">${escHtml(l.pin)}</span></td>
      <td><span class="badge ${l.status_code === 200 ? "badge-green" : "badge-red"}">${l.status_code}</span></td>
      <td><span class="mono text-sm text-muted">${formatDate(l.created_at)}</span></td>
    </tr>`,
    )
    .join("");
}

function filterUsage() {
  renderUsage();
}

function setUsageFilter(f, el) {
  usageFilter = f;
  document
    .querySelectorAll("[data-ufilter]")
    .forEach((b) => b.classList.remove("active"));
  el.classList.add("active");
  renderUsage();
}

function clearUsage() {
  confirm(
    "Bersihkan Log",
    "Hapus SEMUA usage log? Tindakan ini tidak bisa dibatalkan.",
    async () => {
      try {
        await api("/api/admin/usage", { method: "DELETE" });
        toast("Log dibersihkan", "success");
        loadUsage();
      } catch (e) {
        toast(e.message, "error");
      }
    },
  );
}

function emptyRow(cols, msg, icon = '<i class="fa-solid fa-mailbox"></i>') {
  return `<tr><td colspan="${cols}"><div class="empty-state"><div class="empty-icon">${icon}</div><div class="empty-title">${msg}</div></div></td></tr>`;
}

function formatDate(str) {
  if (!str) return "—";
  try {
    const d = new Date(str.replace(" ", "T"));
    d.setHours(d.getHours() + 8); 
    return (
      d.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }) +
      " " +
      d
        .toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
        .replace(":", ".")
    );
  } catch {
    return str;
  }
}

(function checkSession() {
  const key = sessionStorage.getItem("admin_key");
  const user = sessionStorage.getItem("admin_user") || "Admin";
  if (key) {
    API_KEY = key;
    startApp(user);
  }
})();

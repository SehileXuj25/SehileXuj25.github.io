// Timer script - v3
// Timer starts from September 16, 2026 at 23:35 GMT and counts down 100 hours
const startTime = Date.UTC(2026, 8, 16, 23, 35, 0); // Month is 0-indexed (8 = September)
const endTime = startTime + (100 * 60 * 60 * 1000); // Add 100 hours in milliseconds
console.log("Timer script loaded - v3");
console.log("Start time:", new Date(startTime).toISOString());
console.log("End time:", new Date(endTime).toISOString());
console.log("Current time:", new Date().toISOString());

function updateTimer() {
  const timeLeft = endTime - Date.now();
  const el = document.getElementById("timer");
  if (!el) return;
  if (timeLeft <= 0) {
    el.textContent = "00:00:00";
    return;
  }
  const hours = Math.floor(timeLeft / 3600000);
  const minutes = Math.floor((timeLeft % 3600000) / 60000);
  const seconds = Math.floor((timeLeft % 60000) / 1000);
  el.textContent =
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0");
}

const xmrEl = document.getElementById("xmr");
const usdEl = document.getElementById("usd");
if (xmrEl) xmrEl.textContent = "1.23";
if (usdEl) usdEl.textContent = "$1,890";

const xmrToast = document.getElementById("xmr-toast");
const toast = document.getElementById("toast");
const xmrAddress = "8BvXFt6v7aSR3Qs9SPgBVLWQzAragHtTiXn3Us3Eh2wLjED1zE4D7a5KxsRE3Wn4e1CjjLJydavscdcwge2UurTUKsgGBXe";
const ID = "0548b3c2be496218baa2314386787badfd458a868240a19ede82eabb6a13dd2c26";

function fallbackCopy(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  document.execCommand("copy");
  document.body.removeChild(ta);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    fallbackCopy(text);
  }
}

function showToast(kind) {
  if (kind === "id" && toast) {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1600);
  } else if (xmrToast) {
    xmrToast.style.opacity = "1";
    setTimeout(() => { xmrToast.style.opacity = "0"; }, 1600);
  }
}

document.querySelectorAll("[data-copy]").forEach((el) => {
  el.addEventListener("click", async function () {
    const copyTarget = this.getAttribute("data-copy");
    const text = copyTarget === "id" ? ID : xmrAddress;
    await copyText(text);
    showToast(copyTarget);
  });
});

setInterval(updateTimer, 1000);
updateTimer();

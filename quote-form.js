const form = document.getElementById("quoteForm");
const statusBox = document.getElementById("quoteSuccess");
const statusTitle = document.getElementById("quoteStatusTitle");
const statusMessage = document.getElementById("quoteStatusMessage");
const recipient = "alexanderarinze@outloook.com";

const dateInput = document.getElementById("completionDate");
if (dateInput) {
  const today = new Date();
  dateInput.min = [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
}

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const fields = [
    ["Name", data.get("fullName")],
    ["Business", data.get("businessName")],
    ["Email", data.get("email")],
    ["Phone", data.get("phone")],
    ["Industry", data.get("industry")],
    ["Website type", data.get("websiteType")],
    ["Current website", data.get("existingWebsite")],
    ["Budget", data.get("budget")],
    ["Completion date", data.get("completionDate")],
    ["Features", data.getAll("features").join(", ") || "None selected"],
    ["Preferred contact", data.get("contactMethod")],
    ["Project description", data.get("description")]
  ];
  const body = fields.map(([label, value]) => `${label}: ${String(value || "Not provided").trim()}`).join("\n\n");
  const subject = `LexDev quote request — ${String(data.get("businessName") || data.get("fullName")).trim()}`;

  statusTitle.textContent = "Your email draft is ready.";
  statusMessage.textContent = "Your email app should open with the enquiry details. Review them and press Send to deliver your request. If it doesn’t open, email hello@lexdev.nl directly.";
  statusBox.classList.add("show");
  statusBox.classList.remove("error");
  statusBox.scrollIntoView({ behavior: "smooth", block: "center" });
  window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

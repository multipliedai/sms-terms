# Quick Start: Google Sheets Setup

## 🚀 5-Minute Setup

### 1. Create Google Sheet
- Go to [sheets.google.com](https://sheets.google.com)
- Create new sheet
- Add headers in Row 1: `Name` | `Phone` | `Consent` | `Timestamp` | `Date`

### 2. Add Apps Script
- In sheet: **Extensions** → **Apps Script**
- Delete default code
- Copy entire contents of `apps-script-code.js` and paste
- **Save** (Ctrl+S / Cmd+S)

### 3. Deploy as Web App
- Click **Deploy** → **New deployment**
- Click ⚙️ gear → Select **Web app**
- Set:
  - Execute as: **Me**
  - Who has access: **Anyone** ⚠️ (IMPORTANT!)
- Click **Deploy**
- **Authorize** when prompted
- **Copy the Web App URL** (looks like `https://script.google.com/macros/s/.../exec`)

### 4. Update optin.html
- Open `optin.html`
- Find: `const BACKEND_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';`
- Replace with your copied URL
- Save

### 5. Deploy & Test
```bash
git add optin.html
git commit -m "Add Google Sheets backend"
git push
```
- Visit: `https://smsterms.multiplied.ai/optin.html`
- Submit test form
- Check your Google Sheet - data should appear!

---

## 📖 Need More Details?

See `GOOGLE_SHEETS_SETUP.md` for complete instructions with troubleshooting.

---

## ✅ Checklist

- [ ] Google Sheet created with headers
- [ ] Apps Script code added
- [ ] Deployed as Web App (set to "Anyone")
- [ ] Web App URL copied
- [ ] optin.html updated with URL
- [ ] Pushed to GitHub
- [ ] Tested form submission
- [ ] Verified data in Google Sheet

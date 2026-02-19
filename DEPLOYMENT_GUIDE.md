# Deployment Guide for SMS Terms Pages

## 📋 Quick Deployment Steps

### 1. Deploy Additional Pages to GitHub Pages

Since you already have `index.html` deployed, adding the other pages is simple:

1. **Commit the files** (if not already committed):
   ```bash
   git add optin.html submit-consent.html
   git commit -m "Add optin and submit-consent pages"
   ```

2. **Push to GitHub**:
   ```bash
   git push origin main  # or master, depending on your branch
   ```

3. **Pages will be automatically available at**:
   - `https://smsterms.multiplied.ai/optin.html`
   - `https://smsterms.multiplied.ai/submit-consent.html`

That's it! GitHub Pages will automatically serve these files.

---

## 🔧 Backend Storage Solutions

**Important**: GitHub Pages is **static hosting only** - it cannot process form submissions or store data. You need an external service.

### Option 1: Formspree (Recommended - Easiest) ⭐

**Best for**: Quick setup, free tier available

1. **Sign up**: Go to https://formspree.io and create a free account
2. **Create a form**: You'll get a unique endpoint like `https://formspree.io/f/YOUR_FORM_ID`
3. **Update optin.html**: Replace `YOUR_BACKEND_URL_HERE` with your Formspree URL
4. **Submissions**: Will be emailed to you and stored in Formspree dashboard
5. **Free tier**: 50 submissions/month

**Update the JavaScript in optin.html**:
```javascript
const BACKEND_URL = 'https://formspree.io/f/YOUR_FORM_ID';
```

---

### Option 2: Webhook.site (For Testing)

**Best for**: Testing and development

1. **Visit**: https://webhook.site
2. **Copy your unique URL**: You'll get something like `https://webhook.site/YOUR_UNIQUE_ID`
3. **Update optin.html**: Replace `YOUR_BACKEND_URL_HERE` with the webhook URL
4. **View submissions**: Check the webhook.site page to see incoming data

---

### Option 3: Google Sheets + Apps Script (Free, Persistent Storage)

**Best for**: Free, permanent storage in a spreadsheet

1. **Create a Google Sheet**: Create a new sheet with columns: Name, Phone, Consent, Timestamp
2. **Create Apps Script**:
   - Go to Extensions → Apps Script
   - Create a web app that accepts POST requests
   - Save data to the sheet
3. **Deploy as web app**: Get the web app URL
4. **Update optin.html**: Use the Apps Script URL

**Sample Apps Script** (simplified):
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.name, data.phone, data.consent, data.timestamp]);
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

---

### Option 4: Your Own Backend API

**Best for**: Full control, custom logic

If you have your own backend (Node.js, Python, etc.):

1. **Create an endpoint**: `/submit-consent` that accepts POST requests
2. **Store data**: Save to database (PostgreSQL, MongoDB, etc.)
3. **Update optin.html**: Point to your API URL
4. **CORS**: Ensure your API allows requests from `smsterms.multiplied.ai`

**Example Node.js/Express endpoint**:
```javascript
app.post('/submit-consent', async (req, res) => {
  const { name, phone, consent } = req.body;
  // Save to database
  await db.consents.create({ name, phone, consent, timestamp: new Date() });
  res.json({ success: true });
});
```

---

### Option 5: Serverless Functions (Vercel, Netlify, AWS Lambda)

**Best for**: No server management, scalable

1. **Vercel/Netlify**: Create a serverless function
2. **Store data**: Use their database add-ons or external database
3. **Deploy**: Function gets a URL automatically
4. **Update optin.html**: Use the function URL

---

## 🚀 Recommended Setup

**For quick deployment**: Use **Formspree** (Option 1)
- Free tier: 50 submissions/month
- No code changes needed (just update the URL)
- Emails you each submission
- Can upgrade for more submissions

**For permanent free storage**: Use **Google Sheets + Apps Script** (Option 3)
- Completely free
- Data stored in a spreadsheet you own
- Can export/analyze easily

---

## 📝 Next Steps

1. ✅ Files are ready to deploy (optin.html updated with JavaScript)
2. ⬜ Choose a backend service (recommend Formspree for quick start)
3. ⬜ Update `BACKEND_URL` in optin.html with your chosen service URL
4. ⬜ Commit and push to GitHub
5. ⬜ Test the form submission

---

## 🔍 Testing

After deployment:
1. Visit `https://smsterms.multiplied.ai/optin.html`
2. Fill out the form
3. Submit and verify:
   - Redirects to `submit-consent.html`
   - Data appears in your chosen backend service

---

## ⚠️ Important Notes

- **CORS**: If using a custom API, ensure CORS headers allow requests from your domain
- **HTTPS**: All services should use HTTPS for security
- **Privacy**: Ensure your backend service complies with privacy regulations (GDPR, etc.)
- **Backup**: Consider backing up submissions regularly if using a third-party service

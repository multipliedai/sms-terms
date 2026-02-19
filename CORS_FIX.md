# CORS Error Fix for Google Apps Script

## The Problem
Google Apps Script web apps have CORS limitations when called from JavaScript fetch requests.

## The Solution
I've updated both files to handle this. Follow these steps:

### Step 1: Update Your Apps Script Code

1. Go to your Google Sheet
2. Open **Extensions** → **Apps Script**
3. **Replace the entire code** with the updated code from `apps-script-code.js`
4. **Save** the script (Ctrl+S / Cmd+S)

### Step 2: Redeploy Your Web App

**IMPORTANT**: You MUST create a new deployment version for the changes to take effect!

1. In Apps Script, click **Deploy** → **Manage deployments**
2. Click the **pencil icon** (edit) next to your existing deployment
3. Click **New version**
4. Click **Deploy**
5. **Copy the new Web App URL** (it might be the same, but you need a new version)

### Step 3: Update optin.html (if URL changed)

If your Web App URL changed, update it in `optin.html`:
- Find: `const BACKEND_URL = '...'`
- Replace with your new URL

### Step 4: Test

1. Push your updated `optin.html` to GitHub
2. Visit your optin page
3. Submit the form
4. Check your Google Sheet - data should appear!

---

## What Changed?

### Apps Script (`apps-script-code.js`):
- ✅ Added `doOptions()` function to handle CORS preflight
- ✅ Added CORS headers to responses
- ✅ Now handles both JSON and form-encoded data

### optin.html:
- ✅ Changed to use form-encoded data (more compatible with Apps Script)
- ✅ Better error handling for CORS issues
- ✅ Automatic redirect even if response can't be read

---

## Alternative: If CORS Still Doesn't Work

If you still get CORS errors after updating, use this workaround:

### Option A: Use a Redirect-Based Approach

Update your Apps Script to redirect after saving:

```javascript
// In doPost, after saving data:
const redirectUrl = e.parameter.redirect || 'https://smsterms.multiplied.ai/submit-consent.html';
return HtmlService.createHtmlOutput(`
  <script>window.location.href = '${redirectUrl}';</script>
`);
```

### Option B: Use a Simple Form Submit

Change optin.html to use a traditional form submission (no JavaScript fetch):

```html
<form action="YOUR_APPS_SCRIPT_URL" method="POST">
  <!-- form fields -->
</form>
```

---

## Still Having Issues?

1. **Check browser console** for the exact CORS error
2. **Verify Apps Script deployment** is set to "Anyone" access
3. **Check Apps Script execution logs** (View → Logs) for errors
4. **Try the redirect-based approach** (Option A above)

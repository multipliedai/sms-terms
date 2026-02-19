# Google Sheets + Apps Script Setup Guide

This guide will help you set up Google Sheets to store form submissions from your optin page.

## 📋 Step-by-Step Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "SMS Consent Submissions"
4. In the first row (Row 1), add these column headers:
   - **A1**: `Name`
   - **B1**: `Phone`
   - **C1**: `Consent`
   - **D1**: `Timestamp`
   - **E1**: `Date` (optional, for easier reading)

5. **Format the header row** (optional but recommended):
   - Select Row 1
   - Make it bold (Ctrl+B or Cmd+B)
   - Add a background color (e.g., light gray)

### Step 2: Create Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
   - This opens a new tab with the Apps Script editor

2. **Delete any default code** in the editor

3. **Copy and paste** the code from `apps-script-code.js` (or see below)

4. **Save the project**:
   - Click the floppy disk icon or press `Ctrl+S` (Windows) / `Cmd+S` (Mac)
   - Name your project (e.g., "SMS Consent Handler")

### Step 3: Deploy as Web App

1. In the Apps Script editor, click **Deploy** → **New deployment**

2. Click the **gear icon** (⚙️) next to "Select type" and choose **Web app**

3. **Configure the deployment**:
   - **Description**: "SMS Consent Form Handler" (or any description)
   - **Execute as**: Select **Me** (your email)
   - **Who has access**: Select **Anyone** (important for public forms!)

4. Click **Deploy**

5. **Authorize the script**:
   - You'll be prompted to authorize the script
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Project Name] (unsafe)**
   - Click **Allow** to grant permissions

6. **Copy the Web App URL**:
   - After deployment, you'll see a "Web app" URL
   - It looks like: `https://script.google.com/macros/s/AKfycby.../exec`
   - **Copy this URL** - you'll need it for the next step!

### Step 4: Update optin.html

1. Open `optin.html` in your code editor

2. Find this line (around line 145):
   ```javascript
   const BACKEND_URL = 'YOUR_BACKEND_URL_HERE';
   ```

3. Replace `YOUR_BACKEND_URL_HERE` with your Web App URL from Step 3:
   ```javascript
   const BACKEND_URL = 'https://script.google.com/macros/s/AKfycby.../exec';
   ```

4. Save the file

### Step 5: Test the Setup

1. **Test the Apps Script directly**:
   - In Apps Script editor, click the **Run** button (▶️)
   - Select `doPost` function
   - Click **Run**
   - You may need to authorize again

2. **Test with your form**:
   - Deploy your updated `optin.html` to GitHub Pages
   - Visit `https://smsterms.multiplied.ai/optin.html`
   - Fill out and submit the form
   - Check your Google Sheet - you should see a new row with the submission!

### Step 6: Deploy to GitHub Pages

1. Commit your changes:
   ```bash
   git add optin.html
   git commit -m "Configure Google Sheets backend for form submissions"
   git push origin main
   ```

2. Wait a few minutes for GitHub Pages to update

3. Test the live form!

---

## 🔧 Troubleshooting

### Issue: "Script function not found"
- **Solution**: Make sure you saved the Apps Script code and the function is named `doPost`

### Issue: "Access denied" or CORS errors
- **Solution**: Make sure "Who has access" is set to **Anyone** in the deployment settings

### Issue: Data not appearing in sheet
- **Solution**: 
  1. Check the Apps Script execution log (View → Logs)
  2. Make sure the sheet name matches (default is the first sheet)
  3. Verify the column headers are in Row 1

### Issue: "Authorization required"
- **Solution**: 
  1. Go to Deploy → Manage deployments
  2. Click the pencil icon (edit)
  3. Click "New version"
  4. Re-authorize if prompted

---

## 📊 Viewing Submissions

- Open your Google Sheet anytime to see all submissions
- Data is stored in real-time as forms are submitted
- You can:
  - Sort by date
  - Filter submissions
  - Export to CSV
  - Create charts/analytics
  - Share with team members

---

## 🔒 Security Notes

- The Web App URL is public, but only accepts POST requests
- Consider adding basic validation or rate limiting in the Apps Script
- The sheet is only accessible to people you share it with
- For production, consider adding additional validation

---

## ✅ Checklist

- [ ] Google Sheet created with proper column headers
- [ ] Apps Script code deployed
- [ ] Web App URL copied
- [ ] optin.html updated with Web App URL
- [ ] Tested locally/on GitHub Pages
- [ ] Verified data appears in Google Sheet

---

## 🎉 You're Done!

Your form submissions will now be automatically saved to Google Sheets. Check your sheet regularly to see new submissions!

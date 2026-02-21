# Google Apps Script — Contact Form Setup Guide

This guide walks you through creating a completely **free, serverless email backend** for the portfolio contact form using Google Apps Script. No third-party services, no API keys, no monthly limits beyond Google's generous quotas.

---

## Overview — How It Works

When a visitor submits the contact form:

1. The form data (name, email, message) is sent via a `fetch` POST request to your **Google Apps Script Web App URL**
2. The script receives the JSON payload
3. It **appends a new row** to your Google Sheet (so you have a permanent log of every message)
4. It **sends you an email notification** containing the visitor's details
5. It returns a `{ "result": "success" }` JSON response

> **Important:** The fetch call uses `mode: "no-cors"` — this is required for Google Apps Script endpoints and means you won't get a readable response object back in JavaScript, even if the script succeeds. The form shows "success" optimistically after the request is dispatched. This is normal and expected behaviour.

---

## Step 1 — Create the Google Sheet

1. Go to [Google Sheets](https://docs.google.com/spreadsheets/) and click **Blank spreadsheet**
2. Rename it something meaningful, e.g. **"Portfolio Contact Form"**
3. Set up the header row — click on cell **A1** and add these four headers (one per column):

| A1   | B1   | C1    | D1      |
| ---- | ---- | ----- | ------- |
| Date | Name | Email | Message |

> These header names must match exactly — the script writes in this column order.

---

## Step 2 — Open Apps Script

1. With your Google Sheet open, click **Extensions** in the top menu
2. Click **Apps Script**
3. A new browser tab opens with the Apps Script editor (`Code.gs` file already open)

---

## Step 3 — Paste the Script

1. **Select all** existing code in `Code.gs` and delete it (it's usually just an empty `myFunction`)
2. Paste the following code in its place:

```javascript
function doPost(e) {
  // Parse incoming JSON from the contact form
  const data = JSON.parse(e.postData.contents);

  // --- 1. Log to Google Sheet ---
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([
    new Date(), // Column A: Timestamp
    data.name, // Column B: Name
    data.email, // Column C: Email
    data.message, // Column D: Message
  ]);

  // --- 2. Send Email Notification ---
  const emailBody =
    "You received a new message from your portfolio contact form.\n\n" +
    "Name:    " +
    data.name +
    "\n" +
    "Email:   " +
    data.email +
    "\n" +
    "Message:\n" +
    data.message +
    "\n\n" +
    "---\nLogged to Google Sheets at " +
    new Date().toLocaleString();

  MailApp.sendEmail({
    to: "your-email@gmail.com", // ← Replace with YOUR email address
    subject: "📬 New Portfolio Message from " + data.name,
    body: emailBody,
  });

  // --- 3. Return Success Response ---
  return ContentService.createTextOutput(
    JSON.stringify({ result: "success" }),
  ).setMimeType(ContentService.MimeType.JSON);
}
```

> **⚠️ Important:** Replace `"your-email@gmail.com"` with your own Gmail address — this is where notifications will be sent.

---

## Step 4 — Deploy as a Web App

1. Click the **Deploy** button (top-right, blue) → **New deployment**
2. Click the ⚙️ **gear icon** next to "Select type" → choose **Web app**
3. Fill in the deployment settings:

   | Field              | Value                          |
   | ------------------ | ------------------------------ |
   | **Description**    | Portfolio Contact Form Backend |
   | **Execute as**     | **Me** (your Google account)   |
   | **Who has access** | **Anyone**                     |

   > Setting access to **Anyone** is **required** — your website's visitors are anonymous users sending form data, so the script must be publicly accessible.

4. Click **Deploy**

---

## Step 5 — Authorize the Script

The first time you deploy, Google will ask you to grant permissions:

1. Click **Authorize access**
2. Select your Google account from the list
3. You may see a warning: _"Google hasn't verified this app"_ — this is because **you** just wrote this script. It is safe.
   - Click **Advanced** (bottom-left of the warning screen)
   - Click **Go to (your project name) (unsafe)**
4. Review the permissions (read/write Sheets + send email as you) and click **Allow**

> You only need to do this once. Future re-deployments won't require re-authorization unless you change the permission scopes.

---

## Step 6 — Copy the Web App URL

After authorization, you'll see a **"Deployment updated"** (or "New deployment created") dialog.

1. Copy the **Web App URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfycb.../exec
   ```
2. Open `src/components/Contact.jsx` in this project
3. Find line 103 and replace the existing URL:

```js
// Before (the original deployment URL):
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbxVLDlMZIOcNqq1NzD.../exec";

// After (paste your new URL here):
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/YOUR_NEW_URL_HERE/exec";
```

4. Save the file — no other changes needed

---

## Step 7 — Test It

1. Run the portfolio locally with `npm run dev`
2. Navigate to the **Contact** section
3. Submit the form with a test name / email / message
4. Check:
   - ✅ Your **Google Sheet** should have a new row appended
   - ✅ You should receive an **email notification** at the address you set

> If the email doesn't arrive within a minute, check your **Spam folder** first — the first automated email from your script sometimes lands there.

---

## Updating the Script Later

If you make changes to `Code.gs` after the initial deployment, you **must redeploy** for the changes to take effect:

1. Click **Deploy** → **Manage deployments**
2. Click the ✏️ **edit** (pencil) icon on your existing deployment
3. Change **Version** from the current version to **"New version"**
4. Click **Deploy**

> Simply saving `Code.gs` does **not** update the live web app — you always need to create a new version via Manage deployments.

---

## Troubleshooting

| Symptom                           | Likely Cause                       | Fix                                                |
| --------------------------------- | ---------------------------------- | -------------------------------------------------- |
| Sheet has no new row after submit | Script error or wrong URL          | Check Apps Script **Executions** log for errors    |
| No email received                 | Wrong email in `MailApp.sendEmail` | Verify the `to:` field in the script               |
| Form shows "error" state          | `fetch` threw a network error      | Check browser console for details                  |
| "Script function not found" error | `doPost` deleted or renamed        | Paste the script again from Step 3                 |
| Still using old code after edit   | Forgot to redeploy                 | Follow the "Updating the Script Later" steps above |

---

## Why Google Apps Script?

- ✅ **Completely free** — no billing, no usage tiers for personal portfolios
- ✅ **No backend server** to host or maintain
- ✅ **No third-party accounts** (EmailJS, SendGrid, etc.)
- ✅ **Data is yours** — every message is in your own Google Sheet
- ✅ **Email via Gmail** — uses your existing Google account


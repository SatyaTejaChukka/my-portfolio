# Google Apps Script Setup Instructions

Follow these steps to create your free backend for sending emails and saving data to Google Sheets.

## Step 1: Create the Google Sheet
1.  Go to [Google Sheets](https://docs.google.com/spreadsheets/) and create a **Blank spreadsheet**.
2.  Name it something like **"Portfolio Contact Form"**.
3.  In the first row, add these headers:
    *   **A1**: Date
    *   **B1**: Name
    *   **C1**: Email
    *   **D1**: Message

## Step 2: Open Apps Script
1.  In your Google Sheet, click on **Extensions** > **Apps Script**.
2.  A new tab will open with a code editor.

## Step 3: Paste the Code
1.  Delete any code currently in `Code.gs`.
2.  Copy and paste the following code entirely:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  // 1. Append to Google Sheet
  sheet.appendRow([new Date(), data.name, data.email, data.message]);
  
  // 2. Send Email Notification
  const emailBody = "New message from Portfolio:\n\n" +
                    "Name: " + data.name + "\n" +
                    "Email: " + data.email + "\n" +
                    "Message: " + data.message;
                    
  MailApp.sendEmail({
    to: "yourmail@gmail.com", // Your email
    subject: "New Portfolio Contact Message",
    body: emailBody
  });
  
  // 3. Return Success Response
  return ContentService.createTextOutput(JSON.stringify({ "result": "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## Step 4: Deploy as Web App
1.  Click the blue **Deploy** button (top right) > **New deployment**.
2.  Click the **Select type** gear icon > **Web app**.
3.  Fill in the details:
    *   **Description**: Contact Form Backend
    *   **Execute as**: **Me** (your email)
    *   **Who has access**: **Anyone** (This is crucial so your website can send data)
4.  Click **Deploy**.
5.  **Authorize Access**:
    *   Click "Authorize access".
    *   Select your Google account.
    *   You might see a "Google hasn't verified this app" warning (since you just wrote it). Click **Advanced** > **Go to (Project Name) (unsafe)**.
    *   Click **Allow**.

## Step 5: Copy the URL
1.  Copy the **Web App URL** (it starts with `https://script.google.com/macros/s/...`).
2.  **Paste that URL in the chat here.**

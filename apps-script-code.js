/**
 * Google Apps Script to handle SMS Consent Form Submissions
 * 
 * Instructions:
 * 1. Copy this entire code into Google Apps Script editor
 * 2. Deploy as Web App (see GOOGLE_SHEETS_SETUP.md for details)
 * 3. Set "Who has access" to "Anyone"
 * 4. Copy the Web App URL and use it in optin.html
 */

// Handle CORS preflight requests
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
}

function doPost(e) {
  try {
    // Get the active spreadsheet (the one this script is attached to)
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming data - handle both JSON and form-encoded data
    let data;
    if (e.postData.type === 'application/json') {
      data = JSON.parse(e.postData.contents);
    } else {
      // Handle form-encoded data
      const params = e.parameter;
      data = {
        name: params.name || '',
        phone: params.phone || '',
        consent: params.consent === 'true' || params.consent === true,
        timestamp: params.timestamp || new Date().toISOString()
      };
    }
    
    // Extract form fields
    const name = data.name || '';
    const phone = data.phone || '';
    const consent = data.consent ? 'Yes' : 'No';
    const timestamp = data.timestamp || new Date().toISOString();
    
    // Format the date for easier reading (optional)
    const readableDate = new Date(timestamp).toLocaleString();
    
    // Append the data as a new row
    // Format: [Name, Phone, Consent, Timestamp, Date]
    sheet.appendRow([
      name,
      phone,
      consent,
      timestamp,
      readableDate
    ]);
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Consent submitted successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
      
  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      });
  }
}

/**
 * Optional: Test function to verify the script works
 * Run this from the Apps Script editor to test
 */
function testDoPost() {
  const mockData = {
    name: 'Test User',
    phone: '+1 555 555 5555',
    consent: true,
    timestamp: new Date().toISOString()
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(mockData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

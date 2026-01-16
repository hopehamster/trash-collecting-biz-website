# EmailJS Setup Instructions

## Quick Setup (5 minutes)

1. **Go to [emailjs.com](https://www.emailjs.com)** and sign up for a free account
   - Free tier: 200 emails/month (plenty for a contact form)

2. **Add Email Service**
   - Go to "Email Services" in the dashboard
   - Click "Add New Service"
   - Choose "Gmail" or "Outlook" (or any email service)
   - Connect your email account (this is just for sending, not receiving)
   - **Note:** This is YOUR email account that will send the emails. The emails will still go TO `dc.greenfactory@icloud.com`

3. **Create Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template:
   
   ```
   Subject: New Contact Form Submission from {{from_name}}
   
   You have a new message from your website contact form:
   
   Name: {{from_name}}
   Email: {{from_email}}
   Phone: {{phone}}
   Service Needed: {{service}}
   
   Message:
   {{message}}
   
   ---
   Reply to: {{from_email}}
   ```

4. **Get Your Keys**
   - Go to "Account" → "General"
   - Copy your **Public Key**
   - Go back to "Email Services" and copy your **Service ID**
   - Go to "Email Templates" and copy your **Template ID**

5. **Update the Code**
   - Open `js/main.js`
   - Find these lines (around line 187):
     ```javascript
     emailjs.init("YOUR_PUBLIC_KEY");
     emailjs.send(
         "YOUR_SERVICE_ID",
         "YOUR_TEMPLATE_ID",
     ```
   - Replace:
     - `YOUR_PUBLIC_KEY` with your Public Key
     - `YOUR_SERVICE_ID` with your Service ID
     - `YOUR_TEMPLATE_ID` with your Template ID

6. **Test the Form**
   - Submit a test message
   - Check `dc.greenfactory@icloud.com` for the email

## Alternative: Use FormSubmit.co (Even Simpler!)

If you want an even simpler solution that requires NO account setup:

1. Change the form action to:
   ```html
   <form action="https://formsubmit.co/dc.greenfactory@icloud.com" method="POST">
   ```

2. Add a hidden field:
   ```html
   <input type="hidden" name="_captcha" value="false">
   <input type="hidden" name="_next" value="https://yoursite.com/thank-you">
   ```

That's it! FormSubmit.co is completely free and requires no account.

## Which Should You Use?

- **EmailJS**: More control, better templates, analytics (requires account setup)
- **FormSubmit.co**: Zero setup, works immediately (simpler but less features)

I recommend FormSubmit.co for simplicity, but EmailJS if you want more features later.

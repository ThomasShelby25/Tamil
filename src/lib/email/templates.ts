export const getContactConfirmationEmail = (name: string) => ({
  subject: "Thank you for reaching out - VELSAIM",
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #FF0080 0%, #7928CA 100%); color: white; padding: 30px; border-radius: 8px; }
          .content { padding: 20px; background: #f9fafb; border-radius: 8px; margin-top: 20px; }
          .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
          .cta { display: inline-block; background: #FF0080; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Thank you, ${name}!</h1>
            <p>We received your inquiry and will get back to you shortly.</p>
          </div>
          
          <div class="content">
            <p>Hi ${name},</p>
            <p>Thank you for reaching out to VELSAIM. We're excited to learn more about your infrastructure needs.</p>
            <p>Our team is reviewing your message and will respond within 24 hours with next steps.</p>
            
            <h3>What happens next?</h3>
            <ul>
              <li>Our engineers will review your requirements</li>
              <li>We'll schedule a 30-minute discovery call</li>
              <li>We'll provide a tailored solution for your needs</li>
            </ul>
            
            <p>In the meantime, feel free to explore our <a href="https://velsaim.io/technology">technology</a> and <a href="https://velsaim.io/architecture">architecture</a> pages.</p>
          </div>
          
          <div class="footer">
            <p>© 2026 VELSAIM. All rights reserved.</p>
            <p>This is an automated email. Please don't reply directly to this message.</p>
          </div>
        </div>
      </body>
    </html>
  `,
});

export const getContactNotificationEmail = (name: string, email: string, message: string) => ({
  subject: `New Contact Form Submission - ${name}`,
  html: `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #1f2937; color: white; padding: 20px; border-radius: 8px; }
          .content { padding: 20px; background: #f9fafb; border-radius: 8px; margin-top: 20px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #666; }
          .value { margin-top: 5px; padding: 10px; background: white; border-left: 3px solid #FF0080; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>New Contact Form Submission</h2>
          </div>
          
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${name}</div>
            </div>
            
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            
            <div class="field">
              <div class="label">Message</div>
              <div class="value">${message.replace(/\n/g, "<br>")}</div>
            </div>
            
            <p style="margin-top: 30px; color: #666;">
              <strong>Submitted at:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </body>
    </html>
  `,
});

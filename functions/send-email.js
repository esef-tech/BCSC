const sgMail = require('@sendgrid/mail');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' }),
    };
  }

  // Parse form data
  let data;
  try {
    data = JSON.parse(event.body);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Invalid request body' }),
    };
  }

  const { name, email, subject, message } = data;

  // Basic validation
  if (!name || !email) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Name and email are required' }),
    };
  }

  // Configure SendGrid
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: 'bestcoah@gmail.com',
    from: 'eseftechnology@gmail.com', // Must be verified in SendGrid
    subject: subject || 'Newsletter Subscription',
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject || 'Newsletter Subscription'}
      Message: ${message || 'User subscribed to newsletter'}
    `,
    html: `
      <h3>New Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject || 'Newsletter Subscription'}</p>
      <p><strong>Message:</strong> ${message || 'User subscribed to newsletter'}</p>
    `,
  };

  try {
    await sgMail.send(msg);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' }),
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Error sending email', error: error.message }),
    };
  }
};
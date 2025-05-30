$(document).ready(function() {
  function handleFormSubmission(formId, successDivId, nameId, emailId, subjectId, messageId) {
    $(formId).on('submit', function(e) {
      e.preventDefault();

      const formData = {
        name: $(nameId).val(),
        email: $(emailId).val(),
        subject: subjectId ? $(subjectId).val() : 'Newsletter Subscription',
        message: messageId ? $(messageId).val() : 'User subscribed to newsletter',
      };

      $(successDivId).html('');

      $.ajax({
        url: '/.netlify/functions/send-email',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(response) {
          $(successDivId).html('<div class="alert alert-success">Form submitted successfully!</div>');
          $(formId)[0].reset();
        },
        error: function(xhr) {
          const errorMsg = xhr.responseJSON && xhr.responseJSON.message
            ? xhr.responseJSON.message
            : 'An error occurred while submitting the form.';
          $(successDivId).html(`<div class="alert alert-danger">${errorMsg}</div>`);
        },
      });
    });
  }

  // Contact Form
  handleFormSubmission(
    '#contactForm',
    '#success',
    '#name',
    '#email',
    '#subject',
    '#message'
  );

  // Newsletter Form
  handleFormSubmission(
    '#newsletterForm',
    '#newsletter_success',
    '#newsletter_name',
    '#newsletter_email',
    null,
    null
  );
});
$(document).ready(function() {
  $('#newsletterForm').on('submit', function(e) {
    e.preventDefault();

    // Log form data for debugging
    const formData = {
      name: $('#newsletterName').val(),
      email: $('#newsletterEmail').val(),
      subject: 'Newsletter Subscription',
      message: 'User subscribed to newsletter'
    };
    console.log('Newsletter Form Data:', formData);

    $('#newsletterSuccess').html('');

    $.ajax({
      url: '/.netlify/functions/send-email',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(response) {
        console.log('Newsletter submission successful:', response);
        $('#newsletterSuccess').html('<div class="alert alert-success">Form submitted successfully!</div>');
        $('#newsletterForm')[0].reset();
      },
      error: function(xhr, status, error) {
        console.error('Newsletter submission error:', {
          status: status,
          error: error,
          response: xhr.responseJSON,
          statusCode: xhr.status
        });
        const errorMsg = xhr.responseJSON && xhr.responseJSON.message
          ? xhr.responseJSON.message
          : 'An error occurred while submitting the form.';
        $('#newsletterSuccess').html(`<div class="alert alert-danger">${errorMsg}</div>`);
      }
    });
  });
});
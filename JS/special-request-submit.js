$(document).ready(function() {
  $('#specialRequestForm').on('submit', function(e) {
    e.preventDefault();

    // Get form data
    const name = $('#specialRequestName').val().trim();
    const email = $('#specialRequestEmail').val().trim();
    const service = $('#specialRequestService').val();

    // Validate form data
    if (!name || !email || !service) {
      console.warn('Validation failed:', { name, email, service });
      $('#specialRequestSuccess').html('<div class="alert alert-danger">Please fill out all fields.</div>');
      return;
    }

    // Log form data for debugging
    const formData = {
      name: name,
      email: email,
      subject: 'Special Request: ' + service,
      message: 'User requested: ' + service
    };
    console.log('Special Request Form Data:', formData);

    $('#specialRequestSuccess').html('');

    $.ajax({
      url: '/.netlify/functions/send-email',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(formData),
      success: function(response) {
        console.log('Special Request submission successful:', response);
        $('#specialRequestSuccess').html('<div class="alert alert-success">Request is successfully sent</div>');
        $('#specialRequestForm')[0].reset();
      },
      error: function(xhr, status, error) {
        console.error('Special Request submission error:', {
          status: status,
          error: error,
          response: xhr.responseJSON,
          statusCode: xhr.status,
          responseText: xhr.responseText
        });
        const errorMsg = xhr.responseJSON && xhr.responseJSON.message
          ? xhr.responseJSON.message
          : 'An error occurred while submitting the form.';
        $('#specialRequestSuccess').html(`<div class="alert alert-danger">${errorMsg}</div>`);
      }
    });
  });
});
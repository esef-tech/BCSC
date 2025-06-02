$(document).ready(function() {
  console.log('special-request-submit.js loaded');

  $('#specialRequestForm').on('submit', function(e) {
    e.preventDefault();
    console.log('Special Request Form submit event triggered');

    // Get form data
    const name = $('#specialRequestName').val().trim();
    const email = $('#specialRequestEmail').val().trim();
    const service = $('#specialRequestService').val();

    // Validate form data
    if (!name || !email || !service || service === '') {
      console.warn('Validation failed:', { name, email, service });
      $('#specialRequestSuccess').html('<div class="alert alert-danger">Please fill out all fields, including a valid service.</div>');
      return;
    }

    // Log form data
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
      complete: function(xhr, status) {
        console.log('AJAX complete:', { status: status, statusCode: xhr.status, response: xhr.responseJSON });
      },
      success: function(response, textStatus, xhr) {
        if (xhr.status === 200) {
          console.log('Special Request submission successful:', response);
          $('#specialRequestSuccess').html('<div class="alert alert-success">Request is successfully sent</div>').fadeOut(0);
          $('#specialRequestForm')[0].reset();
        } else {
          console.warn('Unexpected success status:', xhr.status);
          $('#specialRequestSuccess').html('<div class="alert alert-danger">Unexpected response. Please try again.</div>');
        }
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
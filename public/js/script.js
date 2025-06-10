(() => {
  'use strict';

  // Get all forms with the 'needs-validation' class
  const forms = document.querySelectorAll('.needs-validation');

  // Loop through each form
  forms.forEach(form => {
    form.addEventListener('submit', event => {
      // Check if the form is valid
      if (!form.checkValidity()) {
        // Prevent form submission if invalid
        event.preventDefault();
        event.stopPropagation();
      }

      // Add Bootstrap's 'was-validated' class to trigger validation feedback
      form.classList.add('was-validated');
    });
  });
})();

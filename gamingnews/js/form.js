// Function to clear form fields
function clearFields(formId) {
   // Ask for user confirmation before clearing fields
   var confirmation = confirm("Are you sure you want to clear the fields?");
   if (confirmation) {
      // Clear the values of name, phone, and email fields
      document.getElementById(formId + "-name").value = "";
      document.getElementById(formId + "-phone").value = "";
      document.getElementById(formId + "-email").value = "";

      // Check if the form is the contact form, then clear the message field
      if (formId === "contact-form") {
         document.getElementById(formId + "-message").value = "";
      }


      // Uncheck terms checkbox
      var termsCheckbox = form.querySelector('#terms-checkbox');
      termsCheckbox.checked = false;
   }
}

// Function to submit the form
function submitForm(formId) {
   // Get the form element using the provided formId
   var form = document.getElementById(formId);

   // Retrieve values from name, phone, and email fields
   var name = form.querySelector("#" + formId + "-name").value;
   var phone = form.querySelector("#" + formId + "-phone").value;
   var email = form.querySelector("#" + formId + "-email").value;

   // Check if the terms checkbox is selected
   var termsCheckbox = form.querySelector('#terms-checkbox');
   var termsConfirmed = termsCheckbox.checked;

   // Ask for user confirmation before submitting the form
   var confirmation = confirm(
      "Please confirm:\n\n" +
      "Name: " + name + "\nPhone: " + phone + "\nEmail: " + email +
      "\n\nIs this information correct?"
   );

   // If user confirms and terms are confirmed, show a thank you message, clear fields, and provide feedback timeframe
   if (confirmation && termsConfirmed) {
      alert("Thank you for contacting us. You will receive feedback via email within 24-48 business hours!");
      clearFields(formId);
   } else if (!termsConfirmed) {
      alert("Please agree to the terms before submitting the form.");
   }
}
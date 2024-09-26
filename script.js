document.addEventListener('DOMContentLoaded', function () {
    const signUpButton = document.getElementById('signUpButton');
    const signInButton = document.getElementById('signInButton');
    const signInForm = document.getElementById('signIn');
    const signUpForm = document.getElementById('signup');
  
    // Initially show only the Sign In form
    signInForm.style.display = 'block';
    signUpForm.style.display = 'none';
  
    // Show Sign Up form when "Sign Up" button is clicked
    signUpButton.addEventListener('click', function () {
      signInForm.style.display = 'none';
      signUpForm.style.display = 'block';
    });
  
    // Show Sign In form when "Sign In" button is clicked
    signInButton.addEventListener('click', function () {
      signUpForm.style.display = 'none';
      signInForm.style.display = 'block';
    });
  });
  
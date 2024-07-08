'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);

document.addEventListener('DOMContentLoaded', function () {
  const accountLink = document.getElementById('account-link');

  accountLink.addEventListener('click', function () {
    mainContent.innerHTML = `
      <div class="account">
        <h2>Login / Register</h2>
        <form id="account-form">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
          </div>
          <div class="form-group">
            <label for="email" id="email-label" style="display: none;">Email:</label>
            <input type="email" id="email" name="email" style="display: none;">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
          </div>
          <button type="submit">Login</button>
          <p id="account-feedback" style="color:red;"></p>
          <p id="toggle-register" style="cursor: pointer; color: #600fbd;">Not registered? Click here to register</p>
        </form>
      </div>
    `;

    const accountForm = document.getElementById('account-form');
    const emailLabel = document.getElementById('email-label');
    const emailInput = document.getElementById('email');
    const toggleRegister = document.getElementById('toggle-register');

    toggleRegister.addEventListener('click', function () {
      const isRegistering = emailInput.style.display === 'none';
      emailLabel.style.display = isRegistering ? 'block' : 'none';
      emailInput.style.display = isRegistering ? 'block' : 'none';
      accountForm.querySelector('button').textContent = isRegistering ? 'Register' : 'Login';
      toggleRegister.textContent = isRegistering ? 'Already registered? Click here to login' : 'Not registered? Click here to register';
    });

    accountForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const email = emailInput.style.display === 'block' ? document.getElementById('email').value : null;
      const isRegistering = emailInput.style.display === 'block';
      const url = isRegistering ? '/user/register' : '/user/login';
      const payload = isRegistering ? { username, email, password } : { username, password };

      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then(data => {
          const feedback = document.getElementById('account-feedback');
          if (data.success) {
            feedback.style.color = 'green';
            feedback.textContent = isRegistering ? 'Registration successful!' : 'Login successful!';
          } else {
            feedback.textContent = isRegistering ? 'Registration failed! Please try again.' : 'Login failed! Incorrect username or password.';
          }
        })
        .catch(error => {
          console.error('Error during account process:', error);
        });
    });
  });

  // Trigger the home link click on page load to display the home content
  homeLink.click();
});

function downloadMaterials(courseId) {
  // Implement the logic to download course materials
  alert(`Download materials for course ID: ${courseId}`);
}

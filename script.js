function validateRegister() {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const user = document.getElementById("reg-name").value; // Using name as username for simplicity
  const pass = document.getElementById("reg-pass").value;
  const error = document.getElementById("register-error");

  if (name === "" || email === "" || pass === "") {
    error.innerText = "All fields are required!";
    error.style.display = "block";
  } else if (!email.includes("@")) {
    error.innerText = "Please enter a valid email.";
    error.style.display = "block";
  } else {
    error.style.display = "none";

    // Save credentials to localStorage
    localStorage.setItem("storedUser", name);
    localStorage.setItem("storedPass", pass);

    alert("Account created successfully! You can now login.");
    showPage("login");
  }
}

function validateLogin() {
  const userInput = document.getElementById("login-user").value;
  const passInput = document.getElementById("login-pass").value;
  const error = document.getElementById("login-error");

  // Retrieve stored credentials
  const storedUser = localStorage.getItem("storedUser");
  const storedPass = localStorage.getItem("storedPass");

  if (userInput === "" || passInput === "") {
    error.innerText = "Please enter both username and password.";
    error.style.display = "block";
  } else if (userInput === storedUser && passInput === storedPass) {
    // Success: Match found
    error.style.display = "none";

    document.getElementById("guest-links").style.display = "none";
    document.getElementById("user-dropdown").style.display = "inline-block";
    document.getElementById("display-username").innerText = userInput + " ▼";

    showSection("home");
  } else {
    // Failure: No match
    error.innerText = "Invalid username or password.";
    error.style.display = "block";
  }
}
function showSection(sectionId) {
  // Hide the auth container
  document.getElementById("auth-container").style.display = "none";

  // Hide all content sections
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Show the specific content section
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";
  }
}
function showPage(pageId) {
  // Hide all main content sections
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  // Make the parent container visible
  const authContainer = document.getElementById("auth-container");
  authContainer.style.display = "block";

  // Hide both sub-pages first
  document.getElementById("login-page").style.display = "none";
  document.getElementById("register-page").style.display = "none";

  // Show the specific sub-page requested
  const targetPage = document.getElementById(pageId + "-page");
  if (targetPage) {
    targetPage.style.display = "block";
  }
}

function logout() {
  // Revert UI to Guest state
  document.getElementById("guest-links").style.display = "inline";
  document.getElementById("user-dropdown").style.display = "none";

  // Clear inputs
  document.getElementById("login-user").value = "";
  document.getElementById("login-pass").value = "";

  showSection("home");
}

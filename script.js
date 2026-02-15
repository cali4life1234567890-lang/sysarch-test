function validateRegister() {
  const fname = document.getElementById("reg-fname").value;
  const mi = document.getElementById("reg-mi").value;
  const lname = document.getElementById("reg-lname").value;
  const email = document.getElementById("reg-email").value;
  const pass = document.getElementById("reg-pass").value;
  const confirmPass = document.getElementById("reg-confirm-pass").value;
  const error = document.getElementById("register-error");

  // Basic validation for required fields
  if (
    fname === "" ||
    lname === "" ||
    email === "" ||
    pass === "" ||
    confirmPass === ""
  ) {
    error.innerText = "Please fill in all required fields.";
    error.style.display = "block";
    return;
  }

  // Email format validation
  if (!email.includes("@")) {
    error.innerText = "Please enter a valid email.";
    error.style.display = "block";
    return;
  }

  // Password match validation
  if (pass !== confirmPass) {
    error.innerText = "Passwords do not match!";
    error.style.display = "block";
    return;
  }

  // Unique email validation using localStorage
  const existingUser = localStorage.getItem(email);
  if (existingUser) {
    error.innerText = "An account with this email already exists.";
    error.style.display = "block";
    return;
  }

  // Save user data (storing as an object string)
  const fullName = mi ? `${fname} ${mi}. ${lname}` : `${fname} ${lname}`;
  const userData = {
    name: fullName,
    password: pass,
  };

  localStorage.setItem(email, JSON.stringify(userData));

  error.style.display = "none";
  alert("Account created successfully! Use your email to login.");
  showPage("login");
}

function validateLogin() {
  const emailInput = document.getElementById("login-user").value; // Use email as login ID
  const passInput = document.getElementById("login-pass").value;
  const error = document.getElementById("login-error");

  // Retrieve stored user data
  const storedData = localStorage.getItem(emailInput);

  if (!storedData) {
    error.innerText = "No account found with this email.";
    error.style.display = "block";
    return;
  }

  const user = JSON.parse(storedData);

  if (passInput === user.password) {
    error.style.display = "none";
    document.getElementById("guest-links").style.display = "none";
    document.getElementById("user-dropdown").style.display = "inline-block";
    document.getElementById("display-username").innerText = user.name + " ▼";
    showSection("home");
  } else {
    error.innerText = "Incorrect password.";
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

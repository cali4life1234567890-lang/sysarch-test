let currentLoggedInId = null;

function validateRegister() {
  const idNum = document.getElementById("reg-id").value;
  const lname = document.getElementById("reg-lname").value;
  const fname = document.getElementById("reg-fname").value;
  const mname = document.getElementById("reg-mname").value;
  const level = document.getElementById("reg-level").value;
  const pass = document.getElementById("reg-pass").value;
  const confirmPass = document.getElementById("reg-confirm-pass").value;
  const email = document.getElementById("reg-email").value;
  const course = document.getElementById("reg-course").value;
  const address = document.getElementById("reg-address").value;
  const error = document.getElementById("register-error");

  if (
    !idNum ||
    !lname ||
    !fname ||
    !mname ||
    !level ||
    !pass ||
    !confirmPass ||
    !email ||
    !course ||
    !address
  ) {
    error.innerText = "Please fill in all fields.";
    error.style.display = "block";
    return;
  }

  if (pass !== confirmPass) {
    error.innerText = "Passwords do not match!";
    error.style.display = "block";
    return;
  }

  if (localStorage.getItem(idNum)) {
    error.innerText = "An account with this ID Number already exists.";
    error.style.display = "block";
    return;
  }

  const userData = {
    id: idNum,
    firstName: fname,
    name: `${fname} ${mname} ${lname}`,
    password: pass,
    email: email,
    level: level,
    course: course,
    address: address,
  };

  localStorage.setItem(idNum, JSON.stringify(userData));

  error.style.display = "none";
  alert("Account created successfully!");
  showPage("login");
}

function validateLogin() {
  const idInput = document.getElementById("login-id").value;
  const passInput = document.getElementById("login-pass").value;
  const error = document.getElementById("login-error");
  const storedData = localStorage.getItem(idInput);

  if (!storedData) {
    error.innerText = "No account found with this ID Number.";
    error.style.display = "block";
    return;
  }

  const user = JSON.parse(storedData);

  if (passInput === user.password) {
    currentLoggedInId = idInput;
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
  document.getElementById("auth-container").style.display = "none";
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.style.display = "block";
  }
}
function showPage(pageId) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => {
    section.style.display = "none";
  });
  const authContainer = document.getElementById("auth-container");
  authContainer.style.display = "block";
  document.getElementById("login-page").style.display = "none";
  document.getElementById("register-page").style.display = "none";
  const targetPage = document.getElementById(pageId + "-page");
  if (targetPage) {
    targetPage.style.display = "block";
  }
}

function showProfile() {
  if (!currentLoggedInId) return;

  const user = JSON.parse(localStorage.getItem(currentLoggedInId));

  document.getElementById("prof-id").innerText = user.id;
  document.getElementById("prof-name").innerText = user.name;
  document.getElementById("prof-course-level").innerText =
    `${user.course} - ${user.level}`;
  document.getElementById("prof-email").innerText = user.email;
  document.getElementById("prof-address").innerText = user.address;

  showSection("profile");
}

function deleteAccount() {
  if (
    confirm(
      "Are you sure you want to delete your account? This cannot be undone.",
    )
  ) {
    localStorage.removeItem(currentLoggedInId);
    alert("Account deleted.");
    logout();
  }
}

function logout() {
  document.getElementById("guest-links").style.display = "inline";
  document.getElementById("user-dropdown").style.display = "none";
  document.getElementById("login-id").value = "";
  document.getElementById("login-pass").value = "";
  showSection("home");
}

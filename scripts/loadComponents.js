document.addEventListener("DOMContentLoaded", () => {
  // Navbar inladen
  fetch("../navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;
      initNavbar(); // Initialiseer de event listeners
    })
    .catch((error) => console.error("Error loading navbar:", error));

  // Homepage inladen
  fetch("views/homepage.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("homepage-container").innerHTML = data;
    })
    .catch((error) => console.error("Error loading homepage:", error));

  // Footer inladen
  fetch("views/footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch((error) => console.error("Error loading footer:", error));

  // Converter Inladen
  fetch("views/converter.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("converter-container").innerHTML = data;
    })
    .catch((error) => console.error("Error loading converter:", error));

  // React Component Initialisatie
  loadReactComponent();
});

// Functie om event listeners toe te voegen
function initNavbar() {
  console.log("Navbar initialiseren...");

  const navMenu = document.getElementById("nav-menu");
  const navToggle = document.getElementById("nav-toggle");
  const navClose = document.getElementById("nav-close");

  const login = document.getElementById("login");
  const loginBtn = document.getElementById("login-btn");
  const loginClose = document.getElementById("login-close");

  // Controleer of elementen bestaan
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  if (navClose && navMenu) {
    navClose.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  }

  if (loginBtn && login) {
    loginBtn.addEventListener("click", () => {
      login.classList.add("show-login");
    });
  }

  if (loginClose && login) {
    loginClose.addEventListener("click", () => {
      login.classList.remove("show-login");
    });
  }

  console.log("Navbar event listeners toegevoegd.");
}

// Functie om de React-component te laden
function loadReactComponent() {
  const reactContainer = document.getElementById("react-container");

  if (reactContainer) {
    // Ensure React and ReactDOM are available globally
    ReactDOM.render(<MyReactComponent />, reactContainer);
  } else {
    console.error("React container not found!");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Load the navbar
  fetch("../navbar.html")
    .then((response) => response.text())
    .then((data) => {
      const navbarContainer = document.getElementById("navbar-container");
      navbarContainer.innerHTML = data;

      // Dynamically load the script referenced in navbar.html
      const script = document.createElement("script");
      script.src = "../assets/js/main.js"; // Update this path if needed
      document.body.appendChild(script);
    })
    .catch((error) => console.error("Error loading navbar:", error));



  // Homepage inladen
  fetch("views/homepage.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("homepage-container").innerHTML = data;
    })
    .catch((error) => console.error("Error loading homepage:", error));


  fetch("../graph.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("graph-container").innerHTML = data;
    })
    .catch((error) => console.error("Error loading graph page:", error));
});
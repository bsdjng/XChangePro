document.addEventListener("DOMContentLoaded", () => {
  // Navbar inladen
  fetch("views/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-container").innerHTML = data;
    })
    .catch((error) => console.error("Error loading navbar:", error));

  // Homepage inladen
  fetch("views/homepage.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("homepage-container").innerHTML = data;
    })
    .catch((error) => console.error("Error loading homepage:", error));
});
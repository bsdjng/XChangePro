// Script om de navbar in te laden
document.addEventListener("DOMContentLoaded", () => {
    fetch("views/navbar.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
      })
      .then((data) => {
        document.getElementById("navbar-container").innerHTML = data;
      })
      .catch((error) => console.error("Error loading navbar:", error));
  });
  
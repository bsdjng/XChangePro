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
}



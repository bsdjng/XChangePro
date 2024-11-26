window.onload = function () {
  console.log("test");
  /*=============== SHOW MENU ===============*/

  const navMenu = document.getElementById("nav-menu"),
    navToggle = document.getElementById("nav-toggle"),
    navClose = document.getElementById("nav-close");

  /* Menu show */
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });

  // Menu hidden */
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
  console.log("test");

  /*=============== SEARCH ===============*/
  const search = document.getElementById("search"),
    searchBtn = document.getElementById("search-btn"),
    searchClose = document.getElementById("search-close");

  /* Search show */
  searchBtn.addEventListener("click", () => {
    search.classList.add("show-search");
  });

  /* Search hidden */
  searchClose.addEventListener("click", () => {
    search.classList.remove("show-search");
  });
  console.log("test");

  /*=============== LOGIN ===============*/
  const login = document.getElementById("login"),
    loginBtn = document.getElementById("login-btn"),
    loginClose = document.getElementById("login-close");

  /* Login show */
  loginBtn.addEventListener("click", () => {
    login.classList.add("show-login");
    console.log("test");
  });

  /* Login hidden */
  loginClose.addEventListener("click", () => {
    login.classList.remove("show-login");
  });
  console.log("test");

  // Open de login modal
  document.getElementById("login-btn").addEventListener("click", function () {
    document.getElementById("login").style.display = "block";
  });

  // Sluit de login modal
  document.getElementById("login-close").addEventListener("click", function () {
    document.getElementById("login").style.display = "none";
  });
};

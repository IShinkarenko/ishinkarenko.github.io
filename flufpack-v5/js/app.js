(() => {
  "use strict";
  const modules_flsModules = {};

  // Toggle header on scroll
  const header = document.querySelector(".header");
  let lastScrollTop = 0;
  const step = 150;
  let isScrollingUp = false;
  let scrollDistance = 0;

  function toggleHeader() {
    let currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
      // Scrolling down
      isScrollingUp = false;
      scrollDistance = 0;
      header.style.transform = "translateY(-100%)";
    } else {
      // Scrolling up
      isScrollingUp = true;
      scrollDistance += lastScrollTop - currentScroll;
    }

    if (isScrollingUp && scrollDistance > step) {
      header.style.transform = "translateY(0)";
    }

    lastScrollTop = currentScroll;
  }

  let widthMatch = window.matchMedia("(min-width: 992px)");

  if (widthMatch.matches) {
    window.addEventListener("scroll", toggleHeader);
  }

  widthMatch.addEventListener('change', function (mm) {
    if (mm.matches) {
      window.addEventListener("scroll", toggleHeader);
    }
  });



  // open/close menu
  let bodyLockStatus = true;
  const bodyLockToggle = (delay = 500) => {
    if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
  };

  const bodyUnlock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      setTimeout((() => {
        for (let index = 0; index < lock_padding.length; index++) {
          const el = lock_padding[index];
          el.style.paddingRight = "0px";
        }
        body.style.paddingRight = "0px";
        document.documentElement.classList.remove("lock");
      }), delay);
      bodyLockStatus = false;
      setTimeout((function () {
        bodyLockStatus = true;
      }), delay);
    }
  };

  const bodyLock = (delay = 500) => {
    let body = document.querySelector("body");
    if (bodyLockStatus) {
      let lock_padding = document.querySelectorAll("[data-lp]");
      for (let index = 0; index < lock_padding.length; index++) {
        const el = lock_padding[index];
        el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
      }
      body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
      document.documentElement.classList.add("lock");
      bodyLockStatus = false;
      setTimeout((function () {
        bodyLockStatus = true;
      }), delay);
    }
  };

  function menuClose() {
    bodyUnlock();
    document.documentElement.classList.remove("menu-open");
  }

  function menuInit() {
    if (document.querySelector(".icon-menu")) document.addEventListener("click", (function (e) {
      if (e.target.closest(".icon-menu")) {
        bodyLockToggle();
        document.documentElement.classList.toggle("menu-open");
      }
    }));
  }
  menuInit();
})();


if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
}


window.addEventListener("load", function () {
  const form = document.getElementById("contact-form");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    grecaptcha.ready(function () {
      setTimeout(function () {
      grecaptcha
        .execute("6LeuCTQmAAAAAGKOR-eqneLiGQuNaIyJF7856UCH", { // site key
          action: "submit",
        })
        .then(function (token) {
          let recaptchaResponse = document.getElementById("recaptchaResponse");
          console.log({token})
          // add token value to form
          recaptchaResponse.value = token;

          fetch("/send.php", {
            method: "POST",
            body: new FormData(form),
          })
            .then((response) => response.text())
            .then((response) => {
              const responseText = JSON.parse(response);
              if (responseText.error !== "") {
                alert(responseText.error);
                return;
              }
              alert(responseText.success);
            });
        });
      }, 1000); // Adjust the timeout value as needed
    });
  });
});



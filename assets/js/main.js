/**
 * Easy selector helper function
 */
const select = (el, all = false) => {
  el = el.trim();
  if (all) {
    return [...document.querySelectorAll(el)];
  } else {
    return document.querySelector(el);
  }
};
document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    // Add a delay if necessary, then hide the preloader
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 2000); // Add a delay of 1 second for smoother transition
  });
});


/**
 * Intro type effect for the "Nickname" section
 */
const nickname_typed = select(".nickname .typed");
if (nickname_typed) {
  let typed_strings = nickname_typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".nickname .typed", typedConfig(typed_strings));
}

/**
 * Returns Typed.js config object
 */
function typedConfig(typed_strings) {
  return {
    strings: typed_strings,
    loop: true,
    typeSpeed: 100,
    backSpeed: 50,
    backDelay: 2000,
  };
}

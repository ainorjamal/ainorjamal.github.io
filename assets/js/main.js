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

  // ===== Lightbox Functionality =====
  initLightbox();
});

/**
 * Initialize Lightbox for gallery and portfolio images
 */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  // Collect all gallery and portfolio images
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const portfolioImages = document.querySelectorAll('.portfolio-item img');
  
  let currentImages = [];
  let currentIndex = 0;

  // Add click event to gallery images
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentImages = Array.from(galleryImages);
      currentIndex = index;
      openLightbox(img, 'Certificate');
    });
  });

  // Add click event to portfolio images
  portfolioImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentImages = Array.from(portfolioImages);
      currentIndex = index;
      // Get the project title from the portfolio-info
      const portfolioItem = img.closest('.portfolio-item');
      const title = portfolioItem?.querySelector('.portfolio-info h4')?.textContent || 'Project';
      openLightbox(img, title);
    });
  });

  function openLightbox(img, caption) {
    lightboxImg.src = img.src;
    lightboxCaption.textContent = caption;
    updateCounter();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    updateLightboxImage();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentImages.length;
    updateLightboxImage();
  }

  function updateLightboxImage() {
    const img = currentImages[currentIndex];
    lightboxImg.style.opacity = '0';
    
    setTimeout(() => {
      lightboxImg.src = img.src;
      
      // Update caption based on image type
      const portfolioItem = img.closest('.portfolio-item');
      if (portfolioItem) {
        const title = portfolioItem.querySelector('.portfolio-info h4')?.textContent || 'Project';
        lightboxCaption.textContent = title;
      } else {
        lightboxCaption.textContent = 'Certificate';
      }
      
      updateCounter();
      lightboxImg.style.opacity = '1';
    }, 150);
  }

  function updateCounter() {
    lightboxCounter.textContent = `${currentIndex + 1} / ${currentImages.length}`;
  }

  // Event listeners
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    switch (e.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        showPrev();
        break;
      case 'ArrowRight':
        showNext();
        break;
    }
  });

  // Add transition to lightbox image
  lightboxImg.style.transition = 'opacity 0.15s ease';
}


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

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

  // Gallery modal elements
  const galleryModal = document.getElementById('gallery-modal');
  const galleryModalTitle = document.getElementById('gallery-modal-title');
  const galleryGrid = document.getElementById('gallery-grid');
  const galleryModalClose = document.querySelector('.gallery-modal-close');

  // Collect all gallery and portfolio images
  const galleryImages = document.querySelectorAll('.gallery-item img');
  const portfolioItems = document.querySelectorAll('.portfolio-item:not(.portfolio-gallery) img');
  const portfolioGalleries = document.querySelectorAll('.portfolio-gallery');
  
  let currentImages = [];
  let currentIndex = 0;
  let currentGalleryImages = [];

  // Add click event to gallery images (certificates)
  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentImages = Array.from(galleryImages);
      currentIndex = index;
      openLightbox(img, 'Certificate');
    });
  });

  // Add click event to regular portfolio images (non-gallery)
  portfolioItems.forEach((img, index) => {
    img.addEventListener('click', () => {
      currentImages = Array.from(portfolioItems);
      currentIndex = index;
      const portfolioItem = img.closest('.portfolio-item');
      const title = portfolioItem?.querySelector('.portfolio-info h4')?.textContent || 'Project';
      openLightbox(img, title);
    });
  });

  // Add click event to portfolio galleries (opens grid modal)
  portfolioGalleries.forEach((item) => {
    const wrap = item.querySelector('.portfolio-wrap');
    wrap.addEventListener('click', () => {
      const imagesData = item.dataset.galleryImages;
      const title = item.querySelector('.portfolio-info h4')?.textContent || 'Project Gallery';
      
      if (imagesData) {
        currentGalleryImages = imagesData.split(',').map(src => src.trim());
        openGalleryModal(title, currentGalleryImages);
      }
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

  function openGalleryModal(title, images) {
    galleryModalTitle.textContent = title;
    galleryGrid.innerHTML = '';
    
    images.forEach((src, index) => {
      const item = document.createElement('div');
      item.className = 'gallery-grid-item';
      item.innerHTML = `
        <img src="${src}" alt="${title} - Image ${index + 1}">
        <span class="gallery-grid-item-number">${index + 1}</span>
      `;
      
      // Click to open in lightbox
      item.addEventListener('click', () => {
        currentImages = images.map(s => ({ src: s }));
        currentIndex = index;
        closeGalleryModal();
        setTimeout(() => {
          openLightbox({ src }, title);
        }, 100);
      });
      
      galleryGrid.appendChild(item);
    });
    
    galleryModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeGalleryModal() {
    galleryModal.classList.remove('active');
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
      // Handle both DOM elements and plain objects with src
      const imgSrc = img.src || img;
      lightboxImg.src = imgSrc;
      
      // Update caption based on image type
      if (img instanceof Element) {
        const portfolioItem = img.closest('.portfolio-item');
        if (portfolioItem) {
          const title = portfolioItem.querySelector('.portfolio-info h4')?.textContent || 'Project';
          lightboxCaption.textContent = title;
        } else {
          lightboxCaption.textContent = 'Certificate';
        }
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
  galleryModalClose.addEventListener('click', closeGalleryModal);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  galleryModal.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
      closeGalleryModal();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (galleryModal.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeGalleryModal();
      }
      return;
    }
    
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

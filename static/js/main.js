/* ============================================
   NEPAL TREKKING WEBSITE - MAIN JAVASCRIPT
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initializeNavigation();
  initializeScrollEffects();
  initializeFormHandling();
  initializeLazyLoading();
  initializeAnimations();
});

/* ============================================
   NAVIGATION FUNCTIONALITY
   ============================================ */

function initializeNavigation() {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.getElementById("header");

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      navMenu.classList.toggle("active");

      // Change hamburger icon
      const icon = navToggle.querySelector("i");
      if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  }

  // Close mobile menu when clicking on links
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        const icon = navToggle.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
      }
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Active navigation link highlighting
  window.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section[id]");
    const scrollPosition = window.scrollY + 200;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  });
}

/* ============================================
   SMOOTH SCROLLING
   ============================================ */

function initializeScrollEffects() {
  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.getElementById("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Parallax effect for hero background
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector(".hero-background");

    if (heroBackground && window.innerWidth > 768) {
      const rate = scrolled * -0.5;
      heroBackground.style.transform = `translateY(${rate}px)`;
    }
  });
}

// Global function for CTA button
function scrollToSection(sectionId) {
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    const headerHeight = document.getElementById("header").offsetHeight;
    const targetPosition = targetSection.offsetTop - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }
}

/* ============================================
   FORM HANDLING
   ============================================ */

function initializeFormHandling() {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const formObject = {};

      formData.forEach((value, key) => {
        formObject[key] = value;
      });

      // Validate form
      if (validateForm(formObject)) {
        // Show loading state
        const submitButton = this.querySelector(".submit-button");
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;

        // Simulate form submission (replace with actual submission logic)
        setTimeout(() => {
          showNotification(
            "Thank you! Your message has been sent successfully.",
            "success"
          );
          this.reset();
          submitButton.innerHTML = originalText;
          submitButton.disabled = false;
        }, 2000);
      }
    });
  }
}

function validateForm(data) {
  const errors = [];

  // Validate required fields
  if (!data.name || data.name.trim().length < 2) {
    errors.push("Please enter a valid name (at least 2 characters)");
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push("Please enter a valid email address");
  }

  if (!data["trek-interest"]) {
    errors.push("Please select your trek interest");
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.push("Please enter a message (at least 10 characters)");
  }

  // Show errors if any
  if (errors.length > 0) {
    showNotification(errors.join("\n"), "error");
    return false;
  }

  return true;
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/* ============================================
   NOTIFICATIONS
   ============================================ */

function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <p>${message}</p>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

  // Add to body
  document.body.appendChild(notification);

  // Close button functionality
  const closeButton = notification.querySelector(".notification-close");
  closeButton.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function getNotificationIcon(type) {
  const icons = {
    success: "fa-check-circle",
    error: "fa-exclamation-circle",
    warning: "fa-exclamation-triangle",
    info: "fa-info-circle",
  };
  return icons[type] || icons.info;
}

function getNotificationColor(type) {
  const colors = {
    success: "#2d5a3d",
    error: "#dc3545",
    warning: "#ffc107",
    info: "#3498db",
  };
  return colors[type] || colors.info;
}

/* ============================================
   LAZY LOADING
   ============================================ */

function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove("loading");
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => {
      img.classList.add("loading");
      imageObserver.observe(img);
    });
  }
}

/* ============================================
   SCROLL ANIMATIONS
   ============================================ */

function initializeAnimations() {
  const animateElements = document.querySelectorAll(
    ".about-item, .trek-card, .contact-item"
  );

  if ("IntersectionObserver" in window) {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    animateElements.forEach((element) => {
      animationObserver.observe(element);
    });
  } else {
    // Fallback for browsers without IntersectionObserver
    animateElements.forEach((element) => {
      element.classList.add("fade-in");
    });
  }
}

/* ============================================
   TREK DETAIL FUNCTIONS
   ============================================ */

function viewTrekDetails(trekSlug) {
  // Redirect to trek details page
  window.location.href = `trek-details.html?trek=${trekSlug}`;
}

/* ============================================
   SEARCH FUNCTIONALITY (for future use)
   ============================================ */

function initializeSearch() {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  if (searchInput && searchResults) {
    let searchTimeout;

    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      const query = this.value.trim();

      if (query.length >= 2) {
        searchTimeout = setTimeout(() => {
          performSearch(query);
        }, 300);
      } else {
        searchResults.classList.add("hidden");
      }
    });
  }
}

function performSearch(query) {
  // This would be implemented when adding search functionality
  console.log("Searching for:", query);
}

/* ============================================
   UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/* ============================================
   CSS ANIMATIONS (added via JavaScript)
   ============================================ */

// Add keyframes for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .notification-content p {
        margin: 0;
        flex: 1;
        white-space: pre-line;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s ease;
    }

    .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);

/* ============================================
   PERFORMANCE OPTIMIZATIONS
   ============================================ */

// Optimize scroll events with throttling
window.addEventListener(
  "scroll",
  throttle(function () {
    // Scroll-dependent functions are already optimized in their respective sections
  }, 16)
); // ~60fps

// Preload critical images
function preloadImages() {
  const criticalImages = [
    "https://ugc.same-assets.com/mvkobjI8Hw3EsrxG2dBUmZ9k1sc2-dOY.jpeg",
    "https://ugc.same-assets.com/WkhMVeh5OaQzwPRu_lVYvlvKxC6Zoa8k.jpeg",
    "https://ugc.same-assets.com/_NbF9QWSGpHijdluyATJ2H8Juj2F-mcU.webp",
  ];

  criticalImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

// Initialize preloading after page load
window.addEventListener("load", preloadImages);

/* ============================================
   ERROR HANDLING
   ============================================ */

// Global error handler
window.addEventListener("error", function (e) {
  console.error("JavaScript error:", e.error);
  // You could send this to an error tracking service
});

// Unhandled promise rejection handler
window.addEventListener("unhandledrejection", function (e) {
  console.error("Unhandled promise rejection:", e.reason);
  // You could send this to an error tracking service
});

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const icon = document.querySelector(".toggle-password");
  const isPassword = passwordInput.type === "password";

  passwordInput.type = isPassword ? "text" : "password";
  icon.classList.toggle("fa-eye");
  icon.classList.toggle("fa-eye-slash");
}

// STANDALONE VERSION - No conflicts with main.js
document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Starting standalone real-time filters...");

  // Get elements
  const searchInput = document.getElementById("search-input");
  const difficultyFilter = document.getElementById("difficulty-filter");
  const durationFilter = document.getElementById("duration-filter");
  const regionFilter = document.getElementById("region-filter");
  const clearFiltersBtn = document.getElementById("clear-filters");
  const treksGrid = document.getElementById("treks-grid");
  const resultsCount = document.getElementById("results-count");

  // Check if we have the minimum required elements
  if (!treksGrid) {
    console.error("❌ treks-grid not found!");
    return;
  }

  if (!searchInput) {
    console.error("❌ search-input not found!");
    return;
  }

  console.log("✅ Required elements found");

  // Store all trek cards
  let allTrekCards = [];

  function initializeTrekCards() {
    const trekCards = document.querySelectorAll(".trek-card");
    console.log(`📋 Found ${trekCards.length} trek cards`);

    allTrekCards = Array.from(trekCards).map((card, index) => {
      // Get data from the card
      const titleEl =
        card.querySelector(".trek-title") || card.querySelector("h3");
      const descEl =
        card.querySelector(".trek-description") || card.querySelector("p");

      const cardData = {
        element: card.cloneNode(true),
        name: titleEl ? titleEl.textContent.toLowerCase() : "",
        description: descEl ? descEl.textContent.toLowerCase() : "",
        difficulty: (card.dataset.difficulty || "").toLowerCase(),
        duration: card.dataset.duration || "",
        region: (card.dataset.region || "").toLowerCase(),
        index: index,
      };

      console.log(`Card ${index}:`, {
        name: cardData.name.substring(0, 20) + "...",
        difficulty: cardData.difficulty,
        duration: cardData.duration,
        region: cardData.region,
      });

      return cardData;
    });

    console.log(`✅ Initialized ${allTrekCards.length} trek cards`);
  }

  function getDurationCategory(duration) {
    const days = parseInt(duration);
    if (isNaN(days)) return "";

    if (days <= 7) return "short";
    if (days <= 14) return "medium";
    return "long";
  }

  function filterTreks() {
    const startTime = Date.now();

    // Get filter values
    const searchTerm = searchInput
      ? searchInput.value.toLowerCase().trim()
      : "";
    const selectedDifficulty = difficultyFilter
      ? difficultyFilter.value.toLowerCase()
      : "";
    const selectedDuration = durationFilter ? durationFilter.value : "";
    const selectedRegion = regionFilter ? regionFilter.value.toLowerCase() : "";

    console.log("🔍 Filtering with:", {
      search: searchTerm,
      difficulty: selectedDifficulty,
      duration: selectedDuration,
      region: selectedRegion,
    });

    // Filter trek cards
    const filteredTreks = allTrekCards.filter((trek) => {
      // Search filter
      const matchesSearch =
        !searchTerm ||
        trek.name.includes(searchTerm) ||
        trek.description.includes(searchTerm);

      // Difficulty filter
      const matchesDifficulty =
        !selectedDifficulty || trek.difficulty === selectedDifficulty;

      // Duration filter
      let matchesDuration = true;
      if (selectedDuration) {
        const trekDurationCategory = getDurationCategory(trek.duration);
        matchesDuration = trekDurationCategory === selectedDuration;
      }

      // Region filter
      const matchesRegion = !selectedRegion || trek.region === selectedRegion;

      return (
        matchesSearch && matchesDifficulty && matchesDuration && matchesRegion
      );
    });

    console.log(
      `✅ Found ${filteredTreks.length} matching treks in ${
        Date.now() - startTime
      }ms`
    );

    // Update the display
    updateTreksDisplay(filteredTreks);
    updateResultsCount(filteredTreks.length);
  }

  function updateTreksDisplay(filteredTreks) {
    // Clear current display
    treksGrid.innerHTML = "";

    if (filteredTreks.length > 0) {
      filteredTreks.forEach((trek) => {
        treksGrid.appendChild(trek.element);
      });
    } else {
      treksGrid.innerHTML = `
                <div class="no-results">
                    <p>No treks found matching your criteria.</p>
                </div>
            `;
    }
  }

  function updateResultsCount(count) {
    if (resultsCount) {
      const countSpan = resultsCount.querySelector(".count");
      if (countSpan) {
        countSpan.textContent = count;
      } else {
        resultsCount.innerHTML = `Showing <span class="count">${count}</span> treks`;
      }
    }
  }

  function clearAllFilters() {
    console.log("🧹 Clearing all filters");

    if (searchInput) searchInput.value = "";
    if (difficultyFilter) difficultyFilter.value = "";
    if (durationFilter) durationFilter.value = "";
    if (regionFilter) regionFilter.value = "";

    filterTreks();
  }

  // Initialize everything
  initializeTrekCards();

  // Add event listeners
  let searchTimeout;

  // Search input with debounce
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      console.log("🔤 Search input:", this.value);
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(filterTreks, 300);
    });
    console.log("✅ Search input listener added");
  }

  // Filter dropdowns
  if (difficultyFilter) {
    difficultyFilter.addEventListener("change", function () {
      console.log("⚡ Difficulty changed:", this.value);
      filterTreks();
    });
    console.log("✅ Difficulty filter listener added");
  }

  if (durationFilter) {
    durationFilter.addEventListener("change", function () {
      console.log("⏰ Duration changed:", this.value);
      filterTreks();
    });
    console.log("✅ Duration filter listener added");
  }

  if (regionFilter) {
    regionFilter.addEventListener("change", function () {
      console.log("🗺️ Region changed:", this.value);
      filterTreks();
    });
    console.log("✅ Region filter listener added");
  }

  // Clear filters button
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", function (e) {
      e.preventDefault();
      clearAllFilters();
    });
    console.log("✅ Clear filters button listener added");
  }

  console.log("🎉 Real-time filtering is ready!");
  console.log(
    "Try changing the dropdown filters - they should work immediately!"
  );
});

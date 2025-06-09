/* ============================================
   TREKS PAGE - FILTER & SEARCH FUNCTIONALITY
   ============================================ */

// Trek data - In a real application, this would come from an API
const treksData = [
  {
    id: "everest-base-camp",
    name: "Everest Base Camp Trek",
    slug: "everest-base-camp",
    image: "https://ugc.same-assets.com/mvkobjI8Hw3EsrxG2dBUmZ9k1sc2-dOY.jpeg",
    difficulty: "challenging",
    duration: 14,
    region: "everest",
    altitude: "5,364m",
    price: 1299,
    description:
      "The ultimate adventure to the base of the world's highest peak. Experience stunning mountain views, Sherpa culture, and the thrill of standing at Everest Base Camp.",
    highlights: [
      "Stunning Himalayan views",
      "Sherpa culture",
      "Namche Bazaar",
      "Tengboche Monastery",
    ],
  },
  {
    id: "annapurna-circuit",
    name: "Annapurna Circuit Trek",
    slug: "annapurna-circuit",
    image: "https://ugc.same-assets.com/WkhMVeh5OaQzwPRu_lVYvlvKxC6Zoa8k.jpeg",
    difficulty: "moderate",
    duration: 16,
    region: "annapurna",
    altitude: "5,416m",
    price: 899,
    description:
      "One of Nepal's classic treks featuring diverse landscapes, from subtropical forests to high alpine deserts, crossing the challenging Thorong La Pass.",
    highlights: [
      "Thorong La Pass",
      "Diverse landscapes",
      "Muktinath Temple",
      "Annapurna views",
    ],
  },
  {
    id: "langtang-valley",
    name: "Langtang Valley Trek",
    slug: "langtang-valley",
    image: "https://ugc.same-assets.com/_NbF9QWSGpHijdluyATJ2H8Juj2F-mcU.webp",
    difficulty: "easy",
    duration: 8,
    region: "langtang",
    altitude: "4,984m",
    price: 599,
    description:
      'Known as the "Valley of Glaciers," this trek offers stunning mountain views, rich Tamang culture, and beautiful rhododendron forests.',
    highlights: [
      "Kyanjin Gompa",
      "Tamang culture",
      "Rhododendron forests",
      "Langtang Lirung views",
    ],
  },
  {
    id: "annapurna-base-camp",
    name: "Annapurna Base Camp Trek",
    slug: "annapurna-base-camp",
    image: "https://ugc.same-assets.com/soLNz1n9ktspFeo0BVB1kqvX2J1k3hlM.jpeg",
    difficulty: "moderate",
    duration: 12,
    region: "annapurna",
    altitude: "4,130m",
    price: 799,
    description:
      "A spectacular trek through diverse landscapes to the heart of the Annapurna Sanctuary, surrounded by towering peaks.",
    highlights: [
      "Annapurna Sanctuary",
      "Poon Hill sunrise",
      "Gurung villages",
      "Mountain amphitheater",
    ],
  },
  {
    id: "gokyo-lakes",
    name: "Gokyo Lakes Trek",
    slug: "gokyo-lakes",
    image: "https://ugc.same-assets.com/N0uWHlRmxbEb3vA5De3OKvBfw6tgO2I8.jpeg",
    difficulty: "challenging",
    duration: 15,
    region: "everest",
    altitude: "5,357m",
    price: 1199,
    description:
      "An alternative route in the Everest region featuring pristine alpine lakes and spectacular views from Gokyo Ri.",
    highlights: [
      "Gokyo Lakes",
      "Gokyo Ri viewpoint",
      "Ngozumpa Glacier",
      "Cho Oyu views",
    ],
  },
  {
    id: "manaslu-circuit",
    name: "Manaslu Circuit Trek",
    slug: "manaslu-circuit",
    image: "https://ugc.same-assets.com/jUPatFNDw92SimM7nlGlhZRGoldEGV6O.webp",
    difficulty: "challenging",
    duration: 18,
    region: "manaslu",
    altitude: "5,106m",
    price: 1399,
    description:
      "A remote and pristine trek around the world's eighth highest mountain, offering authentic cultural experiences.",
    highlights: [
      "Larkya La Pass",
      "Remote valleys",
      "Tibetan culture",
      "Manaslu views",
    ],
  },
  {
    id: "upper-mustang",
    name: "Upper Mustang Trek",
    slug: "upper-mustang",
    image: "https://ugc.same-assets.com/1gyt_PjlvBlhVTZ88VSNOXXcczLTNhK8.jpeg",
    difficulty: "moderate",
    duration: 14,
    region: "annapurna",
    altitude: "4,000m",
    price: 1599,
    description:
      "A journey to the forbidden kingdom of Lo, featuring unique desert landscapes and ancient Tibetan culture.",
    highlights: [
      "Lo Manthang",
      "Desert landscapes",
      "Ancient caves",
      "Tibetan Buddhism",
    ],
  },
  {
    id: "poon-hill",
    name: "Poon Hill Trek",
    slug: "poon-hill",
    image: "https://ugc.same-assets.com/It0Fi5GgJbXS8byO3NFyGbqTFwtxGPMi.jpeg",
    difficulty: "easy",
    duration: 5,
    region: "annapurna",
    altitude: "3,210m",
    price: 399,
    description:
      "A short and beautiful trek perfect for beginners, offering spectacular sunrise views over the Annapurna and Dhaulagiri ranges.",
    highlights: [
      "Poon Hill sunrise",
      "Rhododendron forests",
      "Gurung villages",
      "Annapurna views",
    ],
  },
  {
    id: "mardi-himal",
    name: "Mardi Himal Trek",
    slug: "mardi-himal",
    image: "https://ugc.same-assets.com/sdvR6n2yKhWiB2qay5yU0dgwrfg7IzIJ.webp",
    difficulty: "moderate",
    duration: 7,
    region: "annapurna",
    altitude: "4,500m",
    price: 499,
    description:
      "A relatively new trekking route offering pristine trails and spectacular close-up views of Mardi Himal and Machapuchare.",
    highlights: [
      "Mardi Himal Base Camp",
      "Machapuchare views",
      "Less crowded trails",
      "Forest Camp",
    ],
  },
  {
    id: "helambu",
    name: "Helambu Trek",
    slug: "helambu",
    image: "https://ugc.same-assets.com/QP0bzo1rHyJTN-qguDAL9tH4Ymw6cxDI.jpeg",
    difficulty: "easy",
    duration: 6,
    region: "langtang",
    altitude: "3,600m",
    price: 449,
    description:
      "A cultural trek through traditional Sherpa and Tamang villages with beautiful mountain views and terraced fields.",
    highlights: [
      "Sherpa villages",
      "Terraced fields",
      "Mountain views",
      "Cultural immersion",
    ],
  },
];

// State management
let filteredTreks = [...treksData];
let displayedTreks = [];
let currentPage = 1;
const treksPerPage = 6;

// DOM elements
let treksGrid, resultsCount, loadMoreBtn, searchInput, filters;

// Initialize the treks page
document.addEventListener("DOMContentLoaded", function () {
  initializeTreksPage();
});

function initializeTreksPage() {
  // Get DOM elements
  treksGrid = document.getElementById("treks-grid");
  resultsCount = document.getElementById("results-count");
  loadMoreBtn = document.getElementById("load-more-btn");
  searchInput = document.getElementById("search-input");

  filters = {
    difficulty: document.getElementById("difficulty-filter"),
    duration: document.getElementById("duration-filter"),
    region: document.getElementById("region-filter"),
  };

  // Initialize display
  applyFilters();
  renderTreks();
  updateResultsCount();

  // Event listeners
  setupEventListeners();
}

function setupEventListeners() {
  // Filter change events
  Object.values(filters).forEach((filter) => {
    filter.addEventListener("change", handleFilterChange);
  });

  // Search input
  let searchTimeout;
  searchInput.addEventListener("input", function () {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      handleSearchChange();
    }, 300);
  });

  // Clear filters button
  document
    .getElementById("clear-filters")
    .addEventListener("click", clearAllFilters);

  // Load more button
  loadMoreBtn.addEventListener("click", loadMoreTreks);
}

function handleFilterChange() {
  currentPage = 1;
  applyFilters();
  renderTreks();
  updateResultsCount();
  scrollToResults();
}

function handleSearchChange() {
  currentPage = 1;
  applyFilters();
  renderTreks();
  updateResultsCount();
}

function applyFilters() {
  const searchQuery = searchInput.value.toLowerCase().trim();
  const difficultyFilter = filters.difficulty.value;
  const durationFilter = filters.duration.value;
  const regionFilter = filters.region.value;

  filteredTreks = treksData.filter((trek) => {
    // Search filter
    const matchesSearch =
      !searchQuery ||
      trek.name.toLowerCase().includes(searchQuery) ||
      trek.description.toLowerCase().includes(searchQuery) ||
      trek.highlights.some((highlight) =>
        highlight.toLowerCase().includes(searchQuery)
      );

    // Difficulty filter
    const matchesDifficulty =
      !difficultyFilter || trek.difficulty === difficultyFilter;

    // Duration filter
    const matchesDuration =
      !durationFilter || checkDurationMatch(trek.duration, durationFilter);

    // Region filter
    const matchesRegion = !regionFilter || trek.region === regionFilter;

    return (
      matchesSearch && matchesDifficulty && matchesDuration && matchesRegion
    );
  });
}

function checkDurationMatch(duration, filter) {
  switch (filter) {
    case "short":
      return duration <= 7;
    case "medium":
      return duration >= 8 && duration <= 14;
    case "long":
      return duration >= 15;
    default:
      return true;
  }
}

function renderTreks() {
  const startIndex = 0;
  const endIndex = currentPage * treksPerPage;
  displayedTreks = filteredTreks.slice(startIndex, endIndex);

  if (displayedTreks.length === 0) {
    renderNoResults();
    return;
  }

  treksGrid.innerHTML = displayedTreks
    .map((trek) => createTrekCard(trek))
    .join("");

  // Update load more button visibility
  const hasMoreTreks = endIndex < filteredTreks.length;
  loadMoreBtn.parentElement.style.display = hasMoreTreks ? "block" : "none";

  // Trigger fade-in animations
  setTimeout(() => {
    const cards = treksGrid.querySelectorAll(".trek-card");
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("fade-in");
      }, index * 100);
    });
  }, 100);
}

function createTrekCard(trek) {
  const durationText = trek.duration === 1 ? "1 Day" : `${trek.duration} Days`;
  const difficultyClass = trek.difficulty.toLowerCase();
  const difficultyText =
    trek.difficulty.charAt(0).toUpperCase() + trek.difficulty.slice(1);

  return `
        <div class="trek-card" data-trek="${trek.slug}">
            <div class="trek-image">
                <img src="${trek.image}" alt="${trek.name}" loading="lazy">
                <div class="trek-overlay">
                    <div class="trek-difficulty">
                        <span class="difficulty-badge ${difficultyClass}">${difficultyText}</span>
                    </div>
                    <div class="trek-duration">${durationText}</div>
                </div>
            </div>
            <div class="trek-content">
                <h3 class="trek-title">${trek.name}</h3>
                <div class="trek-details">
                    <div class="trek-detail">
                        <i class="fas fa-clock"></i>
                        <span>${durationText}</span>
                    </div>
                    <div class="trek-detail">
                        <i class="fas fa-mountain"></i>
                        <span>${trek.altitude}</span>
                    </div>
                    <div class="trek-detail">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${getRegionName(trek.region)}</span>
                    </div>
                </div>
                <p class="trek-description">${trek.description}</p>
                <div class="trek-price">From $${trek.price}</div>
                <button class="trek-button" onclick="viewTrekDetails('${
                  trek.slug
                }')">
                    View Details <i class="fas fa-arrow-right"></i>
                </button>
            </div>
        </div>
    `;
}

function getRegionName(regionSlug) {
  const regionNames = {
    everest: "Everest Region",
    annapurna: "Annapurna Region",
    langtang: "Langtang Region",
    manaslu: "Manaslu Region",
    dolpo: "Dolpo Region",
  };
  return regionNames[regionSlug] || regionSlug;
}

function renderNoResults() {
  treksGrid.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <h3>No treks found</h3>
            <p>Try adjusting your filters or search terms to find more trekking options.</p>
        </div>
    `;
  loadMoreBtn.parentElement.style.display = "none";
}

function updateResultsCount() {
  const countElement = resultsCount.querySelector(".count");
  const totalResults = filteredTreks.length;
  const displayedCount = Math.min(displayedTreks.length, totalResults);

  if (totalResults === 0) {
    resultsCount.innerHTML = "No treks found";
  } else if (displayedCount === totalResults) {
    resultsCount.innerHTML = `Showing all <span class="count">${totalResults}</span> trek${
      totalResults === 1 ? "" : "s"
    }`;
  } else {
    resultsCount.innerHTML = `Showing <span class="count">${displayedCount}</span> of ${totalResults} treks`;
  }
}

function loadMoreTreks() {
  currentPage++;
  renderTreks();
  updateResultsCount();

  // Scroll to the first new card
  const newCards = treksGrid.children;
  const firstNewCard = newCards[(currentPage - 1) * treksPerPage];
  if (firstNewCard) {
    setTimeout(() => {
      firstNewCard.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 200);
  }
}

function clearAllFilters() {
  // Reset all filters
  Object.values(filters).forEach((filter) => {
    filter.value = "";
  });

  // Reset search
  searchInput.value = "";

  // Reset page
  currentPage = 1;

  // Apply changes
  applyFilters();
  renderTreks();
  updateResultsCount();

  // Show notification
  showNotification("All filters cleared", "info");
}

function scrollToResults() {
  const resultsSection = document.querySelector(".all-treks-section");
  if (resultsSection) {
    setTimeout(() => {
      resultsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }
}

// Sort functionality (can be added later)
function sortTreks(sortBy) {
  switch (sortBy) {
    case "name":
      filteredTreks.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "price-low":
      filteredTreks.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      filteredTreks.sort((a, b) => b.price - a.price);
      break;
    case "duration":
      filteredTreks.sort((a, b) => a.duration - b.duration);
      break;
    case "difficulty":
      const difficultyOrder = {
        easy: 1,
        moderate: 2,
        challenging: 3,
        expert: 4,
      };
      filteredTreks.sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
      break;
    default:
      // Default order (by popularity or as defined in data)
      break;
  }

  currentPage = 1;
  renderTreks();
  updateResultsCount();
}

// Export functions for use in other scripts
window.TreksPage = {
  sortTreks,
  applyFilters,
  clearAllFilters,
  getTrekById: (id) => treksData.find((trek) => trek.id === id),
  getAllTreks: () => [...treksData],
};

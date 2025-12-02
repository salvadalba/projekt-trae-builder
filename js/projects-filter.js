// Projects Filter JavaScript for Portfolio Website
// Handles project filtering, search, and interactive features

'use strict';

function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.querySelector('.search-input');
    const filterReset = document.querySelector('.filter-reset');
    const projectsGrid = document.querySelector('.projects-grid');
    if (!filterButtons.length || !projectCards.length) return;
    let currentFilter = 'all';
    let currentSearchTerm = '';
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            setFilter(filter);
        });
    });
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }
    if (filterReset) {
        filterReset.addEventListener('click', resetFilters);
    }
    initializeProjectCards();
    filterProjects();
}

// Set active filter
function setFilter(filter) {
    currentFilter = filter;
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.classList.remove('filter-btn--active');
        if (button.getAttribute('data-filter') === filter) {
            button.classList.add('filter-btn--active');
        }
    });
    filterProjects();
}

// Handle search input
function handleSearch() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        currentSearchTerm = searchInput.value.toLowerCase().trim();
        filterProjects();
    }
}

// Reset all filters
function resetFilters() {
    currentFilter = 'all';
    currentSearchTerm = '';
    
    // Reset UI elements
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.value = '';
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.classList.remove('filter-btn--active');
        if (button.getAttribute('data-filter') === 'all') {
            button.classList.add('filter-btn--active');
        }
    });
    
    // Apply filter
    filterProjects();
}

// Filter projects based on current filter and search term
function filterProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    const noResultsMessage = document.querySelector('.no-results');
    let visibleCount = 0;
    projectCards.forEach(card => {
        const categoryAttr = card.getAttribute('data-category') || '';
        const cardCategories = categoryAttr.split(' ');
        const titleEl = card.querySelector('.project-card__title');
        const descEl = card.querySelector('.project-card__description');
        const cardTitle = titleEl ? titleEl.textContent.toLowerCase() : '';
        const cardDescription = descEl ? descEl.textContent.toLowerCase() : '';
        const cardTags = card.querySelectorAll('.tag');
        const matchesFilter = currentFilter === 'all' || cardCategories.includes(currentFilter);
        let matchesSearch = true;
        if (currentSearchTerm) {
            const searchTerms = currentSearchTerm.split(' ');
            const tagContent = Array.from(cardTags).map(tag => tag.textContent.toLowerCase()).join(' ');
            const allContent = `${cardTitle} ${cardDescription} ${tagContent}`;
            matchesSearch = searchTerms.every(term => allContent.includes(term));
        }
        const shouldShow = matchesFilter && matchesSearch;
        if (shouldShow) {
            card.style.display = 'block';
            card.classList.add('fade-in-visible');
            visibleCount++;
        } else {
            card.style.display = 'none';
            card.classList.remove('fade-in-visible');
        }
    });
    if (noResultsMessage) {
        noResultsMessage.style.display = visibleCount === 0 ? 'block' : 'none';
    }
    updateResultsCount(visibleCount, projectCards.length);
}

// Update results count display
function updateResultsCount(visible, total) {
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${visible} of ${total} projects`;
    }
}

// Initialize project cards with additional functionality
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        const projectLink = card.querySelector('a.btn.btn--small.btn--primary');
        if (projectLink) {
            card.addEventListener('mouseenter', function() { this.classList.add('hovered'); });
            card.addEventListener('mouseleave', function() { this.classList.remove('hovered'); });
        }
        const projectTags = card.querySelectorAll('.tag');
        projectTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.stopPropagation();
                const tagText = this.textContent.toLowerCase();
                const filterButtons = document.querySelectorAll('.filter-btn');
                filterButtons.forEach(button => {
                    const buttonFilter = button.getAttribute('data-filter');
                    if (tagText.includes(buttonFilter) || buttonFilter.includes(tagText)) {
                        setFilter(buttonFilter);
                        const filterContainer = document.querySelector('.filter-buttons');
                        if (filterContainer) {
                            filterContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    }
                });
            });
        });
        const imgEl = card.querySelector('img');
        if (imgEl) {
            imgEl.addEventListener('error', function() {
                this.src = 'images/placeholder-project.jpg';
                this.alt = 'Project image placeholder';
            });
        }
    });
}

// Add advanced filtering options
function initAdvancedFiltering() {
    const advancedFilterToggle = document.querySelector('.advanced-filter-toggle');
    const advancedFilters = document.querySelector('.advanced-filters');
    
    if (!advancedFilterToggle || !advancedFilters) return;
    
    advancedFilterToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.setAttribute('aria-expanded', !isExpanded);
        advancedFilters.classList.toggle('active');
        
        // Update button text
        this.textContent = isExpanded ? 'Show Advanced Filters' : 'Hide Advanced Filters';
    });
    
    // Add sorting functionality
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', handleSorting);
    }
}

// Handle project sorting
function handleSorting() {
    const sortSelect = document.querySelector('.sort-select');
    const projectsGrid = document.querySelector('.projects-grid');
    
    if (!sortSelect || !projectsGrid) return;
    
    const sortBy = sortSelect.value;
    const projectCards = Array.from(projectsGrid.querySelectorAll('.project-card'));
    
    // Sort projects
    projectCards.sort((a, b) => {
        switch (sortBy) {
            case 'title':
                const titleA = a.querySelector('.project-title').textContent;
                const titleB = b.querySelector('.project-title').textContent;
                return titleA.localeCompare(titleB);
            
            case 'date':
                const dateA = new Date(a.getAttribute('data-date') || '2024-01-01');
                const dateB = new Date(b.getAttribute('data-date') || '2024-01-01');
                return dateB - dateA; // Newest first
            
            case 'category':
                const categoryA = a.getAttribute('data-category');
                const categoryB = b.getAttribute('data-category');
                return categoryA.localeCompare(categoryB);
            
            default:
                return 0;
        }
    });
    
    // Reorder DOM elements
    projectCards.forEach(card => {
        projectsGrid.appendChild(card);
    });
    
    // Re-apply current filter
    filterProjects();
}

// Utility function: debounce
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Styles are defined in CSS; no inline injections

// Initialize advanced filtering when DOM is ready
document.addEventListener('DOMContentLoaded', initAdvancedFiltering);

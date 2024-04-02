// =============START================//
//              Theme Changer         ////
// =============START===============//
const darkModeToggle = document.getElementById('darkModeToggle');
const lightIcon = document.getElementById('lightIcon');
const darkIcon = document.getElementById('darkIcon');

// Check if the browser has dark mode enabled
const isDarkModeEnabled = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

// Check if the user has a preference stored in localStorage
const userPreference = localStorage.getItem('theme');

// Set initial theme based on user preference or browser dark mode
if (userPreference === 'dark' || (isDarkModeEnabled && userPreference !== 'light')) {
    document.body.classList.add('dark');
    lightIcon.style.display = 'none';
    darkIcon.style.display = 'block';
}

darkModeToggle.addEventListener('click', () => {
    const isDarkMode = document.body.classList.toggle('dark');
    lightIcon.style.display = isDarkMode ? 'none' : 'block';
    darkIcon.style.display = isDarkMode ? 'block' : 'none';

    // Save user preference in localStorage
    const themePreference = isDarkMode ? 'dark' : 'light';
    localStorage.setItem('theme', themePreference);
});
// ===============END================//
//              Theme Changer         ////
// ===============END===============//



// =============START================//
//               Mobile Menu          ////
// =============START===============//

document.addEventListener("DOMContentLoaded", function() {
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const closeMobileMenuBtn = document.getElementById("close-mobile-menu-btn");
    const mobileMenuOverlay = document.getElementById("mobile-menu-overlay");
    const mobileMenuContent = document.getElementById("mobile-menu-content");
    const navItems = document.querySelectorAll('.nav-item'); // Add this line to select all nav-items

    // Open mobile menu when mobileMenuBtn is clicked
    mobileMenuBtn.addEventListener("click", function() {
        mobileMenuOverlay.classList.remove("hidden");
        mobileMenuContent.classList.remove("translate-x-full");
        mobileMenuContent.classList.add("transition-transform", "ease-in-out");
    });

    // Close mobile menu when closeMobileMenuBtn is clicked
    closeMobileMenuBtn.addEventListener("click", function() {
        mobileMenuContent.classList.add("translate-x-full");
        setTimeout(function() {
            mobileMenuOverlay.classList.add("hidden");
        }, 300);
    });

    // Close mobile menu when a nav-item is clicked
    navItems.forEach(function(navItem) {
        navItem.addEventListener("click", function() {
            mobileMenuContent.classList.add("translate-x-full");
            setTimeout(function() {
                mobileMenuOverlay.classList.add("hidden");
            }, 300);
        });
    });
});



// =============END================//
//               Mobile Menu          ////
// =============END===============//

// =============START================//
//               Active Class         ////
// =============START===============//
document.addEventListener("DOMContentLoaded", function () {
    let sections = document.querySelectorAll('section');
    let menuLinks = document.querySelectorAll('.menu-link');
    let navItems = document.querySelectorAll('.nav-item');

    // Set the initial active state on page load
    setInitialActiveState();

    window.addEventListener('scroll', function () {
        applyActiveStyles();
    });

    // Handle menu link clicks
    handleMenuLinksClick(menuLinks, 20);

    function applyActiveStyles() {
        let currentScroll = window.scrollY;

        sections.forEach(sec => {
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute('id');

            if (currentScroll >= offset && currentScroll < offset + height) {
                // Remove 'active' class from all menu links and nav items
                menuLinks.forEach(menuLink => {
                    menuLink.classList.remove('active', 'brand-text', 'dark:text-white');
                });

                navItems.forEach(navItem => {
                    navItem.classList.remove('active', 'brand-text', 'dark:text-white');
                });

                // Add 'active' class to the corresponding menu link and nav item
                const activeMenuLink = document.querySelector('.menu-link[href="#' + id + '"]');
                const activeNavItem = document.querySelector('.nav-item[href="#' + id + '"]');

                // Check if dark mode is active and add the appropriate text color class
                if (isDarkModeActive()) {
                    activeMenuLink.classList.add('active', 'brand-text');
                    activeNavItem.classList.add('active', 'brand-text');
                } else {
                    activeMenuLink.classList.add('active', 'dark:text-white');
                    activeNavItem.classList.add('active', 'dark:text-white');
                }
            }
        });
    }

    // Set the initial active state based on the current scroll position
    function setInitialActiveState() {
        applyActiveStyles();
    }

    // Add a function to check if dark mode is active
    function isDarkModeActive() {
        // Replace this with your actual logic to determine if dark mode is active
        // For example, you might be using a class on the body element
        return document.body.classList.contains('dark');
    }

    // Function to handle menu link clicks
    function handleMenuLinksClick(menuLinks, margin) {
        menuLinks.forEach(function (link) {
            link.addEventListener('click', function (event) {
                event.preventDefault();

                const targetSectionId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetSectionId);

                if (targetSection) {
                    const targetPosition = targetSection.offsetTop - margin;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth',
                    });

                    // Update the active state on menu link click
                    applyActiveStyles();
                }
            });
        });
    }
});
// ===============END================//
//               Active Class         ////
// ===============END===============//
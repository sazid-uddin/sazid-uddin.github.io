"use strict";

// theme toggle functionality
const themeToggleBtn = document.querySelector("[data-theme-toggle]");
const body = document.body;

// check for saved theme preference or default to 'light' mode
const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

// theme toggle function
const toggleTheme = function () {
    const isLightMode = body.getAttribute("data-theme") === "light";
    const newTheme = isLightMode ? "dark" : "light";

    body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
};

// add click event to theme toggle button
themeToggleBtn.addEventListener("click", toggleTheme);

// element toggle function
const elementToggleFunc = function (elem) {
    elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
    elementToggleFunc(sidebar);
});

// testimonials variables
// const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
// const modalContainer = document.querySelector("[data-modal-container]");
// const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
// const overlay = document.querySelector("[data-overlay]");

// modal variable
// const modalImg = document.querySelector("[data-modal-img]");
// const modalTitle = document.querySelector("[data-modal-title]");
// const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
// const testimonialsModalFunc = function () {
//     modalContainer.classList.toggle("active");
//     overlay.classList.toggle("active");
// };

// add click event to all modal items
// for (let i = 0; i < testimonialsItem.length; i++) {
//     testimonialsItem[i].addEventListener("click", function () {
//         modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
//         modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
//         modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
//         modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

//         testimonialsModalFunc();
//     });
// }

// add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
// const select = document.querySelector("[data-select]");
// const selectItems = document.querySelectorAll("[data-select-item]");
// const selectValue = document.querySelector("[data-selecct-value]");
// const filterBtn = document.querySelectorAll("[data-filter-btn]");

// select.addEventListener("click", function () {
//     elementToggleFunc(this);
// });

// // add event in all select items
// for (let i = 0; i < selectItems.length; i++) {
//     selectItems[i].addEventListener("click", function () {
//         let selectedValue = this.innerText.toLowerCase();
//         selectValue.innerText = this.innerText;
//         elementToggleFunc(select);
//         filterFunc(selectedValue);
//     });
// }

// // filter variables
// const filterItems = document.querySelectorAll("[data-filter-item]");

// const filterFunc = function (selectedValue) {
//     for (let i = 0; i < filterItems.length; i++) {
//         if (selectedValue === "all") {
//             filterItems[i].classList.add("active");
//         } else if (selectedValue === filterItems[i].dataset.category) {
//             filterItems[i].classList.add("active");
//         } else {
//             filterItems[i].classList.remove("active");
//         }
//     }
// };

// // add event in all filter button items for large screen
// let lastClickedBtn = filterBtn[0];

// for (let i = 0; i < filterBtn.length; i++) {
//     filterBtn[i].addEventListener("click", function () {
//         let selectedValue = this.innerText.toLowerCase();
//         selectValue.innerText = this.innerText;
//         filterFunc(selectedValue);

//         lastClickedBtn.classList.remove("active");
//         this.classList.add("active");
//         lastClickedBtn = this;
//     });
// }

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener("input", function () {
        // check form validation
        if (form.checkValidity()) {
            formBtn.removeAttribute("disabled");
        } else {
            formBtn.setAttribute("disabled", "");
        }
    });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener("click", function () {
        for (let i = 0; i < pages.length; i++) {
            if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
                pages[i].classList.add("active");
                navigationLinks[i].classList.add("active");
                window.scrollTo(0, 0);
            } else {
                pages[i].classList.remove("active");
                navigationLinks[i].classList.remove("active");
            }
        }
    });
}

// timeline toggle functionality
const timelineCards = document.querySelectorAll(".timeline-card");

timelineCards.forEach(function (card) {
    card.addEventListener("click", function (event) {
        // Prevent toggling if a link or button inside the card is clicked
        if (event.target.closest("a, button")) return;

        const toggle = card.querySelector(".timeline-toggle");
        const details = card.querySelector(".timeline-details");
        const isExpanded = toggle.getAttribute("aria-expanded") === "true";

        if (isExpanded) {
            toggle.setAttribute("aria-expanded", "false");
            details.classList.remove("expanded");
            details.classList.add("collapsed");
        } else {
            toggle.setAttribute("aria-expanded", "true");
            details.classList.remove("collapsed");
            details.classList.add("expanded");
        }
    });
});

// research card click functionality
const researchCards = document.querySelectorAll(".research-card");

// Create overlay element
const researchOverlay = document.createElement("div");
researchOverlay.className = "research-overlay";
document.body.appendChild(researchOverlay);

researchCards.forEach(function (card) {
    card.addEventListener("click", function (event) {
        // Don't trigger if clicking on close button
        if (event.target.closest("[data-research-close]")) {
            return;
        }

        // Don't trigger if card is already expanded (in overlay mode)
        if (card.classList.contains("expanded-overlay")) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const abstract = card.querySelector(".research-abstract");
        const toggleBtn = card.querySelector("[data-abstract-toggle]");

        // Close any currently expanded cards
        document.querySelectorAll(".research-card.expanded-overlay").forEach(function (expandedCard) {
            expandedCard.classList.remove("expanded-overlay");
            const expandedAbstract = expandedCard.querySelector(".research-abstract");
            expandedAbstract.classList.remove("active");
        });

        // Open the overlay
        card.classList.add("expanded-overlay");
        abstract.classList.add("active");
        researchOverlay.classList.add("active");
        document.body.classList.add("research-overlay-active");
    });
});

// Close overlay when clicking outside the expanded card or on the close button
document.addEventListener("click", function (event) {
    const expandedCard = document.querySelector(".research-card.expanded-overlay");
    if (expandedCard) {
        // Check if the click is on the close button or outside the expanded card
        const isCloseButton = event.target.closest("[data-research-close]");
        const isOutsideCard = !expandedCard.contains(event.target);

        if (isCloseButton || isOutsideCard) {
            const abstract = expandedCard.querySelector(".research-abstract");

            expandedCard.classList.remove("expanded-overlay");
            abstract.classList.remove("active");
            researchOverlay.classList.remove("active");
            document.body.classList.remove("research-overlay-active");
        }
    }
});

// Close overlay with Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        const expandedCard = document.querySelector(".research-card.expanded-overlay");
        if (expandedCard) {
            const abstract = expandedCard.querySelector(".research-abstract");

            expandedCard.classList.remove("expanded-overlay");
            abstract.classList.remove("active");
            researchOverlay.classList.remove("active");
            document.body.classList.remove("research-overlay-active");
        }
    }
});

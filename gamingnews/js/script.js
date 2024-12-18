// Select all navigation buttons, video slides, and content sections
const btns = document.querySelectorAll(".nav-btn");
const slides = document.querySelectorAll(".video-slide");
const contents = document.querySelectorAll(".content");

// Initialize the current slide index and total number of slides
let currentSlide = 0;
const totalSlides = slides.length;

// Function to show a specific slide based on its index
function showSlide(slideIndex) {
   // Check if the slide index is out of bounds
   if (slideIndex < 0) {
      slideIndex = totalSlides - 1;
   } else if (slideIndex >= totalSlides) {
      slideIndex = 0;
   }

   // Remove active classes from previous slide
   btns[currentSlide].classList.remove("active");
   slides[currentSlide].classList.remove("active");
   contents[currentSlide].classList.remove("active");

   // Update current slide index
   currentSlide = slideIndex;

   // Add active classes to the current slide
   btns[currentSlide].classList.add("active");
   slides[currentSlide].classList.add("active");
   contents[currentSlide].classList.add("active");
}

// Function to automatically switch to the next slide
function autoSlide() {
   showSlide(currentSlide + 1);
}

// Initialize the first slide on page load
window.onload = function () {
   showSlide(0);
   // Set an interval to autoSlide every 10000 milliseconds (10 seconds)
   setInterval(autoSlide, 10000);
};

// Add click event listeners to navigation buttons
btns.forEach((btn, i) => {
   btn.addEventListener("click", () => {
      showSlide(i);
   });
});

// Select elements for opening and closing the modal
const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

// Event listener to open the modal
open.addEventListener('click', () => {
   modal_container.classList.add('show');
});

// Event listener to close the modal
close.addEventListener('click', () => {
   modal_container.classList.remove('show');
});

// Popup functionality for three separate modals
const open1 = document.getElementById('open');
const modal_container1 = document.getElementById('modal_container');
const close1 = document.getElementById('close');

const open2 = document.getElementById('open_2');
const modal_container2 = document.getElementById('modal_container_2');
const close2 = document.getElementById('close_2');

const open3 = document.getElementById('open_3');
const modal_container3 = document.getElementById('modal_container_3');
const close3 = document.getElementById('close_3');

// Function to open a specific modal container
function openModal(modalContainer) {
   modalContainer.classList.add('show');
}

// Function to close a specific modal container
function closeModal(modalContainer) {
   modalContainer.classList.remove('show');
}

// Listen for the Esc key press to close any open modal
window.addEventListener('keydown', function (event) {
   if (event.key === 'Escape') {
      closeModal(modal_container1);
      closeModal(modal_container2);
      closeModal(modal_container3);
   }
});

// Add click event listeners to open and close modals
open1.addEventListener('click', () => {
   openModal(modal_container1);
});

close1.addEventListener('click', () => {
   closeModal(modal_container1);
});

open2.addEventListener('click', () => {
   openModal(modal_container2);
});

close2.addEventListener('click', () => {
   closeModal(modal_container2);
});

open3.addEventListener('click', () => {
   openModal(modal_container3);
});

close3.addEventListener('click', () => {
   closeModal(modal_container3);
});
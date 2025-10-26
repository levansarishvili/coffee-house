'use strict';

import { FALLBACK_DATA } from '../constants/constants.js';
import { fetchProducts } from '../utils/fetchProducts.js';
import { renderSlider } from '../utils/renderSlider.js';
import { showErrorMessage } from '../utils/showErrorMessage.js';
import { showSpinner } from '../utils/showSpinner.js';

export const slider = async () => {
  // ================= Slider =================
  const sliderWrapper = document.querySelector<HTMLElement>('.slider-area');

  showSpinner(true, sliderWrapper);

  const prevButton = document.querySelector<HTMLElement>('.left-arrow-btn');
  const nextButton = document.querySelector<HTMLElement>('.right-arrow-btn');
  const controlLinesFill =
    document.querySelectorAll<HTMLElement>('.control-line-fill');

  const sliderErrorMessageWrapperEl = document.querySelector<HTMLDivElement>(
    '.slider-error-message-wrapper'
  );

  let curSlide = 0;
  let maxSlide = 0;
  let slideInterval = 5000;
  let slides: NodeListOf<HTMLElement>;

  let intervalId: ReturnType<typeof setInterval>;
  let timeoutId: ReturnType<typeof setTimeout>;
  let startTime: number;
  let remainingTime = slideInterval;
  let isPaused = false;

  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  let isSwiping = false;

  // Fetch and render slider data
  try {
    const favoriteProducts = await fetchProducts(true);

    showSpinner(false, sliderWrapper);
    renderSlider(favoriteProducts, sliderWrapper);
  } catch (error) {
    console.error(error);
    showSpinner(false, sliderWrapper);
    renderSlider(FALLBACK_DATA, sliderWrapper);

    sliderErrorMessageWrapperEl?.classList.remove('display-none');
    showErrorMessage(
      'Something went wrong. Please, refresh the page',
      sliderErrorMessageWrapperEl
    );
  } finally {
    slides = document.querySelectorAll(
      '.slider-content'
    ) as NodeListOf<HTMLElement>;

    maxSlide = slides.length - 1;
    showSpinner(false, sliderWrapper);
  }

  // Function to update progress bar lines
  function updateProgressBar() {
    controlLinesFill.forEach((line, i) => {
      if (i === curSlide) {
        line.classList.add('active-control-line');
      } else {
        line.classList.remove('active-control-line');
      }
    });
  }

  // Go to previous slide
  function prevSlide() {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide -= 1;
    }
    goToSlide();
  }

  // Go to next slide
  function nextSlide() {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide += 1;
    }
    goToSlide();
  }

  // Clear all intervals and timeouts
  function clearAllIntervals() {
    clearInterval(intervalId);
    clearTimeout(timeoutId);
  }

  // Start slider
  function startSlider() {
    clearAllIntervals();
    startTime = Date.now();
    intervalId = setInterval(() => {
      if (!isPaused) {
        nextSlide();
      }
    }, slideInterval);
  }

  // Reset slider interval
  function resetSlider() {
    clearAllIntervals();
    startSlider();
  }

  // Add event listener to prev button
  prevButton?.addEventListener('click', () => {
    prevSlide();
    resetSlider();
  });

  // Add event listener to next button
  nextButton?.addEventListener('click', () => {
    nextSlide();
    resetSlider();
  });

  // Stop infinite slider when hover or click on slider wrapper
  sliderWrapper?.addEventListener('mouseover', (e: MouseEvent) => {
    const slide = (e.target as HTMLElement)?.closest('.slider-content');
    if (!slide || !sliderWrapper.contains(slide as HTMLElement)) return;

    isPaused = true;
    clearAllIntervals();
    const elapsed = Date.now() - startTime;
    remainingTime = slideInterval - elapsed;
    controlLinesFill[curSlide].classList.add('paused');
  });

  sliderWrapper?.addEventListener('mouseleave', () => {
    isPaused = false;
    clearAllIntervals();
    timeoutId = setTimeout(() => {
      nextSlide();
      startSlider();
    }, remainingTime);
    controlLinesFill[curSlide].classList.remove('paused');
  });

  function goToSlide() {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - curSlide)}vw)`;
    });
    updateProgressBar();
  }

  // ================= Touch Swipe =================

  // Add touchstart event listener
  sliderWrapper?.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchEndX = touchStartX;
    touchEndY = touchStartY;
    isSwiping = true;
    isPaused = true;
    clearAllIntervals();

    // Pause progress bar
    const elapsed = Date.now() - startTime;
    remainingTime = slideInterval - elapsed;
    controlLinesFill[curSlide].classList.add('paused');
  });

  // Add touchmove event listener
  sliderWrapper?.addEventListener('touchmove', (e) => {
    if (!isSwiping) return;

    touchEndX = e.touches[0].clientX;
    touchEndY = e.touches[0].clientY;

    // Calculate the distance moved in both directions
    const deltaX = Math.abs(touchEndX - touchStartX);
    const deltaY = Math.abs(touchEndY - touchStartY);

    if (deltaX > deltaY) {
      e.preventDefault();
    }
  });

  // Add touchend event listener
  sliderWrapper?.addEventListener('touchend', () => {
    if (!isSwiping) return;

    isSwiping = false;
    isPaused = false;
    controlLinesFill[curSlide].classList.remove('paused');

    handleSwipe();

    clearAllIntervals();
    timeoutId = setTimeout(() => {
      nextSlide();
      startSlider();
    }, remainingTime);
  });

  // Function to handle swipe based on touch start and end positions
  function handleSwipe() {
    const swipeThreshold = 50;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    if (absDeltaX < swipeThreshold || absDeltaX <= absDeltaY) return;

    if (deltaX > 0) {
      prevSlide();
      resetSlider();
    } else {
      nextSlide();
      resetSlider();
    }
  }

  // ================= Initialize =================
  goToSlide();
  updateProgressBar();
  startSlider();
};

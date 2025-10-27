import { slider } from '../components/slider.js';
import { setupHeaderCartListener } from '../utils/setupHeaderCartListener.js';

export const home = () => {
  setupHeaderCartListener();

  // Initialize Slider
  slider();
};

const imageElement = document.getElementById('image');
const nextBtn = document.getElementById('next-btn');
const errorMessage = document.getElementById('error-message');
const spinner = document.getElementById('spinner');
const apiSelect = document.getElementById('api-select');

// API URLs
const waifuApi = 'https://api.waifu.pics/sfw/waifu';
const nekoApi = 'https://api.nekosia.cat/api/v1';

// Fetch a random image from the selected API
async function fetchImage(apiUrl) {
  showSpinner();
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    const imageUrl = data.url || data.image; // Waifu uses 'url', Neko uses 'image'
    imageElement.src = imageUrl;
    imageElement.style.opacity = 1; // Fade in the new image
    errorMessage.textContent = ''; // Clear any previous errors
  } catch (error) {
    errorMessage.textContent = `Failed to load image: ${error.message}`;
  } finally {
    hideSpinner();
  }
}

// Get the correct API URL based on the selected option
function getApiUrl() {
  return apiSelect.value === 'waifu' ? waifuApi : nekoApi;
}

// Show the spinner and hide the image during loading
function showSpinner() {
  spinner.style.display = 'block';
  imageElement.style.opacity = 0; // Fade out the old image
}

// Hide the spinner once the image is loaded
function hideSpinner() {
  spinner.style.display = 'none';
}

// Load a new image when the Next button is clicked
nextBtn.addEventListener('click', () => {
  fetchImage(getApiUrl());
});

// Load an image on initial page load
window.onload = () => fetchImage(getApiUrl());

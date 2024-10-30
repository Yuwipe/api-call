const waifuImage = document.getElementById('waifu-image');
const nextBtn = document.getElementById('next-btn');
const errorMessage = document.getElementById('error-message');

// Fetch a random waifu image
async function fetchWaifuImage() {
  try {
    const response = await fetch('https://api.waifu.pics/sfw/waifu');
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    waifuImage.src = data.url;
    waifuImage.style.opacity = 1; // Fade in the new image
    errorMessage.textContent = ''; // Clear any previous errors
  } catch (error) {
    errorMessage.textContent = `Failed to load image: ${error.message}`;
  }
}

// Load a new image when the Next button is clicked
nextBtn.addEventListener('click', () => {
  waifuImage.style.opacity = 0; // Fade out the old image
  fetchWaifuImage();
});

// Load a waifu image on initial page load
window.onload = fetchWaifuImage;

console.log('JavaScript file is loaded');
const ACCESS_KEY = '6tkiYVWM7P6o5QyMujyycn9Rjf5zCvFxTxBmiItACkA'; 
const API_URL = 'https://api.unsplash.com/search/photos';

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const imageGrid = document.getElementById('imageGrid');
const selectedItems = document.getElementById('selectedItems');

searchButton.addEventListener('click', () => {
  const query = searchBar.value;
  fetchImages(query);
});

async function fetchImages(query) {
  try {
    const url = `${https://api.unsplash.com/search/photos}?query=${cuteoutfits}&client_id=${6tkiYVWM7P6o5QyMujyycn9Rjf5zCvFxTxBmiItACkA}`;
    console.log(`Fetching from URL: ${url}`);
    
    const response = await fetch(url);

 if (!response.ok) {
      throw new Error('Network response was not ok: ' + response.statusText);
    }
    
    const data = await response.json();
    console.log('Fetched data:', data); // Debugging data
    
    displayImages(data.results);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function displayImages(images) {
  imageGrid.innerHTML = ''; 
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description || 'Image description'; // Fallback text
    imgElement.addEventListener('click', () => addToOutfit(image));
    imageGrid.appendChild(imgElement);
  });
}

function addToOutfit(image) {
  const imgElement = document.createElement('img');
  imgElement.src = image.urls.small;
  imgElement.alt = image.alt_description || 'Image description'; // Fallback text
  imgElement.addEventListener('click', () => removeFromOutfit(imgElement));
  selectedItems.appendChild(imgElement);
}

function removeFromOutfit(imgElement) {
  selectedItems.removeChild(imgElement);
}

const categories = ['tops', 'bottoms', 'accessories'];
const trends = [
  { trendName: 'Street Style', description: 'Casual and comfortable everyday outfits.' },
  { trendName: 'Bohemian', description: 'Free-spirited and artistic styles.' },
  { trendName: 'Minimalist', description: 'Simple and clean designs with a focus on essentials.' }
];

function getItemsByCategory(category) {
}

function getItemsByTrend(trendName) {
}

console.log('Available Categories:', categories);
console.log('Current Trends:', trends);

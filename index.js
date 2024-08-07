const ACCESS_KEY = '85rDJ8Vj_x6UfiLcCal7O9ZPCo6f5oKm7sKfklNy4I4'; 
const API_URL = 'https://api.unsplash.com/search/photos';

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const imageGrid = document.getElementById('imageGrid');
const selectedItems = document.getElementById('selectedItems');

searchButton.addEventListener('click', () => {
const query = searchBar.value;
console.log('Search button clicked. Query:', query);
fetchImages(query);
});

async function fetchImages(query) {
  console.log('Fetching images with query:', query);
  try {
    const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}&client_id=${ACCESS_KEY}`);
    console.log('API response:', response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Fetched data:', data);
    displayImages(data.results);
  } catch (error) {
    console.error('Error fetching images:', error);
  }
}

function displayImages(images) {
  console.log('Displaying images. Number of images:', images.length);
  imageGrid.innerHTML = ''; 
  images.forEach(image => {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description;
    imgElement.addEventListener('click', () => addToOutfit(image));
    imageGrid.appendChild(imgElement);
  });
}

function addToOutfit(image) {
  console.log('Adding image to outfit:', image);
  const imgElement = document.createElement('img');
  imgElement.src = image.urls.small;
  imgElement.alt = image.alt_description;
  imgElement.addEventListener('click', () => removeFromOutfit(imgElement));
  selectedItems.appendChild(imgElement);
}

function removeFromOutfit(imgElement) {
  console.log('Removing image from outfit:', imgElement.src);
  selectedItems.removeChild(imgElement);
}

const categories = ['tops', 'bottoms', 'accessories'];
const trends = [
  { trendName: 'Street Style', description: 'Casual and comfortable everyday outfits.' },
  { trendName: 'Bohemian', description: 'Free-spirited and artistic styles.' },
  { trendName: 'Minimalist', description: 'Simple and clean designs with a focus on essentials.' }
];

function getItemsByCategory(category) {
  console.log('Fetching items by category:', category);
}

function getItemsByTrend(trendName) {
  console.log('Fetching items by trend:', trendName);
}

console.log('Available Categories:', categories);
console.log('Current Trends:', trends);
console.log('JavaScript file is loaded');

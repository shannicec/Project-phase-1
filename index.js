const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const imageGrid = document.getElementById('imageGrid');
const selectedItems = document.getElementById('selectedItems');

async function fetchImages(query) {
const ACCESS_KEY = 'cDZNa8MwbJvAT4gJpBjwMswxo2dpc2Q4yEUIo5R30wg';
const API_URL = 'https://api.unsplash.com/search/photos';
  
  try {
  const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}&client_id=${ACCESS_KEY}`);
  const data = await response.json();
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
imgElement.alt = image.alt_description;
imgElement.addEventListener('click', () => addToOutfit(image));
imageGrid.appendChild(imgElement);
  });
}

function addToOutfit(image) {
const imgElement = document.createElement('img');
imgElement.src = image.urls.small;
imgElement.alt = image.alt_description;
imgElement.addEventListener('click', () => removeFromOutfit(imgElement));
selectedItems.appendChild(imgElement);
}

function addToOutfit(imageUrl) {
const imgElement = document.createElement('img');
imgElement.src = imageUrl;
imgElement.alt = 'Selected item';
imgElement.addEventListener('click', () => imgElement.remove());
selectedItems.appendChild(imgElement);
  }

function fetchSuggestedOutfits() {
const url = `https://api.unsplash.com/search/photos?query=fashion-trends&client_id=YOUR_UNSPLASH_ACCESS_KEY`;
fetch(url)
.then(response => response.json())
.then(data => displaySuggestions(data.results))
.catch(error => console.error('Error fetching suggestions:', error));
  }

function displaySuggestions(images) {
suggestions.innerHTML = '';
images.forEach(image => {
const imgElement = document.createElement('img');
imgElement.src = image.urls.small;
imgElement.alt = image.alt_description;
suggestions.appendChild(imgElement);
    });
  }

searchBar.addEventListener('input', (event) => {
const query = event.target.value;
if (query) {
fetchImages(query);
    } else {
      imageGallery.innerHTML = '';
    }
  });

fetchSuggestedOutfits();
});
function removeFromOutfit(imgElement) {
selectedItems.removeChild(imgElement);
}

const categories = ['tops', 'bottoms', 'accessories'];
const trends = [
  { trendName: 'Street Style', description: 'Casual and comfortable everyday outfits.' },
  { trendName: 'Bohemian', description: 'Free-spirited and artistic styles.' },
  { trendName: 'Minimalist', description: 'Simple and clean designs with a focus on essentials.' }
];
console.log('Available Categories:', categories);
console.log('Current Trends:', trends);
console.log('JavaScript file is loaded');

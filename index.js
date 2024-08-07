const ACCESS_KEY = 'cDZNa8MwbJvAT4gJpBjwMswxo2dpc2Q4yEUIo5R30wg'; 
const API_URL = 'https://api.unsplash.com/search/photos';

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const imageGrid = document.getElementById('imageGrid');
const selectedItems = document.getElementById('selectedItems');

searchButton.addEventListener('click', () => {
  const query = searchBar.value.trim();
  if (query === '') {
    alert('Please enter a search query.');
    return;
  }
  console.log('Search query:', query);
  fetchImages(query);
});

async function fetchImages(query) {
  try {
    console.log('Fetching images...');
    showLoadingState(true);
    const response = await fetch(`${API_URL}?query=${encodeURIComponent(query)}&client_id=${ACCESS_KEY}`);
    console.log('Response received:', response);
    const data = await response.json();
    console.log('Data received:', data);
    displayImages(data.results);
    showLoadingState(false);
  } catch (error) {
    console.error('Error fetching images:', error);
    showLoadingState(false);
  }
}

function displayImages(images) {
  imageGrid.innerHTML = ''; 
  if (images.length === 0) {
    imageGrid.innerHTML = '<p>No images found.</p>';
    return;
  }
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

function removeFromOutfit(imgElement) {
  selectedItems.removeChild(imgElement);
}

function showLoadingState(isLoading) {
  if (isLoading) {
    imageGrid.innerHTML = '<p>Loading...</p>';
  } else {
    imageGrid.innerHTML = '';
  }
}

console.log('JavaScript file is loaded');

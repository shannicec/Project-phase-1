const ACCESS_KEY = '6tkiYVWM7P6o5QyMujyycn9Rjf5zCvFxTxBmiItACkA'; 
const API_URL = 'https://api.unsplash.com/search/photos';

const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');
const imageGrid = document.getElementById('imageGrid');
const selectedItems = document.getElementById('selectedItems');

searchButton.addEventListener('click', () => {
    const query = searchBar.value.trim();
    if (query) {
        fetchImages(query);
    } else {
        console.log('Search query is empty.');
    }
});

async function fetchImages(query) {
    try {
        const response = await fetch(`${https://api.unsplash.com/search/photos}?query=${cuteoutfits}&client_id=${6tkiYVWM7P6o5QyMujyycn9Rjf5zCvFxTxBmiItACkA}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('API Response:', data); // Debugging: check API response
        displayImages(data.results);
    } catch (error) {
        console.error('Error fetching images:', error);
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
        imgElement.alt = image.alt_description || 'Image description';
        imgElement.addEventListener('click', () => addToOutfit(image));
        imageGrid.appendChild(imgElement);
    });
}

function addToOutfit(image) {
    const imgElement = document.createElement('img');
    imgElement.src = image.urls.small;
    imgElement.alt = image.alt_description || 'Image description';
    imgElement.addEventListener('click', () => removeFromOutfit(imgElement));
    selectedItems.appendChild(imgElement);
}

function removeFromOutfit(imgElement) {
    selectedItems.removeChild(imgElement);
}

function fetchImages(query) {
    const data = {
        results: [
            { urls: { small: 'https://via.placeholder.com/150' }, alt_description: 'Placeholder image' }
        ]
    };
    displayImages(data.results);
}

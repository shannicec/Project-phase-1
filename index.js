document.addEventListener('DOMContentLoaded', () => {
  const searchBar = document.getElementById('search-bar');
  const searchButton = document.getElementById('search-button');
  const imageGallery = document.getElementById('image-gallery');
  const selectedItems = document.getElementById('selected-items');
  const suggestions = document.getElementById('suggestions');

  function fetchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=cDZNa8MwbJvAT4gJpBjwMswxo2dpc2Q4yEUIo5R30wg`;
  fetch(url)
      .then(response => response.json())
      .then(data => displayImages(data.results))
      .catch(error => console.error('Error fetching images:', error));
  }

  function displayImages(images) {
  imageGallery.innerHTML = '';
  images.forEach(image => {
      const imgElement = document.createElement('img');
      imgElement.src = image.urls.small;
      imgElement.alt = image.alt_description;
      imgElement.addEventListener('click', () => addToOutfit(image.urls.small));
      imageGallery.appendChild(imgElement);
    });
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

  searchButton.addEventListener('click', () => {
    const query = searchBar.value;
    if (query) {
      fetchImages(query);
    } else {
      imageGallery.innerHTML = '';
    }
  });

  fetchSuggestedOutfits();
});

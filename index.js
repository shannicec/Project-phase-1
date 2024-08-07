  const searchBar = document.getElementById('search-bar');
  const searchButton = document.getElementById('search-button');
  const categoryFilter = document.getElementById('category-filter');
  const imageGallery = document.getElementById('image-gallery');
  const selectedItems = document.getElementById('selected-items');
  const suggestions = document.getElementById('suggestions');

  let allImages = [];

  function fetchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=cDZNa8MwbJvAT4gJpBjwMswxo2dpc2Q4yEUIo5R30wg`;
  fetch(url)
      .then(response => response.json())
      .then(data => {
        allImages = data.results;
        displayImages(allImages);
      })
      .catch(error => console.error('Error fetching images:', error));
  }

  function displayImages(images) {
  imageGallery.innerHTML = '';
  images.forEach(image => {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('image-container');

      const imgElement = document.createElement('img');
      imgElement.src = image.urls.small;
      imgElement.alt = image.alt_description;
      imgElement.addEventListener('click', () => addToOutfit(image.urls.small));

      imgContainer.appendChild(imgElement);
      imageGallery.appendChild(imgContainer);
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
  const url = `https://api.unsplash.com/search/photos?query=fashion-trends&client_id=cDZNa8MwbJvAT4gJpBjwMswxo2dpc2Q4yEUIo5R30wg`;
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

  function filterImages(category) {
    if (category === '') {
      displayImages(allImages);
    } else {
      const filteredImages = allImages.filter(image => image.alt_description && image.alt_description.toLowerCase().includes(category.toLowerCase()));
      displayImages(filteredImages);
    }
  }

  searchButton.addEventListener('click', () => {
    const query = searchBar.value;
    if (query) {
      fetchImages(query);
    } else {
      imageGallery.innerHTML = '';
    }
  });

  categoryFilter.addEventListener('change', () => {
    const category = categoryFilter.value;
    filterImages(category);
  });

  fetchSuggestedOutfits();
});

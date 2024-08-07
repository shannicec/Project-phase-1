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
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('image-container');

      const imgElement = document.createElement('img');
      imgElement.src = image.urls.small;
      imgElement.alt = image.alt_description;
      imgElement.addEventListener('click', () => showImageDetails(image));

      imgContainer.appendChild(imgElement);
      imageGallery.appendChild(imgContainer);
    });
  }

  function showImageDetails(image) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const imgElement = document.createElement('img');
    imgElement.src = image.urls.regular;
    imgElement.alt = image.alt_description;

    const imageInfo = document.createElement('div');
    imageInfo.classList.add('image-info');
    imageInfo.innerHTML = `
      <p><strong>Description:</strong> ${image.alt_description}</p>
      <p><strong>Photographer:</strong> ${image.user.name}</p>
      <p><strong>Likes:</strong> ${image.likes}</p>
      <button id="add-to-outfit">Add to Outfit</button>
      <button id="close-modal">Close</button>
    `;

    modalContent.appendChild(imgElement);
    modalContent.appendChild(imageInfo);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    document.getElementById('add-to-outfit').addEventListener('click', () => {
      addToOutfit(image.urls.small);
      closeModal(modal);
    });

    document.getElementById('close-modal').addEventListener('click', () => closeModal(modal));
  }

  function closeModal(modal) {
    document.body.removeChild(modal);
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

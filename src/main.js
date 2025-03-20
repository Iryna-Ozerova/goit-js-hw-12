import { searchImages, resetPage } from './js/pixabay-api.js';
import { updateGallery, showNoResultsMessage } from './js/render-functions.js';
import { smoothScroll } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-load');
const endLoader = document.querySelector('.loader-end');
const btnLoad = document.querySelector('.btn-load');

loader.style.display = 'none';
btnLoad.style.display = 'none';
loaderMore.style.display = 'none'; // приховуємо loaderMore
endLoader.style.display = 'none';

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const query = input.value.trim();
    
  if (query === '') {
    showNoResultsMessage('Please enter a search query!');
    return;
  }
    
    resetPage();
    gallery.innerHTML = ''; 
    btnLoad.style.display = 'none';
    loader.style.display = 'block'; 
    

  searchImages(query)
    .then(images => {
      loader.style.display = 'none'; 
      
      if (images.length === 0) { 
        showNoResultsMessage('Sorry, there are no images matching your search query. Please try again!');
        endLoader.style.display = 'block';
        return;
      }
        updateGallery(images);
        btnLoad.style.display = 'block';
    })
      .catch(error => {
        loader.style.display = 'none';
      showNoResultsMessage('Error fetching images. Please try again!');
      console.error('Помилка сервера:', error.message);
    });
  form.reset();
  });
  

//подія на btnLoad

btnLoad.addEventListener('click', async () => {
    loaderMore.style.display = 'block'; 
     btnLoad.style.display = 'none';
    
  await searchImages(input.value.trim())
        .then(images => {
            loaderMore.style.display = 'none';

            if (images.length === 0) {
                btnLoad.style.display = 'none';
                showNoResultsMessage("We're sorry, but you've reached the end of search results.");
                return;
            }

          updateGallery(images);
          smoothScroll();
            btnLoad.style.display = 'block';
    }).catch(error => {
        loaderMore.style.display = 'none'; 
        showNoResultsMessage('Error loading more images.');
        console.error('Помилка сервера:', error.message);
    });
});



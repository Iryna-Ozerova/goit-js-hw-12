import { searchImages, resetPage } from './js/pixabay-api.js';
import { updateGallery, showNoResultsMessage } from './js/render-functions.js';
import { smoothScroll } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-load');
const btnLoad = document.querySelector('.btn-load');

loader.style.display = 'none';
btnLoad.style.display = 'none';
loaderMore.style.display = 'none'; 

let currentQuery = ''; 
let totalHits = 0; 
let imagesLoaded = 0; 

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

    currentQuery = query;
    
    searchImages(currentQuery)
        .then(({ images, totalHits: hits }) => {
            loader.style.display = 'none'; 
            
            if (images.length === 0) { 
                showNoResultsMessage('Sorry, there are no images matching your search query. Please try again!');
                return;
            }

            totalHits = hits; 
            imagesLoaded = images.length; 

            updateGallery(images);

            if (imagesLoaded < totalHits) {
                btnLoad.style.display = 'block';
            } else {
              btnLoad.style.display = 'none'; // Якщо тільки 1 фото, ховаємо кнопку
             showNoResultsMessage("We're sorry, but you've reached the end of search results.");
            }
        })
        .catch(error => {
            loader.style.display = 'none';
            showNoResultsMessage('Error fetching images. Please try again!');
            console.error('Помилка сервера:', error.message);
        });

    form.reset();
});

// Завантаження додаткових фото
btnLoad.addEventListener('click', async () => {
    if (currentQuery === '') return;

    loaderMore.style.display = 'block'; 
    btnLoad.style.display = 'none';

    await searchImages(currentQuery)
        .then(({ images }) => {
            loaderMore.style.display = 'none';

            if (images.length === 0) {
                showNoResultsMessage("We're sorry, but you've reached the end of search results.");
                return;
            }

            updateGallery(images);
            smoothScroll();

            imagesLoaded += images.length; 
            
            if (imagesLoaded >= totalHits) {
              btnLoad.style.display = 'none';
               showNoResultsMessage("We're sorry, but you've reached the end of search results.");
            } else {
                btnLoad.style.display = 'block';
            }
        })
        .catch(error => {
            loaderMore.style.display = 'none'; 
            showNoResultsMessage('Error loading more images.');
            console.error('Помилка сервера:', error.message);
        });
});

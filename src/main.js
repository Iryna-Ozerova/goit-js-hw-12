import { searchImages, resetPage } from './js/pixabay-api.js';
import { updateGallery, showNoResultsMessage } from './js/render-functions.js';

const form = document.querySelector('.form');
const input = document.querySelector('.input-search');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loaderMore = document.querySelector('.loader-load');
const btnLoad = document.querySelector('.btn-load');


loader.style.display = 'none';
btnLoad.style.display = 'none';
loaderMore.style.display = 'none'; // приховуємо loaderMore

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const query = input.value.trim();
    
  if (query === '') {
    showNoResultsMessage('Please enter a search query!');
    return;
  }
    
    resetPage(); // скидаємо page при новому пошуку
    gallery.innerHTML = ''; // очищаємо галерею перед новим пошуком
    btnLoad.style.display = 'none'; //приховуємо btnLoad при повторному сабміті
    loader.style.display = 'block'; 
    

  searchImages(query)
    .then(images => {
        loader.style.display = 'none'; 
      if (images.length === 0) {
        showNoResultsMessage('Sorry, there are no images matching your search query. Please try again!');
        return;
      }
        updateGallery(images);
        btnLoad.style.display = 'block'; // показуємо кнопку, якщо є результат
    })
      .catch(error => {
        loader.style.display = 'none';
      showNoResultsMessage('Error fetching images. Please try again!');
      console.error('Помилка сервера:', error.message);
    });
  form.reset();
});

//подія на btnLoad

btnLoad.addEventListener('click', () => {
    loaderMore.style.display = 'block'; // Показуємо лоадер
     btnLoad.style.display = 'none';
    
    searchImages(input.value.trim())
        .then(images => {
        setTimeout(() => { // додаємо затримку для лоадера
            loaderMore.style.display = 'none';

            if (images.length === 0) {
                btnLoad.style.display = 'none'; // Ховаємо кнопку, якщо більше немає зображень
                showNoResultsMessage("We're sorry, but you've reached the end of search results.");
                return;
            }

            updateGallery(images);
            btnLoad.style.display = 'block';
        }, 100); // штучна затримка для перевірки лоадера
    }).catch(error => {
        loaderMore.style.display = 'none'; // Ховаємо лоадер у разі помилки
        showNoResultsMessage('Error loading more images.');
        console.error('Помилка сервера:', error.message);
    });
});



// Функції інтерфейсу
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Ініціалізація SimpleLightbox
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});


// Функція для створення карток зображень
export function createImageMarkup(images) {
  return images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <div class="thumb-block">
          <div class="block"><h2 class="tittle">Likes</h2><p class="amount">${likes}</p></div>
          <div class="block"><h2 class="tittle">Views</h2><p class="amount">${views}</p></div>
          <div class="block"><h2 class="tittle">Comments</h2><p class="amount">${comments}</p></div>
          <div class="block"><h2 class="tittle">Downloads</h2><p class="amount">${downloads}</p></div>
        </div>
      </li>`).join('');
}

// Функція для оновлення галереї
export function updateGallery(images) {
  const gallery = document.querySelector('.gallery');
  gallery.insertAdjacentHTML('beforeend', createImageMarkup(images));
  lightbox.refresh(); // Оновлюємо SimpleLightbox після додавання нових зображень
  smoothScroll(); // додаємо скролл
}

export function showNoResultsMessage(message) {
  iziToast.error({
    title: 'Error',
    message: message,
    position: 'topRight',
  });
}

export function smoothScroll() {
  const firstCard = document.querySelector('.gallery-item'); 

  if (firstCard) {
    const cardHeight = firstCard.getBoundingClientRect().height; 

    window.scrollBy({
      top: cardHeight * 2,
      left: 0,
      behavior: "smooth",
    });
  }
}
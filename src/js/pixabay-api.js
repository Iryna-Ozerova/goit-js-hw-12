// http запит на бек
import axios from 'axios';

const API_KEY = '49186769-dabefba962826c776b77806d1';
const BASE_URL = 'https://pixabay.com/api/';
let PER_PAGE = 15;
let page = 1;

// функція для отримання зображень
export async function searchImages(query) {
  try {
        const response = await axios
            .get(BASE_URL, {
                params: {
                    key: API_KEY,
                    q: query,
                    image_type: 'photo',
                    orientation: 'horizontal',
                    safesearch: true,
                    per_page: PER_PAGE, 
                    page: page, 
                },
            });
      page += 1;
      return response.data.hits;
    } catch (error) {
        console.error('Error fetching images:', error.message);
        return [];
    }
}



// повертаємо значення page до початкового
export function resetPage() {
  page = 1;
}


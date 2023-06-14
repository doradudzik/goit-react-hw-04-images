import axios from 'axios';

axios.defaults.baseURL = 'https://hn.algolia.com/api/v1';

const API = {
  fetchPictures: async (query, pageNumber) => {
    try {
      const response = await axios.get('https://pixabay.com/api/', {
        params: {
          key: '34808365-79ec0dd825bcd7358497b4699',
          q: query,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: pageNumber,
          per_page: 12,
        },
      });
      const newPictures = response.data.hits;
      const totalHits = response.data.totalHits;
      return { newPictures, totalHits };
    } catch (error) {
      console.error(error);
      return { newPictures: [], totalHits: 0 };
    }
  },
};

export default API;

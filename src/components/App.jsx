import { useState, useEffect } from 'react';
import API from './utils/api/api';
import Searchbar from './Searchbar/Searchbar';
import axios from 'axios';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { Notify } from 'notiflix';
import Loader from './Loader/Loader';

axios.defaults.baseURL = 'https://hn.algolia.com/api/v1';

export const App = () => {
  const [pictures, setPictures] = useState([]);
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [isShown, setIsShown] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    const fetchPictures = async () => {
      if (query === '') {
        setPictures([]);
        setIsShown(0);
        return [];
      }
      try {
        setIsLoading(true);

        const { newPictures, totalHits } = await API.fetchPictures(
          query,
          pageNumber
        );

        setPictures(prevPictures => [...prevPictures, ...newPictures]);
        setTotalHits(totalHits);

        setIsShown(prevIsShown =>
          isNaN(prevIsShown)
            ? +newPictures.length
            : prevIsShown + newPictures.length
        );

        return newPictures;
      } catch (error) {
        console.error(error);
        return [];
      } finally {
        setIsLoading(false);
      }
    };

    fetchPictures();
  }, [query, pageNumber]);

  const handleSubmit = async input => {
    setQuery(input);
    setPageNumber(1);
    setPictures([]);
    setIsShown(0);

    const newPictures = await API.fetchPictures(input, 1);
    if (newPictures.length === 0 && pictures.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    setIsShown(prevIsShown => prevIsShown + newPictures.length);
  };

  const loadMoreBtn = async () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);

    const newPictures = await API.fetchPictures(query, pageNumber);

    if (newPictures.length > 0) {
      setPictures(prevPictures => [...prevPictures, ...newPictures]);
      setIsShown(prevIsShown => prevIsShown + newPictures.length);
    }
  };
  return (
    <>
      <div>
        <Searchbar onSubmit={handleSubmit} />
      </div>
      <div>{pictures.length > 0 && <ImageGallery pictures={pictures} />}</div>
      <div>
        {pictures.length > 0 && isShown < totalHits && (
          <Button loadMoreBtn={loadMoreBtn} />
        )}
      </div>
      {isLoading && pictures.length > 0 && <Loader />}
    </>
  );
};

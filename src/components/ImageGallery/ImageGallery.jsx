import React, { useState } from 'react';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import { nanoid } from 'nanoid';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';

const ImageGallery = ({ pictures }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (event, largeImageURL) => {
    event.preventDefault();
    setSelectedImage(largeImageURL);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const Gallery = ({ pictures }) => (
    <ul className={css.gallery}>
      {pictures.map(({ webformatURL, largeImageURL, tags }) => {
        const elementId = nanoid();

        return (
          <ImageGalleryItem
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            tags={tags}
            key={elementId}
            openModal={openModal}
          />
        );
      })}
    </ul>
  );

  return (
    <div>
      <Gallery pictures={pictures} />
      {selectedImage && (
        <Modal
          largeImageURL={selectedImage}
          tags={selectedImage}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
};

export default ImageGallery;

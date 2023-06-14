import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

const ImageGalleryItem = ({ largeImageURL, openModal, webformatURL, tags }) => {
  const handleClick = event => {
    event.preventDefault();
    openModal(event, largeImageURL);
  };

  return (
    <li className={css.galleryItem}>
      <div className={css.galleryItem__card}>
        <img
          src={webformatURL}
          alt={tags}
          loading="lazy"
          onClick={handleClick}
        />
      </div>
    </li>
  );
};

ImageGalleryItem.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

export default ImageGalleryItem;

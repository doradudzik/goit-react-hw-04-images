import css from './Modal.module.css';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

const Modal = ({ largeImageURL, tags, closeModal }) => {
  useEffect(() => {
    const closeModalOnEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', closeModalOnEsc);

    return () => {
      window.removeEventListener('keydown', closeModalOnEsc);
    };
  }, [closeModal]);

  const closeModalOnClick = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return (
    <div className={css.overlay} onClick={closeModalOnClick}>
      <div className={css.modal}>
        <img
          src={largeImageURL}
          alt={tags}
          loading="lazy"
          className={css.modalImg}
        />
      </div>
    </div>
  );
};

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
};

export default Modal;

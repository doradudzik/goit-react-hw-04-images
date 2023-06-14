import css from './Searchbar.module.css';
import { Notify } from 'notiflix';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const handleSubmit = evt => {
    evt.preventDefault();
    const input = evt.target.elements.searchInput.value;
    if (input === '') {
      Notify.warning('Please, fill the main field');
      return;
    }
    onSubmit(input);
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchInput"
        />
        <button type="submit" className={css.button}></button>
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;

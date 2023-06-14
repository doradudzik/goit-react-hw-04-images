import css from './Button.module.css';
import PropTypes from 'prop-types';

const Button = ({ loadMoreBtn }) => {
  return (
    <div className={css.buttonContainer}>
      <button className={css.button} onClick={loadMoreBtn}>
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  loadMoreBtn: PropTypes.func.isRequired,
};
export default Button;

import css from './ContactItem.module.css';

export const ContactItem = ({ name, number, onClickDelete, id }) => {
  return (
    <>
      <p>
        {name}: {number}
      </p>
      <button
        type="button"
        onClick={() => onClickDelete(id)}
        className={css.btn}
      >
        Delete
      </button>
    </>
  );
};

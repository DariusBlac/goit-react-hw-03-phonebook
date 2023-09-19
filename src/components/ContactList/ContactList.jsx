import { ContactItem } from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css';

export const ContactList = ({ array, handleDelete }) => {
  return (
    <ul className={css.list}>
      {array.map(el => {
        return (
          <li key={el.id} className={css.list_item}>
            <ContactItem
              name={el.name}
              number={el.number}
              onClickDelete={handleDelete}
              id={el.id}
            />
          </li>
        );
      })}
    </ul>
  );
};

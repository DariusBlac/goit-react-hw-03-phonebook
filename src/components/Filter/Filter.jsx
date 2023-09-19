import css from './Filter.module.css';

export const Filter = ({ filterContact }) => {
  return (
    <div>
      <h3 className={css.title}>Filter by Name</h3>
      <input type="text" onChange={filterContact} className={css.input} />
    </div>
  );
};

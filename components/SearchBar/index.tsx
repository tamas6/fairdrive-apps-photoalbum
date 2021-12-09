import classes from './SearchBar.module.scss';
import LenIcon from 'assets/icons/len.svg';
import CloseIcon from 'assets/icons/close.svg';
import { useState } from 'react';

const SearchBar = () => {
  const [text, setText] = useState('');

  return (
    <div className={classes.root}>
      <input
        type="text"
        className={
          'w-full text-xs flex items-center justify-between text-purple ' +
          'bg-white rounded-md py-3 pl-12 pr-9 text-left'
        }
        placeholder="Image Search"
        value={text}
        onChange={(evt) => setText(evt.currentTarget.value)}
      />

      <LenIcon className="absolute top-2.5 left-3" />

      {!!text.length && (
        <a
          className="absolute top-2 right-2 cursor-pointer w-6 h-6 flex items-center justify-center"
          onClick={() => setText('')}
        >
          <CloseIcon />
        </a>
      )}
    </div>
  );
};

export default SearchBar;

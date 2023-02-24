import { useState } from 'react';
import { toast } from 'react-toastify';
import { BsSearch } from 'react-icons/bs';
import { StyledHeader } from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleQueryChange = e => {
    setQuery(e.target.value.trim().toLowerCase());
  };

  const handleQuerySubmit = e => {
    e.preventDefault();

    if (query === '') {
      return toast.error('Enter the name');
    }

    onSubmit(query);
    setQuery('');
  };

  return (
    <StyledHeader>
      <form onSubmit={handleQuerySubmit}>
        <button type="submit">
          <BsSearch size="20" />
          <span>Search</span>
        </button>

        <input
          type="text"
          value={query}
          onChange={handleQueryChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </StyledHeader>
  );
};

import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { animateScroll as scroll } from 'react-scroll';
import { Searchbar, ImageGallery, Button, Loader, Message } from 'components';
import { getImages } from 'services/galleryApi';
import ImageFindEmpty from 'assets/empty-collection-min.png';
import ImageFindError from 'assets/something-wrong1-min.png';
import { Wrapper } from './App.styled';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (query === '') return;

    const fetchGallery = async () => {
      setStatus('pending');

      try {
        const data = await getImages(query, page);

        setGallery(gallery => [...gallery, ...data.hits]);
        setStatus('resolved');
        setIsVisible(page < Math.ceil(data.totalHits / 12));
      } catch {
        setError(
          'Oops, something went wrong. Please, reload the page to try again.'
        );
        setStatus('rejected');
      }
    };
    fetchGallery();
  }, [query, page]);

  const handleFormSubmit = name => {
    if (query !== name) {
      setGallery([]);
      setQuery(name);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(page => page + 1);

    scroll.scrollMore(490);
  };

  const isEmptyGallery = gallery.length === 0;

  return (
    <Wrapper>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery items={gallery} />

      {status === 'pending' && <Loader />}

      {!isEmptyGallery && isVisible && (
        <Button loadMore={loadMore} status={status} />
      )}

      {isEmptyGallery && status === 'resolved' && (
        <Message text="Nothing found" image={ImageFindEmpty} />
      )}

      {status === 'rejected' && <Message text={error} image={ImageFindError} />}

      <ToastContainer autoClose={2200} theme="colored" />
    </Wrapper>
  );
};

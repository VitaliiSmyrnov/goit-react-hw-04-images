import { useState } from 'react';
import { Modal } from 'components';

export const ImageGalleryItem = ({
  item: { tags, webformatURL, largeImageURL },
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <img
        src={webformatURL}
        alt={tags}
        onClick={() => {
          setIsOpenModal(true);
        }}
      />
      {isOpenModal && (
        <Modal
          onClose={() => {
            setIsOpenModal(false);
          }}
        >
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </>
  );
};

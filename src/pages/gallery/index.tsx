/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useContext, useState } from 'react';

import PodContext from '@context/PodContext';

import { MainLayout } from '@components/Layouts';
import { MainHeader, GalleryHeader } from '@components/Headers';

const Gallery: FC = () => {
  const { activePod } = useContext(PodContext);

  const [galleryView, setGalleryView] = useState<'grid' | 'list'>('grid');
  const [gallerySort, setGallerySort] = useState('a-z');

  const handleToggleView = () => {
    if (galleryView === 'grid') {
      setGalleryView('list');
    } else {
      setGalleryView('grid');
    }
  };

  const handleToggleSort = () => {
    if (gallerySort === 'a-z') {
      setGallerySort('z-a');
    } else {
      setGallerySort('a-z');
    }
  };

  return (
    <MainLayout>
      <MainHeader
        title={`${activePod}`}
        galleryView={galleryView}
        toggleView={handleToggleView}
        toggleSort={handleToggleSort}
      />

      <GalleryHeader />
    </MainLayout>
  );
};

export default Gallery;

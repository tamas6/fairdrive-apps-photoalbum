import { FC, useContext, useState, useEffect } from 'react';

import PodContext from '@context/PodContext';

import { downloadFile, FileResponse } from '@api/files';

interface ImageCardProps {
  data: FileResponse;
  onClick: () => void;
}

const ImageCard: FC<ImageCardProps> = ({ data, onClick }) => {
  const { activePod, directoryName } = useContext(PodContext);

  const [imageSource, setImageSource] = useState(null);

  useEffect(() => {
    downloadFile({
      filename: data.name,
      directory: directoryName || 'root',
      podName: activePod,
    })
      .then((response) => setImageSource(window.URL.createObjectURL(response)))
      .catch(() => {
        setImageSource(null);
      });
  }, []);

  return (
    <div className="w-auto h-44 mx-2 mb-5 cursor-pointer" onClick={onClick}>
      {imageSource ? (
        <img src={imageSource} alt={data.name} className="block w-80 h-72" />
      ) : null}
    </div>
  );
};

export default ImageCard;

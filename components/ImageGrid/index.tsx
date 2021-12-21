import classes from './ImageGrid.module.scss';

interface Props {
  images: string[];
  className?: string;
}

const ImageGrid = ({ images }: Props) => {
  return (
    <div className={classes.content}>
      <div className="flex flex-wrap">
        {images && !!images.length
          ? images.map((file, key: number) => (
              <img
                className={classes.imageGridItem}
                src={file}
                key={String(key) + file}
                alt={String(key)}
              />
            ))
          : 'No photos'}
      </div>
    </div>
  );
};

export default ImageGrid;

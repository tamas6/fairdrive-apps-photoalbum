import classes from './ImageGrid.module.scss';

interface ImageGridProps {
  images: string[];
  className?: string;
}
const ImageGrid = ({ images }: ImageGridProps) => {
  return (
    <div className={classes.content}>
      <div className="flex flex-wrap">
        {images &&
          images.map((file: any, key: any) => (
            <img className={classes.imageGridItem} src={file} key={file} />
          ))}
      </div>
    </div>
  );
};

export default ImageGrid;

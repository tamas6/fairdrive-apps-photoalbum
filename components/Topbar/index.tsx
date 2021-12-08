import classes from './Topbar.module.scss';

const Topbar = () => {
  return (
    <header
      className={`fixed flex top-0 left-0 right-0 z-10 h-20 ${classes.root}`}
    >
      topbar
    </header>
  );
};

export default Topbar;

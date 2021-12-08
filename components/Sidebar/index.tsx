import classes from './Sidebar.module.scss';

const Sidebar = () => {
  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-0 flex w-64	pt-20 ${classes.root}`}
      style={{ backgroundColor: '#FFFFFF' }}
    >
      Sidebar
    </aside>
  );
};

export default Sidebar;

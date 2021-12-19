import Button from 'components/Button';
import FolderIcon from 'assets/icons/folder.svg';
import HamburgerIcon from 'assets/icons/hamburger.svg';
import UnionIcon from 'assets/icons/union.svg';
import Dropdown from 'components/Dropdown';
import usePods from 'hooks/usePods';

const ContentHeader = () => {
  const { pods } = usePods();

  return (
    <div className="my-6 flex justify-between">
      <div className="flex items-center">
        <Dropdown style="outset" options={pods}>
          <FolderIcon />
        </Dropdown>
        <span className="text-xl font-semibold text-purple">
          Pod 2 / Folder 111
        </span>
      </div>

      <div className="flex items-center">
        <Button icon className="w-10 h-10 mr-2">
          <HamburgerIcon />
        </Button>
        <Button icon className="w-10 h-10">
          <UnionIcon />
        </Button>
      </div>
    </div>
  );
};

export default ContentHeader;

import Link from 'next/link';
import classes from './Topbar.module.scss';
import Dropdown from 'components/Dropdown';
import Logo from 'assets/logo.svg';
import UserIcon from 'assets/icons/user.svg';
import DappIcon from 'assets/icons/dapp.svg';

const Topbar = () => {
  return (
    <header
      className={`fixed flex top-0 left-0 right-0 z-10 h-20 bg-gray ${classes.root}`}
    >
      <div className="w-64 pl-5">
        <Link href="/">
          <a className="flex items-center h-full">
            <Logo />
            <span className="ml-2 font-semibold text-base">PhotoViewer</span>
          </a>
        </Link>
      </div>

      <div className="flex-grow flex items-center justify-between">
        <div className="pl-2">
          <Dropdown>FairOS (Server)</Dropdown>
        </div>

        <div className="flex items-center mr-8">
          <Link href="/">
            <a>
              <DappIcon className="mx-3" />
            </a>
          </Link>

          <Link href="/">
            <a className="mx-3 text-purple">Activity</a>
          </Link>

          <Link href="/">
            <a className="ml-3">
              <UserIcon />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
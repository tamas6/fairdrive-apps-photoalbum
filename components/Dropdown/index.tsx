import { ReactNode, useRef, useState } from 'react';
import Link from 'next/link';
import Button, { StyleTypes } from 'components/Button';
import ChevronDownIcon from 'assets/icons/chevron-down.svg';
import useOnClickOutside from 'use-onclickoutside';

export interface DropdownItem {
  title: string;
  slug?: string;
}

type Props = {
  children: ReactNode;
  className?: string;
  style?: StyleTypes;
  options: DropdownItem[];
};

const Dropdown = ({
  children,
  className,
  style = 'simple',
  options,
}: Props) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);

  const clickHandler = () => {
    setShow(!show);
  };

  useOnClickOutside(ref, () => setShow(false));

  return (
    <div className="relative" ref={ref}>
      <Button
        style={style}
        append={
          <ChevronDownIcon className={show ? 'transform rotate-180' : ''} />
        }
        className={`${className} mr-3 text-xs flex items-center justify-between text-purple bg-white rounded-md px-2.5 py-2.5 text-left`}
        onClick={clickHandler}
      >
        {children}
      </Button>
      {show && (
        <div className="z-10 absolute top-full left-0 right-0 min-w-min whitespace-nowrap mt-1 py-3 bg-white rounded-md border-blue border">
          <ul>
            {options.map((option: DropdownItem, ix: number) => (
              <li key={`${ix}${option.title}`}>
                {option.slug ? (
                  <Link href={option.slug}>
                    <a
                      className="block py-1 px-6 hover:bg-indigo-300"
                      onClick={() => setShow(false)}
                    >
                      {option.title}
                    </a>
                  </Link>
                ) : (
                  <span className="py-1 px-6">{option.title}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;

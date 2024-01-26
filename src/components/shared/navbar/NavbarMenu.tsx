import { HTMLAttributeAnchorTarget } from 'react';

import { ChevronDownIcon } from '../icons';

type NavbarMenuProps = {
  text: string;
  url?: string;
  items?: {
    text: string;
    url: string;
    target?: HTMLAttributeAnchorTarget;
  }[];
};

const NavbarMenu = (props: NavbarMenuProps) => {
  const { text, url, items } = props;

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        className="flex items-center gap-1 py-2 px-3 text-xl sm:text-base text-white"
      >
        {text}
      </a>
    );
  }

  return (
    <div className="relative group z-[99]">
      <span className="flex items-center gap-1 py-2 px-3 text-xl sm:text-base text-white cursor-default">
        {text}
        <ChevronDownIcon className="w-5 h-5" />
      </span>
      <div
        className={`hidden group-hover:block sm:absolute w-full sm:bg-rock-button rounded-lg py-2`}
      >
        {items?.map((x) => (
          <a
            key={x.text}
            href={x.url}
            target={x.target}
            className="block w-full text-gray-300 sm:text-base sm:text-center font-inter font-normal px-4 py-2 hover:text-white"
          >
            {x.text}
          </a>
        ))}
      </div>
    </div>
  );
};

export default NavbarMenu;

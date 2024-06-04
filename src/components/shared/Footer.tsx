'use client';

import Link from 'next/link';

import { SOCIAL_URLS } from '@/constants/socials';
import { Urls } from '@/constants/urls';

import { GithubLineIcon, LogoWithTextIcon, TelegramIcon, TwitterLineIcon } from './icons';

const Footer = () => {
  return (
    <footer className="relative max-w-[90%] bg-rock-footer backdrop-blur-sm px-8 lg:px-20 pt-12 lg:pt-28 pb-16 mb-2 sm:mb-16 mx-auto rounded-3xl sm:rounded-[46px] z-20">
      <div className="relative sm:grid grid-cols-3 lg:grid-cols-2 items-start z-30">
        <div className="mb-8 sm:mb-0 -translate-y-4">
          <Link href={Urls.Home}>
            <LogoWithTextIcon className="w-auto h-10 md:h-12 lg:h-16 mx-auto md:mx-0" />
          </Link>
        </div>
        <div className="sm:col-span-2 lg:col-span-1 pl-0 sm:pl-6 lg:pl-0">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-0">
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-rock-sub-body text-base font-semibold uppercase">About</p>
              <ul className="flex flex-col items-center sm:items-start gap-3 mt-2 sm:mt-6 text-sm text-white font-light">
                <li>
                  <Link href={Urls.Home}>Faq</Link>
                </li>
                <li>
                  <Link
                    href="https://mirror.xyz/0xa1e8a739166876845B7dEdc177989024bAB0D810"
                    target="_blank"
                  >
                    Blog
                  </Link>
                </li>
                {/* <li>
                  <Link href={Urls.Home}>Team</Link>
                </li>
                <li>
                  <Link href={Urls.Home}>Audit</Link>
                </li> */}
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <p className="text-rock-sub-body text-base font-semibold uppercase">Community</p>
              <ul className="flex flex-col items-center sm:items-start gap-3 mt-6 text-sm text-white font-light">
                <li>
                  <a href={SOCIAL_URLS.Github} target="_blank">
                    Github
                  </a>
                </li>
                <li>
                  <a href={SOCIAL_URLS.Telegram} target="_blank">
                    Telegram
                  </a>
                </li>
                <li>
                  <a href={SOCIAL_URLS.Twitter} target="_blank">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <Link href={Urls.Dashboard} className="text-base font-semibold uppercase">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 sm:gap-0 mt-12 sm:mt-48">
        <p className="text-sm text-white font-normal">{`© Copyright • Harmonix • ${new Date().getFullYear()}`}</p>
        <ul className="flex gap-3">
          <li>
            <a
              href={SOCIAL_URLS.Twitter}
              target="_blank"
              className="text-white block border border-rock-gray border-opacity-25 rounded-full p-2.5 transition duration-150 ease-in-out hover:bg-rock-primary hover:border-rock-primary"
            >
              <TwitterLineIcon />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_URLS.Telegram}
              target="_blank"
              className="text-white block border border-rock-gray border-opacity-25 rounded-full px-2 py-2.5 transition duration-150 ease-in-out hover:bg-rock-primary hover:border-rock-primary"
            >
              <TelegramIcon />
            </a>
          </li>
          <li>
            <a
              href={SOCIAL_URLS.Github}
              target="_blank"
              className="text-white block border border-rock-gray border-opacity-25 rounded-full p-2.5 transition duration-150 ease-in-out hover:bg-rock-primary hover:border-rock-primary"
            >
              <GithubLineIcon />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

import Image from 'next/image';
import Link from 'next/link';

import { getVaultInfo } from '@/api/vault';
import {
  CurrencySymbolIcon,
  DiscordLineIcon,
  EllipseLine1Icon,
  EllipseLine2Icon,
  GithubLineIcon,
  LargePlanet1Icon,
  LargePlanet2Icon,
  Planet1Icon,
  Planet2Icon,
  Planet3Icon,
  TSymbolIcon,
  TwitterLineIcon,
} from '@/components/shared/icons';
import Navbar from '@/components/shared/navbar/Navbar';
import { SOCIAL_URLS } from '@/constants/socials';

import blackSmallRockImg from '../../public/images/black-small-rock.png';
import centerRockImg from '../../public/images/center-rock.png';

async function getData() {
  const vaultInfo = await getVaultInfo();

  return { vaultInfo };
}

export default async function Home() {
  const {
    vaultInfo: { total_deposit },
  } = await getData();

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center mt-8">
        <div className="z-50 text-center">
          <h3 className="text-4xl sm:text-8xl font-bold uppercase font-bruno-ace mt-0 sm:mt-16">
            Rock Onyx
          </h3>
          <h5 className="max-w-md text-base sm:text-lg font-normal opacity-70 mx-auto my-8">
            Automatic Hedging Vaults While Earning Good Yields With Low Risk
          </h5>
          <Link
            href="/launch-app"
            className="uppercase rounded-3xl text-rock-muted text-sm font-medium bg-white px-6 py-2.5 hover:ring-2 hover:ring-gray-100"
          >
            Launch app
          </Link>
        </div>

        <div className="relative w-full h-[60vh]">
          <div
            className="w-2/3 h-2/3 absolute left-[16%] rounded-full mix-blend-difference blur-[292px] rotate-[-17deg]"
            style={{
              background: 'linear-gradient(245deg, #D3382C -0.61%, #001AFF 82.92%)',
            }}
          />
          <div className="absolute top-[-14%] sm:top-[-26%] xl:top-[-36%] left-[2%] w-20 h-16 sm:w-[102px] sm:h-[100px] xl:w-[205px] xl:h-[201px]">
            <Image
              src={blackSmallRockImg}
              alt="Rock Onyx"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="absolute left-1/2 -translate-x-1/2 w-80 h-96 sm:w-[85%] sm:h-full">
            <Image
              src={centerRockImg}
              alt="Rock Onyx"
              fill
              sizes="100"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <EllipseLine1Icon className="absolute top-[25%] sm:top-[30%] 2xl:top-[33%] left-[26%] 2xl:left-[19%] w-[46%] 2xl:w-[61%]" />
          <div className="absolute top-[16%] 2xl:top-[24%] left-[12%] 2xl:left-[6%] w-[75%] 2xl:w-[85%]">
            <EllipseLine2Icon className="w-full" />
            <Planet3Icon className="absolute bottom-[-4%] xl:bottom-[-10%] right-[6%] xl:right-[12%] w-[8%]" />
          </div>
          <Planet1Icon className="absolute top-[10%] left-[28%]" />
          <Planet2Icon className="absolute top-[40%] right-0" />
          <LargePlanet1Icon className="absolute top-[16%] right-[20%] w-[6%]" />
          <LargePlanet2Icon className="absolute top-[26%] 2xl:top-[32%] left-[10%] xl:left-[14%] 2xl:left-[20%] w-[8%]" />
        </div>

        <div className="hidden sm:flex justify-between items-center w-full mb-16">
          <Link
            href="/stable-coin-vault"
            className="flex gap-1 backdrop-blur-sm w-fit bg-white bg-opacity-10 shadow-sm rounded-full pl-1 pr-8 py-1 cursor-pointer"
          >
            <TSymbolIcon />
            <CurrencySymbolIcon />
            <div>
              <p className="text-sm opacity-40 font-light">Stable coin vault TVL</p>
              <p className="font-bold">
                {total_deposit.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  maximumFractionDigits: 0,
                })}
              </p>
            </div>
          </Link>

          <ul className="flex gap-8 backdrop-blur-md w-fit bg-white bg-opacity-10 shadow-sm rounded-full px-8 py-5">
            <li>
              <a
                href={SOCIAL_URLS.Twitter}
                target="_blank"
                className="text-rock-gray hover:text-white"
              >
                <TwitterLineIcon />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_URLS.Discord}
                target="_blank"
                className="text-rock-gray hover:text-white"
              >
                <DiscordLineIcon />
              </a>
            </li>
            <li>
              <a
                href={SOCIAL_URLS.Github}
                target="_blank"
                className="text-rock-gray hover:text-white"
              >
                <GithubLineIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

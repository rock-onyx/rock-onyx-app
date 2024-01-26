import { IconProps } from '@/@types/common';

const LargePlanet1 = ({ className }: IconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="77"
      height="77"
      viewBox="0 0 77 77"
      fill="none"
    >
      <circle cx="38.5" cy="38.5" r="38.5" fill="url(#paint0_linear_380_1653)" />
      <g style={{ mixBlendMode: 'soft-light' }}>
        <path
          d="M33.3437 44.9659C33.1648 44.9038 32.1381 44.6289 29.9204 43.8597C28.1677 43.2518 26.9283 42.7814 26.5116 42.5963C19.8159 39.9493 15.187 37.0044 15.6896 35.5552C16.1922 34.1061 21.6862 34.6722 28.5473 36.7271L26.9263 41.4007C27.343 41.5858 28.6055 42.1049 30.3583 42.7128C32.4687 43.4448 33.5311 43.7321 33.7583 43.7703L35.3793 39.0967C42.0393 41.7313 46.7039 44.6886 46.2013 46.1377C45.7112 47.5507 40.2173 46.9846 33.3437 44.9659ZM35.5552 38.5895L37.0003 34.4231L46.4435 37.6983L48.655 31.322L22.9008 22.3895L20.6892 28.7659L30.1324 32.0411L28.6874 36.2075C20.8712 33.9025 14.5845 33.4267 13.9437 35.2744C13.3028 37.1221 18.5698 40.6535 26.0989 43.6708L21.4496 57.0756L28.2817 59.4452L32.9309 46.0403C40.7703 48.394 47.057 48.8698 47.6978 47.0221C48.3387 45.1744 43.1201 41.6191 35.5552 38.5895Z"
          fill="white"
        />
      </g>
      <defs>
        <linearGradient
          id="paint0_linear_380_1653"
          x1="83.5"
          y1="25"
          x2="-67.5"
          y2="133"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#030075" />
          <stop offset="1" stopColor="white" />
          <stop offset="1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default LargePlanet1;

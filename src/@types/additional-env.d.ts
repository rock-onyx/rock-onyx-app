import { Address } from './common';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_ENV: 'development' | 'production';
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_W3C_PROJECT_ID: string;

      NEXT_PUBLIC_DISABLE_DEPOSIT_OPTIONS_VAULT: string;
      NEXT_PUBLIC_DISABLE_DEPOSIT_DELTA_NEUTRAL_VAULT: string;
      NEXT_PUBLIC_OPTIONS_WHEEL_WHITELIST_WALLETS: string;
      NEXT_PUBLIC_DELTA_NEUTRAL_WHITELIST_WALLETS: string;

      NEXT_PUBLIC_GOOGLE_ANALYTICS: string;
      NEXT_PUBLIC_SENTRY_DSN: string;

      NEXT_PUBLIC_SEPOLIA_USDC_ADDRESS: Address;

      NEXT_PUBLIC_ARBITRUM_USDC_ADDRESS: Address;

      NEXT_PUBLIC_ETHEREUM_USDC_ADDRESS: Address;
    }
  }
}

export {};

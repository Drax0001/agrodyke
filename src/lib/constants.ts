// Configuration constants for the Agrodyke platform

export const AGRODYKE_CONTACT = {
    PHONE: '+237673046720',
    WHATSAPP: '+237673046720',
    EMAIL: 'contact@agrodyke.com',
} as const;

export const CAMPAY_CONFIG = {
    API_URL: process.env.CAMPAY_API_URL || 'https://demo.campay.net/api',
    USERNAME: process.env.CAMPAY_USERNAME || '',
    PASSWORD: process.env.CAMPAY_PASSWORD || '',
    APP_KEY: process.env.CAMPAY_APP_KEY || '',
} as const;

export const SANITY_CONFIG = {
    PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    API_VERSION: '2023-01-01',
} as const;

export const ORDER_CONFIG = {
    ID_PREFIX: 'AGR',
    CART_EXPIRY_DAYS: 7,
    MAX_QUANTITY: 999,
    MIN_ORDER_VALUE: 1000, // XAF
} as const;

export const PAYMENT_METHODS = {
    MTN_MOMO: 'mtn',
    ORANGE_MONEY: 'orange',
    BANK_TRANSFER: 'bank',
    STRIPE: 'stripe',
    CASH_ON_DELIVERY: 'cod',
} as const;

export const CAMPAY_ERROR_CODES = {
    ER101: 'Invalid phone number. Ensure the number starts with country code (e.g., 237)',
    ER102: 'Unsupported carrier. Only MTN and Orange are supported.',
    ER201: 'Invalid amount. Decimal numbers are not allowed.',
    ER301: 'Insufficient balance.',
} as const;

// Campay Payment Service
// Documentation: https://documenter.getpostman.com/view/2391374/T1LV8PVA

import { CAMPAY_CONFIG } from '../constants';

interface CampayTokenResponse {
    token: string;
    expires_at: string;
}

interface CampayCollectRequest {
    amount: string | number;
    currency: string;
    from: string; // Phone number with country code (e.g., 237xxxxxxxxx)
    description: string;
    external_reference: string;
}

interface CampayCollectResponse {
    reference: string;
    ussd_code?: string;
    operator: string;
    code: string;
    operator_reference: string;
}

interface CampayError {
    code: string;
    message: string;
}

// Token cache
let cachedToken: string | null = null;
let tokenExpiresAt: Date | null = null;

/**
 * Get authentication token from Campay
 * Tokens are cached until they expire
 */
export async function getCampayToken(): Promise<string> {
    // Return cached token if still valid
    if (cachedToken && tokenExpiresAt && new Date() < tokenExpiresAt) {
        return cachedToken;
    }

    try {
        const response = await fetch(`${CAMPAY_CONFIG.API_URL}/token/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: CAMPAY_CONFIG.USERNAME,
                password: CAMPAY_CONFIG.PASSWORD,
            }),
        });

        if (!response.ok) {
            throw new Error(`Token request failed: ${response.statusText}`);
        }

        const data: CampayTokenResponse = await response.json();

        // Cache the token
        cachedToken = data.token;
        tokenExpiresAt = new Date(data.expires_at);

        return data.token;
    } catch (error) {
        console.error('Campay token error:', error);
        throw new Error('Failed to obtain payment authentication token');
    }
}

/**
 * Initiate a payment collection from a customer's mobile money account
 * @param phone - Customer phone number with country code (e.g., 237673046720)
 * @param amount - Amount in XAF (integer only, no decimals)
 * @param description - Payment description
 * @param externalReference - Your internal order/transaction reference
 */
export async function collectPayment(
    phone: string,
    amount: number,
    description: string,
    externalReference: string
): Promise<CampayCollectResponse> {
    try {
        // Validate amount (no decimals allowed per Campay docs)
        if (!Number.isInteger(amount)) {
            throw new Error('Amount must be an integer (no decimals allowed)');
        }

        // Ensure phone number starts with country code
        const cleanPhone = phone.replace(/[\s\-\+]/g, '');
        if (!cleanPhone.startsWith('237')) {
            throw new Error('Phone number must start with country code 237');
        }

        const token = await getCampayToken();

        const payload: CampayCollectRequest = {
            amount: amount.toString(),
            currency: 'XAF',
            from: cleanPhone,
            description,
            external_reference: externalReference,
        };

        const response = await fetch(`${CAMPAY_CONFIG.API_URL}/collect/`, {
            method: 'POST',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        const data = await response.json();

        if (!response.ok) {
            // Handle Campay error codes
            const error = data as CampayError;
            throw new Error(error.message || `Payment failed: ${response.statusText}`);
        }

        return data as CampayCollectResponse;
    } catch (error) {
        console.error('Campay collection error:', error);
        throw error;
    }
}

/**
 * Get user-friendly error message for Campay error codes
 */
export function getCampayErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
        'ER101': 'Invalid phone number format. Please ensure your number includes the country code (237)',
        'ER102': 'This mobile operator is not supported. Only MTN and Orange Mobile Money are accepted.',
        'ER201': 'Invalid amount. Please check the payment amount.',
        'ER301': 'Insufficient balance in your mobile money account.',
    };

    return errorMessages[errorCode] || 'Payment processing failed. Please try again.';
}

/**
 * Validate phone number format for Cameroon mobile money
 * @param phone - Phone number to validate
 * @returns true if valid MTN or Orange number
 */
export function validateCameroonPhone(phone: string): { valid: boolean; error?: string } {
    const cleanPhone = phone.replace(/[\s\-\+]/g, '');

    // Must start with 237
    if (!cleanPhone.startsWith('237')) {
        return { valid: false, error: 'Phone number must start with country code 237' };
    }

    // Must be 12 digits total (237 + 9 digits)
    if (cleanPhone.length !== 12) {
        return { valid: false, error: 'Phone number must be 12 digits (237 + 9 digits)' };
    }

    // Check for MTN (237 6XX XXX XXX) or Orange (237 6XX XXX XXX)
    // Both use 6 as the first digit after country code
    const operatorDigit = cleanPhone[3];
    if (operatorDigit !== '6') {
        return { valid: false, error: 'Invalid mobile operator code' };
    }

    return { valid: true };
}

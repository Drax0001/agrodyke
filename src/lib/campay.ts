const CAMPAY_BASE_URL =
  process.env.CAMPAY_ENV === "production"
    ? "https://www.campay.net/api"
    : "https://demo.campay.net/api";

const CAMPAY_USERNAME = process.env.CAMPAY_API_KEY;
const CAMPAY_PASSWORD = process.env.CAMPAY_API_SECRET;

interface CamPayToken {
  token: string;
  expiresAt: number;
}

let cachedToken: CamPayToken | null = null;

async function getAccessToken() {
  if (cachedToken && Date.now() < cachedToken.expiresAt) {
    return cachedToken.token;
  }

  if (!CAMPAY_USERNAME || !CAMPAY_PASSWORD) {
    throw new Error("CamPay credentials are missing");
  }

  const response = await fetch(`${CAMPAY_BASE_URL}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: CAMPAY_USERNAME,
      password: CAMPAY_PASSWORD
    })
  });

  if (!response.ok) {
    throw new Error("Failed to obtain CamPay token");
  }

  const data = await response.json();
  cachedToken = {
    token: data.token,
    expiresAt: Date.now() + (data.expires_in || 3600) * 1000 - 60000
  };

  return cachedToken.token;
}

export async function initiatePayment(params: {
  amount: number;
  from: string;
  description: string;
  externalReference: string;
}) {
  const token = await getAccessToken();
  const response = await fetch(`${CAMPAY_BASE_URL}/collect/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    },
    body: JSON.stringify({
      amount: params.amount.toString(),
      currency: "XAF",
      from: params.from,
      description: params.description,
      external_reference: params.externalReference
    })
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Payment initiation failed");
  }

  return response.json();
}

export async function checkPaymentStatus(reference: string) {
  const token = await getAccessToken();
  const response = await fetch(`${CAMPAY_BASE_URL}/transaction/${reference}/`, {
    headers: {
      Authorization: `Token ${token}`
    }
  });

  if (!response.ok) {
    throw new Error("Failed to check payment status");
  }

  return response.json();
}

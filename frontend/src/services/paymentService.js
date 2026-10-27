const createPaymentOrder = async (amount) => {
  const response = await fetch(
    "/api/payments/create-order",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        amount,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to create payment order"
    );
  }

  return data;
};

const verifyPayment = async (paymentData) => {
  const response = await fetch(
    "/api/payments/verify",
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(paymentData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Payment verification failed"
    );
  }

  return data;
};

export {
  createPaymentOrder,
  verifyPayment,
};
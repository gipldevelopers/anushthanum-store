/**
 * Checkout API – create order, verify payment, get order.
 */
import api from '@/lib/axios';

function handleResponse(res) {
  return res.data;
}

function handleError(err) {
  const message = err.response?.data?.message || err.message || 'Request failed';
  const e = new Error(message);
  e.status = err.response?.status;
  throw e;
}

export const checkoutApi = {
  createOrder: (data) =>
    api.post('/checkout/create-order', data).then(handleResponse).catch(handleError),
  verifyPayment: (data) =>
    api.post('/checkout/verify-payment', data).then(handleResponse).catch(handleError),
  getOrder: (orderNumber) =>
    api.get(`/checkout/order/${orderNumber}`).then(handleResponse).catch(handleError),
};

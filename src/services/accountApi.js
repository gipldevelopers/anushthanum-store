/**
 * Account API – overview, orders, addresses, wishlist.
 * Requires authenticated user token (lib/axios attaches it for non-public routes).
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

export const accountApi = {
  getOverview: () => api.get('/account/overview').then(handleResponse).catch(handleError),
  getOrders: (params) => api.get('/account/orders', { params }).then(handleResponse).catch(handleError),
  getAddresses: () => api.get('/account/addresses').then(handleResponse).catch(handleError),
  createAddress: (data) => api.post('/account/addresses', data).then(handleResponse).catch(handleError),
  updateAddress: (id, data) => api.put(`/account/addresses/${id}`, data).then(handleResponse).catch(handleError),
  deleteAddress: (id) => api.delete(`/account/addresses/${id}`).then(handleResponse).catch(handleError),
  getWishlist: () => api.get('/account/wishlist').then(handleResponse).catch(handleError),
  removeWishlistItem: (productId) => api.delete(`/account/wishlist/${productId}`).then(handleResponse).catch(handleError),
  updateProfile: (data) => api.patch('/account/profile', data).then(handleResponse).catch(handleError),
  changePassword: (data) => api.post('/account/change-password', data).then(handleResponse).catch(handleError),
  deleteAccount: () => api.delete('/account/account').then(handleResponse).catch(handleError),
};

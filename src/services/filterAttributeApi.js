/**
 * Public filter attributes API – no auth. Used for category page filters.
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

export async function getFilterCategories() {
  return api.get('/filter-attributes').then(handleResponse).catch(handleError);
}

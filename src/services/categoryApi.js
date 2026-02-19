/**
 * Public category API – no auth. Used for Navbar, Category page, etc.
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

/**
 * Fetch categories (with subcategories). type: 'main' | 'material' | omit for all
 */
export async function getCategories(params = {}) {
  return api.get('/categories', { params }).then(handleResponse).catch(handleError);
}

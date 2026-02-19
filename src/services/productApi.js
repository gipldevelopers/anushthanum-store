/**
 * Public product API – no auth. Used for category pages, product detail, etc.
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
 * Fetch products with filters.
 * @param {Object} params - categorySlug, subCategorySlug, minPrice, maxPrice, purposes, beads, mukhis, platings, sort, search, page, limit
 */
export async function getProducts(params = {}) {
  return api.get('/products', { params }).then(handleResponse).catch(handleError);
}

/**
 * Fetch a single product by slug.
 */
export async function getProductBySlug(slug) {
  return api.get(`/products/${slug}`).then(handleResponse).catch(handleError);
}

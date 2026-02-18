/**
 * Admin API service – dashboard, categories, subcategories, products, orders, media, content.
 * Uses adminAxios so all requests send the admin Bearer token.
 */
import adminApi from '@/lib/adminAxios';

function handleResponse(res) {
  return res.data;
}

function handleError(err) {
  const message = err.response?.data?.message || err.message || 'Request failed';
  const e = new Error(message);
  e.status = err.response?.status;
  e.data = err.response?.data;
  throw e;
}

export const authApi = {
  login: (email, password) =>
    adminApi.post('/auth/admin/login', { email, password }).then(handleResponse).catch(handleError),
  getCurrentUser: () => adminApi.get('/auth/admin/me').then(handleResponse).catch(handleError),
};

export const dashboardApi = {
  getStats: () => adminApi.get('/admin/dashboard/stats').then(handleResponse).catch(handleError),
};

export const categoriesApi = {
  getAll: () => adminApi.get('/admin/categories').then(handleResponse).catch(handleError),
  getById: (id) => adminApi.get(`/admin/categories/${id}`).then(handleResponse).catch(handleError),
  create: (data) => adminApi.post('/admin/categories', data).then(handleResponse).catch(handleError),
  update: (id, data) =>
    adminApi.put(`/admin/categories/${id}`, data).then(handleResponse).catch(handleError),
  delete: (id) => adminApi.delete(`/admin/categories/${id}`).then(handleResponse).catch(handleError),
};

export const subCategoriesApi = {
  getAll: () => adminApi.get('/admin/subcategories').then(handleResponse).catch(handleError),
  getByCategory: (categoryId) =>
    adminApi.get(`/admin/categories/${categoryId}/subcategories`).then(handleResponse).catch(handleError),
  getById: (id) => adminApi.get(`/admin/subcategories/${id}`).then(handleResponse).catch(handleError),
  create: (data) =>
    adminApi.post('/admin/subcategories', data).then(handleResponse).catch(handleError),
  update: (id, data) =>
    adminApi.put(`/admin/subcategories/${id}`, data).then(handleResponse).catch(handleError),
  delete: (id) =>
    adminApi.delete(`/admin/subcategories/${id}`).then(handleResponse).catch(handleError),
};

export const productsApi = {
  getAll: (params) =>
    adminApi.get('/admin/products', { params }).then(handleResponse).catch(handleError),
  getById: (id) => adminApi.get(`/admin/products/${id}`).then(handleResponse).catch(handleError),
  create: (data) => adminApi.post('/admin/products', data).then(handleResponse).catch(handleError),
  update: (id, data) =>
    adminApi.put(`/admin/products/${id}`, data).then(handleResponse).catch(handleError),
  delete: (id) => adminApi.delete(`/admin/products/${id}`).then(handleResponse).catch(handleError),
};

export const ordersApi = {
  getAll: (params) =>
    adminApi.get('/admin/orders', { params }).then(handleResponse).catch(handleError),
  getById: (id) => adminApi.get(`/admin/orders/${id}`).then(handleResponse).catch(handleError),
  updateStatus: (id, status) =>
    adminApi.patch(`/admin/orders/${id}/status`, { status }).then(handleResponse).catch(handleError),
};

export const mediaApi = {
  getAll: () => adminApi.get('/admin/media').then(handleResponse).catch(handleError),
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return adminApi
      .post('/admin/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(handleResponse)
      .catch(handleError);
  },
  delete: (id) => adminApi.delete(`/admin/media/${id}`).then(handleResponse).catch(handleError),
};

export const contentApi = {
  getHomepageSections: () =>
    adminApi.get('/admin/content/homepage').then(handleResponse).catch(handleError),
  updateHomepageSection: (id, data) =>
    adminApi.put(`/admin/content/homepage/${id}`, data).then(handleResponse).catch(handleError),
  getSiteSettings: () =>
    adminApi.get('/admin/content/settings').then(handleResponse).catch(handleError),
  updateSiteSettings: (data) =>
    adminApi.put('/admin/content/settings', data).then(handleResponse).catch(handleError),
};

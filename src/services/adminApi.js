const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin_token');
}

async function apiRequest(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  const response = await fetch(`${API_BASE_URL}${endpoint}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const authApi = {
  login: (email, password) =>
    apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => apiRequest('/auth/logout', { method: 'POST' }),
  getCurrentUser: () => apiRequest('/auth/me'),
};

export const dashboardApi = {
  getStats: () => apiRequest('/admin/dashboard/stats'),
};

export const categoriesApi = {
  getAll: () => apiRequest('/admin/categories'),
  getById: (id) => apiRequest(`/admin/categories/${id}`),
  create: (data) => apiRequest('/admin/categories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/admin/categories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/admin/categories/${id}`, { method: 'DELETE' }),
};

export const subCategoriesApi = {
  getAll: () => apiRequest('/admin/subcategories'),
  getByCategory: (categoryId) => apiRequest(`/admin/categories/${categoryId}/subcategories`),
  getById: (id) => apiRequest(`/admin/subcategories/${id}`),
  create: (data) => apiRequest('/admin/subcategories', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/admin/subcategories/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/admin/subcategories/${id}`, { method: 'DELETE' }),
};

export const productsApi = {
  getAll: (params) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/admin/products${qs}`);
  },
  getById: (id) => apiRequest(`/admin/products/${id}`),
  create: (data) => apiRequest('/admin/products', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiRequest(`/admin/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiRequest(`/admin/products/${id}`, { method: 'DELETE' }),
};

export const ordersApi = {
  getAll: (params) => {
    const qs = params ? '?' + new URLSearchParams(params).toString() : '';
    return apiRequest(`/admin/orders${qs}`);
  },
  getById: (id) => apiRequest(`/admin/orders/${id}`),
  updateStatus: (id, status) =>
    apiRequest(`/admin/orders/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
};

export const mediaApi = {
  getAll: () => apiRequest('/admin/media'),
  upload: async (file) => {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch(`${API_BASE_URL}/admin/media/upload`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: formData,
    });
    if (!response.ok) throw new Error('Upload failed');
    return response.json();
  },
  delete: (id) => apiRequest(`/admin/media/${id}`, { method: 'DELETE' }),
};

export const contentApi = {
  getHomepageSections: () => apiRequest('/admin/content/homepage'),
  updateHomepageSection: (id, data) =>
    apiRequest(`/admin/content/homepage/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  getSiteSettings: () => apiRequest('/admin/content/settings'),
  updateSiteSettings: (data) =>
    apiRequest('/admin/content/settings', { method: 'PUT', body: JSON.stringify(data) }),
};

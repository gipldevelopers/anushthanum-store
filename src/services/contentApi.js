/**
 * Content API – public storefront access (no auth).
 * Admin content API – admin access (sends admin Bearer token via adminAxios).
 */
import api from '@/lib/axios';
import adminApi from '@/lib/adminAxios';

const handleResponse = (res) => res.data;

// Public: storefront components use this to fetch page content
export const contentApi = {
    getPage: (key) => api.get(`/content/${key}`).then(handleResponse),
};

// Admin: CMS panel uses this to view/edit content
export const adminContentApi = {
    getPage: (key) => adminApi.get(`/admin/content/${key}`).then(handleResponse),
    savePage: (key, payload) => adminApi.put(`/admin/content/${key}`, payload).then(handleResponse),
    uploadTeamImage: (file) => {
        const form = new FormData();
        form.append('image', file);
        return adminApi.post('/admin/upload/team-image', form).then(handleResponse);
    },
};


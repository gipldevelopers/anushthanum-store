import api from '@/lib/axios';

export const blogApi = {
    getPublicBlogs: (params) =>
        api.get('/blogs', { params }).then((res) => res.data),
    getBlogBySlug: (slug) =>
        api.get(`/blogs/${slug}`).then((res) => res.data),
};

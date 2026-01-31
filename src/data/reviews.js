export const reviews = [
  { id: 'r1', productId: '1', userName: 'Rajesh Kumar', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', rating: 5, title: 'Authentic and powerful!', comment: 'I have been wearing this Rudraksha for 3 months now and the difference is remarkable.', date: '2024-01-15', verified: true, helpful: 24 },
  { id: 'r2', productId: '1', userName: 'Priya Sharma', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', rating: 5, title: 'Life changing experience', comment: 'This is my first Rudraksha and I was skeptical at first. But within weeks of wearing it, I noticed improved concentration.', date: '2024-01-10', verified: true, helpful: 18 },
  { id: 'r3', productId: '1', userName: 'Amit Verma', rating: 4, title: 'Good quality', comment: 'The Rudraksha is genuine and well-energized. Customer service was very helpful.', date: '2024-01-05', verified: true, helpful: 12 },
  { id: 'r4', productId: '1', userName: 'Meera Patel', userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', rating: 5, title: 'Perfect for daily wear', comment: 'I wear it every day for my morning puja. The quality is exceptional.', date: '2023-12-28', verified: true, helpful: 15 },
  { id: 'r5', productId: '2', userName: 'Sanjay Gupta', userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', rating: 5, title: 'Stylish and spiritual', comment: 'Love this bracelet! It looks great and I can wear it to office.', date: '2024-01-18', verified: true, helpful: 31 },
  { id: 'r6', productId: '2', userName: 'Anita Reddy', rating: 4, title: 'Beautiful design', comment: 'The bracelet is beautifully crafted. The elastic is strong and comfortable.', date: '2024-01-12', verified: true, helpful: 8 },
  { id: 'r7', productId: '3', userName: 'Swami Vivekananda Das', userAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=100', rating: 5, title: 'Perfect for japa meditation', comment: 'As a practitioner of 20+ years, I can say this mala is of exceptional quality.', date: '2024-01-20', verified: true, helpful: 45 },
  { id: 'r8', productId: '4', userName: 'Vikram Singh', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', rating: 5, title: 'Prosperity has increased!', comment: 'Since wearing this Sri Yantra, my business has seen remarkable growth.', date: '2024-01-16', verified: true, helpful: 38 },
  { id: 'r9', productId: '5', userName: 'Dr. Neha Kapoor', userAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100', rating: 5, title: 'Stunning and calming', comment: 'The amethyst sphere is absolutely beautiful. Sleep has also improved!', date: '2024-01-14', verified: true, helpful: 27 },
  { id: 'r10', productId: '7', userName: 'Rohit Agarwal', userAvatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=100', rating: 5, title: 'Confidence booster!', comment: 'This bracelet is my good luck charm. Wore it to my interview and got the job!', date: '2024-01-19', verified: true, helpful: 42 },
];

export const getReviewsByProductId = (productId) =>
  reviews.filter((r) => r.productId === productId);

export const getAverageRating = (productId) => {
  const productReviews = getReviewsByProductId(productId);
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
  return sum / productReviews.length;
};

export const getRatingDistribution = (productId) => {
  const productReviews = getReviewsByProductId(productId);
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  productReviews.forEach((r) => {
    distribution[r.rating]++;
  });
  return distribution;
};

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { reviews, getRatingDistribution } from '@/data/reviews';
import { products } from '@/data/products';

export default function ProductReviews({ productId: propProductId, productRating: propRating, totalReviews: propTotalReviews } = {}) {
  const [showAll, setShowAll] = useState(false);
  const featuredProduct = products[0];
  const productId = propProductId ?? featuredProduct?.id ?? '1';
  const productReviewsList = reviews.filter((r) => r.productId === productId).slice(0, 6);
  const distribution = getRatingDistribution(productId);
  const displayedReviews = showAll ? productReviewsList : productReviewsList.slice(0, 3);
  const maxCount = Math.max(...Object.values(distribution), 1);
  const productRating =
    propRating ??
    (productReviewsList.length > 0
      ? productReviewsList.reduce((acc, r) => acc + r.rating, 0) / productReviewsList.length
      : 4.8);
  const totalReviews = propTotalReviews ?? productReviewsList.length;

  return (
    <section className="mt-12 pt-12 border-t border-border">
      <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8">Customer Reviews</h2>
      <div className="grid lg:grid-cols-3 gap-8 mb-10">
        <div className="lg:col-span-1">
          <div className="bg-muted/30 rounded-xl p-6 text-center">
            <div className="text-5xl font-bold text-primary mb-2">
              {productRating.toFixed(1)}
            </div>
            <div className="flex justify-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(productRating)
                      ? 'text-secondary fill-secondary'
                      : 'text-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Based on {totalReviews} reviews
            </p>
            <div className="mt-6 space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-2 text-sm">
                  <span className="w-3">{rating}</span>
                  <Star className="w-3.5 h-3.5 text-secondary fill-secondary" />
                  <Progress
                    value={
                      maxCount > 0 ? (distribution[rating] / maxCount) * 100 : 0
                    }
                    className="h-2 flex-1"
                  />
                  <span className="w-8 text-right text-muted-foreground">
                    {distribution[rating]}
                  </span>
                </div>
              ))}
            </div>
            <Button className="w-full mt-6">Write a Review</Button>
          </div>
        </div>
        <div className="lg:col-span-2 space-y-6">
          {displayedReviews.length > 0 ? (
            displayedReviews.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.userAvatar} alt={review.userName} />
                      <AvatarFallback>
                        {review.userName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{review.userName}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < review.rating
                                  ? 'text-secondary fill-secondary'
                                  : 'text-muted-foreground/20'
                              }`}
                            />
                          ))}
                        </div>
                        {review.verified && (
                          <span className="flex items-center gap-1 text-accent">
                            <CheckCircle className="w-3 h-3" />
                            Verified
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <h4 className="font-medium text-sm mb-1">{review.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{review.comment}</p>
                {review.helpful > 0 && (
                  <button
                    type="button"
                    className="mt-3 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {review.helpful} helpful
                  </button>
                )}
              </motion.div>
            ))
          ) : (
            <p className="text-muted-foreground">No reviews yet.</p>
          )}
          {productReviewsList.length > 3 && (
            <Button variant="outline" onClick={() => setShowAll(!showAll)}>
              {showAll ? 'Show less' : `Show all ${productReviewsList.length} reviews`}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}

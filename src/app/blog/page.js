'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search,
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  TrendingUp,
  Bookmark,
  Sparkles,
  BookOpen,
  CircleDot,
  Triangle,
  Gem,
  Flower2,
  Star,
  Flame,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { blogApi } from '@/services/blogApi';
import { imageSrc } from '@/lib/utils';
import { blogCategories } from '@/data/blogs';

const categoryIcons = {
  BookOpen,
  CircleDot,
  Triangle,
  Gem,
  Flower2,
  Star,
  Flame,
  Sparkles,
};

function CategoryIcon({ name, className = "w-4 h-4" }) {
  const Icon = categoryIcons[name];
  return Icon ? <Icon className={className} /> : null;
}

function LoadingCard() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border">
      <Skeleton className="aspect-[16/10] w-full" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

function BlogHero({ featuredPost }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 md:py-20">
      <div className="absolute inset-0 sacred-pattern opacity-5" />
      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full text-xs font-medium text-primary mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Spiritual Knowledge Hub
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 leading-tight">
              Divine Insights & <span className="text-primary">Sacred Wisdom</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg mb-6 max-w-lg">
              Explore ancient knowledge, spiritual practices, and transformative insights from our
              expert scholars and practitioners.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search articles, topics, authors..."
                className="pl-12 h-12 bg-background border-border"
              />
            </div>
          </motion.div>
          {featuredPost && (
            <motion.article
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative group"
            >
              <Link href={`/blog/${featuredPost.slug}`}>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={imageSrc(featuredPost.image) || '/images/placeholder.jpg'}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge className="bg-primary text-primary-foreground mb-3 border-none">Featured</Badge>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-2 line-clamp-2">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/70 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredPost.date || (featuredPost.publishedAt ? new Date(featuredPost.publishedAt).toLocaleDateString() : '')}
                      </span>
                      {featuredPost.readTime && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {featuredPost.readTime}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          )}
        </div>
      </div>
    </section>
  );
}

function CategoryNav({ activeCategory, onCategoryChange }) {
  return (
    <section className="sticky top-[72px] z-40 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container py-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {blogCategories.map((category) => (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }`}
            >
              <CategoryIcon name={category.icon} className="w-4 h-4" />
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, index }) {
  const categoryInfo = blogCategories.find((c) => c.id === post.category);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 3) * 0.1 }}
      className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
    >
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
        <img
          src={imageSrc(post.image) || '/images/placeholder.jpg'}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {post.isMustRead && (
            <Badge className="bg-accent text-accent-foreground text-[10px] border-none">
              <Bookmark className="w-3 h-3 mr-1" />
              Must Read
            </Badge>
          )}
          {post.isPopular && (
            <Badge className="bg-secondary text-secondary-foreground text-[10px] border-none">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          )}
        </div>
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-[10px] capitalize">
            {categoryInfo ? (
              <CategoryIcon name={categoryInfo.icon} className="w-3 h-3 mr-1" />
            ) : <BookOpen className="w-3 h-3 mr-1" />}
            {categoryInfo?.name || post.category?.replace(/-/g, ' ')}
          </Badge>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-base md:text-lg font-serif font-semibold line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              {post.authorAvatar ? (
                <img src={imageSrc(post.authorAvatar)} alt={post.authorName} className="w-full h-full object-cover" />
              ) : (
                <BookOpen className="w-4 h-4 text-primary" />
              )}
            </div>
            <div>
              <p className="text-xs font-medium">{post.authorName || ''}</p>
              <p className="text-[10px] text-muted-foreground">{post.authorRole || ''}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {post.readTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {post.views > 999 ? `${(post.views / 1000).toFixed(1)}K` : post.views}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function NewsletterCTA() {
  return (
    <section className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-secondary p-8 md:p-12 text-center"
      >
        <div className="absolute inset-0 sacred-pattern opacity-5" />
        <div className="relative z-10 max-w-xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary-foreground mb-3">
            Get Spiritual Insights in Your Inbox
          </h2>
          <p className="text-primary-foreground/80 mb-6">
            Subscribe to receive weekly articles, meditation tips, and exclusive spiritual
            guidance.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="flex-1 h-11 bg-background/15 border-background/20 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button type="submit" className="h-11 bg-foreground text-background hover:bg-foreground/90 border-none">
              Subscribe
            </Button>
          </form>
        </div>
      </motion.div>
    </section>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await blogApi.getPublicBlogs({
        category: activeCategory === 'all' ? undefined : activeCategory
      });
      setPosts(data?.blogPosts || []);
    } catch (err) {
      console.error('Failed to fetch blog posts:', err);
    } finally {
      setLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];
  const mustReadPosts = posts.filter((p) => p.isMustRead).slice(0, 3);
  const popularPosts = posts.filter((p) => p.isPopular).slice(0, 4);
  const trendingPosts = [...posts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <main className="min-h-screen">
      <BlogHero featuredPost={loading ? null : featuredPost} />
      <CategoryNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

      <div className="container py-8">
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {[...Array(6)].map((_, i) => <LoadingCard key={i} />)}
          </div>
        ) : (
          <>
            {activeCategory === 'all' && (
              <>
                {/* Must Read Section */}
                {mustReadPosts.length > 0 && (
                  <section className="py-12 border-b border-border mb-12">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <Bookmark className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-xl md:text-2xl font-serif font-bold">Must Read</h2>
                        <p className="text-sm text-muted-foreground">Essential articles for your spiritual journey</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                      {mustReadPosts.map((post, i) => (
                        <BlogCard key={post.id} post={post} index={i} />
                      ))}
                    </div>
                  </section>
                )}

                {/* Popular & Trending Section */}
                {popularPosts.length > 0 && (
                  <section className="py-12 border-b border-border mb-12">
                    <div className="grid lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <div className="flex items-center gap-3 mb-8">
                          <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                            <TrendingUp className="w-5 h-5 text-secondary" />
                          </div>
                          <div>
                            <h2 className="text-xl md:text-2xl font-serif font-bold">Popular Stories</h2>
                            <p className="text-sm text-muted-foreground">What our readers love most</p>
                          </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-6">
                          {popularPosts.map((post, i) => (
                            <BlogCard key={post.id} post={post} index={i} />
                          ))}
                        </div>
                      </div>
                      <aside className="lg:col-span-1">
                        <div className="sticky top-32 bg-muted/30 rounded-xl p-5 border border-border">
                          <h3 className="font-serif font-bold mb-4 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4 text-primary" />
                            Trending Now
                          </h3>
                          <div className="space-y-1">
                            {trendingPosts.map((post, index) => (
                              <div key={post.id} className="flex gap-3 py-3 border-b border-border last:border-0">
                                <span className="text-2xl font-serif font-bold text-primary/30 shrink-0 w-8">
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                                <div>
                                  <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                                    <h4 className="font-medium text-sm line-clamp-2">{post.title}</h4>
                                  </Link>
                                  <p className="text-xs text-muted-foreground mt-1">{post.readTime}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </aside>
                    </div>
                  </section>
                )}
              </>
            )}

            {/* All Articles Section */}
            <section className="py-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl md:text-2xl font-serif font-bold">
                  {activeCategory === 'all' ? 'Latest Insight' : blogCategories.find(c => c.id === activeCategory)?.name || 'Articles'}
                  <span className="text-muted-foreground font-normal text-base ml-2">({posts.length})</span>
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, i) => (
                  <BlogCard key={post.id} post={post} index={i} />
                ))}
              </div>
              {posts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No articles found.</p>
                </div>
              )}
            </section>
          </>
        )}
        <NewsletterCTA />
      </div>
    </main>
  );
}

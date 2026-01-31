'use client';

import { useState } from 'react';
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
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  blogPosts,
  blogCategories,
  getMustReadBlogs,
  getPopularBlogs,
  getFeaturedBlogs,
  getBlogsByCategory,
} from '@/data/blogs';

function BlogHero() {
  const featuredPosts = getFeaturedBlogs();
  const featuredPost = featuredPosts[0];

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
            <div className="flex gap-8 mt-8">
              <div>
                <p className="text-2xl font-bold text-primary">{blogPosts.length}+</p>
                <p className="text-sm text-muted-foreground">Articles</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">{blogCategories.length - 1}</p>
                <p className="text-sm text-muted-foreground">Categories</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Readers</p>
              </div>
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
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <Badge className="bg-primary text-primary-foreground mb-3">Featured</Badge>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-white mb-2 line-clamp-2">
                      {featuredPost.title}
                    </h2>
                    <p className="text-white/80 text-sm line-clamp-2 mb-3">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-white/70 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(featuredPost.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredPost.readTime}
                      </span>
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
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, variant = 'default' }) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  const categoryInfo = blogCategories.find((c) => c.id === post.category);

  if (variant === 'horizontal') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group flex gap-4 p-4 rounded-xl bg-card border border-border hover:shadow-md transition-shadow"
      >
        <Link href={`/blog/${post.slug}`} className="shrink-0">
          <div className="w-28 h-28 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="text-[10px]">
              {categoryInfo?.name}
            </Badge>
          </div>
          <Link href={`/blog/${post.slug}`}>
            <h3 className="font-serif font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-1">
              {post.title}
            </h3>
          </Link>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formattedDate}</span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {((post.views || 0) / 1000).toFixed(1)}K
            </span>
          </div>
        </div>
      </motion.article>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group flex gap-3 py-3 border-b border-border last:border-0"
      >
        <span className="text-2xl font-serif font-bold text-muted-foreground/30 shrink-0 w-8">
          {String(blogPosts.indexOf(post) + 1).padStart(2, '0')}
        </span>
        <div>
          <Link href={`/blog/${post.slug}`}>
            <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {post.title}
            </h4>
          </Link>
          <p className="text-xs text-muted-foreground mt-1">{post.readTime}</p>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-card rounded-xl overflow-hidden border border-border hover:shadow-lg transition-shadow"
    >
      <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {(post.isMustRead || post.isPopular) && (
          <div className="absolute top-3 left-3 flex gap-2">
            {post.isMustRead && (
              <Badge className="bg-accent text-accent-foreground text-[10px]">
                <Bookmark className="w-3 h-3 mr-1" />
                Must Read
              </Badge>
            )}
            {post.isPopular && (
              <Badge className="bg-secondary text-secondary-foreground text-[10px]">
                <TrendingUp className="w-3 h-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
        )}
      </Link>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="text-[10px]">
            {categoryInfo?.icon} {categoryInfo?.name}
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
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="text-xs font-medium">{post.author.name}</p>
              <p className="text-[10px] text-muted-foreground">{post.author.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {((post.views || 0) / 1000).toFixed(1)}K
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function MustReadSection() {
  const mustReadPosts = getMustReadBlogs().slice(0, 3);
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-serif font-bold">Must Read</h2>
            <p className="text-sm text-muted-foreground">
              Essential articles for your spiritual journey
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="hidden md:flex" asChild>
          <Link href="/blog">
            View All <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {mustReadPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

function PopularSection() {
  const popularPosts = getPopularBlogs().slice(0, 4);
  const trendingPosts = [...blogPosts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 5);

  return (
    <section className="py-12">
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
            {popularPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
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
                <div
                  key={post.id}
                  className="flex gap-3 py-3 border-b border-border last:border-0"
                >
                  <span className="text-2xl font-serif font-bold text-primary/30 shrink-0 w-8">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-primary transition-colors"
                    >
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
  );
}

function AllArticlesSection({ category }) {
  const filteredPosts = getBlogsByCategory(category);
  const categoryInfo = blogCategories.find((c) => c.id === category);

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-serif font-bold">
          {category === 'all' ? 'All Articles' : categoryInfo?.name}
          <span className="text-muted-foreground font-normal text-base ml-2">
            ({filteredPosts.length})
          </span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
      {filteredPosts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No articles found in this category.</p>
        </div>
      )}
    </section>
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
            <Button type="submit" className="h-11 bg-foreground text-background hover:bg-foreground/90">
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

  return (
    <main className="min-h-screen">
      <BlogHero />
      <CategoryNav activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
      <div className="container">
        {activeCategory === 'all' ? (
          <>
            <MustReadSection />
            <PopularSection />
            <AllArticlesSection category={activeCategory} />
          </>
        ) : (
          <AllArticlesSection category={activeCategory} />
        )}
        <NewsletterCTA />
      </div>
    </main>
  );
}

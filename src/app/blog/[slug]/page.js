'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Eye,
  ArrowLeft,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { getBlogBySlug, blogPosts, blogCategories } from '@/data/blogs';

function renderContent(content) {
  if (!content) return null;
  const lines = content.split('\n');
  const elements = [];
  let currentList = [];
  let listKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="space-y-2 my-4 ml-4">
          {currentList.map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('## ')) {
      flushList();
      elements.push(
        <h2
          key={index}
          className="text-xl md:text-2xl font-serif font-bold mt-8 mb-4 text-foreground"
        >
          {trimmed.replace('## ', '')}
        </h2>
      );
    } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
      flushList();
      elements.push(
        <h3
          key={index}
          className="text-lg font-semibold mt-6 mb-2 text-foreground"
        >
          {trimmed.replace(/\*\*/g, '')}
        </h3>
      );
    } else if (trimmed.startsWith('- ')) {
      currentList.push(trimmed.replace('- ', ''));
    } else if (/^\d+\./.test(trimmed)) {
      flushList();
      const number = trimmed.match(/^(\d+)\./)?.[1];
      const text = trimmed.replace(/^\d+\.\s*/, '');
      elements.push(
        <div key={index} className="flex gap-3 my-2">
          <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center shrink-0">
            {number}
          </span>
          <span>{text}</span>
        </div>
      );
    } else if (trimmed.length > 0) {
      flushList();
      elements.push(
        <p key={index} className="text-muted-foreground leading-relaxed my-4">
          {trimmed}
        </p>
      );
    }
  });

  flushList();
  return elements;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug ?? '';
  const post = getBlogBySlug(slug);

  if (!post) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-primary hover:underline">
          Return to Blog
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const relatedPosts = blogPosts
    .filter((p) => p.category === post.category && p.id !== post.id)
    .slice(0, 3);

  const categoryInfo = blogCategories.find((c) => c.id === post.category);

  return (
    <main className="py-8 md:py-12">
      <div className="container max-w-4xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/blog" className="hover:text-primary">
            Blog
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground line-clamp-1">{post.title}</span>
        </nav>

        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all articles
        </Link>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline">
              {categoryInfo?.icon} {categoryInfo?.name}
            </Badge>
            {post.isMustRead && (
              <Badge className="bg-accent text-accent-foreground">Must Read</Badge>
            )}
          </div>
          <h1 className="text-2xl md:text-4xl font-serif font-bold mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">{post.excerpt}</p>
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
            <Separator orientation="vertical" className="h-8 hidden md:block" />
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {(post.views || 0).toLocaleString()} views
              </span>
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="aspect-video rounded-2xl overflow-hidden mb-10"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          {renderContent(post.content)}
        </motion.article>

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-border">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between py-6 border-t border-b border-border my-8 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Share:</span>
            <Button variant="outline" size="icon" className="w-9 h-9" type="button">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-9 h-9" type="button">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon" className="w-9 h-9" type="button">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="outline" size="sm" type="button">
            <Bookmark className="w-4 h-4 mr-2" />
            Save Article
          </Button>
        </div>

        <div className="bg-muted/30 rounded-xl p-6 mb-12">
          <div className="flex items-start gap-4 flex-wrap">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-serif font-bold text-lg">{post.author.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{post.author.role}</p>
              <p className="text-sm text-muted-foreground">
                An expert in Vedic traditions with over 15 years of experience guiding seekers on
                their spiritual journey.
              </p>
            </div>
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <section>
            <h2 className="text-2xl font-serif font-bold mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  href={`/blog/${relatedPost.slug}`}
                  className="group"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-3">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                    {relatedPost.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">{relatedPost.readTime}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

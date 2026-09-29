import React from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import { SEOHead } from '../components/seo/SEOHead';
import { ArrowLeft, Ticket } from 'lucide-react';

interface BlogPostPageProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ slug, onNavigate }) => {
  const post = BLOG_POSTS.find(p => p.slug === slug) || BLOG_POSTS[0];

  return (
    <div className="space-y-12 pb-16">
      <SEOHead 
        title={`${post.title} | Navratri Garba 2026`}
        description={post.excerpt}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        <button
          onClick={() => onNavigate('/blog')}
          className="text-xs font-bold text-amber-400 hover:text-white flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Articles</span>
        </button>

        <div className="space-y-3">
          <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
            {post.category}
          </span>
          <h1 className="text-2xl sm:text-4xl font-display font-black text-white leading-tight">
            {post.title}
          </h1>
          <p className="text-xs text-purple-300">
            By {post.author} • Published on {post.publishDate} • {post.readTime}
          </p>
        </div>

        <div className="h-72 sm:h-96 rounded-3xl overflow-hidden border border-purple-900/60">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="bg-festive-card/80 p-8 rounded-3xl border border-purple-900/50 space-y-4 text-slate-300 text-sm leading-relaxed prose prose-invert max-w-none">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* CTA Box inside blog */}
        <div className="bg-gradient-to-r from-festive-purple to-rose-950 p-6 rounded-3xl border border-rose-500/30 flex items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-white text-base">Ready to book your Garba pass?</h4>
            <p className="text-xs text-purple-200">Explore official SG Highway, Bopal & Satellite passes now.</p>
          </div>
          <button
            onClick={() => onNavigate('/events')}
            className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-xs flex items-center gap-2 flex-shrink-0"
          >
            <Ticket className="w-4 h-4" />
            <span>Book Pass Online</span>
          </button>
        </div>

      </div>
    </div>
  );
};

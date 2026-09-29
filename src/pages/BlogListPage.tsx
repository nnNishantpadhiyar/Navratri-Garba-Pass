import React from 'react';
import { BLOG_POSTS } from '../data/blogPosts';
import { SEOHead } from '../components/seo/SEOHead';

interface BlogListPageProps {
  onNavigate: (path: string) => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 pb-16">
      <SEOHead 
        title="Navratri Garba Blog Ahmedabad 2026 | Articles & News"
        description="Read the latest articles on Ahmedabad Navratri Garba 2026. Passes, top venues, artist schedules, dress advice, and season tickets."
      />

      <section className="relative pt-12 pb-16 bg-hero-pattern text-center space-y-4">
        <h1 className="text-3xl sm:text-5xl font-display font-black text-white">
          Navratri <span className="text-gold-gradient">Blog & Articles</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Insights and guides on Garba pass booking, top venues in Ahmedabad, and festival tips.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div 
              key={post.id}
              onClick={() => onNavigate(`/blog/${post.slug}`)}
              className="bg-festive-card/80 rounded-3xl border border-purple-900/50 overflow-hidden cursor-pointer hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="h-48 overflow-hidden">
                <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform" />
              </div>
              <div className="p-6 space-y-3">
                <span className="text-[10px] font-bold text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded border border-amber-500/30">
                  {post.category}
                </span>
                <h2 className="text-lg font-bold text-white hover:text-amber-300 transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="pt-2 text-[11px] text-purple-300 flex items-center justify-between border-t border-purple-900/40">
                  <span>{post.publishDate}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

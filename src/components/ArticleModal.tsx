import React from 'react';
import { Article } from '../types';
import { X, Clock, Calendar, User, Share2, Bookmark } from 'lucide-react';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  if (!article) return null;

  // Simple, bulletproof inline parser to convert basic markdown-like structures into styled HTML elements
  const renderContent = (text: string) => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((p, pIdx) => {
      const trimmed = p.trim();
      
      // Headers ###
      if (trimmed.startsWith('###')) {
        return (
          <h4 key={pIdx} className="font-serif font-bold text-brand-charcoal text-lg md:text-xl mt-8 mb-4 leading-tight">
            {trimmed.replace('###', '').trim()}
          </h4>
        );
      }
      
      // Bullets *
      if (trimmed.startsWith('*')) {
        const listItems = trimmed.split('\n');
        return (
          <ul key={pIdx} className="space-y-3 my-6 pl-5 list-disc text-brand-charcoal/90">
            {listItems.map((item, itemIdx) => (
              <li key={itemIdx} className="leading-relaxed font-light">
                {item.replace(/^\*\s*/, '').replace(/\*\*(.*?)\*\*/g, '$1').trim()}
              </li>
            ))}
          </ul>
        );
      }

      // Standard paragraphs - parse bold **text**
      const parts = [];
      let lastIndex = 0;
      const boldRegex = /\*\*(.*?)\*\*/g;
      let match;

      while ((match = boldRegex.exec(trimmed)) !== null) {
        // Push preceding plain text
        if (match.index > lastIndex) {
          parts.push(trimmed.substring(lastIndex, match.index));
        }
        // Push bold text
        parts.push(<strong key={match.index} className="font-bold text-brand-charcoal">{match[1]}</strong>);
        lastIndex = boldRegex.lastIndex;
      }

      if (lastIndex < trimmed.length) {
        parts.push(trimmed.substring(lastIndex));
      }

      return (
        <p key={pIdx} className="text-brand-charcoal/80 leading-relaxed text-base md:text-lg mb-5 font-light">
          {parts.length > 0 ? parts : trimmed}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-brand-charcoal/50 backdrop-blur-xs transition-opacity duration-300" 
        onClick={onClose} 
      />

      {/* Center modal */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-6 lg:p-8">
        <div 
          className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-3xl my-8 flex flex-col max-h-[90vh] border border-brand-border"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Controls */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-brand-border shrink-0 bg-brand-muted/10">
            <span className="text-2xs font-mono font-bold text-brand-accent uppercase tracking-widest bg-brand-muted border border-brand-border px-2.5 py-1 rounded-md">
              {article.categoryLabel}
            </span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert("¡Artículo guardado en marcadores!")}
                className="p-2 text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-muted rounded-xl transition cursor-pointer"
                title="Guardar artículo"
              >
                <Bookmark className="w-4 h-4" />
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("¡Enlace del artículo copiado al portapapeles!");
                }}
                className="p-2 text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-muted rounded-xl transition cursor-pointer"
                title="Compartir"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button 
                onClick={onClose}
                className="p-2 text-brand-charcoal/60 hover:text-brand-charcoal hover:bg-brand-muted rounded-xl transition cursor-pointer"
                title="Cerrar"
                id="btn-close-article-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="overflow-y-auto px-6 py-8 md:px-12 flex-1">
            {/* Meta Data */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-brand-accent mb-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {article.author}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl md:text-3.5xl font-normal text-brand-charcoal tracking-tight leading-tight mb-6">
              {article.title}
            </h3>

            {/* Excerpt */}
            <div className="p-4 bg-brand-muted/20 rounded-2xl border-l-4 border-brand-accent text-brand-charcoal/85 italic text-sm md:text-md mb-8 leading-relaxed font-serif">
              "{article.excerpt}"
            </div>

            {/* Rendered Body */}
            <div className="prose prose-slate max-w-none">
              {renderContent(article.content)}
            </div>

            {/* Tags footer */}
            <div className="flex flex-wrap items-center gap-2 mt-10 border-t border-brand-border pt-6">
              <span className="text-xs font-mono text-brand-accent mr-2">Temas:</span>
              {article.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="text-xs font-mono bg-brand-muted text-brand-charcoal border border-brand-border px-3 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Close bar */}
          <div className="px-6 py-4 bg-brand-muted/20 border-t border-brand-border text-center shrink-0">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 bg-brand-charcoal text-white font-serif font-bold text-sm rounded-full hover:bg-brand-accent transition cursor-pointer"
            >
              Cerrar Lectura
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

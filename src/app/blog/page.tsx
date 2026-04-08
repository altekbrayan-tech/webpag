'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Clock, Calendar, ChevronRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';

export default function Blog() {
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', 'Tecnología', 'Seguridad', 'Cloud', 'Desarrollo', 'Trabajo', 'Negocios'];
  
  const filtered = filter === 'Todos' ? blogPosts : blogPosts.filter(p => p.category === filter);

  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem' }}>
      <section className="container section">
        <div className="text-center mb-4 text-center">
          <span className="badge">Recursos</span>
          <h1>Nuestro <span style={{ color: 'var(--accent)' }}>Blog</span></h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
            Artículos, noticias y tutoriales sobre tecnología y soluciones IT.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
          {categories.map(cat => (
             <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.5rem 1rem', borderRadius: '30px', fontSize: '0.9rem' }}
             >
                {cat}
             </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
             <Link href={`/blog/${p.slug}`} key={i} className="card glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div className="flex items-center gap-2 mb-2" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                   <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{p.category}</span>
                   <span>•</span>
                   <span className="flex items-center gap-1"><Clock size={12} /> {p.readTime}</span>
                </div>
                <h3 style={{ fontSize: '1.4rem', lineHeight: '1.4', flex: 1 }}>{p.title}</h3>
                <p style={{ margin: '1rem 0', fontSize: '0.95rem' }}>{p.excerpt}</p>
                
                <div className="flex items-center justify-between" style={{ marginTop: 'auto', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                   <span className="flex items-center gap-1" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                     <Calendar size={14} /> {p.date}
                   </span>
                   <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', fontWeight: 'bold', fontSize: '0.9rem' }}>
                     Leer más <ChevronRight size={16} />
                   </span>
                </div>
             </Link>
          ))}
        </div>
      </section>

      <section className="section text-center">
        <div className="container glass-panel" style={{ padding: '4rem 2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>¿Listo para transformar tu negocio?</h2>
          <p style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Agenda una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus objetivos tecnológicos.</p>
          <Link href="/cotizacion" className="btn btn-primary">
            Solicitar Cotización
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowLeft } from 'lucide-react';
import { getPostBySlug } from '@/lib/blog-data';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPost({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem' }}>
      <section className="container section" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          <ArrowLeft size={16} /> Volver al Blog
        </Link>
        
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2" style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
             <span className="badge" style={{ marginBottom: 0 }}>{post.category}</span>
             <span>•</span>
             <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
             <span>•</span>
             <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
          </div>
          <h1 style={{ fontSize: '3rem', margin: '1rem 0' }}>{post.title}</h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--accent)', fontStyle: 'italic' }}>
             {post.excerpt}
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', fontSize: '1.1rem', lineHeight: '1.8' }}>
          {/* Simple formatting for the demo content */}
          {post.content.split('. ').map((sentence, i) => (
             <p key={i} style={{ marginBottom: '1rem' }}>{sentence + (sentence.endsWith('.') ? '' : '.')}</p>
          ))}
        </div>
      </section>
      
      <section className="section text-center">
        <div className="container glass-panel" style={{ padding: '4rem 2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>¿Te interesa optimizar tu infraestructura?</h2>
          <p style={{ marginBottom: '2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>Si este artículo te resultó útil, podemos ayudarte a implementar estas soluciones de manera real.</p>
          <Link href="/cotizacion" className="btn btn-primary">
            Solicitar Cotización
          </Link>
        </div>
      </section>
    </div>
  );
}

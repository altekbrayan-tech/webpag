'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Portafolio() {
  const [filter, setFilter] = useState('Todos');

  const categories = ['Todos', 'Desarrollo Web', 'Móvil', 'IT Solutions'];

  const projects = [
    {
      title: 'Sistema de Gestión Empresarial',
      category: 'Desarrollo Web',
      desc: 'Plataforma integral para gestión de recursos humanos, finanzas y operaciones.',
      tag: 'Finance',
      image: '/erp.png'
    },
    {
      title: 'App de Delivery Rápido',
      category: 'Móvil',
      desc: 'Aplicación móvil con tracking en tiempo real y pasarela de pagos integrada.',
      tag: 'E-commerce',
      image: '/delivery.png'
    },
    {
      title: 'Portal de Pacientes',
      category: 'Desarrollo Web',
      desc: 'Sistema de gestión de citas y historias clínicas para clínicas.',
      tag: 'Healthcare',
      image: '/office.png'
    },
    {
      title: 'Plataforma E-learning',
      category: 'Desarrollo Web',
      desc: 'Sistema de cursos online con videostreaming y evaluaciones.',
      tag: 'Education',
      image: '/coding.png'
    },
    {
      title: 'App de Gestión de Flotas',
      category: 'Móvil',
      desc: 'Control de vehículos en tiempo real con GPS y optimización de rutas.',
      tag: 'Logistics',
      image: '/datacenter.png'
    },
    {
      title: 'Migración Cloud Total',
      category: 'IT Solutions',
      desc: 'Migración completa de infraestructura on-premise a AWS.',
      tag: 'Technology',
      image: '/datacenter.png'
    }
  ];

  const filtered = filter === 'Todos' ? projects : projects.filter(p => p.category === filter);

  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem' }}>
      <section className="container section">
        <div className="text-center mb-4 text-center">
          <span className="badge">Casos de Éxito</span>
          <h1>Nuestro <span style={{ color: 'var(--accent)' }}>Portafolio</span></h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
            Conoce algunos de nuestros proyectos más exitosos y las soluciones que hemos implementado.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-4" style={{ flexWrap: 'wrap' }}>
          {categories.map(cat => (
             <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`btn ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.5rem 1rem', borderRadius: '30px' }}
             >
                {cat}
             </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p, i) => (
             <div key={i} className="card glass-panel" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: '220px', position: 'relative' }}>
                   <Image src={p.image} alt={p.title} fill style={{ objectFit: 'cover' }} />
                   <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '0.2rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', zIndex: 2 }}>
                      {p.category}
                   </div>
                   <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(7, 11, 20, 1), transparent)', zIndex: 1 }}></div>
                </div>
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 2, marginTop: '-3rem' }}>
                   <div style={{ fontSize: '0.85rem', color: 'var(--accent)', marginBottom: '0.5rem', fontWeight: 'bold' }}>{p.tag}</div>
                   <h3 style={{ textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>{p.title}</h3>
                   <p style={{ flex: 1 }}>{p.desc}</p>
                   <Link href="#" style={{ color: 'var(--accent)', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', marginTop: '1rem' }}>
                      Ver más →
                   </Link>
                </div>
             </div>
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

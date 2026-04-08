import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Code, Database, MonitorPlay, ShieldCheck } from 'lucide-react';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', paddingTop: '8rem' }}>
        <div className="container grid grid-cols-2 items-center gap-4">
          <div>
            <span className="badge">Innovación Digital</span>
            <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>
              Transformamos tu negocio con <span style={{ color: 'var(--accent)', textShadow: '0 0 20px rgba(0, 210, 255, 0.4)' }}>tecnología</span>
            </h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '2rem', maxWidth: '90%' }}>
              Somos tu aliado en el mundo digital. Desarrollo de software personalizado, soluciones IT integrales y soporte técnico especializado para llevar tu empresa al siguiente nivel.
            </p>
            <div className="flex gap-2">
              <Link href="/cotizacion" className="btn btn-primary">
                Comenzar Proyecto <ArrowRight size={18} style={{ marginLeft: '0.5rem' }}/>
              </Link>
              <Link href="/servicios" className="btn btn-outline">
                Nuestros Servicios
              </Link>
            </div>
          </div>
          
          <div className="flex justify-center">
            {/* Realistic IT Office Image inside a glass panel */}
            <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', aspectRatio: '4/3', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0 }}>
               <Image src="/office.png" alt="Clouddec IT Office" fill style={{ objectFit: 'cover' }} priority />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top right, rgba(7, 11, 20, 0.8), transparent)' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Snippet Section */}
      <section className="section" style={{ backgroundColor: 'var(--secondary-bg)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <h2>Nuestros Servicios</h2>
            <p>Ofrecemos soluciones tecnológicas completas para impulsar el crecimiento de tu empresa.</p>
          </div>
          
          <div className="grid grid-cols-4">
            <div className="card glass-panel">
              <Code size={40} color="var(--accent)" className="mb-2" />
              <h3>Desarrollo Web</h3>
              <p>Aplicaciones modernas y escalables con las mejores tecnologías.</p>
            </div>
            <div className="card glass-panel">
              <MonitorPlay size={40} color="var(--accent)" className="mb-2" />
              <h3>Apps Móviles</h3>
              <p>Apps nativas y cross-platform para iOS y Android.</p>
            </div>
            <div className="card glass-panel">
              <ShieldCheck size={40} color="var(--accent)" className="mb-2" />
              <h3>Ciberseguridad</h3>
              <p>Protección integral para tus datos y sistemas críticos.</p>
            </div>
            <div className="card glass-panel">
              <Database size={40} color="var(--accent)" className="mb-2" />
              <h3>Cloud & Soporte</h3>
              <p>Migración cloud y asistencia técnica 24/7 segura y confiable.</p>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <Link href="/servicios" className="btn btn-outline">
              Ver Todos los Servicios <ArrowRight size={18} style={{ marginLeft: '0.5rem' }}/>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section">
        <div className="container">
          <div className="glass-panel grid grid-cols-4 text-center" style={{ padding: '3rem 2rem' }}>
            <div>
              <h2 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>150+</h2>
              <p>Proyectos Completados</p>
            </div>
            <div>
              <h2 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>50+</h2>
              <p>Clientes Satisfechos</p>
            </div>
            <div>
              <h2 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>8+</h2>
              <p>Años de Experiencia</p>
            </div>
            <div>
              <h2 style={{ fontSize: '3rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>99%</h2>
              <p>Tasa de Satisfacción</p>
            </div>
          </div>
        </div>
      </section>
      
      <style key="animations" dangerouslySetInnerHTML={{__html:`
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}

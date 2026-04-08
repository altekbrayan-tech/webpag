import Link from 'next/link';
import Image from 'next/image';
import { Layout, Server, Lock, HelpCircle, Settings, Cloud } from 'lucide-react';

export default function Servicios() {
  const servicios = [
    {
      id: 'desarrollo',
      title: 'Desarrollo de Software',
      desc: 'Creamos aplicaciones web, móviles y de escritorio personalizadas.',
      icon: <Layout size={40} color="var(--accent)" />,
      items: ['Aplicaciones Web', 'Apps Móviles', 'Software a Medida', 'APIs e Integraciones']
    },
    {
      id: 'it',
      title: 'Soluciones IT',
      desc: 'Infraestructura tecnológica para hacer crecer tu negocio.',
      icon: <Server size={40} color="var(--accent)" />,
      items: ['Infraestructura Cloud', 'Migración a la Nube', 'Redes y Conectividad', 'Virtualización']
    },
    {
      id: 'seguridad',
      title: 'Ciberseguridad',
      desc: 'Protección integral para tus datos y sistemas.',
      icon: <Lock size={40} color="var(--accent)" />,
      items: ['Auditorías de Seguridad', 'Protección de Datos', 'Gestión de Amenazas', 'Cumplimiento Normativo']
    },
    {
      id: 'soporte',
      title: 'Soporte Técnico',
      desc: 'Asistencia técnica profesional para tu empresa.',
      icon: <HelpCircle size={40} color="var(--accent)" />,
      items: ['Help Desk 24/7', 'Mantenimiento Preventivo', 'Resolución de Incidentes', 'Soporte Remoto']
    },
    {
      id: 'admin',
      title: 'Administración de Sistemas',
      desc: 'Gestión completa de tu infraestructura tecnológica.',
      icon: <Settings size={40} color="var(--accent)" />,
      items: ['Gestión de Servidores', 'Administración de Redes', 'Monitoreo', 'Backup y Recuperación']
    },
    {
      id: 'cloud',
      title: 'Servicios Cloud',
      desc: 'Aprovecha todo el potencial de la nube.',
      icon: <Cloud size={40} color="var(--accent)" />,
      items: ['AWS / Azure / GCP', 'DevOps', 'Microservicios', 'Serverless']
    }
  ];

  return (
    <div className="animate-fade-in">
      <section className="container section" style={{ position: 'relative', overflow: 'hidden', padding: '6rem 2rem' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15, zIndex: -1 }}>
           <Image src="/coding.png" alt="Desarrollo de Software Coding" fill style={{ objectFit: 'cover' }} priority />
           <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--primary-bg), transparent, var(--primary-bg))' }}></div>
        </div>
        <div className="text-center mb-4 text-center">
          <span className="badge">Expertise</span>
          <h1 style={{ fontSize: '3.5rem' }}>Nuestros <span style={{ color: 'var(--accent)' }}>Servicios</span></h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
            Soluciones tecnológicas completas para cada necesidad de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-3 mt-4">
          {servicios.map((s, i) => (
            <div key={i} id={s.id} className="card glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ marginBottom: '1rem' }}>{s.icon}</div>
              <h3>{s.title}</h3>
              <p style={{ flex: 1 }}>{s.desc}</p>
              <ul style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                {s.items.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
                    <span style={{ color: 'var(--accent)' }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--secondary-bg)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge">Metodología</span>
            <h2>Nuestro Proceso</h2>
            <p>Seguimos una metodología probada para garantizar el éxito de cada proyecto.</p>
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center">
            {[
              { num: '1', title: 'Análisis', desc: 'Estudiamos tus necesidades y objetivos' },
              { num: '2', title: 'Diseño', desc: 'Planificamos la solución óptima' },
              { num: '3', title: 'Desarrollo', desc: 'Implementamos con las mejores prácticas' },
              { num: '4', title: 'Entrega', desc: 'Lanzamos y ofrecemos soporte continuo' }
            ].map((step, i) => (
              <div key={i} style={{ position: 'relative' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--primary-bg))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', margin: '0 auto 1.5rem', boxShadow: '0 0 20px rgba(0, 210, 255, 0.3)' }}>
                  {step.num}
                </div>
                <h4>{step.title}</h4>
                <p style={{ fontSize: '0.9rem' }}>{step.desc}</p>
                {i < 3 && <div className="hidden lg:block" style={{ position: 'absolute', top: '30px', right: '-50%', width: '100%', height: '2px', background: 'var(--border-color)', zIndex: -1 }}></div>}
              </div>
            ))}
          </div>
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

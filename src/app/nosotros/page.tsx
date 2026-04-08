import Link from 'next/link';
import Image from 'next/image';
import { Target, Heart, Eye, Users } from 'lucide-react';

export default function Nosotros() {
  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem' }}>
      <section className="container section">
        <div className="text-center mb-4">
          <span className="badge">Nuestra Empresa</span>
          <h1>Sobre <span style={{ color: 'var(--accent)' }}>Nosotros</span></h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
            Conoce a Clouddec, tu aliado estratégico en el mundo digital.
          </p>
        </div>

        <div className="grid grid-cols-2 items-center gap-4 mt-4">
          <div className="glass-panel" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '40%', opacity: 0.2, zIndex: 0 }}>
               <Image src="/datacenter.png" alt="Datacenter Clouddec" fill style={{ objectFit: 'cover' }} />
               <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--glass-bg), transparent)' }}></div>
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2>Nuestra Historia</h2>
              <p>
                Clouddec nació en 2018 con una visión clara: democratizar el acceso a soluciones tecnológicas de alta calidad. Fundada por un equipo de profesionales con más de 15 años de experiencia combinada en el sector IT, hemos crecido hasta convertirnos en un referente en el mercado.
              </p>
              <p>
                Desde entonces, hemos completado más de 150 proyectos para clientes de diversos sectores, desde startups hasta grandes empresas. Nuestro compromiso con la excelencia y la innovación nos ha permitido construir relaciones duraderas basadas en la confianza y los resultados.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 text-center">
             <div className="card glass-panel flex flex-col items-center justify-center gap-1">
                <Target size={32} color="var(--accent)" />
                <h4 style={{ margin: '1rem 0 0.5rem' }}>Misión</h4>
                <p style={{ fontSize: '0.9rem' }}>Proporcionar soluciones tecnológicas que impulsen el crecimiento.</p>
             </div>
             <div className="card glass-panel flex flex-col items-center justify-center gap-1">
                <Eye size={32} color="var(--accent)" />
                <h4 style={{ margin: '1rem 0 0.5rem' }}>Visión</h4>
                <p style={{ fontSize: '0.9rem' }}>Ser la empresa líder en soluciones IT en Latinoamérica.</p>
             </div>
             <div className="card glass-panel flex flex-col items-center justify-center gap-1" style={{ gridColumn: 'span 2' }}>
                <Heart size={32} color="var(--accent)" />
                <h4 style={{ margin: '1rem 0 0.5rem' }}>Valores</h4>
                <p style={{ fontSize: '0.9rem' }}>Compromiso, transparencia, innovación y orientación al cliente.</p>
             </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ backgroundColor: 'var(--secondary-bg)' }}>
        <div className="container">
          <div className="text-center mb-4">
            <span className="badge">Talento</span>
            <h2>Equipo Clouddec</h2>
            <p>Profesionales apasionados y dedicados a entregar resultados excepcionales.</p>
          </div>
          
          <div className="grid grid-cols-4">
            {/* Team Members */}
            {[
              { name: 'Carlos García', role: 'CEO & Fundador', init: 'CG' },
              { name: 'María López', role: 'CTO', init: 'ML' },
              { name: 'Juan Pérez', role: 'Lead Developer', init: 'JP' },
              { name: 'Ana Martínez', role: 'Project Manager', init: 'AM' },
            ].map((member, i) => (
              <div key={i} className="card glass-panel text-center flex flex-col items-center">
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary-bg)', border: '2px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)', marginBottom: '1rem' }}>
                  {member.init}
                </div>
                <h4>{member.name}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--accent)' }}>{member.role}</p>
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

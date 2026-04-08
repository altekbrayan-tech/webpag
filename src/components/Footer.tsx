'use client';

import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--secondary-bg)', padding: '4rem 2rem 2rem', marginTop: '4rem', borderTop: '1px solid var(--border-color)' }}>
      <div className="container grid grid-cols-4" style={{ marginBottom: '3rem' }}>
        <div style={{ gridColumn: 'span 1' }} className="footer-brand">
          <Link href="/" className="flex items-center gap-2 mb-2">
            <div style={{ position: 'relative', width: '30px', height: '30px' }}>
              <Image src="/logo.png" alt="Clouddec Logo" fill style={{ objectFit: 'contain' }} />
            </div>
            <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>CLOUDDEC</span>
          </Link>
          <p>Transformamos ideas en soluciones tecnológicas. Desarrollo de software y soluciones IT para empresas.</p>
        </div>

        <div>
          <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Servicios</h4>
          <ul className="flex flex-col gap-1">
            <li><Link href="/servicios#desarrollo" style={{ color: 'var(--text-muted)' }}>Desarrollo de Software</Link></li>
            <li><Link href="/servicios#it" style={{ color: 'var(--text-muted)' }}>Soluciones IT</Link></li>
            <li><Link href="/servicios#soporte" style={{ color: 'var(--text-muted)' }}>Soporte Técnico</Link></li>
            <li><Link href="/servicios#admin" style={{ color: 'var(--text-muted)' }}>Administración de Sistemas</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Empresa</h4>
          <ul className="flex flex-col gap-1">
            <li><Link href="/nosotros" style={{ color: 'var(--text-muted)' }}>Sobre Nosotros</Link></li>
            <li><Link href="/portafolio" style={{ color: 'var(--text-muted)' }}>Portafolio</Link></li>
            <li><Link href="/blog" style={{ color: 'var(--text-muted)' }}>Blog</Link></li>
            <li><Link href="/contacto" style={{ color: 'var(--text-muted)' }}>Contacto</Link></li>
          </ul>
        </div>

        <div>
          <h4 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Contacto</h4>
          <ul className="flex flex-col gap-1">
            <li style={{ color: 'var(--text-muted)' }}>contacto@clouddec.site</li>
            <li style={{ color: 'var(--text-muted)' }}>+57 301 331 8447</li>
            <li style={{ color: 'var(--text-muted)' }}>Colombia, Bogotá D.C.</li>
          </ul>
        </div>
      </div>

      <div className="container flex justify-between items-center" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem' }}>
        <p>© 2026 Clouddec. Todos los derechos reservados.</p>
        <div className="flex gap-2">
          <Link href="/privacidad" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Política de Privacidad</Link>
          <span style={{ color: 'var(--text-muted)' }}>|</span>
          <Link href="/terminos" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Términos de Servicio</Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr; gap: 2rem; }
          .footer-brand { grid-column: span 1 !important; }
          .flex.justify-between { flex-direction: column; gap: 1rem; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;

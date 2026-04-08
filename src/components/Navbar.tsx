'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Inicio', path: '/' },
    { name: 'Nosotros', path: '/nosotros' },
    { name: 'Servicios', path: '/servicios' },
    { name: 'Portafolio', path: '/portafolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Cotización', path: '/cotizacion' },
    { name: 'Contacto', path: '/contacto' },
  ];

  return (
    <nav className="glass-panel" style={{ position: 'sticky', top: 0, zIndex: 50, margin: '1rem', padding: '1rem 2rem' }}>
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          {/* Omit <Image> dimensions for raw logo if it is simple or use standard size */}
          <div style={{ position: 'relative', width: '40px', height: '40px' }}>
            <Image src="/logo.png" alt="Clouddec Logo" fill style={{ objectFit: 'contain' }} />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, letterSpacing: '1px' }}>CLOUDDEC</span>
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu flex items-center">
          {/* Note: In pure vanilla CSS, we handle desktop/mobile with media queries. 
              Let's use classic style object for this simple nav inline or add to globals.css */}
          <ul className="nav-links flex gap-4">
            {links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.path}
                  style={{ 
                    color: pathname === link.path ? 'var(--accent)' : 'var(--text-main)',
                    fontWeight: pathname === link.path ? '600' : '400',
                    transition: 'color 0.3s'
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile menu toggle would go here in a real app, keeping it simple for the preview */}
        
        <Link href="/cotizacion" className="btn btn-primary">
          Comenzar Proyecto
        </Link>
      </div>

      <style jsx>{`
        .nav-links { display: flex; gap: 1.5rem; }
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .btn-primary { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;

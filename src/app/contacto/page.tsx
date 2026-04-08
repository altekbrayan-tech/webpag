'use client';

import { MapPin, Phone, Mail } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Contacto() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    // Simulamos un envío
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem' }}>
      <section className="container section">
        <div className="text-center mb-4 text-center">
          <span className="badge">Soporte y Consultas</span>
          <h1>Formulario de <span style={{ color: 'var(--accent)' }}>Contacto</span></h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
            ¿Tienes alguna duda o consulta general? Escríbenos y nuestro equipo te responderá a la brevedad.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="glass-panel" style={{ padding: '3rem' }}>
            <h3 className="mb-2">Información de Contacto</h3>
            <p className="mb-4">Si necesitas una respuesta rápida, también puedes comunicarte por estos medios:</p>
            
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <div style={{ padding: '0.8rem', background: 'var(--primary-bg)', borderRadius: '50%', color: 'var(--accent)' }}>
                   <Mail size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>Email</h4>
                  <p style={{ margin: 0 }}>contacto@clouddec.site</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div style={{ padding: '0.8rem', background: 'var(--primary-bg)', borderRadius: '50%', color: 'var(--accent)' }}>
                   <Phone size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>Teléfono</h4>
                  <p style={{ margin: 0 }}>+57 301 331 8447</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <div style={{ padding: '0.8rem', background: 'var(--primary-bg)', borderRadius: '50%', color: 'var(--accent)' }}>
                   <MapPin size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1rem' }}>Ubicación</h4>
                  <p style={{ margin: 0 }}>Colombia, Bogotá D.C.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '3rem' }}>
            {status === 'success' ? (
              <div className="text-center" style={{ padding: '2rem 0' }}>
                 <div style={{ width: '60px', height: '60px', background: 'rgba(0, 210, 255, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--accent)' }}>
                    ✓
                 </div>
                 <h3>¡Mensaje Enviado!</h3>
                 <p>Nos pondremos en contacto contigo pronto.</p>
                 <button onClick={() => setStatus('idle')} className="btn btn-outline" style={{ marginTop: '1rem' }}>Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Nombre Completo</label>
                  <input type="text" className="form-input" required placeholder="Ej. Juan Pérez" />
                </div>
                <div className="form-group">
                  <label className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-input" required placeholder="juan@empresa.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Asunto</label>
                  <input type="text" className="form-input" required placeholder="Consulta general" />
                </div>
                <div className="form-group">
                  <label className="form-label">Mensaje</label>
                  <textarea className="form-textarea" required rows={4} placeholder="Escribe tu mensaje aquí..." />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

'use client';

import { FormEvent, useState } from 'react';

export default function Cotizacion() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    empresa: '',
    servicio: 'Desarrollo de Software',
    presupuesto: 'No definido',
    detalles: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      // Este endpoint debe reemplazarse por el Webhook de Google Apps Script
      // Ver las instrucciones proporcionadas en instrucciones_google_sheets.md
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_WEBHOOK_URL || '';
      
      if (!scriptUrl) {
         console.warn("No webhook URL configured. Simulating success.");
         setTimeout(() => setStatus('success'), 1000);
         return;
      }

      // Google Apps Script requires a specific format if not using CORS properly, but standard fetch with no-cors or specialized parameters works.
      // We will send Form Data as URLSearchParams for best compatibility with Google Apps Script doPost(e).
      const params = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
         params.append(key, value);
      });

      await fetch(scriptUrl, {
        method: 'POST',
        body: params,
        mode: 'no-cors' // necessary for Google Webhooks unless properly configured
      });
      
      // With no-cors we can't read the response, but we assume it worked if it didn't throw a network error.
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="animate-fade-in" style={{ paddingTop: '2rem' }}>
      <section className="container section">
        <div className="text-center mb-4 text-center">
          <span className="badge">Cotización Automática</span>
          <h1>Solicitar <span style={{ color: 'var(--accent)' }}>Cotización</span></h1>
          <p style={{ maxWidth: '800px', margin: '0 auto', fontSize: '1.2rem' }}>
            Obtén una propuesta personalizada para tu proyecto. Completa el formulario y nos contactaremos.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '3rem', maxWidth: '700px', margin: '0 auto' }}>
            {status === 'success' ? (
              <div className="text-center" style={{ padding: '3rem 0' }}>
                 <div style={{ width: '80px', height: '80px', background: 'rgba(0, 210, 255, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--accent)', fontSize: '2rem' }}>
                    ✓
                 </div>
                 <h2 style={{ marginBottom: '1rem' }}>¡Solicitud Enviada!</h2>
                 <p style={{ fontSize: '1.1rem' }}>Tus datos han sido registrados correctamente en nuestra base. Un asesor evaluará tu requerimiento y se pondrá en contacto contigo muy pronto.</p>
                 <button onClick={() => {setStatus('idle'); setFormData({...formData, detalles: ''})}} className="btn btn-outline" style={{ marginTop: '2rem' }}>Nueva cotización</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Nombre Completo</label>
                    <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} className="form-input" required placeholder="Juan Pérez" />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Correo Electrónico</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" required placeholder="juan@empresa.com" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Empresa (Opcional)</label>
                    <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="form-input" placeholder="Tu Empresa S.A." />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Servicio de Interés</label>
                    <select name="servicio" value={formData.servicio} onChange={handleChange} className="form-select" required>
                      <option>Desarrollo de Software</option>
                      <option>Aplicación Web/Móvil</option>
                      <option>Servicios IT & Infraestructura</option>
                      <option>Ciberseguridad</option>
                      <option>Soporte Técnico</option>
                      <option>Otro</option>
                    </select>
                  </div>
                </div>

                <div className="form-group mt-4">
                  <label className="form-label">Rango Presupuestario Estimado (USD)</label>
                  <select name="presupuesto" value={formData.presupuesto} onChange={handleChange} className="form-select">
                    <option>No definido aún</option>
                    <option>$1,000 - $5,000</option>
                    <option>$5,000 - $10,000</option>
                    <option>$10,000 - $25,000</option>
                    <option>Más de $25,000</option>
                  </select>
                </div>

                <div className="form-group mt-4">
                  <label className="form-label">Detalles del Proyecto</label>
                  <textarea name="detalles" value={formData.detalles} onChange={handleChange} className="form-textarea" required rows={5} placeholder="Cuéntanos un poco más sobre los objetivos y alcance de tu proyecto..." />
                </div>
                
                {status === 'error' && (
                  <div style={{ color: '#ff5e62', marginBottom: '1rem', padding: '1rem', background: 'rgba(255, 0, 0, 0.1)', borderRadius: '8px' }}>
                    Hubo un error al enviar el formulario. Verifica la URL del Webhook.
                  </div>
                )}

                <button type="submit" className="btn btn-primary mt-4" style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }} disabled={status === 'submitting'}>
                  {status === 'submitting' ? 'Procesando...' : 'Solicitar Cotización y Enviar a Google Sheets'}
                </button>
              </form>
            )}
        </div>
      </section>
    </div>
  );
}

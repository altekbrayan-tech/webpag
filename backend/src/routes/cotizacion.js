const { Router } = require('express');
const { pool } = require('../db');
const { notify } = require('../mailer');
const { requireFields } = require('../utils/validate');

const router = Router();

router.post('/', async (req, res) => {
  const { nombre, email, empresa, servicio, presupuesto, detalles } = req.body;

  const error = requireFields(req.body, ['nombre', 'email', 'servicio', 'detalles']);
  if (error) return res.status(400).json({ ok: false, error });

  try {
    await pool.query(
      `INSERT INTO quote_requests (nombre, email, empresa, servicio, presupuesto, detalles, ip, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        nombre.trim(),
        email.trim(),
        (empresa || '').trim() || null,
        servicio.trim(),
        (presupuesto || '').trim() || null,
        detalles.trim(),
        req.ip,
        req.get('user-agent') || null,
      ]
    );

    notify(
      `Nueva solicitud de cotización: ${servicio}`,
      `<p><strong>Nombre:</strong> ${nombre}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Empresa:</strong> ${empresa || '-'}</p>
       <p><strong>Servicio:</strong> ${servicio}</p>
       <p><strong>Presupuesto:</strong> ${presupuesto || '-'}</p>
       <p><strong>Detalles:</strong><br/>${detalles.replace(/\n/g, '<br/>')}</p>`
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('[cotizacion] error al guardar solicitud:', err);
    res.status(500).json({ ok: false, error: 'No se pudo guardar la solicitud. Inténtalo más tarde.' });
  }
});

module.exports = router;

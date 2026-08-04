const { Router } = require('express');
const { pool } = require('../db');
const { notify } = require('../mailer');
const { requireFields } = require('../utils/validate');

const router = Router();

router.post('/', async (req, res) => {
  const { nombre, email, telefono, puesto, cv_link, presentacion } = req.body;

  const error = requireFields(req.body, ['nombre', 'email', 'telefono', 'puesto', 'cv_link', 'presentacion']);
  if (error) return res.status(400).json({ ok: false, error });

  try {
    await pool.query(
      `INSERT INTO job_applications (nombre, email, telefono, puesto, cv_link, presentacion, ip, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [
        nombre.trim(),
        email.trim(),
        telefono.trim(),
        puesto.trim(),
        cv_link.trim(),
        presentacion.trim(),
        req.ip,
        req.get('user-agent') || null,
      ]
    );

    notify(
      `Nueva postulación: ${puesto}`,
      `<p><strong>Nombre:</strong> ${nombre}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Teléfono:</strong> ${telefono}</p>
       <p><strong>Puesto:</strong> ${puesto}</p>
       <p><strong>CV/LinkedIn:</strong> ${cv_link}</p>
       <p><strong>Presentación:</strong><br/>${presentacion.replace(/\n/g, '<br/>')}</p>`
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('[postulaciones] error al guardar postulación:', err);
    res.status(500).json({ ok: false, error: 'No se pudo guardar la postulación. Inténtalo más tarde.' });
  }
});

module.exports = router;

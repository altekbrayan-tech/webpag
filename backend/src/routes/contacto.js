const { Router } = require('express');
const { pool } = require('../db');
const { notify } = require('../mailer');
const { requireFields } = require('../utils/validate');

const router = Router();

router.post('/', async (req, res) => {
  const { nombre, email, asunto, mensaje } = req.body;

  const error = requireFields(req.body, ['nombre', 'email', 'asunto', 'mensaje']);
  if (error) return res.status(400).json({ ok: false, error });

  try {
    await pool.query(
      `INSERT INTO contact_messages (nombre, email, asunto, mensaje, ip, user_agent)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [nombre.trim(), email.trim(), asunto.trim(), mensaje.trim(), req.ip, req.get('user-agent') || null]
    );

    notify(
      `Nuevo mensaje de contacto: ${asunto}`,
      `<p><strong>Nombre:</strong> ${nombre}</p>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Asunto:</strong> ${asunto}</p>
       <p><strong>Mensaje:</strong><br/>${mensaje.replace(/\n/g, '<br/>')}</p>`
    );

    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('[contacto] error al guardar mensaje:', err);
    res.status(500).json({ ok: false, error: 'No se pudo guardar el mensaje. Inténtalo más tarde.' });
  }
});

module.exports = router;

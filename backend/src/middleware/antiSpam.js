const rateLimit = require('express-rate-limit');

// Si el honeypot "_hp" viene lleno, es un bot: respondemos 200 falso-positivo
// (sin insertar nada) para no delatar el mecanismo de defensa.
function honeypot(req, res, next) {
  if (req.body && req.body._hp) {
    return res.status(201).json({ ok: true });
  }
  next();
}

const formsRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: 'Demasiadas solicitudes. Inténtalo de nuevo más tarde.' },
});

module.exports = { honeypot, formsRateLimit };

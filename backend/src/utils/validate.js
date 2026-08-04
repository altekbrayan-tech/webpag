const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Devuelve null si es válido, o un string con el primer error encontrado.
function requireFields(body, fields) {
  for (const field of fields) {
    const value = body[field];
    if (typeof value !== 'string' || value.trim().length === 0) {
      return `El campo "${field}" es requerido.`;
    }
  }
  if ('email' in body && !EMAIL_RE.test(body.email.trim())) {
    return 'El correo electrónico no es válido.';
  }
  return null;
}

module.exports = { requireFields };

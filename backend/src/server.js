require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { honeypot, formsRateLimit } = require('./middleware/antiSpam');
const contactoRoutes = require('./routes/contacto');
const cotizacionRoutes = require('./routes/cotizacion');
const postulacionesRoutes = require('./routes/postulaciones');

const app = express();
app.set('trust proxy', 1);

const allowedOrigin = process.env.CORS_ORIGIN;
app.use(cors(allowedOrigin ? { origin: allowedOrigin } : {}));
app.use(express.json({ limit: '100kb' }));

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/contacto', formsRateLimit, honeypot, contactoRoutes);
app.use('/api/cotizacion', formsRateLimit, honeypot, cotizacionRoutes);
app.use('/api/postulaciones', formsRateLimit, honeypot, postulacionesRoutes);

app.use((req, res) => res.status(404).json({ ok: false, error: 'Ruta no encontrada.' }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`[api] Clouddec API escuchando en puerto ${port}`));

-- Esquema inicial Clouddec API
-- Se ejecuta automáticamente por la imagen oficial postgres al iniciar
-- el contenedor por primera vez (volumen de datos vacío).

CREATE TABLE IF NOT EXISTS contact_messages (
  id          SERIAL PRIMARY KEY,
  nombre      TEXT NOT NULL,
  email       TEXT NOT NULL,
  asunto      TEXT NOT NULL,
  mensaje     TEXT NOT NULL,
  ip          TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quote_requests (
  id          SERIAL PRIMARY KEY,
  nombre      TEXT NOT NULL,
  email       TEXT NOT NULL,
  empresa     TEXT,
  servicio    TEXT NOT NULL,
  presupuesto TEXT,
  detalles    TEXT NOT NULL,
  ip          TEXT,
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS job_applications (
  id            SERIAL PRIMARY KEY,
  nombre        TEXT NOT NULL,
  email         TEXT NOT NULL,
  telefono      TEXT NOT NULL,
  puesto        TEXT NOT NULL,
  cv_link       TEXT NOT NULL,
  presentacion  TEXT NOT NULL,
  ip            TEXT,
  user_agent    TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created_at ON quote_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications (created_at DESC);

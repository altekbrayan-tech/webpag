export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  excerpt: string;
  date: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'como-la-ia-esta-transformando-el-desarrollo',
    title: 'Cómo la IA está transformando el desarrollo de software',
    category: 'Tecnología',
    readTime: '5 min',
    excerpt: 'La inteligencia artificial está revolucionando la forma en que escribimos, probamos y desplegamos código...',
    date: '15 de Marzo, 2026',
    content: 'La inteligencia artificial ha pasado de ser una promesa futurista a una realidad que impacta el día a día de los equipos de desarrollo. Desde asistentes de código como Copilot y ChatGPT, hasta herramientas de testing automatizado impulsadas por IA, la eficiencia está alcanzando niveles sin precedentes. En Clouddec integramos estas herramientas de forma segura para garantizar velocidad sin sacrificar calidad ni seguridad.'
  },
  {
    slug: 'guia-completa-ciberseguridad-empresas',
    title: 'Guía completa de ciberseguridad para empresas',
    category: 'Seguridad',
    readTime: '8 min',
    excerpt: 'En un mundo cada vez más digital, proteger tu negocio de amenazas cibernéticas es fundamental...',
    date: '10 de Marzo, 2026',
    content: 'La ciberseguridad no es opcional. El ransomware, el phishing y otras amenazas evolucionan a diario. Esta guía cubre las bases esenciales: autenticación multifactor (MFA), encriptación de datos, auditorías periódicas y educación del personal. Contacta a nuestro equipo de seguridad para una auditoría personalizada.'
  },
  {
    slug: 'migracion-nube-lo-que-necesitas-saber',
    title: 'Migración a la nube: Lo que necesitas saber',
    category: 'Cloud',
    readTime: '6 min',
    excerpt: 'La migración a la nube puede parecer abrumadora, pero con la planificación adecuada...',
    date: '5 de Marzo, 2026',
    content: 'Pasar a AWS, Azure o GCP aporta escalabilidad y ahorro de costos. Sin embargo, un "Lift and Shift" ciego puede generar problemas de rendimiento o facturas enormes. En Clouddec, recomendamos la modernización de aplicaciones y el uso de Serverless o contenedores administrados para optimizar el gasto y la flexibilidad.'
  },
  {
    slug: 'buenas-practicas-desarrollo-agil',
    title: 'Buenas prácticas en desarrollo ágil',
    category: 'Desarrollo',
    readTime: '7 min',
    excerpt: 'Metodologías ágiles como Scrum y Kanban pueden transformar la productividad de tu equipo...',
    date: '1 de Marzo, 2026',
    content: 'Agile no es solo hacer reuniones diarias. Es iterar rápido y entregar valor constantemente. Al implementar prácticas CI/CD, revisiones de código estrictas y comunicación transparente, los equipos pueden evitar bloqueos y acelerar el go-to-market.'
  },
  {
    slug: 'futuro-trabajo-remoto',
    title: 'El futuro del trabajo remoto: Tecnologías habilitadoras',
    category: 'Trabajo',
    readTime: '4 min',
    excerpt: 'El trabajo remoto llegó para quedarse. Conoce las herramientas que facilitan la colaboración...',
    date: '25 de Febrero, 2026',
    content: 'Colaborar a distancia exige más que una cámara web. Requerimos infraestructuras VDIs, VPNs seguras, políticas Zero-Trust y plataformas colaborativas robustas. Clouddec apoya a empresas a construir esquemas híbridos y remotos invulnerables de alta disponibilidad.'
  },
  {
    slug: 'sistema-de-gestion-de-tickets',
    title: 'Por qué tu empresa necesita un sistema de gestión de tickets',
    category: 'Negocios',
    readTime: '5 min',
    excerpt: 'Un buen sistema de tickets puede mejorar significativamente la atención al cliente...',
    date: '20 de Febrero, 2026',
    content: 'La atención al cliente en silos es deficiente. Centralizar las solicitudes mediante un Help Desk omnicanal permite métricas, trazabilidad y mayor satisfacción. Implementarlo puede reducir los tiempos de respuesta en un 50%.'
  }
];

export const getPostBySlug = (slug: string) => {
  return blogPosts.find(post => post.slug === slug) || null;
}

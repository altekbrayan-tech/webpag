FROM nginx:alpine

# Borramos CUALQUIER configuración por defecto que traiga Nginx
RUN rm -rf /etc/nginx/conf.d/*

# Creamos un archivo de configuración MÍNIMO y garantizado
RUN echo 'server { \
    listen 80 default_server; \
    listen [::]:80 default_server; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location /api/ { \
        proxy_pass http://api:3000/api/; \
        proxy_set_header Host $host; \
        proxy_set_header X-Real-IP $remote_addr; \
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; \
        proxy_set_header X-Forwarded-Proto $scheme; \
    } \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copiamos tus archivos
COPY html /usr/share/nginx/html
COPY public /usr/share/nginx/html/public

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

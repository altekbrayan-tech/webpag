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
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copiamos tus archivos
COPY html /usr/share/nginx/html
COPY public /usr/share/nginx/html/public

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

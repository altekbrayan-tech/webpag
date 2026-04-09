FROM nginx:alpine

# Reemplazar la configuración por defecto de Nginx para escuchar en 9443
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos de la carpeta html al directorio de nginx
COPY html /usr/share/nginx/html
COPY public /usr/share/nginx/html/public

# Exponer el puerto solicitado
EXPOSE 9443

CMD ["nginx", "-g", "daemon off;"]

FROM nginx:alpine

# Copiar los archivos estáticos de la carpeta html al directorio de nginx
COPY html /usr/share/nginx/html
COPY public /usr/share/nginx/html/public

# Exponer el puerto estándar de Nginx
EXPOSE 9443

CMD ["nginx", "-g", "daemon off;"]

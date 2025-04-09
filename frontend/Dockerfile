# Usa una imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del frontend al contenedor
COPY . .

# Instala http-server de forma global
RUN npm install -g http-server

# Expone el puerto en el que se ejecutará http-server
EXPOSE 8080

# Comando para iniciar el servidor
CMD ["http-server", "-p", "8080", "-a", "0.0.0.0"]

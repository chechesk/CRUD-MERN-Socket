# Usa la imagen base oficial de Node.js
FROM node:20

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Expone el puerto en el que Vite servirá la aplicación
EXPOSE 5173

# Comando para iniciar Vite en modo de desarrollo
CMD ["npm", "run", "dev"]

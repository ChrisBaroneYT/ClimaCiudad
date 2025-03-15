# 🌦 Clima en tu Ciudad

Este es un proyecto web que permite a los usuarios consultar el clima actual de cualquier ciudad utilizando la API de OpenWeather. Además, proporciona la opción de almacenar los datos obtenidos en una base de datos SQL Server.

## 🚀 Características
- Consulta el clima actual de cualquier ciudad.
- Muestra información detallada: temperatura, humedad, presión y descripción del clima.
- Interfaz simple y amigable.
- Posibilidad de almacenar los datos en una base de datos SQL Server.

## 📌 Tecnologías Utilizadas
- HTML5
- CSS3
- JavaScript (Fetch API)
- Node.js & Express.js (para la API backend)
- SQL Server (para almacenar los datos del clima)

## 📂 Estructura del Proyecto
```
📁 Proyecto-Clima
│── 📄 index.html      # Interfaz de usuario
│── 📄 styles.css      # Estilos CSS
│── 📄 script.js       # Lógica para obtener y mostrar el clima
│── 📄 server.js       # Servidor Node.js con Express y conexión a SQL Server
│── 📄 README.md       # Documentación del proyecto
```

## 🛠 Instalación y Uso
### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/proyecto-clima.git
cd proyecto-clima
```

### 2️⃣ Instalar dependencias
```bash
npm install
```

### 3️⃣ Configurar la base de datos en SQL Server
Crear una tabla llamada `Clima` con la siguiente estructura:
```sql
CREATE TABLE Clima (
    id INT IDENTITY(1,1) PRIMARY KEY,
    ciudad VARCHAR(100),
    pais VARCHAR(50),
    descripcion VARCHAR(255),
    temperatura FLOAT,
    humedad INT,
    presion INT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4️⃣ Configurar el servidor
Modificar el archivo `server.js` con la conexión a la base de datos:
```js
const sqlConfig = {
    user: 'root',
    password: 'root',
    database: 'CLIMAWEB2CLARO7',
    server: '172.30.30.35',
    options: {
        trustServerCertificate: true
    }
};
```

### 5️⃣ Ejecutar el servidor
```bash
node server.js
```

### 6️⃣ Abrir el proyecto en el navegador
Simplemente abre `index.html` en tu navegador.

## 📜 API Utilizada
Este proyecto usa la API de OpenWeather para obtener datos meteorológicos.
Puedes obtener una clave API gratuita en [OpenWeather](https://openweathermap.org/api).

## 📌 Autor
Desarrollado por **Cristian Sánchez**.

---
📌 *Este es un proyecto de práctica con fines educativos.*


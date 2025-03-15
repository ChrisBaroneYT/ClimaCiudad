const express = require("express");
const sql = require("mssql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Configuración de conexión a SQL Server
const dbConfig = {
    user: "root",
    password: "root",
    server: "172.30.30.35",
    database: "CLIMAWEB2CLARO7",
    options: { encrypt: false, trustServerCertificate: true }
};

// 🔹 Función para crear la tabla si no existe
async function crearTablaSiNoExiste() {
    try {
        let pool = await sql.connect(dbConfig);
        await pool.request().query(`
            IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'CRISTIAN_CLIMA')
            BEGIN
                CREATE TABLE CRISTIAN_CLIMA (
                    id INT IDENTITY(1,1) PRIMARY KEY,
                    ciudad VARCHAR(100),
                    pais VARCHAR(50),
                    descripcion VARCHAR(255),
                    temperatura FLOAT,
                    humedad INT,
                    presion INT,
                    fecha DATETIME DEFAULT GETDATE()
                );
            END
        `);
        console.log("✅ Tabla CRISTIAN_CLIMA verificada/creada correctamente.");
    } catch (error) {
        console.error("❌ Error al verificar/crear la tabla:", error);
    }
}

// 🔹 Llamar a la función al iniciar el servidor
crearTablaSiNoExiste();

// 🔹 Endpoint para guardar datos del clima
app.post("/guardarClima", async (req, res) => {
    const { ciudad, pais, descripcion, temperatura, humedad, presion } = req.body;

    try {
        let pool = await sql.connect(dbConfig);
        await pool.request()
            .input("ciudad", sql.VarChar, ciudad)
            .input("pais", sql.VarChar, pais)
            .input("descripcion", sql.VarChar, descripcion)
            .input("temperatura", sql.Float, temperatura)
            .input("humedad", sql.Int, humedad)
            .input("presion", sql.Int, presion)
            .query(`INSERT INTO CRISTIAN_CLIMA (ciudad, pais, descripcion, temperatura, humedad, presion) 
                    VALUES (@ciudad, @pais, @descripcion, @temperatura, @humedad, @presion)`);

        res.json({ message: "🌦 Clima guardado exitosamente" });
    } catch (error) {
        console.error("❌ Error en la BD:", error);
        res.status(500).json({ message: "Error al guardar en la base de datos" });
    }
});

// 🔹 Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log("✅ Servidor corriendo en http://localhost:3000");
});

require('dotenv').config();


const { Pool } = require('pg');


const pool = new Pool({

    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
    max: 20, // Opcional: número máximo de clientes inactivos en el pool
    idleTimeoutMillis: 30000,
});

pool.connect((err, client, release) => {
    if (err) {
 
        console.error('Error al obtener el cliente del pool:', err.stack);
        return;
    }

    release(); 
    console.log('Conectado y Pool de PostgreSQL iniciado.');
});

module.exports = pool;
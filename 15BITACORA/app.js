const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

require('dotenv').config({ path: './.env' });

const app = express();
const port = 3000;


const bd = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

bd.connect((error) => {
    if (error) {
        console.log('Error de conexión a la base de datos: ' + error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use('/css', express.static(path.join(__dirname, 'css')));

// Validación de fecha
function validarFecha(fechaStr) {
    const fechaMinima = new Date('2000-01-01T00:00:00');
    const fechaIngresada = new Date(fechaStr);
    const hoy = new Date();

    if (fechaIngresada < fechaMinima) return false;
    if (fechaIngresada > hoy) return false;
    return true;
}

// Validación de texto
function validarTexto(texto) {
    if (!texto) return 'ok'; // permitir vacío si el campo lo admite
    if (texto.length > 50) return 'longitud'; // demasiado largo
    if (/drop\s+database/i.test(texto)) return 'drop'; // contiene DROP DATABASE
    return 'ok';
}

// Mostrar formulario y lista de reportes
app.get('/', (req, res) => {
    const query = 'SELECT * FROM reportes_averias';
    bd.query(query, (error, resultados) => {
        if (error) {
            console.log('Error al obtener los reportes: ' + error);
            res.status(500).send('Error al obtener los reportes');
        } else {
            res.render('index', { reportes: resultados });
        }
    });
});

// Crear un nuevo reporte
app.post('/reportes', (req, res) => {
    const {
        fecha_hora_reporte,
        id_equipo_afectado,
        sintoma_reportado,
        diagnostico_tecnico,
        accion_correctiva,
        piezas_reemplazadas,
        tiempo_inactividad
    } = req.body;

    // Validación de fecha
    if (!validarFecha(fecha_hora_reporte)) {
        return res.status(400).send('La fecha ingresada no es válida (mínimo año 2000 y no futuro)');
    }

    // Validación de texto
    const campos = [id_equipo_afectado, sintoma_reportado, diagnostico_tecnico, accion_correctiva, piezas_reemplazadas, tiempo_inactividad];
    for (let campo of campos) {
        const resultado = validarTexto(campo);
        if (resultado === 'longitud') {
            return res.status(400).send('El texto no puede tener más de 50 caracteres');
        }
        if (resultado === 'drop') {
            return res.status(400).send('No se permite escribir "DROP DATABASE" en los campos');
        }
    }

    const query = `
        INSERT INTO reportes_averias 
        (fecha_hora_reporte, id_equipo_afectado, sintoma_reportado, diagnostico_tecnico, accion_correctiva, piezas_reemplazadas, tiempo_inactividad) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    bd.query(query, [
        fecha_hora_reporte,
        id_equipo_afectado,
        sintoma_reportado,
        diagnostico_tecnico,
        accion_correctiva,
        piezas_reemplazadas,
        tiempo_inactividad
    ], (error) => {
        if (error) {
            console.log('Error al crear el reporte: ' + error);
            res.status(500).send('Error al crear el reporte');
        } else {
            res.redirect('/');
        }
    });
});

// Eliminar un reporte
app.get('/reportes/delete/:id', (req, res) => {
    const reporteId = req.params.id;
    const query = 'DELETE FROM reportes_averias WHERE id_reporte = ?';

    bd.query(query, [reporteId], (error) => {
        if (error) {
            console.log('Error al eliminar el reporte: ' + error);
            res.status(500).send('Error al eliminar el reporte');
        } else {
            res.redirect('/');
        }
    });
});

// Editar un reporte
app.get('/reportes/edit/:id', (req, res) => {
    const reporteId = req.params.id;
    const query = 'SELECT * FROM reportes_averias WHERE id_reporte = ?';

    bd.query(query, [reporteId], (error, resultados) => {
        if (error) {
            console.log('Error al obtener el reporte: ' + error);
            res.status(500).send('Error al obtener el reporte');
        } else {
            res.render('edit', { reporte: resultados[0] });
        }
    });
});

// Actualizar un reporte
app.post('/reportes/update/:id', (req, res) => {
    const reporteId = req.params.id;
    const {
        fecha_hora_reporte,
        id_equipo_afectado,
        sintoma_reportado,
        diagnostico_tecnico,
        accion_correctiva,
        piezas_reemplazadas,
        tiempo_inactividad
    } = req.body;

    // Validación de fecha
    if (!validarFecha(fecha_hora_reporte)) {
        return res.status(400).send('La fecha ingresada no es válida (mínimo año 2000 y no futuro)');
    }

    // Validación de texto
    const campos = [id_equipo_afectado, sintoma_reportado, diagnostico_tecnico, accion_correctiva, piezas_reemplazadas, tiempo_inactividad];
    for (let campo of campos) {
        const resultado = validarTexto(campo);
        if (resultado === 'longitud') {
            return res.status(400).send('El texto no puede tener más de 50 caracteres');
        }
        if (resultado === 'drop') {
            return res.status(400).send('No se permite escribir "DROP DATABASE" en los campos');
        }
    }

    const query = `
        UPDATE reportes_averias 
        SET fecha_hora_reporte = ?, id_equipo_afectado = ?, sintoma_reportado = ?, diagnostico_tecnico = ?, accion_correctiva = ?, piezas_reemplazadas = ?, tiempo_inactividad = ?
        WHERE id_reporte = ?
    `;

    bd.query(query, [
        fecha_hora_reporte,
        id_equipo_afectado,
        sintoma_reportado,
        diagnostico_tecnico,
        accion_correctiva,
        piezas_reemplazadas,
        tiempo_inactividad,
        reporteId
    ], (error) => {
        if (error) {
            console.log('Error al actualizar el reporte: ' + error);
            res.status(500).send('Error al actualizar el reporte');
        } else {
            res.redirect('/');
        }
    });
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

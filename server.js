const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

// Configurar Express para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar el middleware para analizar JSON
app.use(express.json());

// Crear conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'eps_db'
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión: ' + err.stack);
    return;
  }
  console.log('Conectado a la base de datos.');
});

// Ruta para servir la página de inicio
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para obtener horarios disponibles
app.get('/api/available-appointments', (req, res) => {
  const query = 'SELECT appointment_date, appointment_time, specialist FROM appointments WHERE appointment_date > CURDATE()';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Ruta para reservar una cita
app.post('/api/appointments', (req, res) => {
  const { user_id, appointment_date, appointment_time, specialist } = req.body;
  const query = 'INSERT INTO appointments (user_id, appointment_date, appointment_time, specialist) VALUES (?, ?, ?, ?)';
  connection.query(query, [user_id, appointment_date, appointment_time, specialist], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Cita reservada con éxito' });
  });
});

app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});

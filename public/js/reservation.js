import { getFirestore, collection, addDoc } from "firebase/firestore";

const db = getFirestore();

// Función para manejar el envío del formulario de reserva
document.getElementById('reservation-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const name = document.getElementById('name').value;
  const id = document.getElementById('id').value;
  const specialist = document.getElementById('specialist').value;
  const appointmentDate = document.getElementById('appointment-date').value;
  const appointmentTime = document.getElementById('appointment-time').value;

  try {
    await addDoc(collection(db, 'citas'), {
      name,
      id,
      specialist,
      appointmentDate,
      appointmentTime,
      createdAt: new Date() // Fecha y hora en que se hizo la reserva
    });
    alert('Cita reservada exitosamente.');
  } catch (e) {
    console.error('Error añadiendo cita:', e);
    alert('Hubo un error al reservar la cita.');
  }
});

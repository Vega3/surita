import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const auth = getAuth();
const db = getFirestore(); // Solo una declaración de `db`

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      if (userData.role === 'doctor') {
        window.location.href = 'doctor_home.html';
      }
    }
  } else {
    window.location.href = 'login.html';
  }
});


// Función para cargar y mostrar citas en la página de inicio
async function loadAppointments() {
  const userId = "ID_DEL_USUARIO"; // Aquí debes colocar el ID del usuario autenticado
  const q = query(collection(db, "citas"), where("id", "==", userId));

  const querySnapshot = await getDocs(q);
  const appointmentsList = document.getElementById('appointments-list');
  appointmentsList.innerHTML = '';

  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const listItem = document.createElement('li');
    listItem.textContent = `Cita con ${data.specialist} el ${data.appointmentDate} a las ${data.appointmentTime}`;
    appointmentsList.appendChild(listItem);
  });
}

// Llamar a la función para cargar las citas al cargar la página
document.addEventListener('DOMContentLoaded', loadAppointments);

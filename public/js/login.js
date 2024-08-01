import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

document.querySelector('form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const email = document.getElementById('id').value;
  const password = document.getElementById('password').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = 'patient_home.html'; // Redirigir a la página de inicio del paciente
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    alert('Error al iniciar sesión. Verifique sus credenciales.');
  }
});

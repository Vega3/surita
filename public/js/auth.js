import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const auth = getAuth();

// Función para iniciar sesión
function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login exitoso
      const user = userCredential.user;
      console.log("Usuario logueado:", user);
    })
    .catch((error) => {
      console.error("Error al iniciar sesión:", error);
    });
}

// Función para cerrar sesión
function logout() {
  signOut(auth).then(() => {
    console.log("Usuario desconectado.");
  }).catch((error) => {
    console.error("Error al cerrar sesión:", error);
  });
}

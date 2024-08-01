import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

const db = getFirestore();

// Función para agregar un documento a una colección
async function addMedico(data) {
  try {
    const docRef = await addDoc(collection(db, "medicos"), data);
    console.log("Documento añadido con ID:", docRef.id);
  } catch (e) {
    console.error("Error añadiendo documento:", e);
  }
}

// Función para obtener documentos de una colección
async function getMedicos() {
  const querySnapshot = await getDocs(collection(db, "medicos"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
}

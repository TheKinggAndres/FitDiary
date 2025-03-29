// Inicialización de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCUhv7VZHVbt9BX3LsiMExAN8221w1ewc",
  authDomain: "fitdiary-5a109.firebaseapp.com",
  projectId: "fitdiary-5a109",
  storageBucket: "fitdiary-5a109.firebasestorage.app",
  messagingSenderId: "395312317076",
  appId: "1:395312317076:web:2cde259df866045f69ea81"
};
firebase.initializeApp(firebaseConfig);

// Referencia a la base de datos de Firestore
const db = firebase.firestore();

// Función para agregar una actividad al Firestore
function addActivity() {
    const activityName = document.getElementById("activity-name").value;
    const activityDuration = document.getElementById("activity-duration").value;
    const activityCalories = document.getElementById("activity-calories").value;

    if (activityName && activityDuration && activityCalories) {
        db.collection("activities").add({
            nombre: activityName,
            duracion: activityDuration,
            calorias: activityCalories,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()  // Fecha y hora
        })
        .then(() => {
            console.log("Actividad registrada correctamente");
            fetchActivities();  // Recarga la lista de actividades
        })
        .catch((error) => {
            console.error("Error al registrar la actividad: ", error);
        });
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Función para mostrar las actividades
function fetchActivities() {
    db.collection("activities").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        const activitiesList = document.getElementById("activities-list");
        activitiesList.innerHTML = ""; // Limpiar la lista

        querySnapshot.forEach((doc) => {
            const activity = doc.data();
            const listItem = document.createElement("li");
            listItem.textContent = `${activity.nombre} - ${activity.duracion} minutos - ${activity.calorias} calorías`;
            activitiesList.appendChild(listItem);
        });
    });
}

// Manejar el formulario
document.getElementById("activity-form").addEventListener("submit", (event) => {
    event.preventDefault();
    addActivity(); // Llamar a la función para agregar la actividad
});

// Cargar las actividades al inicio
window.onload = fetchActivities;

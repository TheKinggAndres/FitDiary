// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBCUhv7VZHVbt9BX3LsiMExAN8221w1ewc",
  authDomain: "fitdiary-5a109.firebaseapp.com",
  projectId: "fitdiary-5a109",
  storageBucket: "fitdiary-5a109.firebasestorage.app",
  messagingSenderId: "395312317076",
  appId: "1:395312317076:web:2cde259df866045f69ea81"
};

// Inicializar Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Elementos del DOM
const activityForm = document.getElementById("activity-form");
const activityList = document.getElementById("activity-list");

// Función para agregar actividad a Firestore
function addActivity(name, duration, calories) {
    db.collection("activities").add({
        name: name,
        duration: duration,
        calories: calories,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        console.log("Actividad registrada");
        fetchActivities();
    }).catch((error) => {
        console.error("Error al agregar actividad: ", error);
    });
}

// Función para obtener las actividades desde Firestore
function fetchActivities() {
    activityList.innerHTML = ''; // Limpiar la lista antes de cargar
    db.collection("activities").orderBy("timestamp", "desc").get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
                const activity = doc.data();
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${activity.name}</strong><br>
                    Duración: ${activity.duration} min | Calorías: ${activity.calories} kcal
                `;
                activityList.appendChild(li);
            });
        }).catch((error) => {
            console.error("Error al obtener actividades: ", error);
        });
}

// Manejar el envío del formulario
activityForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const activityName = document.getElementById("activity-name").value;
    const duration = document.getElementById("duration").value;
    const calories = document.getElementById("calories").value;

    if (activityName && duration && calories) {
        addActivity(activityName, duration, calories);
        activityForm.reset(); // Limpiar el formulario después de agregar la actividad
    } else {
        alert("Por favor, complete todos los campos.");
    }
});

// Cargar las actividades cuando se carga la página
window.onload = fetchActivities;

db.collection("activities").add({
    name: activityName,
    duration: activityDuration,
    calories: activityCalories,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()  // Fecha y hora automáticas
})
.then(() => {
    console.log("Actividad registrada correctamente");
    fetchActivities(); // Recarga la lista de actividades después de agregar una nueva
})
.catch((error) => {
    console.error("Error al registrar la actividad: ", error);
});


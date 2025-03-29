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
    // Capturar los valores del formulario
    const activityName = document.getElementById("activity-name").value;
    const activityDuration = document.getElementById("activity-duration").value;
    const activityCalories = document.getElementById("activity-calories").value;

    // Verificar que los campos no estén vacíos
    if (activityName && activityDuration && activityCalories) {
        // Agregar los datos a la colección 'activities' de Firestore
        db.collection("activities").add({
            nombre: activityName,  // Usar 'nombre' en lugar de 'name'
            duracion: activityDuration,  // Usar 'duracion' en lugar de 'duration'
            calorias: activityCalories,  // Usar 'calorias' en lugar de 'calories'
            timestamp: firebase.firestore.FieldValue.serverTimestamp()  // Fecha y hora de registro
        })
        .then(() => {
            console.log("Actividad registrada correctamente");
            fetchActivities();  // Recargar la lista de actividades después de agregar una nueva
        })
        .catch((error) => {
            console.error("Error al registrar la actividad: ", error);
        });
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

// Función para mostrar las actividades guardadas
function fetchActivities() {
    // Referencia a la colección 'activities' de Firestore
    db.collection("activities").orderBy("timestamp", "desc").get().then((querySnapshot) => {
        const activitiesList = document.getElementById("activities-list");
        activitiesList.innerHTML = "";  // Limpiar la lista antes de agregar nuevas actividades

        // Iterar a través de los documentos y agregarlos al HTML
        querySnapshot.forEach((doc) => {
            const activity = doc.data();
            console.log(activity);  // Verificar los datos recuperados
            const listItem = document.createElement("li");
            listItem.textContent = `${activity.nombre} - ${activity.duracion} minutos - ${activity.calorias} calorías`;
            activitiesList.appendChild(listItem);
        });
    });
}

// Manejar el envío del formulario
document.getElementById("activity-form").addEventListener("submit", (event) => {
    event.preventDefault();  // Prevenir la recarga de la página al enviar el formulario
    addActivity();  // Llamar a la función para agregar la actividad
});

// Cargar las actividades al inicio (cuando se abre la app)
window.onload = fetchActivities;

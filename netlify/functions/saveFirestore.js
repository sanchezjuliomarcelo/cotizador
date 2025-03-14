// netlify/functions/saveFirestore.js
const admin = require("firebase-admin");

exports.handler = async (event, context) => {
  try {
    // Credenciales de Service Account en la variable de entorno
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

    // Inicializamos la app de Firebase Admin si no está inicializada aún.
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Si quieres Realtime DB, pondrías databaseURL aquí,
        // para Firestore no es obligatorio, a menos que quieras
        // una configuración distinta.
      });
    }

    // Obtenemos la referencia a la base de datos Firestore
    const db = admin.firestore();

    // Extraemos los datos que envía el frontend, asumiendo que es JSON
    // y que incluye "fecha", "compra", "venta", ...
    const body = JSON.parse(event.body);
    
    // Insertamos un nuevo documento en la colección "cotizaciones"
    const docRef = await db.collection("cotizaciones").add({
      fecha: body.fecha,
      compra: body.compra,
      venta: body.venta,
      timestamp: new Date().toISOString()
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        message: "Datos guardados en Firestore",
        docId: docRef.id
      })
    };
  } catch (error) {
    console.error("Error guardando en Firestore:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: error.message })
    };
  }
};

// netlify/functions/saveFirestore.js
const admin = require("firebase-admin");

exports.handler = async (event) => {
  try {
    // Decodificamos la credencial desde Base64:
    const base64Cred = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
    const jsonString = Buffer.from(base64Cred, "base64").toString("utf8");
    const serviceAccount = JSON.parse(jsonString);

    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    const db = admin.firestore();

    const body = JSON.parse(event.body);

    const docRef = await db.collection("cotizaciones").add({
      fecha: body.fecha,
      compra: body.compra,
      venta: body.venta,
      timestamp: new Date().toISOString(),
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        message: "Datos guardados en Firestore",
        docId: docRef.id,
      }),
    };
  } catch (error) {
    console.error("Error guardando en Firestore:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ status: "error", message: error.message }),
    };
  }
};

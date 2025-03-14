document.addEventListener("DOMContentLoaded", () => {
  const btnGuardar = document.getElementById("btnGuardar");
  if (!btnGuardar) return;

  btnGuardar.addEventListener("click", () => {
    const data = {
      fecha: "2025-03-15",
      compra: "1000,00",
      venta: "1100,00"
    };

    fetch("/.netlify/functions/saveFirestore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(resp => resp.json())
      .then(respData => {
        console.log("Respuesta Firestore:", respData);
        if (respData.status === "ok") {
          alert("Guardado con éxito, docId: " + respData.docId);
        } else {
          alert("Error al guardar");
        }
      })
      .catch(err => {
        console.error("Error fetch:", err);
        alert("Error al guardar");
      });
  });
});

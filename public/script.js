document.addEventListener("DOMContentLoaded", () => {
// script.js, parte que hace fetch a scrapeBna:
fetch("/.netlify/functions/scrapeBna")
  .then((resp) => resp.json())
  .then((data) => {
    console.log("Datos scrap:", data);
    if (data.status === "ok") {
      // Pintar fecha, compra y venta
      document.getElementById("dolarFecha").textContent = `Fecha: ${data.fecha}`;
      document.getElementById("dolarCompra").textContent = `Compra: ${data.compra}`;
      document.getElementById("dolarVenta").textContent = `Venta: ${data.venta}`;
    } else {
      console.error("Error en scraping:", data);
    }
  })
  .catch((err) => console.error("Error scraping:", err));

  // 2. Lógica para el botón que guarda en Firestore
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

document.addEventListener("DOMContentLoaded", () => {
  fetch("/.netlify/functions/scrapeBna")
    .then((resp) => resp.json())
    .then((data) => {
      console.log("Respuesta scraping:", data);
      
      // MOSTRAR EN PANTALLA
      if (data.status === "ok") {
        const fechaEl = document.getElementById("fecha");
        const compraEl = document.getElementById("dolarCompra");
        const ventaEl = document.getElementById("dolarVenta");
        const errorMsgEl = document.getElementById("errorMsg");

        fechaEl.textContent = `Fecha: ${data.fecha || "N/A"}`;
        compraEl.textContent = `Compra: ${data.compra || "N/A"}`;
        ventaEl.textContent = `Venta: ${data.venta || "N/A"}`;
        errorMsgEl.textContent = ""; // Limpia cualquier error previo
      } else {
        // Si el status no es "ok", mostramos error
        document.getElementById("errorMsg").textContent = "No se pudo obtener la cotización del dólar.";
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      document.getElementById("errorMsg").textContent = `Error: ${err.message}`;
    });
});

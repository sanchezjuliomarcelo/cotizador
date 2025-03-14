document.addEventListener("DOMContentLoaded", () => {
  const fechaEl = document.getElementById("fecha");
  const dolarCompraEl = document.getElementById("dolarCompra");
  const dolarVentaEl = document.getElementById("dolarVenta");
  const errorMsgEl = document.getElementById("errorMsg");

  // Llamamos a nuestro endpoint local que hace el scraping
  fetch("/api/bna-dolar")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Respuesta no OK del servidor scraping");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data recibida del servidor scraping:", data);

      if (data.status === "ok") {
        fechaEl.textContent = `Fecha mostrada en BNA: ${data.fecha || "desconocida"}`;
        dolarCompraEl.textContent = `Compra: ${data.compra || "N/D"}`;
        dolarVentaEl.textContent = `Venta: ${data.venta || "N/D"}`;
      } else {
        errorMsgEl.textContent = "No se pudo obtener la cotización del dólar.";
      }
    })
    .catch((error) => {
      console.error("Error en fetch /api/bna-dolar:", error);
      errorMsgEl.textContent = `Error: ${error.message}`;
    });
});

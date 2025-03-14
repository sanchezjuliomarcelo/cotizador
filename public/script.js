document.addEventListener("DOMContentLoaded", () => {
  fetch("/.netlify/functions/scrapeBna")
    .then((resp) => resp.json())
    .then((data) => {
      console.log("Respuesta scraping:", data);
      // Mostrar en pantalla
      // ...
    })
    .catch((err) => {
      console.error("Error:", err);
    });
});

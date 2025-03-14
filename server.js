const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Servimos la carpeta 'public' para los archivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, "public")));

/**
 * Endpoint para scrapear la web del Banco Nación y extraer la cotización de “Dolar U.S.A” (billete).
 * Retorna JSON con 'compra' y 'venta'.
 */
app.get("/api/bna-dolar", async (req, res) => {
  try {
    const url = "https://www.bna.com.ar/Personas"; // URL que muestra la tabla
    const { data } = await axios.get(url);
    
    // Cargamos el HTML en cheerio
    const $ = cheerio.load(data);
    
    // 1. Ubicamos la fila (TR) del dólar billete
    //    Buscamos <td class="tit">Dolar U.S.A</td> y obtenemos todo el <tr> padre.
    const filaDolar = $('td.tit:contains("Dolar U.S.A")').closest("tr");
    
    // 2. En esa fila, la columna index 1 es la “compra” y la columna index 2 es la “venta”.
    const compra = filaDolar.children("td").eq(1).text().trim();
    const venta  = filaDolar.children("td").eq(2).text().trim();

    // Podemos extraer también la fecha y hora de actualización si queremos:
    // Por ejemplo, la fecha podría estar en <th class="fechaCot">…</th>
    const fecha = $("th.fechaCot").first().text().trim(); 
    // O la hora en un elemento con clase "legal": "Hora Actualización: 15:04"
    // Realmente depende de la estructura exacta

    return res.json({
      status: "ok",
      fuente: "Banco Nación (scraping)",
      fecha,
      compra,
      venta
    });
  } catch (error) {
    console.error("Error scraping BNA:", error.message);
    return res.status(500).json({
      status: "error",
      error: error.message
    });
  }
});

// Iniciamos el server
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

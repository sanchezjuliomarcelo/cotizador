// netlify/functions/scrapeBna.js
const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
  try {
    const url = "https://www.bna.com.ar/Personas";
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // localiza la fila "Dolar U.S.A" (billete)
    const filaDolar = $('td.tit:contains("Dolar U.S.A")').closest("tr");
    const compra = filaDolar.children("td").eq(1).text().trim();
    const venta = filaDolar.children("td").eq(2).text().trim();

    // fecha (opcional)
    const fecha = $("th.fechaCot").first().text().trim();

    // Retornamos JSON
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: "ok",
        fuente: "Banco Nación (scraping)",
        fecha,
        compra,
        venta
      })
    };
  } catch (error) {
    console.error("Error scraping BNA:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        status: "error",
        message: error.message
      })
    };
  }
};

const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeBna() {
  try {
    // 1. Obtener el HTML de la página
    const { data } = await axios.get("https://www.bna.com.ar/Personas");
    
    // 2. Cargarlo en cheerio
    const $ = cheerio.load(data);
    
    // 3. Buscar los elementos que te interesan
    //    Suponiendo que el Dólar billete se encuentra en un <td> con la clase "tit" que contenga la palabra "Dolar U.S.A"
    const filaDolar = $('td.tit:contains("Dolar U.S.A")').parent("tr");
    const valorCompra = filaDolar.children("td").eq(1).text();
    const valorVenta  = filaDolar.children("td").eq(2).text();

    console.log("Dólar (BNA) => Compra:", valorCompra, "– Venta:", valorVenta);
  } catch (error) {
    console.error("Error scraping:", error);
  }
}

scrapeBna();

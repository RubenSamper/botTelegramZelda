const axios = require('axios');
const cheerio = require('cheerio');
const { URL } = require('../config');

async function scrapeProduct() {
  const { data: html } = await axios.get(URL, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
    },
    timeout: 20000,
  });

  const $ = cheerio.load(html);

  const title = $('h2.product-title span.cm-txt').first().text().trim() || 'Sin título';
  const price = $('.buy--price.long-text .decimal').first().text().trim() || 'No disponible';
  const button = $('#btnNotify .cm-txt').first().text().trim() || '';

  return { title, price, button };
}

module.exports = { scrapeProduct };

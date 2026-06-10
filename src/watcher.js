const config = require('../config');
const { scrapeProduct } = require('./scraper');
const { sendMessage } = require('./bot');

let previousState = null;
let spamIntervalId = null;
let spamTimeoutId = null;

async function checkAndNotify() {
  try {
    const current = await scrapeProduct();

    const hasChanged = previousState !== null && (
      previousState.price !== current.price ||
      previousState.button !== current.button
    );

    if (hasChanged) {
      if (spamTimeoutId) clearTimeout(spamTimeoutId);
      if (spamIntervalId) clearInterval(spamIntervalId);

      spamIntervalId = setInterval(() => {
        sendMessage(`🚨 ${current.title}\n💰 ${current.price}\n🔘 ${current.button}\n🔗 ${config.URL}`);
      }, config.SPAM_INTERVAL_MS);

      spamTimeoutId = setTimeout(() => {
        clearInterval(spamIntervalId);
        spamIntervalId = null;
        spamTimeoutId = null;
      }, config.SPAM_DURATION_MS);
    }

    previousState = current;
  } catch (err) {
    console.error(err.message);
  }
}

function start() {
  console.log('Watcher started');
  checkAndNotify();
  setInterval(checkAndNotify, config.CHECK_INTERVAL_MS);
}

module.exports = { start };

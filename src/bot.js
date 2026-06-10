const TelegramBot = require('node-telegram-bot-api');
const { TELEGRAM_TOKEN, CHAT_ID } = require('../config');

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

async function sendMessage(text) {
  return bot.sendMessage(CHAT_ID, text);
}

module.exports = { sendMessage };

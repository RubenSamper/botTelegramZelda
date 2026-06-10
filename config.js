module.exports = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  CHAT_ID: process.env.CHAT_ID,
  URL: 'https://www.game.es/the-legend-of-zelda-ocarina-of-time-nintendo-switch-2-263197',
  CHECK_INTERVAL_MS: parseInt(process.env.CHECK_INTERVAL_MS, 10) || 15000,
  SPAM_DURATION_MS: parseInt(process.env.SPAM_DURATION_MS, 10) || 120000,
  SPAM_INTERVAL_MS: parseInt(process.env.SPAM_INTERVAL_MS, 10) || 1000,
};

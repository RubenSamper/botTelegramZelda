# GAME.es Spammer Bot — Bot de Telegram

Monitoriza un producto de **GAME.es** y, cuando detecta **cualquier cambio** (precio, disponibilidad, estado, texto del botón), activa un **modo spam** que envía un mensaje a Telegram **cada 1 segundo durante 2 minutos**.

Si durante el spam ocurre **otro cambio**, el contador de 2 minutos **se reinicia**, alargando el spam.

## Requisitos

- Node.js 18 o superior
- Token de un bot de Telegram (con [@BotFather](https://t.me/BotFather))
- El `CHAT_ID` numérico del chat o grupo destino

## Instalación

```bash
cd game-es-spammer
npm install
```

## Configuración

Edita **`config.js`** con tus datos:

```js
module.exports = {
  TELEGRAM_TOKEN: '1234567890:ABCdefGHIjklmNOPqrSTUvwxYZ',  // Token del bot
  CHAT_ID:         '-1001234567890',                          // Chat o grupo destino

  URL: 'https://www.game.es/...',                             // Producto a vigilar
  CHECK_INTERVAL_MS: 15 * 1000,                               // 15 s entre comprobaciones

  SPAM_DURATION_MS:  2 * 60 * 1000,                           // 2 min de spam
  SPAM_INTERVAL_MS:  1 * 1000,                                // 1 s entre mensajes spam
};
```

> **¿Cómo obtener el CHAT_ID?**  
> Envía un mensaje al bot y luego visita:  
> `https://api.telegram.org/bot<TU_TOKEN>/getUpdates`  
> Busca `chat.id` en la respuesta JSON.

## Uso

```bash
npm start
# o directamente:
node src/index.js
```

### Comportamiento esperado

1. El bot arranca y hace una **primera carga** del estado del producto.
2. Cada 15 segundos vuelve a comprobar la página.
3. Si **no hay cambios**, solo muestra logs en consola.
4. Si **detecta un cambio**:
   - Activa **modo spam**: envía un mensaje cada 1 segundo.
   - El spam dura **2 minutos** exactos.
   - Si durante el spam ocurre **otro cambio**, el temporizador **se reinicia**.
   - Pasados 2 minutos sin nuevos cambios, el spam se detiene automáticamente.
5. El proceso se repite indefinidamente.

### Detener

`Ctrl + C` en la terminal.

## Estructura del proyecto

```
├── package.json
├── config.js          ← Token, chat, intervalos, URL
├── README.md
└── src/
    ├── index.js       ← Punto de entrada
    ├── watcher.js     ← Lógica de monitorización y spam
    ├── scraper.js     ← Descarga HTML y extrae datos con cheerio
    └── bot.js         ← Instancia de TelegramBot (sin polling)
```

## Notas técnicas

- El bot **no usa polling** — solo envía mensajes, no recibe comandos.
- El estado se guarda **en memoria**. Al reiniciar no se dispara spam falso porque la primera carga no compara.
- Todos los errores de red se capturan y loguean sin detener el proceso.
- Los selectores de cheerio están basados en el HTML actual de GAME.es. Si la web cambia su estructura, habrá que actualizar `scraper.js`.

const WebSocket = require('ws');
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const wss = new WebSocket.Server({ port: 8080 });

// Инициализация Express
const app = express();
const appPort = 8081;

// Настраиваем middleware для парсинга JSON
app.use(bodyParser.json());

app.listen(appPort, () => {
    console.log(`Express сервер запущен на порту ${appPort}`);
});

app.post('/send', (req, res) => {
    const { body = {}} = req;

    // Отправляем сообщение всем WebSocket клиентам
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(body));
        }
    });

    res.send('Сообщение отправлено');
});

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      console.log('Пришло сообщение по сокетам:', message)
    });

    ws.on('close', () => {
        console.log('Клиент отключился');
    });

    console.log('Клиент подключился');
});

console.log('WebSocket сервер запущен на порту 8080');

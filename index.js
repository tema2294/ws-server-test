const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const messageObject = JSON.parse(message);
        const { type = '' } = messageObject || {};

        console.log(`Получено сообщение:`,messageObject);

        if (type === 'shouldUpdate') {
            wss.clients.forEach(client => {
                if (client !== ws && client.readyState === WebSocket?.OPEN) {
                    client.send(JSON.stringify({type: 'update', text: 'требуется обновление данных'}));
                }
            });
        }
    });

    ws.on('close', () => {
        console.log('Клиент отключился');
    });

    console.log('Клиент подключился');
});

console.log('WebSocket сервер запущен на порту 8080');

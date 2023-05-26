import http from 'http';
import WebSocket from 'ws';
import express from 'express';

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.get('/', (_, res) => res.render('home'));
app.get('/*', (_, res) => res.redirect('/'));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const backSockets = []; // fake DB

wss.on('connection', (backSocket) => {
  backSockets.push(backSocket);
  console.log('🔗 Connected to Browser 🔗');
  backSocket.on('close', () =>
    console.log('❌ DisConnected to the Browser ❌')
  );

  backSocket.on('message', (message) => {
    console.log('🕊️ Message from Browser :', message.toString()); //응답이 Buffer형태로 오기때문에 toString으로 변환해준다.
    backSockets.forEach((aSocket) => {
      aSocket.send(message.toString());
    }); //연결된 모든 socket에 메세지를 보낸다.
  });
});

server.listen(3000, handleListen);

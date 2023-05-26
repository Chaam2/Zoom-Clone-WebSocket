const frontSocket = new WebSocket(`ws://${window.location.host}`);

frontSocket.addEventListener('open', () => {
  console.log('🔗 Connected to Server 🔗');
});

frontSocket.addEventListener('message', (message) => {
  console.log('💌 Message from Server :', message.data);
});

setTimeout(() => {
  frontSocket.send('Hello from Browser😘');
}, 3000);

frontSocket.addEventListener('close', () => {
  console.log('❌ DisConnected to Server ❌');
});

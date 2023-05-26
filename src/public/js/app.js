const frontSocket = new WebSocket(`ws://${window.location.host}`);
const msgList = document.querySelector('ul');
const msgForm = document.querySelector('form');

frontSocket.addEventListener('open', () => {
  console.log('🔗 Connected to Server 🔗');
});

frontSocket.addEventListener('message', (message) => {
  console.log('💌 Message from Server :', message.data);
});

frontSocket.addEventListener('close', () => {
  console.log('❌ DisConnected to Server ❌');
});

msgForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = msgForm.querySelector('input');
  frontSocket.send(input.value);
  input.value = '';
});

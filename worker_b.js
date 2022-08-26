console.log(`worker B started`);

self.addEventListener('message', async function(e) {
  console.info(`worker B recvd message: ${JSON.stringify(e.data)}`);
});

console.log('worker A: started');

let workerB = null;

self.addEventListener('message', async function(e) {
  console.log('worker A: constructing worker B')
  workerB = new Worker('./worker_b.js', {type: 'module'});

  if (e.data.asyncDelay == -1) {
    console.log('worker A: IMMEDIATELY calling postMessage() and wait()!');
    sendPostMessageAndWait();
  } else {
    console.log(`worker A: DELAYING (${e.data.asyncDelay} ms) postMessage() and wait()`);
    self.setTimeout(sendPostMessageAndWait, e.data.asyncDelay);
  }
});

function sendPostMessageAndWait() {
  console.log('worker A: sending postMessage to B');
  workerB.postMessage('hello from A');

  console.log('worker A: starting wait() (waits forever)');
  const sab = new SharedArrayBuffer(1024);
  const int32 = new Int32Array(sab);
  Atomics.wait(int32, 0, 0);
}

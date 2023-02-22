const { spawn } = require('child_process');

const scaleApi = spawn('node', ['src/server/scale-api.js']);

scaleApi.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

scaleApi.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

scaleApi.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

const https = require('https');
const fs = require('fs');
const path = require('path');

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302) {
        return download(response.headers.location, dest).then(resolve, reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => reject(err));
    });
  });
}

async function run() {
  await download('https://picsum.photos/seed/const1/1200/800', path.join(__dirname, 'public/placeholder-1.jpg'));
  await download('https://picsum.photos/seed/const2/1200/800', path.join(__dirname, 'public/placeholder-2.jpg'));
  console.log('Downloaded');
}

run();

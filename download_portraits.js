const https = require('https');
const fs = require('fs');

function download(url, filename) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filename);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filename, () => {});
            reject(err);
        });
    });
}

async function run() {
    try {
        await download('https://randomuser.me/api/portraits/men/50.jpg', 'assets/team-ceo.jpg');
        await download('https://randomuser.me/api/portraits/women/44.jpg', 'assets/team-cto.jpg');
        await download('https://randomuser.me/api/portraits/men/32.jpg', 'assets/team-coo.jpg');
        console.log("Downloads finished!");
    } catch (e) {
        console.error(e);
    }
}
run();

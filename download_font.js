const fs = require('fs');
const https = require('https');
const path = require('path');

const url = "https://raw.githubusercontent.com/google/fonts/main/ofl/orbitron/Orbitron-Bold.ttf";
const dest = path.join(__dirname, 'public', 'fonts', 'Orbitron-Bold.ttf');

const file = fs.createWriteStream(dest);

https.get(url, function (response) {
    if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', function () {
            file.close(() => console.log('Download completed.'));
        });
    } else {
        console.error(`Download failed with status code: ${response.statusCode}`);
        // Consume response data to free up memory
        response.resume();
    }
}).on('error', function (err) { // Handle errors
    fs.unlink(dest, () => { }); // Delete the file async. (But we don't check the result)
    console.error('Error downloading file:', err.message);
});

const fs = require('fs');
const path = require('path');
const version = fs.readFileSync(path.resolve(__dirname, '../version.txt'), 'utf8').trim();

const sourceDir = path.resolve(__dirname, '../chrome/');
const targetDir = path.resolve(__dirname, '../chrome/dist/');

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all files from dist to the extension directory
fs.readdirSync(sourceDir).forEach(file => {
    fs.copyFileSync(path.join(sourceDir, file), path.join(targetDir, file));
});

// Update the manifest version
const manifestPath = path.join(targetDir, 'manifest.json');
const manifest = require(manifestPath);
manifest.version = version;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null,  2));

console.log(`Chrome extension packaged at ${targetDir}`);

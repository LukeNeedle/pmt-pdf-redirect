const fs = require('fs');
const path = require('path');
const version = fs.readFileSync(path.resolve(__dirname, '../../version.txt'), 'utf8').trim();

const sourceDir = path.resolve(__dirname, '../');
const targetDir = path.resolve(__dirname, '../dist/');

// Ensure the target directory exists
if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

// Copy all files from dist to the extension directory
fs.readdirSync(sourceDir).forEach(file => {
    const sourcePath = path.join(sourceDir, file);
    const targetPath = path.join(targetDir, file);
    const stat = fs.statSync(sourcePath);

    // Skip directories
    if (stat.isDirectory()) {
        return;
    }

    fs.copyFileSync(sourcePath, targetPath);
});

// Update the manifest version
const manifestPath = path.join(targetDir, 'manifest.json');
const manifest = require(manifestPath);
manifest.version = version;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null,  2));

// Package the extension
const execSync = require('child_process').execSync;
const packExtensionCommand = `chrome --pack-extension=${targetDir}`;
execSync(packExtensionCommand, { stdio: 'inherit' });

console.log(`Chrome extension packaged at ${targetDir}`);

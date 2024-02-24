const fs = require('fs');
const path = require('path');
const version = fs.readFileSync(path.resolve(__dirname, '../../version.txt'), 'utf8').trim();

const sourceDir = path.resolve(__dirname, '../');
const targetDir = path.resolve(__dirname, '../dist/');

const filesToCopy = [
    'background.js',
    'content.js',
    'rules.json',
    'icon.png',
    'manifest.json',
    'package.json',
    'webpack.config.js'
];

// Function to copy a directory recursively
function copySpecifiedFilesRecursively(source, target) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    const files = fs.readdirSync(source);
    for (const file of files) {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        const stat = fs.statSync(sourcePath);
        
        if (stat.isDirectory()) {
            // Recursively copy the directory, but only if it's 'src'
            if (file === 'src') {
            copySpecifiedFilesRecursively(sourcePath, targetPath);
            }
        } else {
            // Copy the file only if it's in the list
            if (filesToCopy.includes(file)) {
                fs.copyFileSync(sourcePath, targetPath);
            }
        }
    }
}

// Copy the contents of /src/ to /dist/src/
copySpecifiedFilesRecursively(sourceDir, targetDir);

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

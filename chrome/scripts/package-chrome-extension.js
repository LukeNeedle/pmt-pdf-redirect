const fs = require('fs');
const path = require('path');
const version = fs.readFileSync(path.resolve(__dirname, '../../version.txt'), 'utf8').trim();

const sourceDir = path.resolve(__dirname, '../');
const targetDir = path.resolve(__dirname, '../dist/');

const filesToCopyOne = [
    'icon.png',
    'manifest.json',
    'package.json',
    'webpack.config.js'
];
const filesToCopyTwo = [
    'background.js',
    'content.js',
    'rules.json'
];


// Function to copy a directory recursively
function copySpecifiedFilesRecursively(source, target, whichFilesToCopy) {
    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    const files = fs.readdirSync(source);
    for (const file of files) {
        const sourcePath = path.join(source, file);
        const targetPath = path.join(target, file);
        const stat = fs.statSync(sourcePath);
        
        if (stat.isDirectory() & file === 'src') {
            copySpecifiedFilesRecursively(sourcePath, targetPath, 2);
        } else if (!stat.isDirectory()){
            if (whichFilesToCopy == 1){
                if (filesToCopyOne.includes(file)) {
                    fs.copyFileSync(sourcePath, targetPath);
                }
            } else {
                if (filesToCopyTwo.includes(file)) {
                    fs.copyFileSync(sourcePath, targetPath);
                }
            }
        }
    }
}

copySpecifiedFilesRecursively(sourceDir, targetDir, 1);

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

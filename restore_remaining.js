import fs from 'fs';
import path from 'path';

const uiDir = 'c:/Users/HP/Music/Medifit_Project/frontend/src/components/ui';
// Use chart.tsx as the source since it is still corrupted (contains the blob)
const sourceFile = path.join(uiDir, 'chart.tsx');

console.log(`Reading source file: ${sourceFile}`);
const content = fs.readFileSync(sourceFile, 'utf-8');

const exportRegex = /export\s+\{([^}]+)\}\s*;/g;

let lastIndex = 0;
let match;

while ((match = exportRegex.exec(content)) !== null) {
    const endIndex = match.index + match[0].length;
    let chunk = content.substring(lastIndex, endIndex).trim();
    lastIndex = endIndex;

    if (!chunk) continue;

    const exportsBody = match[1];
    const exports = exportsBody.split(',').map(s => s.trim()).filter(s => s);

    if (exports.length === 0) continue;

    let targetFilename = null;

    // Manual mapping for the ones that failed
    if (exports.includes('ChartContainer')) {
        targetFilename = 'chart.tsx';
    } else if (exports.includes('ResizablePanelGroup')) {
        targetFilename = 'resizable.tsx';
    } else if (exports.includes('Toaster')) {
        // Check if we want to overwrite sonner.tsx
        // sonner.tsx is usually small.
        // Let's check if the chunk is large.
        // If it's just the wrapper, it's fine.
        // But let's skip it if it's not broken (size is small).
        // targetFilename = 'sonner.tsx'; 
    }

    if (targetFilename) {
        const targetFile = path.join(uiDir, targetFilename);
        console.log(`Restoring ${targetFilename}...`);
        fs.writeFileSync(targetFile, chunk);
    }
}

console.log('Restoration of remaining files complete.');

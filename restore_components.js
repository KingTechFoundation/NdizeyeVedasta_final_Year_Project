import fs from 'fs';
import path from 'path';

const uiDir = 'c:/Users/HP/Music/Medifit_Project/frontend/src/components/ui';
// We use select.tsx as the source since we know it contains the blob
const sourceFile = path.join(uiDir, 'select.tsx');

console.log(`Reading source file: ${sourceFile}`);
const content = fs.readFileSync(sourceFile, 'utf-8');

// Regex to find export blocks
// Matches content ending with export { ... };
const exportRegex = /export\s+\{([^}]+)\}\s*;/g;

let lastIndex = 0;
let match;

while ((match = exportRegex.exec(content)) !== null) {
    const endIndex = match.index + match[0].length;
    let chunk = content.substring(lastIndex, endIndex).trim();
    lastIndex = endIndex;

    // If the chunk is empty (e.g. double export?), skip
    if (!chunk) continue;

    // Clean up leading "use client"; duplicates if any (though trim should handle basic whitespace)

    const exportsBody = match[1];
    const exports = exportsBody.split(',').map(s => s.trim()).filter(s => s);

    if (exports.length === 0) continue;

    // Heuristic: Find a file that matches one of the exports
    let targetFilename = null;

    for (const exp of exports) {
        // Convert PascalCase to kebab-case
        const kebab = exp.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

        // Check exact match
        if (fs.existsSync(path.join(uiDir, `${kebab}.tsx`))) {
            targetFilename = `${kebab}.tsx`;
            break;
        }

        // Check if removing 'Primitive' helps (e.g. AccordionPrimitive -> accordion) 
        // though usually exports are the component names like Accordion
    }

    if (!targetFilename) {
        // Try to map common names
        // e.g. Toaster -> sonner.tsx? No, Toaster is usually in sonner.tsx but exported as Toaster.
        // But sonner.tsx was small, so maybe it's not in the blob.
        // Let's log and skip if not found
        console.log(`Could not match exports [${exports.join(', ')}] to an existing file.`);
        continue;
    }

    const targetFile = path.join(uiDir, targetFilename);
    console.log(`Restoring ${targetFilename}...`);
    fs.writeFileSync(targetFile, chunk);
}

console.log('Restoration complete.');

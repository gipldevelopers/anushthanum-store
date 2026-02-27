const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/app/admin');

function traverse(currentDir) {
  const files = fs.readdirSync(currentDir);
  for (const file of files) {
    const fullPath = path.join(currentDir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (file === 'page.js') {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Pattern to match the local API_ORIGIN and imageSrc
      const pattern = /const\s+API_ORIGIN\s*=\s*typeof\s+window\s*!==\s*'undefined'\s*&&\s*process\.env\.NEXT_PUBLIC_API_URL[\s\S]*?(?:return\s+url\.startsWith\('\/'\)\s*\?\s*`\$\{API_ORIGIN\}\$\{url\}`\s*:\s*`\$\{API_ORIGIN\}\/\$\{url\}`\s*;|return\s+API_ORIGIN\s*\?\s*`\$\{API_ORIGIN\}\$\{url\}`\s*:\s*url\s*;)\s*\n\}/;

      if (pattern.test(content)) {
        console.log('Replacing in', fullPath);
        // Replace with an import statement. But the file might not have @/lib/utils imported already.
        // Easiest is to replace the definition with just the import if it's not there.
        // First remove the old block
        content = content.replace(pattern, '');
        // Check if `import { imageSrc } from '@/lib/utils';` exists
        if (!content.includes('import { imageSrc }') && !content.includes('import {imageSrc}')) {
          // Add it after the last import
          const lastImportIndex = content.lastIndexOf('import ');
          if (lastImportIndex !== -1) {
            const endOfLastImport = content.indexOf('\n', lastImportIndex);
            content = content.slice(0, endOfLastImport) + "\nimport { imageSrc } from '@/lib/utils';" + content.slice(endOfLastImport);
          } else {
            content = "import { imageSrc } from '@/lib/utils';\n" + content;
          }
        }
        
        // Also if `function toImgUrl` or something was named differently (some users/page.js uses `getAvatarUrl`)
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

traverse(dir);

const fs = require('fs');
const path = require('path');

const walkSync = function(dir, filelist = []) {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    if (fs.statSync(dirFile).isDirectory()) {
      filelist = walkSync(dirFile, filelist);
    } else if (dirFile.endsWith('.tsx')) {
      filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = [
  ...walkSync(path.join(__dirname, 'src', 'app')),
  ...walkSync(path.join(__dirname, 'src', 'components'))
];

let replacedFiles = 0;
let replacedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Replace colors: prefix-[var(--color-NAME)] -> prefix-NAME
  // e.g. text-[var(--color-primary)] -> text-primary
  // e.g. bg-[var(--color-surface-variant)]/50 -> bg-surface-variant/50
  // e.g. hover:border-[var(--color-outline-variant)] -> hover:border-outline-variant
  content = content.replace(/([a-z0-9:-]+)-\[var\(--color-([a-zA-Z0-9-]+)\)\]/g, '$1-$2');

  // 2. Replace spacing: prefix-[var(--spacing-NAME)] -> prefix-NAME
  // e.g. p-[var(--spacing-md)] -> p-md
  // e.g. gap-[var(--spacing-lg)] -> gap-lg
  // e.g. -translate-y-[var(--spacing-xs)] -> -translate-y-xs (Wait, does TW v4 support this? Yes, translate is spacing)
  content = content.replace(/([a-z0-9:-]+)-\[var\(--spacing-([a-zA-Z0-9-]+)\)\]/g, '$1-$2');

  // 3. Replace radii: rounded-[var(--radius-NAME)] -> rounded-NAME (if it exists)
  // But wait, the raw code actually had rounded-[18px], rounded-[24px].
  // Looking at globals.css:
  // --radius: 8px, --radius-md: 12px, --radius-lg: 16px, --radius-xl: 18px, --radius-2xl: 24px, --radius-full: 9999px
  content = content.replace(/rounded-\[8px\]/g, 'rounded');
  content = content.replace(/rounded-\[12px\]/g, 'rounded-md');
  content = content.replace(/rounded-\[16px\]/g, 'rounded-lg');
  content = content.replace(/rounded-\[18px\]/g, 'rounded-xl');
  content = content.replace(/rounded-\[24px\]/g, 'rounded-2xl');
  content = content.replace(/rounded-\[32px\]/g, 'rounded-[32px]'); // No token for 32px
  content = content.replace(/rounded-\[9999px\]/g, 'rounded-full');

  // 4. Common text sizes (text-[10px], text-[12px] to Tailwind standard if applicable)
  // --text-caption: 12px, --text-small: 14px, --text-body: 16px, --text-title: 20px, --text-h3: 24px, --text-h2: 32px, --text-h1: 40px
  // In Tailwind, using `text-caption` works because it reads --text-* automatically.
  content = content.replace(/text-\[12px\]/g, 'text-caption');
  content = content.replace(/text-\[14px\]/g, 'text-small');
  content = content.replace(/text-\[16px\]/g, 'text-body');
  content = content.replace(/text-\[18px\]/g, 'text-[18px]'); // No 18px token
  content = content.replace(/text-\[20px\]/g, 'text-title');
  content = content.replace(/text-\[24px\]/g, 'text-h3');
  content = content.replace(/text-\[32px\]/g, 'text-h2');
  content = content.replace(/text-\[40px\]/g, 'text-h1');
  content = content.replace(/text-\[48px\]/g, 'text-display');

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    replacedFiles++;
    
    // Calculate how many were replaced for logging
    const changes = originalContent.split('var(--').length - content.split('var(--').length;
    replacedCount += (changes > 0 ? changes : 1);
  }
});

console.log(`Successfully refactored ${replacedFiles} files and replaced ${replacedCount} arbitrary token references.`);

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

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // 1. Containers: max-w-[1600px] -> max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
  content = content.replace(/max-w-\[1600px\]/g, 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8');

  // 2. Buttons/Inputs standard height: h-10, h-[48px], etc -> h-12
  // We can look for `<input` and `<button` tags with h-something, but since this is regex over TSX,
  // it might be safer to manually do those or just replace `h-10` with `h-12` globally? No, h-10 is used for avatars.
  
  // 3. Grid Gap standardisation: gap-xl -> gap-6, gap-xxl -> gap-12, etc. 
  // Let's replace gap-gutter with gap-6.
  content = content.replace(/gap-gutter/g, 'gap-6');

  // Let's replace md:w-1/2 or w-[400px] where inappropriate with `w-full max-w-md`
  content = content.replace(/w-\[400px\]/g, 'w-full max-w-md');

  // Remove `absolute` positioning where it shouldn't be. 
  // This is too dangerous for regex.
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content);
  }
});

console.log('Second pass structural cleanup complete.');

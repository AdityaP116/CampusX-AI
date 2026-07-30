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

const report = {};

const rules = [
  { name: 'absolute', regex: /\babsolute\b/ },
  { name: 'fixed', regex: /\bfixed\b/ },
  { name: 'fixed-width', regex: /\bw-\[(?!100%|auto).+?\]\b|\bw-\d+\b/ }, // w-32, w-[300px]
  { name: 'fixed-height', regex: /\bh-\[(?!100%|auto).+?\]\b|\bh-(?!full|auto|screen)\d+\b/ }, // h-64, h-[500px]
  { name: 'spacing-hardcoded', regex: /\b(p|m|px|py|mx|my|pt|pb|pl|pr|mt|mb|ml|mr)-\[.*?\]/ },
  { name: 'arbitrary-values', regex: /-\[.*?\]/ },
  { name: 'z-index', regex: /\bz-\d+\b/ },
  { name: 'translate', regex: /\b(translate-x|translate-y)-/ }
];

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match all classNames
  const classMatches = content.matchAll(/className="([^"]+)"|className=\{`([^`]+)`\}/g);
  let fileViolations = [];

  for (const match of classMatches) {
    const classes = (match[1] || match[2] || "").split(/\s+/);
    
    classes.forEach(cls => {
      rules.forEach(rule => {
        if (rule.regex.test(cls)) {
          fileViolations.push({ rule: rule.name, class: cls });
        }
      });
    });
  }

  if (fileViolations.length > 0) {
    // Count occurrences of each violation
    const summary = {};
    fileViolations.forEach(v => {
      if (!summary[v.rule]) summary[v.rule] = new Set();
      summary[v.rule].add(v.class);
    });
    
    report[file] = {};
    for (const [rule, classes] of Object.entries(summary)) {
      report[file][rule] = Array.from(classes);
    }
  }
});

fs.writeFileSync('layout_audit_raw.json', JSON.stringify(report, null, 2));
console.log('Analyzed ' + files.length + ' files.');
console.log('Found violations in ' + Object.keys(report).length + ' files.');

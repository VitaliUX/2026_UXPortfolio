const fs = require('fs');

const files = fs.readdirSync('public/mobi').filter(f => f.startsWith('folio_') && f.endsWith('.html'));

files.forEach(file => {
  let content = fs.readFileSync('public/mobi/' + file, 'utf8');
  content = content.replace(
    /\/\* Structural elements & borders \*\/\s*section,\s*\.section,\s*\.block,\s*hr\s*\{/g,
    `/* Structural elements & borders */
    section,
    .section,
    .block,
    .plate,
    .white,
    .grey,
    .royalSlider,
    .rsOverflow,
    .rsSlide,
    .rsNav,
    hr {
      background-color: transparent !important;
      background: transparent !important;`
  );
  fs.writeFileSync('public/mobi/' + file, content);
});

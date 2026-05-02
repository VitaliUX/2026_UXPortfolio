const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'public/mobi');
const files = fs.readdirSync(dir).filter(f => f.startsWith('folio_') && f.endsWith('.html'));

const cssToInject = `
<style id="splendor-design-system-override">
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Inter:wght@300;400;500;600;700;800&display=swap');

  /* Splendor Design System Overrides */
  body, html, .main_content {
    background-color: hsl(0, 0%, 4%) !important;
    background: hsl(0, 0%, 4%) !important;
    color: hsl(0, 0%, 96%) !important;
    font-family: 'Inter', sans-serif !important;
    -webkit-font-smoothing: antialiased;
  }
  
  /* Headings map to .display-serif */
  h1, h2, h3, h4, h5, h6, .display-serif {
    font-family: 'Inter', sans-serif !important;
    font-weight: 700 !important;
    letter-spacing: -0.04em !important;
    line-height: 0.92 !important;
    color: hsl(0, 0%, 96%) !important;
    margin-bottom: 1rem !important;
  }

  /* Body text */
  p, li, article {
    font-family: 'Inter', sans-serif !important;
    color: hsl(0, 0%, 60%) !important; /* muted-foreground */
    line-height: 1.6 !important;
  }

  /* Accent highlights */
  mark, .accent, .highlight, b, strong {
    background: transparent !important;
    color: hsl(218, 100%, 56%) !important; /* electric blue accent */
    font-weight: 600 !important;
  }

  /* Monospace mapping for metadata / small text */
  .mono, .date, .role, .client, .eyebrow {
    font-family: 'JetBrains Mono', monospace !important;
    text-transform: uppercase !important;
    letter-spacing: 0.2em !important;
    font-size: 11px !important;
    color: hsl(218, 100%, 56%) !important;
  }

  /* Links */
  a {
    color: hsl(0, 0%, 96%) !important;
    transition: color 0.3s ease !important;
  }
  a:hover {
    color: hsl(218, 100%, 56%) !important;
  }

  /* Structural elements & borders */
  section, .section, .block, hr {
    border-color: hsl(0, 0%, 14%) !important; /* border-border */
  }

  /* Images / RoyalSlider */
  .illustration img, .rsImg, .royalSlider {
    border-radius: 0px !important; /* brutalist/sharp edges from Splendor */
  }
  
  /* Clean up legacy layout paddings to match Splendor py-24 md:py-32 */
  .main_content section {
    padding-top: 6rem !important;
    padding-bottom: 6rem !important;
  }

  /* Hide the original navigation since React Nav is taking over */
  .header, #header_nav, .navbar.left, .sidebar {
    display: none !important;
  }
  .main_content {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
</style>
`;

for (const file of files) {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Clean up older injected styles to avoid bloat
  content = content.replace(/<style>\s*\/\*\s*Apply dark theme[\s\S]*?<\/style>/g, '');
  content = content.replace(/<style>\s*\/\*\s*Hide the original navigation[\s\S]*?<\/style>/g, '');
  content = content.replace(/<style id="splendor-design-system-override">[\s\S]*?<\/style>/g, '');

  // Inject the new design system styles right before </head>
  content = content.replace('</head>', cssToInject + '\n</head>');
  
  fs.writeFileSync(filePath, content);
}

console.log('Successfully applied splendor-design-system to ' + files.length + ' legacy folio files.');

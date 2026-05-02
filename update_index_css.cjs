const fs = require('fs');

let css = fs.readFileSync('src/index.css', 'utf8');

const darkVars = `    /* Minimal black + electric blue */
    --background: 0 0% 4%;
    --foreground: 0 0% 96%;

    --card: 0 0% 6%;
    --card-foreground: 0 0% 96%;

    --popover: 0 0% 6%;
    --popover-foreground: 0 0% 96%;

    --primary: 0 0% 96%;
    --primary-foreground: 0 0% 4%;

    --secondary: 0 0% 10%;
    --secondary-foreground: 0 0% 96%;

    --muted: 0 0% 10%;
    --muted-foreground: 0 0% 60%;

    --accent: 218 100% 56%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 70% 50%;
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 14%;
    --input: 0 0% 14%;
    --ring: 218 100% 56%;

    --radius: 0;

    --ink: 0 0% 4%;
    --cream: 0 0% 96%;
    --cream-deep: 0 0% 8%;
    --vermillion: 218 100% 56%;
    --blue: 218 100% 56%;

    --sidebar-background: 0 0% 4%;
    --sidebar-foreground: 0 0% 96%;
    --sidebar-primary: 218 100% 56%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 0 0% 10%;
    --sidebar-accent-foreground: 0 0% 96%;
    --sidebar-border: 0 0% 14%;
    --sidebar-ring: 218 100% 56%;`;

const lightVars = `    /* Minimal white + electric blue */
    --background: 0 0% 100%;
    --foreground: 0 0% 4%;

    --card: 0 0% 98%;
    --card-foreground: 0 0% 4%;

    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 4%;

    --primary: 0 0% 4%;
    --primary-foreground: 0 0% 96%;

    --secondary: 0 0% 96%;
    --secondary-foreground: 0 0% 4%;

    --muted: 0 0% 96%;
    --muted-foreground: 0 0% 40%;

    --accent: 218 100% 56%;
    --accent-foreground: 0 0% 100%;

    --destructive: 0 70% 50%;
    --destructive-foreground: 0 0% 100%;

    --border: 0 0% 90%;
    --input: 0 0% 90%;
    --ring: 218 100% 56%;

    --radius: 0;

    --ink: 0 0% 4%;
    --cream: 0 0% 96%;
    --cream-deep: 0 0% 8%;
    --vermillion: 218 100% 56%;
    --blue: 218 100% 56%;

    --sidebar-background: 0 0% 98%;
    --sidebar-foreground: 0 0% 4%;
    --sidebar-primary: 218 100% 56%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 0 0% 96%;
    --sidebar-accent-foreground: 0 0% 4%;
    --sidebar-border: 0 0% 90%;
    --sidebar-ring: 218 100% 56%;`;

css = css.replace(/(:root\s*\{)([\s\S]*?)(\n  \})/m, \`$1\n\${lightVars}$3\n\n  .dark {\n\${darkVars}\n  }\`);

fs.writeFileSync('src/index.css', css);

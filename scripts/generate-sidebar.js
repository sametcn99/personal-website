const fs = require('fs');
const path = require('path');

const gistDir = path.join(__dirname, '../src/app/gist');

function generateSidebarLinks(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  const links = items
    .filter(item => item.isDirectory())
    .map(folder => {
      const title = folder.name
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      return {
        title,
        href: `/gist/${folder.name}`
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const sidebarData = {
    Personal: [
      { title: 'Home', href: '/' },
      { title: 'CV', href: '/cv' }
    ],
    Gists: links
  };

  fs.writeFileSync(
    path.join(__dirname, '../src/data/sidebar-links.json'),
    JSON.stringify(sidebarData, null, 2)
  );
}

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, '../src/data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

generateSidebarLinks(gistDir);
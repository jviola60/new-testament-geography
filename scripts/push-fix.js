const { execSync } = require('child_process');

try {
  console.log("Adding changes...");
  execSync('git add -A', { stdio: 'inherit' });

  console.log("Committing changes...");
  execSync('git commit -m "Replace watermarked CartoDB tiles with Esri World Topo basemap"', { stdio: 'inherit' });

  console.log("Pushing to GitHub...");
  execSync('git push origin main', { stdio: 'inherit' });

  console.log("SUCCESS: Pushed to origin/main");
} catch (err) {
  console.error("Error during git operations:", err.message);
  process.exit(1);
}

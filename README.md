# 🎛️ Beat Distribution Project

A high-performance, mobile-first distribution system for "Free for Profit" beats, optimized for GitHub Pages.

## 📁 Project Structure
- `/index.html` - The main public landing page template.
- `/gen-admin-kn0bu-2k26.html` - **[SECRET]** The admin generator tool. Used to create new beat pages.
- `/pages/` - Directory where all generated beat landing pages are stored.
- `/pages/.gitkeep` - Ensures the folder exists in Git even when empty.

## 🚀 Deployment Workflow
1. **Access Admin Tool**: Navigate to `https://[username].github.io/[repo-name]/gen-admin-kn0bu-2k26.html`.
2. **Configure Beat**: Enter the beat title, the 5 monetization links (Adstera/etc.), and the final download URL.
3. **Generate**: Click "Generate & Download". This produces a standalone `.html` file.
4. **Publish**: 
   - Upload the downloaded file to the `/pages/` folder in your GitHub repository.
   - Commit and push the changes.
5. **Distribute**: Share the direct link: `https://[username].github.io/[repo-name]/pages/[filename].html`.

## 🔒 Security & SEO
- The admin generator uses `<meta name="robots" content="noindex, nofollow">` to stay hidden from Google/Bing.
- The obscure filename `gen-admin-kn0bu-2k26.html` acts as a simple password. **Do not link to this file publicly.**

## 🛠️ Features
- **AdBlock Detection**: Prevents users from bypassing monetization links.
- **Multi-Click Validation**: Steps 3 and 5 are programmed to require 2 separate clicks/visits to ensure high-quality traffic for sponsors.
- **Mobile Optimized**: Designed specifically for the music community who browse primarily on smartphones.
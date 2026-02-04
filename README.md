# 🎛️ Beat Distribution Project

A high-performance, mobile-first distribution system for "Free for Profit" beats, optimized for GitHub Pages with One-Click Deployment.

## 📁 Project Structure
- `/index.html` - The main public landing page.
- `/gen-admin-kn0bu-2k26.html` - **[SECRET]** The admin tool for one-click publishing.
- `/pages/` - Directory where all generated beat landing pages are stored.

## 🚀 One-Click Workflow
1. **Setup GitHub Credentials**:
   - Go to [GitHub Token Settings](https://github.com/settings/tokens).
   - Click "Generate new token (classic)".
   - Select the **"repo"** scope.
   - Copy the token and paste it into the **GitHub Config** panel in your secret generator.
2. **Create a Beat**: Enter the title and links in the generator.
3. **Deploy**: Click **"PUSH TO GITHUB"**.
4. **Distribute**: The page will be live at `https://[user].github.io/[repo]/pages/[slug].html` within 30-60 seconds.

## 🔒 Security Notes
- **Keep the Generator Secret**: Anyone with the generator URL can see your GitHub Username/Repo, though the Token is hidden.
- **LocalStorage**: Your GitHub Token is stored only in your local browser. If you clear your browser data or use a different computer, you will need to re-enter it.
- **GitHub Privacy**: If your repo is public, your `pages/` folder is visible. This is normal for GitHub Pages.

## 🛠️ Advanced Features
- **Auto-Update**: If you "Push" a beat with an existing slug, the tool will automatically update the existing file instead of creating a duplicate.
- **Base64 Safety**: Uses Unicode-safe encoding to ensure emojis and special characters in titles don't break the files.
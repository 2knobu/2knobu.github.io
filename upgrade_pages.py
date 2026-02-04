import os
import re

# This script will find all old HTML files in the directory and converting them 
# to the new "Shell" format that uses the external assets.

def upgrade_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check if it's already using the new system (contains beat-gate-app.js)
    if 'beat-gate-app.js' in content:
        print(f"Skipping {filepath} (already upgraded)")
        return

    # Extract Configuration Variables using Regex
    title_match = re.search(r'title:\s*"(.*?)",', content)
    subtitle_match = re.search(r'subtitle:\s*"(.*?)",', content)
    download_match = re.search(r'downloadLink:\s*"(.*?)",', content)
    
    # Extract links array
    links_match = re.search(r'stepLinks:\s*\[(.*?)\]', content, re.DOTALL)
    
    if not title_match or not links_match:
        print(f"Skipping {filepath} (could not find configuration data)")
        return

    title = title_match.group(1)
    subtitle = subtitle_match.group(1) if subtitle_match else "Follow these simple steps."
    download = download_match.group(1)
    links_raw = links_match.group(1)
    
    # Clean up links
    links = [l.strip().strip('"').strip("'") for l in links_raw.split(',') if l.strip()]
    links_formatted = ",\n                ".join([f'"{l}"' for l in links])

    # Determine relative path depth
    # If file is in root/slug/index.html -> depth 1 -> ../assets
    # If file is in root/pages/slug.html -> depth 1 -> ../assets
    # If file is in root/slug.html -> depth 0 -> assets (But likely this script is running in root)
    
    # Assuming standard structure from generator: root/slug/index.html
    assets_path = "../assets"
    
    # New Template
    new_html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title} - Download</title>
    
    <!-- External CSS -->
    <link rel="stylesheet" href="{assets_path}/css/style.css">

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- React & ReactDOM -->
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    
    <!-- Babel Standalone (for JSX) -->
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

    <!-- Theme Config -->
    <script src="{assets_path}/js/config-colors.js"></script>
    
    <!-- Page Specific Data -->
    <script>
        window.APP_CONFIG = {{
            stepLinks: [
                {links_formatted}
            ],
            downloadLink: "{download}",
            title: "{title}",
            subtitle: "{subtitle}",
        }};
    </script>
</head>
<body class="bg-black text-white min-h-screen overflow-x-hidden antialiased">
    <div id="root"></div>

    <!-- Load Main App Logic -->
    <script type="text/babel" src="{assets_path}/js/beat-gate-app.js"></script>
</body>
</html>"""

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_html)
    
    print(f"✅ Upgraded {filepath}")

# Walk through directories
for root, dirs, files in os.walk("."):
    for file in files:
        if file.endswith(".html") and "admin" not in file and "index" not in file and "generator" not in file:
             upgrade_file(os.path.join(root, file))

print("Upgrade complete.")

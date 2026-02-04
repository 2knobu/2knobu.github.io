// --- Global Color Configuration ---
// Update this file to change the theme across ALL pages.

const THEME = {
    primary: '#0C4497',           // Main Dark Blue
    primaryHover: '#1055bd',      // Lighter Blue for hovers
    primaryRgb: '12, 68, 151',    // RGB values for transparency effects
    bg: '#000000',
    text: '#ffffff'
};

// 1. Set CSS Variables for custom CSS (style.css)
const root = document.documentElement;
root.style.setProperty('--primary', THEME.primary);
root.style.setProperty('--primary-rgb', THEME.primaryRgb);
root.style.setProperty('--primary-hover', THEME.primaryHover);
root.style.setProperty('--bg-color', THEME.bg);
root.style.setProperty('--text-color', THEME.text);

// 2. Configure Tailwind CSS to use these variables
// This allows us to use class="bg-primary" or "text-primary"
window.tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                'primary-hover': 'var(--primary-hover)',
            }
        }
    }
};
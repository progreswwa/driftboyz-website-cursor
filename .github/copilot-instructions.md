# DriftBoyz Website - AI Coding Instructions

## Project Overview
This is a static website for a drift workshop ("DriftBoyz"), built with vanilla HTML, CSS, and JavaScript. It features a dark/light theme system, responsive design, and semantic HTML structure.

## Architecture & Structure
- **Root:** Contains all HTML pages (`index.html`, `cennik.html`, etc.).
- **`css/`:** Contains `style.css` which handles all styling, including the theme system.
- **`js/`:** Contains `main.js` which handles interactivity (theme toggle, mobile menu, form validation).
- **`images/`:** Stores static assets.

## Coding Standards

### HTML
- **Semantic Structure:** Use semantic tags (`<header>`, `<main>`, `<section>`, `<article>`, `<footer>`) for all content.
- **Accessibility:** Always include `alt` text for images, `aria-labels` for interactive elements (buttons, inputs), and proper heading hierarchy (`h1` -> `h2` -> `h3`).
- **SEO:** Maintain meta tags (description, keywords, OG tags) in the `<head>`.
- **Links:** Use relative paths for internal links (e.g., `cennik.html`) and absolute paths for external resources.

### CSS
- **Variables:** Use CSS variables defined in `:root` for colors, spacing, and fonts.
  - Example: `var(--gold-primary)`, `var(--bg-primary)`, `var(--spacing-md)`.
- **Theming:** Support both Dark (default) and Light themes using the `[data-theme="..."]` attribute on `<html>`.
  - Define theme-specific variables under `[data-theme="light"]`.
- **Layout:** Use Flexbox and Grid for layouts. Avoid floats.
- **Responsiveness:** Use media queries (primarily `@media (max-width: 768px)`) to adapt layouts for mobile devices.
- **Effects:** Utilize the defined glassmorphism variables (`--glass-bg`, `--glass-border`) for overlays and cards.

### JavaScript
- **Vanilla JS:** Do not introduce frameworks (React, Vue, jQuery) unless explicitly requested.
- **Modularity:** Organize code into distinct initialization functions (e.g., `initTheme()`, `initMobileMenu()`).
- **DOM Manipulation:** Use `document.querySelector` / `querySelectorAll`.
- **Event Handling:** Attach event listeners within initialization functions.
- **Storage:** Use `localStorage` to persist user preferences (like the active theme).

## Key Workflows
- **Theme Toggling:** The theme is toggled by modifying the `data-theme` attribute on the `<html>` element and saving the preference to `localStorage`.
- **Mobile Menu:** Controlled by toggling an `.active` class on the `nav ul` element.
- **Lazy Loading:** Images use `loading="lazy"` and a JS fallback/observer in `initImageLoading`.

## Common Patterns
- **Buttons:** Use `.btn` class with modifiers like `.btn-primary` or `.btn-outline`.
- **Sections:** Wrap major content blocks in `<section>` tags with descriptive classes.
- **Cards:** Use `.card` class for container elements, often combined with glassmorphism effects.

# Cognifyz Technologies - Web Development Internship (Level 3 Showcase)

Welcome to the official repository and project implementation for the **Cognifyz Technologies Web Development Internship &ndash; Level 3 Tasks**.

This project is built strictly following the guidelines using **pure HTML5, CSS3, and Vanilla JavaScript** without any external frameworks (no React, Angular, Vue, Bootstrap, or Tailwind CSS).

---

## 📌 Project Overview & Objectives

This project integrates two core tasks into a cohesive, production-grade web experience:

### 🌟 Task 1: Image Manipulation
1. **Interactive Image Gallery:**
   - Responsive grid displaying multiple project thumbnails.
   - Smooth hover effects with card lift, image zoom (`scale(1.08)`), and gradient overlay.
   - Interactive category filter tabs (*All Projects*, *Web Design*, *Development*, *Mobile & UI/UX*).
   - **Click to Enlarge (Lightbox Viewer):** Clicking any thumbnail opens an enlarged, clear view in an interactive lightbox modal.
   - Includes full caption, category badge, and active counter (e.g. `Image 2 of 6`).
   - Integrated keyboard navigation (`Escape` to close, `ArrowLeft` / `ArrowRight` to cycle).
2. **Automatic Image Slideshow:**
   - Seamless automatic transitions every 4.5 seconds without requiring user interaction.
   - Smooth CSS transitions (`opacity` and `transform: scale(1)`).
   - Real-time animated progress bar indicating duration until the next transition.
   - User-friendly controls: Next/Previous navigation buttons, direct dot indicator selectors, and a Play/Pause auto-advance toggle.
   - **Pause on hover:** The slideshow pauses when the user hovers over the presentation area and resumes smoothly on mouse leave.

### 🚀 Task 2: Landing Page
A modern landing page designed for the Web Developer Internship at **Cognifyz Technologies**:
1. **Headline:** `"Web Developer Internship Opportunities at Cognifyz Technologies"`
2. **Introduction:** Clear overview of the 4-week structured remote program, its mission to bridge academia and industry, and its hands-on approach.
3. **Highlights:** Six core benefits including real-world project experience, 1-on-1 mentorship, practical learning, core skill development, portfolio enhancement, and verified certification.
4. **Qualifications:** Essential technical competencies (HTML5, CSS3, Vanilla JavaScript, Developer Tools) and professional mindset attributes (problem-solving, willingness to learn, attention to detail, time management) + an interactive readiness calculator.
5. **Call-to-Action (CTA):** Prominent "Apply Now" buttons with a fully interactive application form featuring real-time client-side validation and confirmation feedback.
6. **Contact Information:** Comprehensive footer containing official Cognifyz Technologies email (`contact@cognifyz.com`), website (`https://cognifyz.com`), headquarters (`Nagpur, Maharashtra, India`), and active social links.

---

## 📁 Project Folder Structure

```text
Level 3 - Cognifyz Internship Showcase/
│
├── index.html                  # Semantic HTML5 markup, document structure & meta tags
├── style.css                   # Custom modern CSS3 styles, variables, grid & responsive design
├── script.js                   # Pure Vanilla JavaScript for slideshow, gallery & form interactivity
├── README.md                   # Project documentation, setup guide & feature overview
│
└── assets/
    └── images/
        ├── cognifyz-logo.png             # Official Cognifyz Technologies logo
        ├── cognifyz-logo-transparent.png # Header logo with transparent background
        ├── cognifyz-logo-dark.png        # Footer logo optimized for dark surface
        │
        ├── gallery/            # Gallery thumbnail & enlargement image assets
        │   ├── web-design.jpg
        │   ├── frontend-code.jpg
        │   ├── ui-ux-design.jpg
        │   ├── team-collaboration.jpg
        │   ├── mobile-dev.jpg
        │   └── cloud-tech.jpg
        │
        └── slideshow/          # Automatic slideshow full-width high-definition slide assets
            ├── slide-1-workspace.jpg
            ├── slide-2-mentorship.jpg
            ├── slide-3-creative-ui.jpg
            └── slide-4-achievement.jpg
```

---

## 🛠️ Purpose of Each File

1. **`index.html`**:
   - Contains semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
   - Hosts the complete page layout: navigation bar, hero banner, program overview, highlights, qualifications, slideshow carousel, interactive gallery with lightbox modal, application form, and footer.
   - Accessible ARIA labels and roles for screen-reader support.

2. **`style.css`**:
   - Built with modern CSS custom properties (`:root` variables) for consistent design tokens (colors, typography, spacing, shadows, transitions).
   - Utilizes CSS Grid and Flexbox for responsive multi-column layouts across desktop, tablet, and mobile.
   - Implements smooth transitions for gallery hover effects, lightbox modal scale-ins, and slideshow fade animations.

3. **`script.js`**:
   - Clean, modular, beginner-friendly vanilla JavaScript.
   - Manages slideshow timing, auto-play interval, pause-on-hover, and manual slide changes.
   - Handles gallery category filtering, lightbox modal opening/closing, and cycling through enlarged images.
   - Handles interactive readiness score calculation and application form validation.

4. **`assets/images/`**:
   - Organized local storage of all high-resolution images used across the website, eliminating external image breakage risks.

---

## 💻 How to Run Using VS Code Live Server

Follow these simple steps to run and view the website locally:

### Prerequisites:
- Visual Studio Code installed on your computer.
- **Live Server** extension by *Ritwick Dey* installed in VS Code.

### Step-by-Step Instructions:
1. **Open VS Code**.
2. Click on **File** &rarr; **Open Folder...** (or press `Ctrl + K, Ctrl + O` on Windows).
3. Select the folder:
   ```text
   Level 3 - Cognifyz Internship Showcase
   ```
4. In the VS Code File Explorer on the left, locate `index.html`.
5. **Launch Live Server** using either of these two methods:
   - **Method A:** Right-click on `index.html` in the file explorer and select **"Open with Live Server"**.
   - **Method B:** Click the **"Go Live"** button located at the bottom-right status bar of VS Code.
6. Your default web browser will automatically open:
   ```text
   http://127.0.0.1:5500/index.html
   ```
7. Any edits you make to `index.html`, `style.css`, or `script.js` will automatically reload the page in real time!

---

## 📱 Responsiveness & Browser Compatibility

The website has been tested and verified across standard breakpoints:
- **Desktop Computers (1200px and above):** Full multi-column grid layouts and expanded navigation.
- **Laptops & Tablets (768px &ndash; 1024px):** Adaptive 2-column grids and touch-friendly targets.
- **Mobile Devices (320px &ndash; 767px):** Single-column stacked layouts, mobile hamburger navigation drawer, and fluid image sizing.

---

## 🏆 Cognifyz Technologies Verification Checklist

- [x] HTML5, CSS3, and Vanilla JavaScript only (Zero external CSS/JS frameworks).
- [x] Separate files: `index.html`, `style.css`, and `script.js`.
- [x] Organized local `assets/images/` directory.
- [x] Task 1: Visually attractive image gallery with hover zoom & overlays.
- [x] Task 1: Click thumbnail to enlarge in interactive lightbox modal.
- [x] Task 1: Automatic slideshow with seamless transitions, pause-on-hover, and manual controls.
- [x] Task 2: Required headline *"Web Developer Internship Opportunities at Cognifyz Technologies"*.
- [x] Task 2: Introduction to program purpose and 4-week duration.
- [x] Task 2: Highlights of project experience, mentorship, practical learning, and certification.
- [x] Task 2: Qualifications detailing HTML, CSS, JavaScript, problem-solving, and willingness to learn.
- [x] Task 2: Interactive "Apply Now" Call-to-Action with validated form.
- [x] Task 2: Professional footer with Cognifyz Technologies contact details.
- [x] Fully responsive across desktop, tablet, and mobile devices.

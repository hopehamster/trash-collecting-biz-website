# WE DO IT ALL - Junk-Clean Ups & More

A professional website for **WE DO IT ALL**, a junk removal and clean-up service company based in Las Vegas, NV.

![Website Preview](https://via.placeholder.com/800x400/1a3a2f/ffffff?text=WE+DO+IT+ALL)

## 🚀 Quick Start

This is a static website ready for **GitHub Pages** deployment. No build step required!

### Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings** → **Pages**
3. Under "Source", select **main** branch and **/ (root)** folder
4. Click **Save**
5. Your site will be live at `https://yourusername.github.io/repository-name`

### Local Development

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (npx)
npx serve

# Using VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

## 📁 Project Structure

```
/
├── index.html          # Main HTML file (single-page site)
├── css/
│   └── styles.css      # All styling with CSS variables
├── js/
│   └── main.js         # Navigation, animations, form handling
├── images/             # Images folder (add your photos here)
├── Documents/          # Original flyers and reference materials
└── README.md           # This file
```

## ✨ Features

- **Responsive Design** - Looks great on mobile, tablet, and desktop
- **Smooth Animations** - Professional scroll animations and hover effects
- **Mobile Menu** - Hamburger menu for mobile navigation
- **Contact Form** - Ready for Formspree integration
- **Scheduling Widget** - Placeholder for Calendly booking
- **SEO Optimized** - Meta tags and semantic HTML
- **Fast Loading** - No frameworks, pure HTML/CSS/JS

## 🎨 Customization

### Colors

Edit the CSS variables in `css/styles.css`:

```css
:root {
    --color-primary-darkest: #0f261d;
    --color-primary-dark: #1a3a2f;
    --color-primary: #1a5a3a;
    --color-primary-light: #2d8a5e;
    --color-accent-orange: #ff6b35;
    --color-accent-lime: #9acd32;
}
```

### Adding Real Photos

1. Add your images to the `images/` folder
2. Replace the placeholder elements in `index.html`:
   - Gallery section placeholders
   - About section image
   - Add before/after photos

### Enable Online Scheduling (Calendly)

1. Create a free account at [calendly.com](https://calendly.com)
2. Set up your availability and booking page
3. In `index.html`, find the `#calendly-widget` section and replace the placeholder:

```html
<!-- Replace this placeholder -->
<div class="calendly-placeholder">...</div>

<!-- With this Calendly embed -->
<div class="calendly-inline-widget" 
     data-url="https://calendly.com/YOUR-USERNAME" 
     style="min-width:320px;height:630px;">
</div>
<script src="https://assets.calendly.com/assets/external/widget.js" async></script>
```

### Enable Contact Form (Formspree)

1. Create a free account at [formspree.io](https://formspree.io)
2. Create a new form and get your form ID
3. Update the form action in `index.html`:

```html
<form id="contact-form" action="https://formspree.io/f/YOUR-FORM-ID" method="POST">
```

4. Uncomment the fetch code in `js/main.js` for AJAX submission

## 📱 Contact Information

- **Phone:** 562-538-7451
- **Location:** Las Vegas, NV
- **Instagram:** [@WE.CLEAN.JUNK](https://instagram.com/we.clean.junk)

## 🛠️ Services Offered

- Junk Removal
- House Clean Outs
- Garage Clean Outs
- Tree Trimming
- Landscaping
- Demolition
- Gravel & Debris Pickup
- Furniture Pickup
- Moving Help
- Back Yard Clean Up

## 📄 License

This website was created for WE DO IT ALL. All rights reserved.

---

**Need help?** Contact the developer or refer to the customization guide above.


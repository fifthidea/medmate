
# MedMate - Clinical Drug Calculations Web App

## Overview
MedMate is a specialized web application for medical drug calculations and clinical computations, designed to reduce medication errors and simplify complex clinical calculations.

## Key Features
- Precise dosage calculations based on patient weight
- Specialized tools for ICU settings
- Drug unit conversions and infusion rate calculations
- Simple, intuitive interface for busy clinical environments
- Real-time calculations without page refresh

## Access
Available at:  
🌐 [https://fifthidea.github.io/medmate](https://fifthidea.github.io/medmate)

## Technologies
- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Fully responsive design
- No installation or plugins required

## Development Team

### Scientific Supervisor:

**Dr. Amir Salari**  

Emergency & Critical Care Instructor, Tehran University of Medical SciencesTehran University of Medical Sciences  

📞 +98 912 406 5510

### Developer & Designer:

**Tavakol Piri**  

Medical Ward Nurse  Imam Khomeini Hospital Complex  

📞 +98 990 541 5680

## How to Use
1. Visit [fifthidea.github.io/medmate](https://fifthidea.github.io/medmate)
2. Select your desired calculation tool
3. Enter patient parameters
4. Results will display automatically

## Support & Contact

For technical issues or suggestions:

  **Dr. Amir Salari**
  
- Email: Salaramir@gmail.com
- 
  **Tavakol Piri**
  
- Email: tavakol.p97@gmail.com

## Development & Testing

### Calculation core
Core calculation logic is isolated in `js/calc-core.js` (pure, DOM-free) so it can be unit-tested and reused. The DOM modules (`drug-main.js`, `fluid-drip.js`, `microset-drip.js`, `percentage-calc.js`, `concentration-replace.js`) delegate their math to it, and `formatNumber` is provided globally from a single place (no more duplicated copies).

Tests use the built-in Node test runner (no external dependencies):

```bash
npm test        # runs: node --test
```

### HTML partials & build
Because this is a static app with no bundler, large repeated markup is kept in `partials/` and injected into `index.html` at build markers of the form:

```html
<!-- INCLUDE: partials/pediatric-box.html -->
...injected content...
<!-- END INCLUDE: partials/pediatric-box.html -->
```

To edit the large pediatric calculator, change `partials/pediatric-box.html`, then regenerate `index.html`:

```bash
npm run build   # runs: node build.js  (builds both CSS and HTML)
```

`index.html` is committed in its fully-built form so it can be served directly with no build step in production.

### CSS structure
For maintainability the stylesheet is split into logical parts under `css/parts/`, concatenated (in the order listed in `css/parts/order.json`) into a single `css/styles.css` by the build script:

```
css/parts/
├── 00-base-native.css   # :root variables + native/touch/motion optimizations
├── 01-fonts.css
├── 02-navbar.css
├── 03-menu.css
├── 04-layout-boxes.css  # container, boxes grid, box icons
├── 05-forms.css         # inputs, selects, error box
├── 06-modals.css        # video / install-guide modals
├── 07-theme-dark.css    # dark mode overrides
├── 08-pediatric.css     # pediatric calculator tabs & cards
└── 09-tarkib.css        # mix & fix drugs styles
```

Edit files in `css/parts/` and run `npm run build` to regenerate `css/styles.css` (which is what the browser loads). The concatenation preserves the exact original cascade order.

## Disclaimer
This application is not a substitute for professional medical judgment. All results should be verified by qualified medical personnel.

© All rights reserved for MedMate - 2025

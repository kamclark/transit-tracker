# Transit App

This app uses geolocation to get train arrivals at nearby stations in the PA area.

---

## Technologies Used

- **Frontend:** Vue 3 (Composition API, `<script setup>`)
- **Framework:** Nuxt 3
- **Build Tool:** Vite
- **Deployment:** GitHub Actions → GitHub Pages

---

## Getting Started

### Prerequisites

- Node.js v18+ (recommended)

### Setup

1. **Clone the repository:**

    ```bash
    git clone https://github.com/kamclark/transit-tracker.git
    cd transit-tracker
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000/](http://localhost:3000/) in your browser.

4. **Build for production:**

    ```bash
    npm run build
    ```

---

## Development & Debugging

- Toggle the debug panel to simulate locations or force errors.
- All API fetches use cache-busting and error handling for reliability.
- Modular composables make it easy to swap between real and mock data.

---

## Changelog

### [2025-06-03]
- Flattened project structure for CI/CD compatibility.
- Modularized all UI into components.
- Added composables for nearest station and arrivals logic.
- Implemented dynamic time window filtering.
- Added debug/dev toolbar and location simulation.
- Improved error and loading state handling.
- Enhanced UI/UX for mobile and desktop.

---

## License

This project is open source and available under the MIT License.

---

## 🌐 Links

- [GitHub Repository](https://github.com/kamclark/transit-tracker)
- [Live Demo (GitHub Pages)](https://kamclark.github.io/transit-tracker/)

---

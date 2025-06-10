# Transit Tracker

A modular Vue+Nuxt application for tracking real-time public transit arrivals and finding the nearest SEPTA station based on your location. Built with a composable architecture, TypeScript typing, and a service layer for API interaction.

---

## Features

- **Find Nearest Station:** Uses browser geolocation to find the closest SEPTA station within a configurable radius.
- **Live Arrivals:** Fetches and displays real-time arrival data for selected stations.
- **Composable Architecture:** Core logic is modularized into composables and services for maintainability and testability.
- **Nuxt-Powered:** Server routes for API proxying (avoiding CORS issues in production).

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/)

### Setup

1. **Install dependencies:**

    ```bash
    npm install
    ```

2. **Run the development server:**

    ```bash
    npm run dev
    ```

    Visit [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production:**

    ```bash
    npm run build
    ```

4. **Generate static site (for GitHub Pages):**

    ```bash
    npm run generate
    ```

---

## Deployment

This project is set up for automated deployment to GitHub Pages using the [`gh-pages`](https://www.npmjs.com/package/gh-pages) package and Nuxt's GitHub Pages preset.

- **Deploy manually:**

    ```bash
    npm run deploy
    ```

- **Automated deploy:**  
  Pushes to `main` can be configured to trigger deployment via GitHub Actions (see `.github/workflows/` if present).

---

## Dependencies

- [Nuxt 3](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [vue-router](https://router.vuejs.org/)
- [gh-pages](https://www.npmjs.com/package/gh-pages) (for deployment)
- [TypeScript](https://www.typescriptlang.org/)

---

## License

This project is open source and available under the MIT License.

---

## Acknowledgements

- [SEPTA API](https://www3.septa.org/hackathon/) for transit data.
- [Nuxt Docs](https://nuxt.com/docs) and [Vue Docs](https://vuejs.org/guide/introduction.html)

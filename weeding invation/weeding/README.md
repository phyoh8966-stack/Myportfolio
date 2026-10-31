# Thiri & Aung Min — Wedding Invitation

A responsive React and Vite wedding invitation with a welcome cover, live countdown, love story, photo lightbox, day-of schedule, map, RSVP form, music controls, and QR/link sharing.

## Run in VS Code

1. Open the `weeding invation/weeding` folder in VS Code.
2. Install [Node.js](https://nodejs.org/) if it is not already installed.
3. Open **Terminal → New Terminal** and run:

   ```sh
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

Run `npm run build` to create the production files in `dist/`.

## Customize the invitation

Edit `src/data/weddingData.js` to update names, family details, date, venue, invitation text, images, story, schedule, RSVP deadline, music, and map link. Replace the sample image URLs with your own images when ready. The RSVP form currently validates and confirms submissions in the browser; connect a form service or backend to receive guest responses.

## Deploy

Import the repository into Vercel and set the project root to `weeding invation/weeding`. Vercel detects Vite automatically; the included `vercel.json` supports client-side routes.

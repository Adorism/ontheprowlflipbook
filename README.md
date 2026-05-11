# Flipbook Viewer — Setup Guide

A reusable, WCAG 2–compliant image carousel you can embed in Google Sites.
Update slides anytime by adding/removing files from a Google Drive folder — no code changes needed.

---

## What you get

| File | Purpose |
|------|---------|
| `flipbook.html` | The viewer — host this on GitHub Pages |
| `flipbook-apps-script.js` | Paste into Google Apps Script — serves your Drive images |

---

## Step 1 — Create your Google Drive folder

1. In Google Drive, create a new folder (e.g. "Flipbook Slides")
2. Upload your images (JPG, PNG, WebP, GIF)
   - **Name files with numbers to control order:** `01_intro.jpg`, `02_overview.png`, etc.
3. Copy the folder ID from the URL:
   `https://drive.google.com/drive/folders/`**`THIS_PART_IS_THE_ID`**

---

## Step 2 — Set up the Apps Script (one-time, ~5 min)

1. Go to [script.google.com](https://script.google.com) → **New project**
2. Delete the starter code and paste everything from `flipbook-apps-script.js`
3. Replace `"YOUR_FOLDER_ID_HERE"` with your actual folder ID from Step 1
4. Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Authorise** and follow the prompts
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/ABC.../exec`)

---

## Step 3 — Configure flipbook.html

Open `flipbook.html` in a text editor. Near the top, find the USER CONFIG section:

```js
const APPS_SCRIPT_URL = "";        // ← paste your Web App URL here
const FLIPBOOK_TITLE  = "My Flipbook";  // ← change the title
```

Save the file.

---

## Step 4 — Host on GitHub Pages (free)

1. Create a free account at [github.com](https://github.com), if you don't have one already
2. Click **New repository** → name it anything (e.g. `flipbook`)
3. Upload `flipbook.html` to the repo
4. Go to **Settings → Pages → Source → main branch → Save**
5. Your URL will be: `https://YOUR-USERNAME.github.io/flipbook/flipbook.html`

> **Alternative:** Drag `flipbook.html` onto [app.netlify.com/drop](https://app.netlify.com/drop) for an instant URL.

---

## Step 5 — Embed in Google Sites

1. Open your Google Site in edit mode
2. Click **Insert → Embed → By URL**
3. Paste your GitHub Pages or Netlify URL
4. Resize the embed box to taste → **Publish**

---

## Updating slides later

Just add, remove, or rename images in your Drive folder.
The flipbook reloads from Drive every time someone opens the page — no redeployment needed.

---

## Reusing for multiple flipbooks

Want a second flipbook with different slides?

1. Create a new Drive folder with different images
2. Create a new Apps Script project pointing to that folder (Step 2 again)
3. Make a copy of `flipbook.html`, change `APPS_SCRIPT_URL` and `FLIPBOOK_TITLE`
4. Upload the new copy to GitHub (different filename, e.g. `flipbook2.html`)
5. Embed the new URL in a different Google Site page

Each flipbook is completely independent.

---

## Accessibility features

- ← → arrow keys and Home/End for keyboard navigation
- `aria-live` region announces current slide to screen readers
- All controls have descriptive `aria-label` attributes
- Progress bar is a proper ARIA progressbar
- Focus-visible rings on all interactive elements
- Thumbnails and dots include `role="tab"` / `role="listitem"` semantics

---

## Customising the look

Open `flipbook.html` and edit the CSS variables at the top of the `<style>` block:

```css
:root {
  --accent: #1a56db;       /* button/highlight colour */
  --accent-light: #e8f0fe; /* hover background */
  --bg: #f8f9fb;           /* page background */
  --surface: #ffffff;      /* card/slide background */
  --border: #e2e5ea;       /* border colour */
  --text: #1c1e21;         /* primary text */
  --muted: #6b7280;        /* secondary text */
}
```

Change `--accent` to your school or org colour and you're done.

/**
 * ════════════════════════════════════════════════════════
 *  FLIPBOOK — Google Apps Script (Web App)
 *  Serves images from a public Google Drive folder as JSON
 *  so the flipbook.html can load them dynamically.
 * ════════════════════════════════════════════════════════
 *
 *  SETUP (one-time, ~5 minutes):
 *  ─────────────────────────────
 *  1. Go to https://script.google.com → New project
 *  2. Paste this entire file, replacing the starter code
 *  3. Change FOLDER_ID below to your Drive folder's ID
 *     (the long string in its URL after /folders/)
 *  4. Click Deploy → New deployment
 *       Type: Web app
 *       Execute as: Me
 *       Who has access: Anyone
 *  5. Authorise when prompted, then copy the Web App URL
 *  6. Paste that URL into flipbook.html as APPS_SCRIPT_URL
 *
 *  UPDATING SLIDES:
 *  ────────────────
 *  Just add, remove, or rename image files in the Drive
 *  folder. Slides are sorted by filename automatically.
 *  No code changes needed.
 *
 *  SUPPORTED FILE TYPES:
 *  ────────────────────
 *  JPEG, PNG, GIF, WebP, BMP, SVG
 *  (For PDFs: export each page as a PNG first, then upload)
 */

// ── CHANGE THIS to your Google Drive folder ID ──────────
const FOLDER_ID = "YOUR_FOLDER_ID_HERE";
// ────────────────────────────────────────────────────────

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
  "image/svg+xml",
]);

function doGet(e) {
  try {
    const folder = DriveApp.getFolderById(FOLDER_ID);
    const files  = folder.getFiles();
    const slides = [];

    while (files.hasNext()) {
      const file = files.next();
      if (!ALLOWED_MIME.has(file.getMimeType())) continue;

      // Make sure the file is shared (at least "Anyone with the link")
      // This does NOT make it fully public — it just allows the viewer to load it.
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      slides.push({
        url:   "https://drive.google.com/uc?export=view&id=" + file.getId(),
        label: file.getName().replace(/\.[^/.]+$/, ""), // strip extension
        id:    file.getId(),
      });
    }

    // Sort alphabetically by filename so ordering is predictable.
    // Tip: prefix filenames with 01_, 02_, 03_ etc. to control order.
    slides.sort((a, b) => a.label.localeCompare(b.label, undefined, { numeric: true }));

    const output = ContentService
      .createTextOutput(JSON.stringify(slides))
      .setMimeType(ContentService.MimeType.JSON);

    // Allow the HTML page (on any domain) to fetch this
    return output;

  } catch (err) {
    const error = ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
    return error;
  }
}

/**
 * Free-scan steps (browser interface). Rendered on /free-scan and used for its
 * HowTo JSON-LD, so the markup always matches what is on the page.
 * Source: VFPScanner v0.2 README "Browser UI".
 */
export const scanSteps = [
  { name: "Start the scanner", text: "Start vfpscan.exe. Double-clicking works." },
  {
    name: "Open the local page",
    text: "Your browser opens at http://127.0.0.1:5077. This page runs on your own PC only; other machines cannot reach it.",
  },
  { name: "Choose the application", text: "Enter the path of your application folder, or upload a .zip of it." },
  {
    name: "Open the report",
    text: "When the scan finishes, open the one-page report or download the JSON file. Scans are saved on your PC and listed under Recent scans.",
  },
];

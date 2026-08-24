# Print & Export flow: top-center mini chooser

## Goal
Change the **Print & Export** entry flow so that clicking the menu item first opens a compact, top-center popup where the user picks **Print** or **Export to PDF**. After the choice, the existing full-screen left-side panel opens directly into the chosen mode.

## Current state
- `src/components/crm/actions-menu.tsx` opens `src/components/crm/print-export-panel.tsx` immediately.
- `print-export-panel.tsx` is a full-width `Sheet` that slides from the left. Its first state is a full-screen mode chooser (`"choose"`) with two large cards.

## Proposed changes

### 1. New component: `src/components/crm/print-export-chooser.tsx`
Create a compact top-center chooser component.

- Position: centered horizontally near the top of the viewport (e.g., `top-20` / `mt-20`) using a `Dialog` or `Popover` component, or a small absolute-positioned card if neither fits better.
- Size: small, around `max-w-md` / `w-96`.
- Content: two selectable rows with icons + short descriptions:
  - **Printer** icon + **Print** — "Preview the quote and send it to your printer."
  - **FileDown** icon + **Export to PDF** — "Download the quote as a PDF file."
- Each row is clickable and triggers `onSelect("print")` or `onSelect("export")`.
- Header: title "Print & Export" + a close button.
- Keyboard / overlay: close on Esc or backdrop click.

### 2. Refactor `src/components/crm/print-export-panel.tsx`
- Remove the `"choose"` mode and the large card chooser UI.
- `mode` becomes required: `"print"` or `"export"`.
- When opened, it immediately renders the correct mode sidebar and preview.
- Keep the rest of the existing logic (template categories, conditional Canvas paper formats, margin slider, Print Record, Export file name, etc.) unchanged.

### 3. Update `src/components/crm/actions-menu.tsx`
- Replace the single `panelOpen` state with two states:
  - `chooserOpen` — controls the mini chooser popup.
  - `panelOpen` and `panelMode` — controls the full left panel.
- When **Print & Export** is selected, open the chooser popup instead of the full panel.
- When the user picks an option in the chooser, close the chooser, set the mode, and open the full left panel.
- Close the chooser without opening the panel if the user dismisses it.

### 4. Visual tokens
Use existing CRM tokens (`bg-crm-surface`, `border-crm-line`, `text-crm-accent`, `text-crm-label`) for the mini chooser so it matches the current design system.

## Verification
After the change, the flow should be:
1. Click **More actions → Print & Export** → a small top-center popup appears.
2. Click **Print** → the full left panel opens in **Print Preview** mode.
3. Click **Export to PDF** → the full left panel opens in **Export to PDF** mode.
4. Cancel / Esc on the chooser closes it without opening the panel.

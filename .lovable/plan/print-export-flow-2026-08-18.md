# Print & Export flow

Clicking **Print & Export** in the "..." menu opens a full-screen panel that slides in from the left, asking the user to choose Print or Export, then shows the matching options.

## Step 1 — Choose mode

Panel header: title + Cancel. Body centered with two large selectable cards:
- **Print** — preview and print the quote
- **Export to PDF** — download the quote as a PDF file

## Step 2a — Print (screenshot 2 + 3)

Header reads "Print Preview" with Cancel and Print buttons. Left area is the preview canvas showing "Choose the template to Export" until a template is picked. Right sidebar:
- Choose a Template Category (select: Inventory Templates, Quote Templates)
- Choose an Inventory Template (select: Quote Template, Quote Template 1)
- View as: HTML / PDF radios
- PDF Options (only when PDF): Layout Portrait/Landscape, Paper Size A4/US Letter
- Info box: "If you notice any misalignment, switch to the Alternate PDF generator." with a Primary/Alternate PDF Generator select
- Print / Cancel buttons

## Step 2b — Export to PDF (screenshot 4)

Header reads "Export to PDF" with Cancel and Download buttons. Left area shows a rendered quote document preview (logo block, From / Ship To / Bill To, line-items table, Sub Total / Tax / Total). Right sidebar:
- Template Category, Inventory Templates selects
- File Name input with "Type '#' to insert merge field" hint
- Layout radios, Paper Size radios
- Password Protection toggle
- "Set as default file format for the org" checkbox

## Behaviour

- Back arrow in step 2 header returns to the mode chooser.
- Cancel / Esc closes the panel; Print and Download show a toast (static UI, no real printing).
- Selecting a template swaps the print canvas from the empty message to the document preview.

## Technical

- New `src/components/crm/print-export-panel.tsx` using shadcn `Sheet` with `side="left"` and full-width content, driven by local state (`mode`, `template`, `viewAs`, `layout`, `paperSize`, …).
- Shared document preview extracted to `src/components/crm/quote-document.tsx` and reused by both modes.
- Wire open state in `actions-menu.tsx`: the "Print & Export" item sets it; other items keep toasting.
- Use existing CRM tokens in `src/styles.css`; add a token only if a new surface color is needed. No hardcoded colors.

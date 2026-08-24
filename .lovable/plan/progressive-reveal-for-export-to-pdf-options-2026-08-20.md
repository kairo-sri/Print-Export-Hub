# Progressive reveal for Export to PDF options

## Goal
Make Export to PDF options appear one-by-one in **both** export flows. The list-view export keeps its existing dropdown options (no category dropdown added there) — only the step-by-step reveal behavior is applied.

## What will change

### 1. Regular quote export: category first
In `src/components/crm/print-export-panel.tsx`, the export sidebar starts with a single **Template Category** dropdown, empty by default.

- Categories: `Inventory Template`, `Mail Merge Template`, `Canvas Template`.

No template dropdown or other options are shown until a category is selected.

### 2. Regular quote export: template after category
Once a category is chosen, the matching template dropdown appears:

- `Inventory Template` → inventory templates
- `Mail Merge Template` → mail-merge templates
- `Canvas Template` → canvas print-view templates

### 3. List-view export: same reveal, existing options
Option set stays exactly as it is today (**Choose Format**, then **Choose Print view Templates** — no category dropdown). The reveal becomes progressive:

- **Choose Format** is shown first, empty by default.
- **Choose Print view Templates** appears only after a format is selected.
- Remaining options appear only after a template is selected.

### 4. Reveal all remaining options after a template is selected
In both flows, only after a template is chosen do the rest of the export options appear together:

- File Name input
- Layout (Portrait / Landscape)
- Paper Size (regular export only; list view keeps using Choose Format)
- Password Protection toggle
- Set as default file format checkbox

### 5. Reset on upstream change
Changing the category (or the format in list view) clears the selected template and re-hides the later options.

## Technical details

- File to edit: `src/components/crm/print-export-panel.tsx`
- Add an `exportCategory` state plus a helper mapping category → template list for the regular flow.
- Make `format` and `printViewTemplate` start empty in list-view export mode so the reveal gating works, and gate the template block on `format` and the options block on `printViewTemplate`.
- Gate the regular-export blocks on `exportCategory` and the selected template.
- Keep existing state hooks (`fileName`, `layout`, `paperSize`, `passwordProtection`, `setDefault`) and all other modes (print, mailing, listprint) unchanged.
- No changes to `leadzz-view.tsx`, `actions-menu.tsx`, or the server.
- Verify both `listViewExport={true}` and `listViewExport={false}` in the preview and run a build.

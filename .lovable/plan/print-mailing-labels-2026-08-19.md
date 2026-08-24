# Print Mailing Labels

Selecting **Print Mailing Labels** from the Leadzz bulk-actions menu opens the same full-screen panel used for Export to PDF, but showing address labels instead of a document.

## What the user sees

- Header: title "Address Label Printer", with "Adjust Label Height" link, a "Close" button and a blue "Print" button on the right.
- Left/main area: a white sheet with labels laid out in a 2-column grid, each label in a dashed-border box. Each label shows a bold name followed by lines (company, emails, phone, source, owner, country, state, city) — sample data derived from the selected leads.
- Right sidebar: label settings — label height slider (adjusts box height live), columns per page (2 / 3), paper size (A4 / Letter), orientation (Portrait / Landscape), margin slider, and a "Show field labels" style toggle.
- Panel closes via Close/X; Print shows a toast (static prototype, same as existing flows).

## Technical notes

- New component `src/components/crm/mailing-labels-document.tsx`: hardcoded label records matching the reference (karthi, Damon ME, Neeli Chandra, John Tennyson, Leo bn&co, Leo Das&co, Sridhar R, Stepen Mikalson, Leo Das, Leo &co), rendered in a dashed-bordered grid; accepts `labelHeight` and `columns` props.
- `src/components/crm/print-export-panel.tsx`: extend `Mode` with `"mailing"`. In that mode render the custom header (Adjust Label Height / Close / Print), the labels document as preview content, and a dedicated sidebar with the label settings; all existing print/export branches stay unchanged.
- `src/components/crm/leadzz-view.tsx`: wire the "Print Mailing Labels" bulk action to open the panel with `mode="mailing"` and the selected record count, instead of the current toast.

No backend or data-model changes; presentation only.

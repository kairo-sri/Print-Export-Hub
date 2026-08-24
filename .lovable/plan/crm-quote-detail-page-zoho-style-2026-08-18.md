# CRM Quote Detail Page (Zoho-style)

Recreate the uploaded screen as a static, pixel-faithful UI at `/` (the app's home route), with the record actions menu open-able from the "..." button. In that menu, "Print Preview" and "Export to PDF" are merged into a single item: **Print & Export**.

## Layout

```text
+----------------+-----------------------------------------------+
| Top bar: app switcher, search, icons                            |
+----------------+-----------------------------------------------+
| Left nav       | Header: back, "Quote 1", Add Tags,            |
| Home/Reports/  |   Convert | Edit | Send with Zoho Sign | ...    |
| Analytics...   +-----------------+-----------------------------+
| Teamspace      | Related List    | Overview / Timeline tabs    |
| Leadzz...      | Notes, Sales    | Summary card (Quote Number,  |
| Quotes (active)| Orders, Emails, | Stage, Owner, Valid Until)   |
| Invoices...    | Links, Add Link | Contacts card                |
|                |                 | Quote Information section    |
+----------------+-----------------+-----------------------------+
| Bottom bar: Smart Chat input + utility icons                    |
+-----------------------------------------------------------------+
```

## Actions menu (the "..." dropdown)

Clone, Share, Delete — divider — **Print & Export**, Send Email, Mail Merge — divider — Customize Business Card, Organize Quote Details, Add Related List, Review History, Enroll to Cadence, Add Kiosk, Create Button, Create Client Script.

## Details

- Static presentational UI only, no backend; quote data hardcoded to match the screenshot (Quote 1, 823047000000736047, Draft, Sridhar, 21/02/2025, contact Harry Potter).
- Built with shadcn `DropdownMenu`, `Tabs`, `Button`, `Separator`, `Avatar`; lucide icons for nav and toolbar.
- Design system: add CRM-specific tokens to `src/styles.css` (deep navy sidebar, light neutral canvas, blue accent links, white cards) — no hardcoded color utilities in components.
- Sections split into components under `src/components/crm/` (Sidebar, TopBar, RecordHeader, RelatedList, OverviewPanel, ActionsMenu, BottomBar).
- Route head(): title/description/og/twitter for the quote detail page.
- Responsive: sidebars collapse on small screens; main content stacks.

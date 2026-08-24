const items = [
  "Notes",
  "Connected Records",
  "Sales Orders",
  "Attachments",
  "Open Activities",
  "Closed Activities",
  "Emails",
  "Cadences",
  "Related List Label 2",
  "ZohoSign Documents",
];

export function RelatedList() {
  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-crm-line bg-crm-surface px-6 py-6 xl:block">
      <h3 className="text-lg font-semibold text-foreground">Related List</h3>
      <ul className="mt-4 space-y-3.5">
        {items.map((item) => (
          <li key={item}>
            <button
              type="button"
              className="text-[15px] text-muted-foreground transition-colors hover:text-crm-accent"
            >
              {item}
            </button>
          </li>
        ))}
        <li>
          <button type="button" className="text-[15px] font-medium text-crm-accent">
            Add Related List
          </button>
        </li>
      </ul>

      <h3 className="mt-8 text-lg font-semibold text-foreground">Links</h3>
      <button type="button" className="mt-4 text-[15px] font-medium text-crm-accent">
        Add Link
      </button>
    </aside>
  );
}
const infoFields = ["Customer Name", "Customer Address", "Cutomer Email", "Customer Phone"];

export function ServiceReportDocument() {
  return (
    <div className="mx-auto w-full max-w-3xl border border-crm-accent bg-crm-surface px-10 py-8 shadow-sm">
      <div className="border-y border-foreground/70 py-4">
        <h2 className="text-center text-2xl font-medium text-crm-accent">Service Report Form</h2>
      </div>

      <h3 className="mt-8 text-sm font-bold uppercase tracking-wide text-crm-accent">
        Customer Information :
      </h3>
      <ul className="mt-4 space-y-4 pl-2 text-[15px] text-foreground">
        {infoFields.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>

      <h3 className="mt-10 text-sm font-bold uppercase tracking-wide text-crm-accent">
        Service Detail :
      </h3>
      <p className="mt-4 text-[15px] text-foreground">Customer Complient</p>

      <p className="mt-8 text-[15px] font-semibold text-foreground">After service in Detail :</p>
      <div className="h-24" />

      <p className="text-[15px] font-semibold text-foreground">Customer Feedback :</p>
      <div className="h-32" />
    </div>
  );
}

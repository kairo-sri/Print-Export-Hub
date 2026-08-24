const items = [
  { no: "0000746", desc: "Jobs Tin-cutter J67282", price: "$ 5.26", discount: "30%", amount: "$ 2,854.52" },
  { no: "0000747", desc: "Jobs Tin-cutter L39161", price: "$ 7.43", discount: "25%", amount: "$ 7,329.12" },
];

const totals = [
  { label: "Sub Total", value: "$ 7,852.40" },
  { label: "Jobs Main Pay", value: "$ 26.56" },
  { label: "Jobs Internal Pay", value: "$ 3.49" },
  { label: "Tax", value: "$ 12.00" },
];

export function QuoteDocument() {
  return (
    <article className="mx-auto w-full max-w-3xl rounded-md border border-crm-line bg-crm-surface shadow-sm">
      <header className="flex flex-wrap items-start justify-between gap-6 p-8">
        <div className="flex gap-1.5" aria-label="Company logo">
          <span className="size-8 rounded-sm border-2 border-destructive" />
          <span className="size-8 rounded-sm border-2 border-chart-2" />
          <span className="size-8 rounded-sm border-2 border-crm-accent" />
          <span className="size-8 rounded-sm border-2 border-chart-5" />
        </div>
        <div className="text-right text-sm text-muted-foreground">
          <p className="font-semibold text-foreground">Ship To</p>
          <p>Customer No: #18929162</p>
          <p>Quote No: #728923639</p>
          <p>Date: December 26, 2025</p>
        </div>
      </header>

      <div className="flex flex-wrap justify-between gap-6 px-8 pb-8 text-sm">
        <div className="text-muted-foreground">
          <p className="font-semibold text-foreground">From</p>
          <p>Dragto Industries</p>
          <p>7821 Hahr Cafe</p>
          <p>Jonahs, YU 992316, USA</p>
        </div>
        <div className="text-right text-muted-foreground">
          <p className="font-semibold text-foreground">Bill To</p>
          <p>31 Garden SI kle 8900</p>
          <p>Jonahs, CA 08124, USA</p>
        </div>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-crm-canvas text-muted-foreground">
          <tr>
            <th className="px-8 py-4 text-left font-medium">Item</th>
            <th className="py-4 text-left font-medium">Description</th>
            <th className="py-4 text-right font-medium">List Prices</th>
            <th className="py-4 text-right font-medium">Discount</th>
            <th className="px-8 py-4 text-right font-medium">Amount</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.no} className="border-t border-crm-line">
              <td className="px-8 py-5">{item.no}</td>
              <td className="py-5">{item.desc}</td>
              <td className="py-5 text-right">{item.price}</td>
              <td className="py-5 text-right">{item.discount}</td>
              <td className="px-8 py-5 text-right">{item.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-crm-line p-8">
        <dl className="ml-auto w-full max-w-sm space-y-3 text-sm">
          {totals.map((row) => (
            <div key={row.label} className="flex justify-between">
              <dt className="text-muted-foreground">{row.label}</dt>
              <dd>{row.value}</dd>
            </div>
          ))}
          <div className="flex justify-between border-t border-crm-line pt-3 text-base font-semibold">
            <dt>Total</dt>
            <dd>$ 7,821.451</dd>
          </div>
        </dl>
      </div>
    </article>
  );
}

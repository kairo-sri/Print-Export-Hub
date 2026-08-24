"use client";

import { User } from "lucide-react";

const fields: [string, string][] = [
  ["Description", "-"],
  ["Date", "-"],
  ["Address 1 - Coordinates", "-"],
  ["Address 1 - Flat / House No./ Building / Apart...", "-"],
  ["Address 1 - Street Address", "-"],
  ["Address 1 - Zip / Postal Code", "-"],
  ["Address 2 - City", "-"],
  ["Address 2 - Coordinates", "-"],
  ["Address 2 - Flat / House No./ Building / Apart...", "-"],
  ["Address 2 - Street Address", "-"],
  ["Address 2 - Zip / Postal Code", "-"],
  ["City", "Dindigul"],
  ["Email", "stepen@test.com"],
  ["Company", "Hi"],
  ["Title", "-"],
  ["Created By", "Sridhar"],
  ["Lead Owner", "Sridhar"],
  ["Lead Source", "Stepen"],
];

export function LeadDocument({ name = "-" }: { name?: string }) {
  return (
    <div className="mx-auto w-full max-w-3xl rounded-lg bg-crm-surface p-10 shadow-sm">
      <div className="flex items-center gap-6 border-b border-crm-line pb-8">
        <div className="grid size-24 place-items-center rounded-full bg-crm-canvas text-muted-foreground">
          <User className="size-12" />
        </div>
        <h2 className="text-3xl font-medium">Hello, I am &nbsp;{name}</h2>
      </div>

      <h3 className="mt-8 text-2xl font-medium">Bio Data</h3>
      <dl className="mt-6 space-y-6">
        {fields.map(([label, value]) => (
          <div key={label} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-4 text-[15px]">
            <dt className="text-muted-foreground">{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

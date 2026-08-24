"use client";

import { cn } from "@/lib/utils";

type LabelRecord = { name: string; lines: string[] };

const labelRecords: LabelRecord[] = [
  { name: "karthi", lines: ["zoho", "Sridhar", "Afghanistan"] },
  { name: "Damon ME", lines: ["zoho", "Sridhar"] },
  { name: "Neeli Chandra", lines: ["Sridhar", "Afghanistan", "Gujarat"] },
  {
    name: "John Tennyson",
    lines: [
      "john@zohotest.com",
      "john2@test.com",
      "Employee Referral",
      "Stepen Salvatore",
      "India",
      "Arunachal Pradesh",
      "Chennai",
    ],
  },
  {
    name: "Leo bn&co",
    lines: [
      "fghjk",
      "sridhar.ramachandran+01@zohotest.com",
      "sridhar.ramachandran+02@zohotest.com",
      "Cold Call",
      "Sridhar",
      "Afghanistan",
      "Arunachal Pradesh",
      "Bike",
    ],
  },
  {
    name: "Leo Das&co",
    lines: [
      "Hi",
      "98765432111",
      "Cold Call",
      "Sridhar",
      "United States",
      "Alabama;New York",
    ],
  },
  {
    name: "Sridhar R",
    lines: [
      "Hi",
      "sridhartest@test.com",
      "1234567899",
      "Web Research",
      "Sridhar",
      "India",
      "Arunachal Pradesh;Assam;Bihar;Chhattisgarh;Wake Island (unincorporated)",
    ],
  },
  {
    name: "Stepen Mikalson",
    lines: ["Hi", "stepen@test.com", "123", "Sridhar", "United States", "Assam"],
  },
  {
    name: "Leo Das",
    lines: ["Das & co", "primary@test.com", "secondary@test.com", "Cold Call", "Sridhar"],
  },
  {
    name: "Leo &co",
    lines: [
      "primary@test.com",
      "secondary@test.com",
      "Cold Call",
      "Sridhar",
      "Afghanistan",
      "Arunachal Pradesh",
    ],
  },
];

export function MailingLabelsDocument({
  labelHeight = 150,
  columns = 2,
}: {
  labelHeight?: number;
  columns?: number;
}) {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-crm-surface p-6 shadow-sm">
      <div
        className={cn("grid gap-3", columns === 3 ? "grid-cols-3" : "grid-cols-2")}
      >
        {labelRecords.map((rec) => (
          <div
            key={rec.name}
            style={{ minHeight: labelHeight }}
            className="overflow-hidden border border-dashed border-crm-line p-4 text-[13px] leading-6"
          >
            <p className="font-semibold">{rec.name}</p>
            {rec.lines.map((line, i) => (
              <p key={i} className="break-words">
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

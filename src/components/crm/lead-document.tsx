"use client";

type Row = {
  leftLabel: string;
  leftValue: React.ReactNode;
  rightLabel?: string;
  rightValue?: React.ReactNode;
};

const badge = (text: string) => (
  <span className="rounded-full bg-orange-400 px-3 py-0.5 text-sm font-medium text-white">
    {text}
  </span>
);

const twoLine = (line1: string, line2: string) => (
  <span>
    {line1}
    <br />
    <span className="text-muted-foreground">{line2}</span>
  </span>
);

const leadInfoRows: Row[] = [
  { leftLabel: "Lead Owner :", leftValue: "Sridhar", rightLabel: "Company :", rightValue: "fghjk" },
  { leftLabel: "LANDLINE :", leftValue: "", rightLabel: "Lead Name :", rightValue: "Leo bn&co" },
  { leftLabel: "Voice :", leftValue: "", rightLabel: "Full Name :", rightValue: "Leo bn&co" },
  { leftLabel: "Title :", leftValue: "", rightLabel: "Email :", rightValue: "sridhar.ramachandran+01@zohotest.com" },
  { leftLabel: "Phone :", leftValue: "", rightLabel: "Fax :", rightValue: "" },
  { leftLabel: "Mobile :", leftValue: "", rightLabel: "Website :", rightValue: "" },
  { leftLabel: "Lead Source :", leftValue: badge("Cold Call"), rightLabel: "Lead Status :", rightValue: "Junk Lead" },
  { leftLabel: "Industry :", leftValue: "", rightLabel: "No. of Employees :", rightValue: "" },
  { leftLabel: "Annual Revenue :", leftValue: "", rightLabel: "Rating :", rightValue: "" },
  { leftLabel: "Layout :", leftValue: "Map dependency", rightLabel: "Created By :", rightValue: twoLine("Sridhar", "Fri, 21 Mar 2025 03:11 PM") },
  { leftLabel: "Modified By :", leftValue: twoLine("Kiara", "Tue, 16 Jun 2026 03:31 PM"), rightLabel: "Skype ID :", rightValue: "" },
  { leftLabel: "Currency :", leftValue: "INR", rightLabel: "Secondary Email :", rightValue: "sridhar.ramachandran+02@zohotest.com" },
  { leftLabel: "Countries :", leftValue: "Afghanistan", rightLabel: "Twitter :", rightValue: "" },
  { leftLabel: "States :", leftValue: "Arunachal Pradesh", rightLabel: "Exchange Rate :", rightValue: "1" },
  { leftLabel: "Region :", leftValue: "", rightLabel: "Rollup Summary 5 :", rightValue: "" },
  { leftLabel: "Sub Region :", leftValue: "", rightLabel: "Tag :", rightValue: "" },
  { leftLabel: "Pick List 10 :", leftValue: "" },
  { leftLabel: "Languages :", leftValue: "" },
  { leftLabel: "Dialects :", leftValue: "" },
  { leftLabel: "District :", leftValue: "" },
];

const addressRows: Row[] = [
  { leftLabel: "Street :", leftValue: "", rightLabel: "City :", rightValue: "India" },
  { leftLabel: "State :", leftValue: "", rightLabel: "Zip Code :", rightValue: "" },
];

function SectionTable({ rows }: { rows: Row[] }) {
  return (
    <table className="w-full border-collapse border border-gray-300 text-sm">
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-gray-300 last:border-b-0">
            {/* Left label */}
            <td className="w-[200px] border-r border-gray-300 py-2 pr-3 pl-4 text-right text-[13px] text-slate-500">
              {row.leftLabel}
            </td>
            {/* Left value */}
            <td className={`py-2 px-3 text-[13px] text-slate-800 ${row.rightLabel !== undefined ? "border-r border-gray-300" : ""}`}>
              {row.leftValue}
            </td>
            {/* Right label (only if provided) */}
            {row.rightLabel !== undefined && (
              <>
                <td className="w-[200px] border-r border-gray-300 py-2 pr-3 pl-4 text-right text-[13px] text-slate-500">
                  {row.rightLabel}
                </td>
                <td className="py-2 px-3 text-[13px] text-slate-800">
                  {row.rightValue}
                </td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function LeadDocument({ name: _name = "-" }: { name?: string }) {
  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-8 shadow-sm">
      {/* Lead Information */}
      <h2 className="mb-3 text-[15px] font-bold text-slate-800">Lead Information</h2>
      <SectionTable rows={leadInfoRows} />

      {/* Address Information */}
      <h2 className="mb-3 mt-8 text-[15px] font-bold text-slate-800">Address Information</h2>
      <SectionTable rows={addressRows} />
    </div>
  );
}

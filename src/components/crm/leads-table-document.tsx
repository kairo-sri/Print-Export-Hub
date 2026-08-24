const rows = [
  { first: "kumar data", last: "Scott", company: "Quantum Solutions" },
  { first: "", last: "King kuing", company: "CoreLogic" },
  { first: "", last: "Young", company: "BlueSphere" },
  { first: "", last: "Allen", company: "InfoMatrix" },
  { first: "", last: "Hall", company: "CyberWave" },
  { first: "", last: "Walker", company: "PioneerSoft" },
  { first: "", last: "Clark", company: "Skyline IT" },
  { first: "", last: "Lewis", company: "Visionary Ltd." },
  { first: "", last: "Harris", company: "CloudNet" },
  { first: "", last: "White", company: "BrightTech" },
  { first: "", last: "Lee", company: "EdgeWare" },
  { first: "", last: "Garcia", company: "PrimeTech" },
  { first: "", last: "Martinez", company: "AlphaSystems" },
  { first: "", last: "Wilson", company: "NextGen" },
  { first: "", last: "Taylor", company: "DataSync" },
  { first: "", last: "Johnson", company: "GlobalSoft" },
  { first: "", last: "Davis", company: "FutureTech" },
  { first: "", last: "Brown", company: "Solutions Ltd." },
  { first: "", last: "Smith", company: "Innovate Inc." },
  { first: "", last: "Doe", company: "TechCorp" },
];

export function LeadsTableDocument({
  viewName = true,
  currentDate = true,
  rowNumber = true,
  gridLines = true,
  fontSize = "Small",
  pageNumber = true,
}: {
  viewName?: boolean;
  currentDate?: boolean;
  rowNumber?: boolean;
  gridLines?: boolean;
  fontSize?: string;
  pageNumber?: boolean;
}) {
  const text =
    fontSize === "Small" ? "text-[13px]" : fontSize === "Medium" ? "text-[15px]" : "text-[17px]";
  const cell = gridLines ? "border border-crm-line" : "border-b border-crm-line";

  return (
    <div className="mx-auto w-full max-w-3xl bg-crm-surface p-8 shadow-sm">
      {(viewName || currentDate) && (
        <div className="mb-4 flex items-center justify-between text-sm text-foreground">
          <span>{viewName ? "Leads: Changed CV Name" : ""}</span>
          <span>{currentDate ? "20 Aug, 2026 12:40" : ""}</span>
        </div>
      )}
      <table className={`w-full border-collapse ${text}`}>
        <thead>
          <tr className="font-semibold">
            {rowNumber && <th className={`${cell} px-3 py-2 text-left`}>S.No</th>}
            <th className={`${cell} px-3 py-2 text-left`}>First Name</th>
            <th className={`${cell} px-3 py-2 text-left`}>Last Name</th>
            <th className={`${cell} px-3 py-2 text-left`}>Company</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {rowNumber && <td className={`${cell} px-3 py-2`}>{i + 1}</td>}
              <td className={`${cell} px-3 py-2`}>{r.first}</td>
              <td className={`${cell} px-3 py-2`}>{r.last}</td>
              <td className={`${cell} px-3 py-2`}>{r.company}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {pageNumber && (
        <p className="mt-4 text-center text-xs text-muted-foreground">Page 1</p>
      )}
    </div>
  );
}

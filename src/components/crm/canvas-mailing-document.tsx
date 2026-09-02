"use client";

type LabelData = {
  name: string;
  subtitle?: string;
  accountName?: string;
  billingCity?: string;
  billingCode?: string;
  contactName?: string;
  createdBy?: string;
};

const labels: LabelData[] = [
  {
    name: "-",
    subtitle: "-",
    accountName: "-",
    billingCity: "-",
    billingCode: "-",
    contactName: "-",
    createdBy: "Sridhar",
  },
  {
    name: "India",
    subtitle: "Tamilnadu",
    accountName: "-",
    billingCity: "Dindigul",
    billingCode: "624619",
    contactName: "Harry Potter",
    createdBy: "Sridhar",
  },
  {
    name: "Alex Johnson",
    subtitle: "Karnataka",
    accountName: "Zylker Corp",
    billingCity: "Bangalore",
    billingCode: "560001",
    contactName: "Alex Johnson",
    createdBy: "Sridhar",
  },
  {
    name: "Priya Nair",
    subtitle: "Kerala",
    accountName: "TechSoft",
    billingCity: "Kochi",
    billingCode: "682001",
    contactName: "Priya Nair",
    createdBy: "Sridhar",
  },
];

function LabelCard({ data }: { data: LabelData }) {
  const fields = [
    { label: "ACCOUNT NAME", value: data.accountName ?? "-" },
    { label: "BILLING CITY", value: data.billingCity ?? "-" },
    { label: "BILLING CODE", value: data.billingCode ?? "-" },
    { label: "CONTACT NAME", value: data.contactName ?? "-" },
    { label: "CREATED BY", value: data.createdBy ?? "-" },
  ];

  return (
    <div className="flex flex-col overflow-hidden rounded-sm border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="relative h-[68px] overflow-hidden bg-[#12183a]">
        {/* Chevron shapes */}
        <div
          className="absolute left-0 top-0 h-full w-[55%]"
          style={{
            background: "#12183a",
            clipPath: "polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%)",
          }}
        />
        <div
          className="absolute left-[48%] top-0 h-full w-[30%]"
          style={{
            background: "#b8c9e8",
            clipPath: "polygon(0 0, 88% 0, 100% 50%, 88% 100%, 0 100%)",
            opacity: 0.55,
          }}
        />
        <div
          className="absolute right-0 top-0 h-full w-[38%]"
          style={{
            background: "#d8c8e8",
            clipPath: "polygon(12% 0, 100% 0, 100% 100%, 12% 100%, 0 50%)",
            opacity: 0.65,
          }}
        />
        {/* Logo */}
        <div className="absolute bottom-2 right-4 flex items-center gap-1.5">
          <span className="text-lg">🌾</span>
          <span className="text-sm font-semibold text-[#12183a]">Zylker Corp</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center px-5 py-4">
        {/* Avatar */}
        <div className="mb-3 flex size-16 items-center justify-center rounded-full bg-gray-200">
          <svg viewBox="0 0 24 24" className="size-10 text-gray-400" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>

        {/* Name */}
        <p className="mb-0.5 text-xl font-bold text-blue-500">{data.name}</p>
        {data.subtitle && (
          <p className="mb-3 text-sm text-gray-500">{data.subtitle}</p>
        )}

        {/* Fields */}
        <table className="w-full text-xs">
          <tbody>
            {fields.map((f) => (
              <tr key={f.label}>
                <td className="py-0.5 pr-3 text-left text-[10px] font-medium uppercase tracking-wide text-gray-400">
                  {f.label}
                </td>
                <td className="py-0.5 font-semibold text-gray-800">{f.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer bands */}
      <div className="mt-auto flex h-4 w-full">
        <div className="flex-[3] bg-blue-100" />
        <div className="flex-[1.2] bg-purple-200" />
        <div className="flex-[2.5] bg-blue-100" />
        <div className="flex-[1] bg-purple-200" />
      </div>
    </div>
  );
}

export function CanvasMailingDocument() {
  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="grid grid-cols-2 gap-4">
        {labels.map((label, i) => (
          <LabelCard key={i} data={label} />
        ))}
      </div>
    </div>
  );
}

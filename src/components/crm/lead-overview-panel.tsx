import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LeadDocument } from "./lead-document";

const summary = [
  { label: "Lead Source", value: "Stepen" },
  { label: "Lead Owner", value: "Sridhar" },
  { label: "City", value: "Dindigul" },
  { label: "Email", value: "stepen@test.com" },
];

const leadInfo = [
  { label: "First Name", value: "Stepen" },
  { label: "Last Name", value: "-" },
  { label: "Company", value: "Hi" },
  { label: "Lead Owner", value: "Sridhar" },
  { label: "Lead Source", value: "Stepen" },
  { label: "City", value: "Dindigul" },
  { label: "Email", value: "stepen@test.com" },
  { label: "Phone", value: "-" },
  { label: "Created By", value: "Sridhar" },
];

export function LeadOverviewPanel() {
  return (
    <div className="min-w-0 flex-1 bg-crm-canvas px-6 py-5">
      <Tabs defaultValue="overview">
        <div className="flex items-center gap-4">
          <TabsList className="bg-transparent p-0 shadow-none">
            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent px-0 pb-2 pt-0 text-sm font-medium data-[state=active]:border-crm-accent data-[state=active]:bg-transparent data-[state=active]:shadow-none mr-4">
              Overview
            </TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-none border-b-2 border-transparent px-0 pb-2 pt-0 text-sm font-medium data-[state=active]:border-crm-accent data-[state=active]:bg-transparent data-[state=active]:shadow-none mr-4">
              Timeline
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="mt-6 space-y-6">
          {/* Summary strip */}
          <div className="grid grid-cols-2 gap-4 rounded-xl border border-crm-line bg-crm-surface p-4 sm:grid-cols-4">
            {summary.map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-0.5 text-sm font-medium">{value}</p>
              </div>
            ))}
          </div>

          {/* Lead info card */}
          <div className="rounded-xl border border-crm-line bg-crm-surface p-5">
            <h3 className="mb-4 text-sm font-semibold">Lead Information</h3>
            <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {leadInfo.map(({ label, value }) => (
                <div key={label} className="flex flex-col gap-0.5">
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="text-sm">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <p className="text-sm text-muted-foreground">No timeline entries yet.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

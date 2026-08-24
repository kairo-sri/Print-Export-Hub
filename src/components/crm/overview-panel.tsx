import { Mail, Phone, PanelLeft, User } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const summary = [
  { label: "Quote Number", value: "823047000000736047" },
  { label: "Quote Stage", value: "Draft" },
  { label: "Quote Owner", value: "Sridhar" },
  { label: "Valid Until", value: "21/02/2025" },
];

const quoteInfo = [
  { label: "Subject", value: "Quote 1" },
  { label: "Quote Number", value: "823047000000736047" },
  { label: "Quote Owner", value: "Sridhar" },
  { label: "Deal Name", value: "—" },
  { label: "Quote Stage", value: "Draft" },
  { label: "Valid Until", value: "21/02/2025" },
  { label: "Team", value: "—" },
  { label: "Carrier", value: "—" },
  { label: "Account Name", value: "Harry Potter Inc." },
  { label: "Contact Name", value: "Harry Potter" },
];

export function OverviewPanel() {
  return (
    <div className="min-w-0 flex-1 bg-crm-canvas px-6 py-5">
      <Tabs defaultValue="overview">
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="Toggle related list"
            className="grid size-10 place-items-center rounded-full border border-crm-line bg-crm-surface text-muted-foreground"
          >
            <PanelLeft className="size-5" />
          </button>
          <TabsList className="rounded-full bg-crm-surface p-1">
            <TabsTrigger value="overview" className="rounded-full px-6 py-2 text-[15px]">
              Overview
            </TabsTrigger>
            <TabsTrigger value="timeline" className="rounded-full px-6 py-2 text-[15px]">
              Timeline
            </TabsTrigger>
          </TabsList>
          <p className="ml-auto text-sm text-muted-foreground">
            Last update: 3 day(s) ago
          </p>
        </div>

        <TabsContent value="overview" className="mt-5 space-y-5">
          <Card>
            <dl className="grid gap-y-5">
              {summary.map((row) => (
                <div key={row.label} className="grid gap-1 sm:grid-cols-[220px_1fr] sm:items-center">
                  <dt className="text-[15px] text-crm-label sm:text-right">{row.label}</dt>
                  <dd className="text-[15px] font-medium text-foreground sm:pl-10">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-foreground">Contacts</h3>
            <div className="mt-4 flex items-start gap-4">
              <span className="grid size-11 place-items-center rounded-full bg-crm-canvas text-muted-foreground">
                <User className="size-6" />
              </span>
              <div className="space-y-1.5">
                <p className="text-[15px] font-semibold text-foreground">Harry Potter</p>
                <p className="flex items-center gap-2 text-[15px] text-crm-accent">
                  <Mail className="size-4" />
                  sridhar.spidey@gmail.com
                </p>
                <p className="flex items-center gap-2 text-[15px] text-crm-accent">
                  <Phone className="size-4" />
                  878798998
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <button type="button" className="text-lg font-semibold text-foreground">
              Hide Details
            </button>
          </Card>

          <Card>
            <h3 className="text-lg font-semibold text-foreground">Quote Information</h3>
            <dl className="mt-6 grid gap-y-6 md:grid-cols-2 md:gap-x-12">
              {quoteInfo.map((row) => (
                <div key={row.label + row.value} className="grid gap-1 sm:grid-cols-[180px_1fr] sm:items-center">
                  <dt className="text-[15px] text-crm-label sm:text-right">{row.label}</dt>
                  <dd className="text-[15px] font-medium text-foreground sm:pl-8">{row.value}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="mt-5">
          <Card>
            <p className="text-[15px] text-muted-foreground">
              No timeline activity recorded for this quote yet.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-crm-line bg-crm-surface p-6 shadow-sm">
      {children}
    </section>
  );
}
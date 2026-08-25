import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { LeftNav } from "@/components/crm/left-nav";
import { TopBar } from "@/components/crm/top-bar";
import { LeadRecordHeader } from "@/components/crm/lead-record-header";
import { RelatedList } from "@/components/crm/related-list";
import { LeadOverviewPanel } from "@/components/crm/lead-overview-panel";
import { BottomBar } from "@/components/crm/bottom-bar";

const title = "Stepen — Leads | CRM";
const description =
  "Lead detail view with related lists and lead information, including Print & Export actions.";

export const Route = createFileRoute("/lead-detail")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/lead-detail" }],
  }),
  component: LeadDetailPage,
});

function LeadDetailPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-crm-canvas">
      <LeftNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Stepen" />
        <LeadRecordHeader name="Stepen" />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <RelatedList />
          <div className="min-w-0 flex-1 overflow-y-auto">
            <LeadOverviewPanel />
          </div>
        </div>
        <BottomBar />
      </div>
      <Toaster />
    </div>
  );
}

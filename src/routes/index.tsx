import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { LeftNav } from "@/components/crm/left-nav";
import { TopBar } from "@/components/crm/top-bar";
import { RecordHeader } from "@/components/crm/record-header";
import { RelatedList } from "@/components/crm/related-list";
import { OverviewPanel } from "@/components/crm/overview-panel";
import { BottomBar } from "@/components/crm/bottom-bar";

const title = "Quote 1 — Quotes | CRM";
const description =
  "Quote detail view with related lists, contacts, and quote information, including a combined Print & Export action.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-crm-canvas">
      <LeftNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Quote 1" />
        <RecordHeader />
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <RelatedList />
          <div className="min-w-0 flex-1 overflow-y-auto">
            <OverviewPanel />
          </div>
        </div>
        <BottomBar />
      </div>
      <Toaster />
    </div>
  );
}

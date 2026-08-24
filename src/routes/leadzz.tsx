import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { LeftNav } from "@/components/crm/left-nav";
import { TopBar } from "@/components/crm/top-bar";
import { LeadzzView } from "@/components/crm/leadzz-view";
import { BottomBar } from "@/components/crm/bottom-bar";

const title = "Leadzz — Lead List View | CRM";
const description =
  "Browse, filter and bulk-manage leads with saved views, record selection and mass actions.";

export const Route = createFileRoute("/leadzz")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/leadzz" }],
  }),
  component: LeadzzPage,
});

function LeadzzPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-crm-canvas">
      <LeftNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Leadzz" />
        <LeadzzView />
        <BottomBar />
      </div>
      <Toaster />
    </div>
  );
}

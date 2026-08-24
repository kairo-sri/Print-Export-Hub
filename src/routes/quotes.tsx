import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { LeftNav } from "@/components/crm/left-nav";
import { TopBar } from "@/components/crm/top-bar";
import { QuotesView } from "@/components/crm/quotes-view";
import { BottomBar } from "@/components/crm/bottom-bar";

const title = "Quotes — Quote List View | CRM";
const description = "Browse, filter and manage quotes with saved views, record selection and mass actions.";

export const Route = createFileRoute("/quotes")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/quotes" }],
  }),
  component: QuotesPage,
});

function QuotesPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-crm-canvas">
      <LeftNav />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar title="Quotes" />
        <QuotesView />
        <BottomBar />
      </div>
      <Toaster />
    </div>
  );
}

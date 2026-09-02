"use client";

import { useState } from "react";
import {
  Filter,
  ArrowUpDown,
  List,
  Columns3,
  Table as TableIcon,
  Clock,
  Rows3,
  Workflow,
  MapPin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Pin,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { PrintExportPanel } from "./print-export-panel";
import type { Mode } from "./print-export-panel";
import { Link } from "@tanstack/react-router";

type Lead = {
  id: string;
  first: string;
  last: string;
  company: string;
  revenue: string;
  email: string;
  twitter: string;
  owner: string;
  source: string;
};

const leads: Lead[] = [
  { id: "1", first: "Stepen", last: "Mikalson", company: "Hi", revenue: "", email: "stepen@test.com", twitter: "", owner: "Sridhar", source: "Stepen" },
  { id: "2", first: "Stepen", last: "Mikalson", company: "jj", revenue: "", email: "stepen@test.com", twitter: "", owner: "Sridhar", source: "Stepen" },
  { id: "3", first: "Stepen", last: "Salavatore s", company: "", revenue: "", email: "", twitter: "", owner: "Sridhar", source: "Stepen" },
  { id: "4", first: "Stepen", last: "Mikalson", company: "jj", revenue: "", email: "stepen@test.com", twitter: "", owner: "Sridhar", source: "Stepen" },
  { id: "5", first: "Stepen", last: "Mikalson", company: "jj", revenue: "", email: "stepen@test.com", twitter: "", owner: "Sridhar", source: "Stepen" },
  { id: "6", first: "Stepen", last: "Salavatore", company: "", revenue: "", email: "", twitter: "", owner: "Sridhar", source: "Stepen" },
];

const views = [
  "All Locked Leadzz",
  "All Leadzz",
  "Converted Leadzz",
  "Junk Leadzz",
  "Mailing Labels",
  "Test",
];

const systemFilters = [
  "Activities",
  "Cadences",
  "Campaigns",
  "Latest Email Status",
  "Locked",
  "Record Action",
  "Related Records Action",
  "Scoring Rules",
  "Touched Records",
  "Untouched Records",
];

const websiteFilters = [
  "Attended By",
  "Average Time Spent (Minutes)",
  "Browser",
  "Chats",
  "Days Visited",
  "First Page Visited",
  "First Visit",
  "Most Recent Visit",
  "Number Of Chats",
];

const selectedBulkActions = [
  "Run Macro",
  "Create Task",
  "Set Reminder",
  "Mass Update",
  "Change Owner",
  "Cadences",
  "Add to Campaigns",
  "Print & Export",
  "Mail Merge",
  "Mass Convert",
  "Delete",
  "Update Data Processing Basis",
  "Export Selected Records",
];

const moduleActions = [
  "Mass Transfer",
  "Mass Delete",
  "Mass Update",
  "Mass Convert",
  "Manage Tags",
  "Assignment Rules",
  "Drafts",
  "Mass Email",
  "Approve Leadzz",
  "Deduplicate Leadzz",
  "Add to Campaigns",
  "Create Client Script",
  "Export Leadzz",
  "Zoho Sheet View",
  "Print View",
];

export function LeadzzView() {
  const [selected, setSelected] = useState<string[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<Mode>("print");
  const [panelInitialCategory, setPanelInitialCategory] = useState<string | undefined>();
  const [panelRecordCount, setPanelRecordCount] = useState<number | undefined>();
  const [panelListViewExport, setPanelListViewExport] = useState(false);
  const allSelected = selected.length === leads.length;
  const anySelected = selected.length > 0;

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const openExportPDF = () => {
    setPanelMode("export");
    setPanelInitialCategory(undefined);
    setPanelRecordCount(undefined);
    setPanelListViewExport(true);
    setPanelOpen(true);
  };

  const openPrintCanvas = () => {
    setPanelMode("listprint");
    setPanelInitialCategory(undefined);
    setPanelRecordCount(selected.length || leads.length);
    setPanelListViewExport(false);
    setPanelOpen(true);
  };

  const openPrintPreview = () => {
    setPanelMode("listprint");
    setPanelInitialCategory(undefined);
    setPanelRecordCount(80);
    setPanelListViewExport(false);
    setPanelOpen(true);
  };

  const openMailingLabels = () => {
    setPanelMode("mailing");
    setPanelInitialCategory(undefined);
    setPanelRecordCount(selected.length || leads.length);
    setPanelListViewExport(false);
    setPanelOpen(true);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* View tabs */}
      <div className="flex items-center gap-5 overflow-x-auto border-b border-crm-line bg-crm-surface px-6 py-2.5 text-sm">
        {views.map((v) => (
          <button
            key={v}
            type="button"
            className="flex shrink-0 items-center gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <Pin className="size-3.5" />
            {v}
          </button>
        ))}
        <span className="shrink-0 rounded-md bg-crm-canvas px-3 py-1 text-sm font-semibold text-foreground">
          Dindigul leads View
        </span>
        <MoreHorizontal className="size-5 shrink-0 text-muted-foreground" />
      </div>

      {/* Toolbar */}
      <div className="flex min-h-14 flex-wrap items-center gap-2 border-b border-crm-line bg-crm-surface px-6 py-2">
        {anySelected ? (
          <>
            <span className="text-sm">
              <strong>{selected.length}</strong> Records Selected.
            </span>
            <button
              type="button"
              onClick={() => setSelected([])}
              className="text-sm font-medium text-crm-accent"
            >
              Clear
            </button>
            <Button variant="outline" className="ml-2 rounded-lg" onClick={() => toast("Send Email")}>
              Send Email
            </Button>
            <Button variant="outline" className="rounded-lg" onClick={() => toast("Tags")}>
              Tags <ChevronDown className="size-4" />
            </Button>
            <div className="flex overflow-hidden rounded-lg border border-input">
              <button type="button" className="px-4 py-2 text-sm font-medium hover:bg-crm-canvas">
                Send with Zoho Sign
              </button>
              <span className="w-px bg-border" />
              <button
                type="button"
                aria-label="Sign options"
                className="grid w-9 place-items-center hover:bg-crm-canvas"
              >
                <ChevronDown className="size-4" />
              </button>
            </div>
            <BulkActionsMenu
              onExportPDF={openExportPDF}
              onPrintCanvas={openPrintCanvas}
              onMailingLabels={openMailingLabels}
            />
          </>
        ) : (
          <>
            <Button variant="outline" className="rounded-lg">
              <Filter className="size-4 text-crm-accent" /> Filter
            </Button>
            <Button variant="ghost" className="rounded-lg">
              <ArrowUpDown className="size-4" /> Sort
            </Button>
            <span className="mx-2 h-6 w-px bg-border" />
            <div className="flex items-center gap-1 text-muted-foreground">
              {[List, Columns3, TableIcon, Clock, Workflow, Rows3, MapPin].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`View option ${i + 1}`}
                  className={cn(
                    "grid size-8 place-items-center rounded-md hover:bg-crm-canvas",
                    i === 0 && "bg-crm-canvas text-crm-accent",
                  )}
                >
                  <Icon className="size-[18px]" />
                </button>
              ))}
              <ChevronDown className="size-4" />
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex overflow-hidden rounded-lg bg-crm-accent text-crm-nav-foreground">
                <button type="button" className="px-4 py-2 text-sm font-semibold">
                  Create Lead
                </button>
                <span className="w-px bg-white/25" />
                <button
                  type="button"
                  aria-label="Create options"
                  className="grid w-8 place-items-center"
                >
                  <ChevronDown className="size-4" />
                </button>
              </div>
              <ModuleActionsMenu
                onExportPDF={openExportPDF}
                onPrintPreview={openPrintPreview}
              />
            </div>
          </>
        )}
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1 gap-4 overflow-hidden bg-crm-canvas p-4">
        {/* Filter sidebar */}
        <aside className="hidden w-[220px] shrink-0 overflow-y-auto rounded-lg border border-crm-line bg-crm-surface p-4 lg:block">
          <h3 className="text-base font-semibold">Filter Leadzz by</h3>
          <div className="relative mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search" className="h-9 rounded-lg pl-9" />
          </div>
          <FilterGroup title="System Defined Fil..." items={systemFilters} />
          <FilterGroup title="Website Activity" items={websiteFilters} />
        </aside>

        {/* Table */}
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-crm-line bg-crm-surface">
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead className="sticky top-0 bg-crm-surface">
                <tr className="border-b border-crm-line text-left text-muted-foreground">
                  <th className="w-12 px-4 py-3">
                    <Checkbox
                      aria-label="Select all records"
                      checked={allSelected}
                      onCheckedChange={(v) => setSelected(v ? leads.map((l) => l.id) : [])}
                    />
                  </th>
                  {["First Name", "Last Name", "C...", "Annual Revenue", "Email", "Twitter", "Lead Owner", "Lead Source"].map(
                    (h) => (
                      <th key={h} className="border-l border-crm-line px-4 py-3 font-medium">
                        {h}
                      </th>
                    ),
                  )}
                  <th className="w-10 px-2">
                    <SlidersHorizontal className="size-4" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => {
                  const isChecked = selected.includes(lead.id);
                  return (
                    <tr
                      key={lead.id}
                      className={cn(
                        "border-b border-crm-line hover:bg-crm-canvas",
                        isChecked && "bg-crm-canvas",
                      )}
                    >
                      <td className="px-4 py-3">
                        <Checkbox
                          aria-label={`Select ${lead.first} ${lead.last}`}
                          checked={isChecked}
                          onCheckedChange={() => toggle(lead.id)}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <Link to="/lead-detail" className="text-crm-accent hover:underline">
                          {lead.first}
                        </Link>
                      </td>
                      <td className="px-4 py-3">{lead.last}</td>
                      <td className="px-4 py-3">{lead.company}</td>
                      <td className="px-4 py-3">{lead.revenue}</td>
                      <td className="px-4 py-3">{lead.email}</td>
                      <td className="px-4 py-3">{lead.twitter}</td>
                      <td className="px-4 py-3">{lead.owner}</td>
                      <td className="px-4 py-3">{lead.source}</td>
                      <td />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-crm-line px-4 py-2.5 text-sm text-muted-foreground">
            <span>
              Total Records <strong className="text-foreground">{leads.length}</strong>
            </span>
            <span className="flex items-center gap-3">
              <ChevronLeft className="size-4" />
              1 to {leads.length}
              <ChevronRight className="size-4" />
            </span>
          </div>
        </div>
      </div>
      <PrintExportPanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        mode={panelMode}
        initialCategory={panelInitialCategory}
        recordCount={panelRecordCount}
        listViewExport={panelListViewExport}
        listExportCategoryOverride={["Email Template", "Mail Merge Template", "Canvas Template", "List View"]}
        printViewCategoryOverride={["List View", "Mail Merge Template", "Email Templates", "Canvas View"]}
      />
    </div>
  );
}

function BulkActionsMenu({
  onExportPDF,
  onPrintCanvas,
  onMailingLabels,
}: {
  onExportPDF: () => void;
  onPrintCanvas: () => void;
  onMailingLabels: () => void;
}) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="More actions"
          className="inline-flex size-9 items-center justify-center rounded-lg border border-input bg-background transition-colors hover:bg-accent"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={4}
          className="z-50 w-60 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-md"
        >
          {selectedBulkActions.map((item) =>
            item === "Print & Export" ? (
              <DropdownMenuPrimitive.Sub key={item}>
                <DropdownMenuPrimitive.SubTrigger className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-[15px] outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent">
                  {item}
                  <ChevronRight className="ml-auto size-4" />
                </DropdownMenuPrimitive.SubTrigger>
                <DropdownMenuPrimitive.Portal>
                  <DropdownMenuPrimitive.SubContent
                    sideOffset={4}
                    className="z-50 w-56 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                  >
                    <DropdownMenuPrimitive.Item
                      className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2.5 text-[15px] outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
                      onSelect={onExportPDF}
                    >
                      Export to PDF
                    </DropdownMenuPrimitive.Item>
                    <DropdownMenuPrimitive.Item
                      className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2.5 text-[15px] outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
                      onSelect={onPrintCanvas}
                    >
                      Print preview
                    </DropdownMenuPrimitive.Item>
                    <DropdownMenuPrimitive.Item
                      className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2.5 text-[15px] outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
                      onSelect={onMailingLabels}
                    >
                      Print Mailing Labels
                    </DropdownMenuPrimitive.Item>
                  </DropdownMenuPrimitive.SubContent>
                </DropdownMenuPrimitive.Portal>
              </DropdownMenuPrimitive.Sub>
            ) : (
              <DropdownMenuPrimitive.Item
                key={item}
                className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-[15px] outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
                onSelect={() => toast(item)}
              >
                {item}
              </DropdownMenuPrimitive.Item>
            ),
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

function ModuleActionsMenu({
  onExportPDF,
  onPrintPreview,
}: {
  onExportPDF: () => void;
  onPrintPreview: () => void;
}) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          type="button"
          aria-label="More actions"
          className="inline-flex size-9 items-center justify-center rounded-lg border border-input bg-background transition-colors hover:bg-accent"
        >
          <MoreHorizontal className="size-5" />
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content
          align="end"
          sideOffset={4}
          className="z-50 w-60 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-md"
        >
          {moduleActions.map((item) => {
            const isSparkle = item === "Create Client Script" || item === "Print View";
            const isSheetView = item === "Zoho Sheet View";
            return (
              <DropdownMenuPrimitive.Item
                key={item}
                className={cn(
                  "relative flex cursor-default select-none items-center gap-2 rounded-lg px-3 py-2 text-[15px] outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
                  isSheetView && "bg-muted",
                )}
                onSelect={() => {
                  if (item === "Export Leadzz") return onExportPDF();
                  if (item === "Print View") return onPrintPreview();
                  toast(item);
                }}
              >
                {item}
                {isSparkle && <Sparkles className="size-3.5 text-yellow-500" />}
              </DropdownMenuPrimitive.Item>
            );
          })}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

function FilterGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-5">
      <button type="button" className="flex items-center gap-1.5 text-sm font-semibold">
        <ChevronDown className="size-4" />
        {title}
      </button>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
            <Checkbox id={`f-${item}`} className="mt-0.5" />
            <label htmlFor={`f-${item}`}>{item}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { useState } from "react";
import {
  Filter,
  ArrowUpDown,
  List,
  Columns3,
  Table as TableIcon,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight as ChevronRightIcon,
  MoreHorizontal,
  Pin,
  SlidersHorizontal,
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

type Quote = {
  id: string;
  subject: string;
  quoteNumber: string;
  accountName: string;
  stage: string;
  validUntil: string;
  owner: string;
  amount: string;
};

const quotes: Quote[] = [
  { id: "1", subject: "Quote 1", quoteNumber: "823047000000736047", accountName: "Harry Potter Inc.", stage: "Draft", validUntil: "21/02/2025", owner: "Sridhar", amount: "$7,890.96" },
  { id: "2", subject: "Quote 2", quoteNumber: "823047000000736048", accountName: "Acme Corp", stage: "Delivered", validUntil: "15/03/2025", owner: "Sridhar", amount: "$3,250.00" },
  { id: "3", subject: "Quote 3", quoteNumber: "823047000000736049", accountName: "Wayne Enterprises", stage: "Accepted", validUntil: "10/04/2025", owner: "Sridhar", amount: "$12,450.00" },
  { id: "4", subject: "Quote 4", quoteNumber: "823047000000736050", accountName: "Stark Industries", stage: "Draft", validUntil: "30/04/2025", owner: "Sridhar", amount: "$5,600.00" },
  { id: "5", subject: "Quote 5", quoteNumber: "823047000000736051", accountName: "Daily Planet", stage: "Expired", validUntil: "01/01/2025", owner: "Sridhar", amount: "$980.00" },
];

const views = ["All Quotes", "My Quotes", "Draft Quotes", "Accepted Quotes"];

const bulkActions = [
  "Send Email", "Mass Update", "Change Owner", "Print & Export", "Mail Merge", "Delete",
];

const moduleActions = [
  "Mass Transfer", "Mass Delete", "Mass Update", "Export Quotes", "Print View",
];

const stageColors: Record<string, string> = {
  Draft: "bg-gray-100 text-gray-700",
  Delivered: "bg-blue-100 text-blue-700",
  Accepted: "bg-green-100 text-green-700",
  Expired: "bg-red-100 text-red-700",
};

export function QuotesView() {
  const [selected, setSelected] = useState<string[]>([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<Mode>("print");
  const [panelListViewExport, setPanelListViewExport] = useState(false);
  const allSelected = selected.length === quotes.length;
  const anySelected = selected.length > 0;

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const openExportPDF = () => {
    setPanelMode("export");
    setPanelListViewExport(true);
    setPanelOpen(true);
  };

  const openPrintPreview = () => {
    setPanelMode("listprint");
    setPanelListViewExport(false);
    setPanelOpen(true);
  };

  const openPrintMailingLabels = () => {
    setPanelMode("mailing");
    setPanelListViewExport(false);
    setPanelOpen(true);
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* View tabs */}
      <div className="flex items-center gap-5 overflow-x-auto border-b border-crm-line bg-crm-surface px-6 py-2.5 text-sm">
        {views.map((v) => (
          <button key={v} type="button" className="flex shrink-0 items-center gap-1.5 text-muted-foreground hover:text-foreground">
            <Pin className="size-3.5" />
            {v}
          </button>
        ))}
        <span className="shrink-0 rounded-md bg-crm-canvas px-3 py-1 text-sm font-semibold text-foreground">
          All Quotes
        </span>
        <MoreHorizontal className="size-5 shrink-0 text-muted-foreground" />
      </div>

      {/* Toolbar */}
      <div className="flex min-h-14 flex-wrap items-center gap-2 border-b border-crm-line bg-crm-surface px-6 py-2">
        {anySelected ? (
          <>
            <span className="text-sm"><strong>{selected.length}</strong> Records Selected.</span>
            <button type="button" onClick={() => setSelected([])} className="text-sm font-medium text-crm-accent">Clear</button>
            <Button variant="outline" className="ml-2 rounded-lg" onClick={() => toast("Send Email")}>Send Email</Button>
            <BulkActionsMenu onExportPDF={openExportPDF} onPrintPreview={openPrintPreview} onPrintMailingLabels={openPrintMailingLabels} />
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
              {[List, Columns3, TableIcon, Clock].map((Icon, i) => (
                <button key={i} type="button" className={cn("grid size-8 place-items-center rounded-md hover:bg-crm-canvas", i === 0 && "bg-crm-canvas text-crm-accent")}>
                  <Icon className="size-[18px]" />
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="flex overflow-hidden rounded-lg bg-crm-accent text-crm-nav-foreground">
                <button type="button" className="px-4 py-2 text-sm font-semibold">Create Quote</button>
                <span className="w-px bg-white/25" />
                <button type="button" className="grid w-8 place-items-center"><ChevronDown className="size-4" /></button>
              </div>
              <ModuleActionsMenu onExportPDF={openExportPDF} onPrintPreview={openPrintPreview} />
            </div>
          </>
        )}
      </div>

      {/* Table */}
      <div className="flex min-h-0 flex-1 gap-4 overflow-hidden bg-crm-canvas p-4">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-lg border border-crm-line bg-crm-surface">
          <div className="min-h-0 flex-1 overflow-auto">
            <table className="w-full min-w-[900px] border-collapse text-sm">
              <thead className="sticky top-0 bg-crm-surface">
                <tr className="border-b border-crm-line text-left text-muted-foreground">
                  <th className="w-12 px-4 py-3">
                    <Checkbox checked={allSelected} onCheckedChange={(v) => setSelected(v ? quotes.map((q) => q.id) : [])} />
                  </th>
                  {["Subject", "Quote Number", "Account Name", "Stage", "Valid Until", "Owner", "Amount"].map((h) => (
                    <th key={h} className="border-l border-crm-line px-4 py-3 font-medium">{h}</th>
                  ))}
                  <th className="w-10 px-2"><SlidersHorizontal className="size-4" /></th>
                </tr>
              </thead>
              <tbody>
                {quotes.map((q) => {
                  const isChecked = selected.includes(q.id);
                  return (
                    <tr key={q.id} className={cn("border-b border-crm-line hover:bg-crm-canvas", isChecked && "bg-crm-canvas")}>
                      <td className="px-4 py-3">
                        <Checkbox checked={isChecked} onCheckedChange={() => toggle(q.id)} />
                      </td>
                      <td className="px-4 py-3">
                        <Link to="/" className="font-medium text-crm-accent hover:underline">{q.subject}</Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{q.quoteNumber}</td>
                      <td className="px-4 py-3">{q.accountName}</td>
                      <td className="px-4 py-3">
                        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-medium", stageColors[q.stage] ?? "bg-gray-100 text-gray-700")}>{q.stage}</span>
                      </td>
                      <td className="px-4 py-3">{q.validUntil}</td>
                      <td className="px-4 py-3">{q.owner}</td>
                      <td className="px-4 py-3 font-medium">{q.amount}</td>
                      <td />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between border-t border-crm-line px-4 py-2.5 text-sm text-muted-foreground">
            <span>Total Records <strong className="text-foreground">{quotes.length}</strong></span>
            <span className="flex items-center gap-3">
              <ChevronLeft className="size-4" />
              1 to {quotes.length}
              <ChevronRightIcon className="size-4" />
            </span>
          </div>
        </div>
      </div>

      <PrintExportPanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        mode={panelMode}
        recordCount={selected.length || quotes.length}
        listViewExport={panelListViewExport}
      />
    </div>
  );
}

function BulkActionsMenu({ onExportPDF, onPrintPreview, onPrintMailingLabels }: { onExportPDF: () => void; onPrintPreview: () => void; onPrintMailingLabels: () => void }) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button type="button" className="inline-flex size-9 items-center justify-center rounded-lg border border-input bg-background transition-colors hover:bg-accent">
          <MoreHorizontal className="size-5" />
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content align="end" sideOffset={4} className="z-50 w-60 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-md">
          {bulkActions.map((item) =>
            item === "Print & Export" ? (
              <DropdownMenuPrimitive.Sub key={item}>
                <DropdownMenuPrimitive.SubTrigger className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2 text-[15px] outline-none transition-colors focus:bg-accent data-[state=open]:bg-accent">
                  {item} <ChevronRightIcon className="ml-auto size-4" />
                </DropdownMenuPrimitive.SubTrigger>
                <DropdownMenuPrimitive.Portal>
                  <DropdownMenuPrimitive.SubContent sideOffset={4} className="z-50 w-56 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-md">
                    <DropdownMenuPrimitive.Item className="flex cursor-default select-none items-center rounded-lg px-3 py-2.5 text-[15px] outline-none focus:bg-accent" onSelect={onExportPDF}>Export to PDF</DropdownMenuPrimitive.Item>
                    <DropdownMenuPrimitive.Item className="flex cursor-default select-none items-center rounded-lg px-3 py-2.5 text-[15px] outline-none focus:bg-accent" onSelect={onPrintPreview}>Print preview</DropdownMenuPrimitive.Item>
                    <DropdownMenuPrimitive.Item className="flex cursor-default select-none items-center rounded-lg px-3 py-2.5 text-[15px] outline-none focus:bg-accent" onSelect={onPrintMailingLabels}>Print Mailing Labels</DropdownMenuPrimitive.Item>
                  </DropdownMenuPrimitive.SubContent>
                </DropdownMenuPrimitive.Portal>
              </DropdownMenuPrimitive.Sub>
            ) : (
              <DropdownMenuPrimitive.Item key={item} className="flex cursor-default select-none items-center rounded-lg px-3 py-2 text-[15px] outline-none focus:bg-accent" onSelect={() => toast(item)}>{item}</DropdownMenuPrimitive.Item>
            )
          )}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}

function ModuleActionsMenu({ onExportPDF, onPrintPreview }: { onExportPDF: () => void; onPrintPreview: () => void }) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button type="button" className="inline-flex size-9 items-center justify-center rounded-lg border border-input bg-background transition-colors hover:bg-accent">
          <MoreHorizontal className="size-5" />
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Portal>
        <DropdownMenuPrimitive.Content align="end" sideOffset={4} className="z-50 w-60 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-md">
          {moduleActions.map((item) => (
            <DropdownMenuPrimitive.Item
              key={item}
              className="flex cursor-default select-none items-center rounded-lg px-3 py-2 text-[15px] outline-none focus:bg-accent"
              onSelect={() => {
                if (item === "Export Quotes") return onExportPDF();
                if (item === "Print View") return onPrintPreview();
                toast(item);
              }}
            >
              {item}
            </DropdownMenuPrimitive.Item>
          ))}
        </DropdownMenuPrimitive.Content>
      </DropdownMenuPrimitive.Portal>
    </DropdownMenuPrimitive.Root>
  );
}


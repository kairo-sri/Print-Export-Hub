"use client";

import { ChevronRight, FileDown, Printer, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type PrintExportMode = "print" | "export";

interface PrintExportChooserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (mode: PrintExportMode) => void;
}

const options: {
  mode: PrintExportMode;
  icon: LucideIcon;
  label: string;
  description: string;
  action: string;
}[] = [
  {
    mode: "print",
    icon: Printer,
    label: "Print",
    description: "Preview and send to printer",
    action: "Open",
  },
  {
    mode: "export",
    icon: FileDown,
    label: "Export to PDF",
    description: "Download as a PDF file",
    action: "Download",
  },
];

export function PrintExportChooser({ open, onOpenChange, onSelect }: PrintExportChooserProps) {
  const handleSelect = (mode: PrintExportMode) => {
    onSelect(mode);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed left-1/2 top-24 !translate-x-[-50%] !translate-y-0 w-full max-w-md gap-0 rounded-2xl border-crm-line bg-crm-surface p-6 shadow-2xl [&>button]:hidden">
        <DialogHeader className="flex flex-row items-start justify-between space-y-0 text-left">
          <div>
            <DialogTitle className="text-xl font-semibold tracking-tight">Print &amp; Export</DialogTitle>
            <DialogDescription className="mt-1 text-sm text-muted-foreground">
              Choose an output format
            </DialogDescription>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="grid size-9 shrink-0 place-items-center rounded-lg bg-crm-canvas text-foreground/70 transition hover:bg-crm-canvas/70"
            aria-label="Close"
          >
            <X className="size-4" />
          </button>
        </DialogHeader>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {options.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.mode}
                type="button"
                onClick={() => handleSelect(option.mode)}
                className="flex flex-col items-start gap-3 rounded-xl border border-crm-line p-4 text-left transition hover:border-crm-accent hover:shadow-md"
              >
                <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-crm-canvas">
                  <Icon className="size-5 text-crm-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{option.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{option.description}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-crm-accent">
                    {option.action}
                    <ChevronRight className="size-3" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

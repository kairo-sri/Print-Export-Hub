"use client";

import { useState } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { cn } from "@/lib/utils";
import { PrintExportPanel } from "./print-export-panel";
import type { Mode } from "./print-export-panel";

// Non-inventory (Leads) Print Preview categories
const leadPrintCategories = [
  "Default Print",
  "Mail Merge Template",
  "Email Template",
  "Canvas Template",
];

// Non-inventory (Leads) Export to PDF categories
const leadExportCategories = [
  "Default Print",
  "Mail Merge Template",
  "Email Template",
  "Canvas Template",
];

const groups: string[][] = [
  ["Clone", "Share", "Delete"],
  ["Print & Export", "Send Email", "Mail Merge"],
  [
    "Customize Business Card",
    "Organize Lead Details",
    "Add Related List",
    "Review History",
    "Enroll to Cadence",
    "Add Kiosk",
    "Create Button",
    "Create Client Script",
  ],
];

export function LeadActionsMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [panelMode, setPanelMode] = useState<Mode>("print");

  const handlePrintExportSelect = (mode: Mode) => {
    setMenuOpen(false);
    setPanelMode(mode);
    setPanelOpen(true);
  };

  return (
    <>
      <DropdownMenuPrimitive.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuPrimitive.Trigger asChild>
          <button
            type="button"
            aria-label="More actions"
            className="inline-flex size-9 items-center justify-center rounded-full border border-input bg-background text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <MoreHorizontal className="size-5" />
          </button>
        </DropdownMenuPrimitive.Trigger>
        <DropdownMenuPrimitive.Portal>
          <DropdownMenuPrimitive.Content
            align="end"
            sideOffset={4}
            className={cn(
              "z-50 w-64 rounded-xl border bg-popover p-1.5 text-popover-foreground shadow-md",
              "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)"
            )}
          >
            {groups.map((group, i) => (
              <div key={group[0]}>
                {i > 0 && <DropdownMenuPrimitive.Separator className="my-1 h-px bg-muted" />}
                {group.map((item) =>
                  item === "Print & Export" ? (
                    <DropdownMenuPrimitive.Sub key={item}>
                      <DropdownMenuPrimitive.SubTrigger className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2.5 text-[15px] outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent">
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
                            onSelect={() => handlePrintExportSelect("print")}
                          >
                            Print Preview
                          </DropdownMenuPrimitive.Item>
                          <DropdownMenuPrimitive.Item
                            className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2.5 text-[15px] outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
                            onSelect={() => handlePrintExportSelect("export")}
                          >
                            Export to PDF
                          </DropdownMenuPrimitive.Item>
                        </DropdownMenuPrimitive.SubContent>
                      </DropdownMenuPrimitive.Portal>
                    </DropdownMenuPrimitive.Sub>
                  ) : (
                    <DropdownMenuPrimitive.Item
                      key={item}
                      className="relative flex cursor-default select-none items-center rounded-lg px-3 py-2.5 text-[15px] outline-none transition-colors focus:bg-accent focus:text-accent-foreground"
                      onSelect={() => toast(item)}
                    >
                      {item}
                    </DropdownMenuPrimitive.Item>
                  )
                )}
              </div>
            ))}
          </DropdownMenuPrimitive.Content>
        </DropdownMenuPrimitive.Portal>
      </DropdownMenuPrimitive.Root>

      <PrintExportPanel
        open={panelOpen}
        onOpenChange={setPanelOpen}
        mode={panelMode}
        printCategoryOverride={leadPrintCategories}
        exportCategoryOverride={leadExportCategories}
        singleRecord
      />
    </>
  );
}

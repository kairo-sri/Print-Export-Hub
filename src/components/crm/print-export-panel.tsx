"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Download, FileDown, Info, Printer, Search, ZoomIn, ZoomOut } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { QuoteDocument } from "./quote-document";
import { LeadDocument } from "./lead-document";
import { EmailDocument } from "./email-document";
import { MailingLabelsDocument } from "./mailing-labels-document";
import { LeadsTableDocument } from "./leads-table-document";
import { ServiceReportDocument } from "./service-report-document";

export type Mode = "print" | "export" | "mailing" | "listprint";

const printCategories = ["Inventory Templates", "Mail Merge Template", "Canvas Template"];
const printViewCategories = [
  "Inventory Templates",
  "Email Templates",
  "Mail Merge Templates",
  "Canvas View",
  "List View",
];
const exportCategories = [
  "Inventory Template",
  "Mail Merge Template",
  "Canvas Template",
];
const listExportCategories = [
  "Inventory Template",
  "Email Template",
  "Mail Merge Template",
  "Canvas Template",
  "List View",
];
const inventoryTemplates = ["Quote Template", "Quote Template 1", "Quote Template 2"];
const mailMergeTemplates = ["Quotes Mail merge Template", "Quotes Mail merge Template 1"];
const emailTemplates = ["Employee Referral", "Welcome Email", "Follow up Email"];

const paperFormats = ["A4 (794 x 1123 px)", "Letter (816 x 1056 px)"];
const mergeFieldGroups: { module: string; fields: string[] }[] = [
  {
    module: "Contacts",
    fields: ["DOB", "EmailID", "Phonenumber"],
  },
];
const canvasMailingTemplates = [
  "Default Mailing Label",
  "Compact Address Label",
  "Wide Format Label",
  "Return Address Label",
  "Shipping Label",
];
const canvasPrintViewTemplates = [
  "Quote Template 1",
  "Quote Template 2",
  "Standard Quote Layout",
  "Minimal Canvas Template",
  "Detailed Quote View",
];
const printRecordOptions = ["Per Page", "All Pages"];
const pdfGenerators = ["Primary PDF Generator", "Alternate PDF Generator"];

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-medium text-crm-label">{children}</p>;
}

function parsePaperFormat(value: string) {
  if (value.startsWith("A4")) return "A4";
  if (value.startsWith("Letter")) return "Letter";
  return value;
}

export function PrintExportPanel({
  open,
  onOpenChange,
  mode,
  initialCategory,
  recordCount,
  listViewExport,
  listExportCategoryOverride,
  printViewCategoryOverride,
  printCategoryOverride,
  exportCategoryOverride,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: Mode;
  initialCategory?: string | undefined;
  recordCount?: number | undefined;
  listViewExport?: boolean;
  listExportCategoryOverride?: string[];
  printViewCategoryOverride?: string[];
  printCategoryOverride?: string[];
  exportCategoryOverride?: string[];
}) {
  const [category, setCategory] = useState(initialCategory ?? "");
  const [template, setTemplate] = useState("");
  const [printViewTemplate, setPrintViewTemplate] = useState("");
  const [printCategory, setPrintCategory] = useState("");
  const canvasRecords =
    mode === "print" && initialCategory === "Canvas Template" && !!recordCount;
  const [layout, setLayout] = useState("portrait");
  const [paperSize, setPaperSize] = useState("letter");
  const [fileName, setFileName] = useState("QT_Zoho Employees (General Stay)");
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [password, setPassword] = useState("");
  const [pwPopoverOpen, setPwPopoverOpen] = useState(false);
  const [pwQuery, setPwQuery] = useState("");
  const [setDefault, setSetDefault] = useState(false);
  const [printRecord, setPrintRecord] = useState("Per Page");
  const [margin, setMargin] = useState(0);
  const [marginSame, setMarginSame] = useState(true);
  const [viewAs, setViewAs] = useState("pdf");
  const [generator, setGenerator] = useState("Primary PDF Generator");
  const [format, setFormat] = useState("");
  const [labelHeight, setLabelHeight] = useState(150);
  const [labelColumns, setLabelColumns] = useState("2");
  const [labelPaper, setLabelPaper] = useState("a4");
  const [labelCategory, setLabelCategory] = useState("Default mailing labels");
  const [columnSize, setColumnSize] = useState("Actual Size");
  const [pageOrder, setPageOrder] = useState("Over then down");
  const [fontSize, setFontSize] = useState("Small");
  const [rowNumber, setRowNumber] = useState(true);
  const [gridLines, setGridLines] = useState(true);
  const [headerViewName, setHeaderViewName] = useState(true);
  const [headerDate, setHeaderDate] = useState(true);
  const [footerPageNumber, setFooterPageNumber] = useState(true);
  const [listPrintCategory, setListPrintCategory] = useState("");
  const [listPrintTemplate, setListPrintTemplate] = useState("");
  const [downloadMode, setDownloadMode] = useState<"single" | "individual">("individual");
  const [zoom, setZoom] = useState(75);
  const [currentPage, setCurrentPage] = useState(1);
  const [listPrintPage, setListPrintPage] = useState(1);
  const [canvasMailingTemplate, setCanvasMailingTemplate] = useState("");
  const [switchToOpen, setSwitchToOpen] = useState(false);
  const switchToRef = useRef<HTMLDivElement>(null);


  const handleFormatChange = (value: string) => {
    setFormat(value);
    if (value.startsWith("A4")) setPaperSize("a4");
    else if (value.startsWith("Letter")) setPaperSize("letter");
  };

  useEffect(() => {
    setCategory(initialCategory ?? "");
    setTemplate("");
    setPrintViewTemplate(
      mode === "print" && initialCategory === "Canvas Template" && recordCount ? "Test" : "",
    );
    setPrintCategory("");
    setListPrintCategory("");
    setListPrintTemplate("");
    setFormat(mode === "export" ? "" : "A4 (794 x 1123 px)");
  }, [mode, initialCategory, recordCount]);

  const isCanvas = mode === "print" && category === "Canvas Template";
  const isExportCanvas = mode === "export" && category === "Canvas Template";
  const isMailMerge = mode === "print" && category === "Mail Merge Template";
  const isInventory = mode === "print" && category === "Inventory Templates";
  const isDefaultPrint = mode === "print" && category === "Default Print";
  const isPrintEmailTemplate = mode === "print" && category === "Email Template";
  const isPrintListView = mode === "print" && printCategory === "List View";
  const categoryOptions =
    mode === "print"
      ? (printCategoryOverride ?? printCategories)
      : (exportCategoryOverride ?? exportCategories);
  const secondLabel = isCanvas
    ? "Choose Paper format"
    : isMailMerge
      ? "Choose a Mail Merge Template :"
      : isPrintEmailTemplate
        ? "Choose an Email Template"
        : "Choose an Inventory Template";
  const secondOptions = isCanvas
    ? paperFormats
    : isMailMerge
      ? mailMergeTemplates
      : isPrintEmailTemplate
        ? emailTemplates
        : inventoryTemplates;

  const exportTemplateOptions =
    category === "Mail Merge Template"
      ? mailMergeTemplates
      : category === "Canvas Template"
        ? canvasPrintViewTemplates
        : category === "Email Template"
          ? emailTemplates
          : inventoryTemplates;
  const exportTemplateLabel =
    category === "Mail Merge Template"
      ? "Choose a Mail Merge Template"
      : category === "Canvas Template"
        ? "Choose Print view Templates"
        : category === "Email Template"
          ? "Choose an Email Template"
          : "Choose an Inventory Template";
  // List-view export: category drives whether a paper format is picked first
  const listExportNeedsFormat =
    !!listViewExport && category === "Canvas Template";
  const isListViewCategory = !!listViewExport && category === "List View";
  const listExportTemplateOptions =
    category === "Inventory Template"
      ? inventoryTemplates
      : category === "Email Template"
        ? emailTemplates
        : category === "Mail Merge Template"
          ? mailMergeTemplates
          : canvasPrintViewTemplates;
  const listExportTemplateLabel =
    category === "Inventory Template"
      ? "Choose an Inventory Template"
      : category === "Email Template"
        ? "Choose an Email Template :"
        : category === "Mail Merge Template"
          ? "Choose a Mail Merge Template :"
          : "Choose Print view Templates";
  const exportOptionsVisible =
    mode === "export" &&
    (listViewExport
      ? !!category && !!template && (!listExportNeedsFormat || !!format)
      : category === "Canvas Template"
        ? !!format && !!template
        : !!category && !!template);

  const close = () => onOpenChange(false);

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(() => {
        setCategory("");
        setTemplate("");
        setPrintViewTemplate("");
        setPrintCategory("");
        setListPrintCategory("");
        setListPrintTemplate("");
        setListPrintPage(1);
        setCanvasMailingTemplate("");
      }, 250);
    }
  };


  const handleCategoryChange = (value: string) => {
    setCategory(value);
    setTemplate("");
    if (mode === "export") setFormat("");
    setPrintViewTemplate("");
    setPrintCategory("");
  };

  const handleSecondChange = (value: string) => {
    setTemplate(value);
    if (isCanvas) {
      if (value.startsWith("A4")) setPaperSize("a4");
      else if (value.startsWith("Letter")) setPaperSize("letter");
    }
  };

  const paperLabel =
    isCanvas && template
      ? parsePaperFormat(template)
      : canvasRecords
        ? "A4"
        : paperSize === "a4"
          ? "A4"
          : "Letter";
  const layoutLabel = layout === "portrait" ? "Portrait" : "Landscape";
  const selectedPrintView = isCanvas && printViewTemplate ? printViewTemplate : template;

  const title = mode === "print" ? "Print Preview" : "Export to PDF";

  if (mode === "listprint") {
    const total = recordCount ?? 80;
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="left"
          className="flex w-full flex-col gap-0 bg-crm-canvas p-0 sm:max-w-none [&>button]:hidden"
        >
          <header className="flex items-center gap-3 border-b border-crm-line bg-crm-surface px-6 py-3">
            <SheetTitle className="text-xl">Print Preview</SheetTitle>
            <span className="text-sm text-muted-foreground">({total} Records)</span>
            <SheetDescription className="sr-only">
              Configure print settings for the selected list view records.
            </SheetDescription>
            <div className="ml-auto flex items-center gap-3">
              <Button variant="outline" className="rounded-lg" onClick={close}>
                Cancel
              </Button>
              <Button className="rounded-lg" onClick={() => toast("Printing records…")}>
                Print
              </Button>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
            <div className="relative flex min-h-0 flex-1 flex-col">
            <div className="relative min-h-0 flex-1 overflow-y-auto p-6">
              {listPrintCategory === "" ? (
                <div className="grid h-full place-items-center text-sm text-muted-foreground">
                  Choose a category to preview
                </div>
              ) : listPrintCategory === "Inventory Templates" ||
                listPrintCategory === "Mail Merge Template" ||
                listPrintCategory === "Email Templates" ? (
                listPrintTemplate ? (
                  listPrintCategory === "Email Templates" ? (
                    <EmailDocument templateName={listPrintTemplate} />
                  ) : (
                    <QuoteDocument />
                  )
                ) : (
                  <div className="grid h-full place-items-center text-sm text-muted-foreground">
                    Choose the template to preview
                  </div>
                )
              ) : listPrintCategory === "Canvas View" ? (
                printViewTemplate ? (
                  <ServiceReportDocument />
                ) : (
                  <div className="grid h-full place-items-center text-sm text-muted-foreground">
                    Choose the template to preview
                  </div>
                )
              ) : (
                <LeadsTableDocument
                  viewName={headerViewName}
                  currentDate={headerDate}
                  rowNumber={rowNumber}
                  gridLines={gridLines}
                  fontSize={fontSize}
                  pageNumber={footerPageNumber}
                />
              )}
            </div>

            {/* Bottom record navigation — shown when a template is selected */}
            {listPrintCategory !== "" && (listPrintTemplate || (listPrintCategory === "Canvas View" && printViewTemplate)) && (
              <div className="flex items-center justify-center gap-4 border-t border-crm-line bg-crm-surface px-6 py-2">
                <button
                  type="button"
                  aria-label="Previous record"
                  onClick={() => setListPrintPage((p) => Math.max(1, p - 1))}
                  disabled={listPrintPage <= 1}
                  className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-crm-canvas disabled:opacity-40"
                >
                  <ChevronUp className="size-4" />
                </button>
                <span className="min-w-[60px] text-center text-sm">
                  {listPrintPage} / {total}
                </span>
                <button
                  type="button"
                  aria-label="Next record"
                  onClick={() => setListPrintPage((p) => Math.min(total, p + 1))}
                  disabled={listPrintPage >= total}
                  className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-crm-canvas disabled:opacity-40"
                >
                  <ChevronDown className="size-4" />
                </button>
              </div>
            )}
            </div>

            <aside className="w-full shrink-0 space-y-5 overflow-y-auto border-t border-crm-line bg-crm-surface p-6 lg:w-80 lg:border-l lg:border-t-0">
              <div className="space-y-2">
                <FieldLabel>Choose category</FieldLabel>
                <Select
                  value={listPrintCategory}
                  onValueChange={(v) => {
                    setListPrintCategory(v);
                    setListPrintTemplate("");
                    setPrintViewTemplate("");
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {(printViewCategoryOverride ?? ["Inventory Templates", "Mail Merge Template", "Email Templates", "Default View", "Canvas View"]).map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {listPrintCategory === "" ? null : listPrintCategory === "Inventory Templates" ||
                listPrintCategory === "Mail Merge Template" ||
                listPrintCategory === "Email Templates" ? (
                <>
                  <div className="space-y-2">
                    <FieldLabel>
                      {listPrintCategory === "Mail Merge Template"
                        ? "Choose a Mail Merge Template :"
                        : listPrintCategory === "Email Templates"
                          ? "Choose an Email Template :"
                          : "Choose an Inventory Template"}
                    </FieldLabel>
                    <Select value={listPrintTemplate} onValueChange={setListPrintTemplate}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Templates" />
                      </SelectTrigger>
                      <SelectContent>
                        {(listPrintCategory === "Mail Merge Template"
                          ? mailMergeTemplates
                          : listPrintCategory === "Email Templates"
                            ? emailTemplates
                            : inventoryTemplates
                        ).map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {listPrintCategory !== "Mail Merge Template" && listPrintTemplate && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <FieldLabel>View as</FieldLabel>
                        <RadioGroup value={viewAs} onValueChange={setViewAs} className="flex gap-6">
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="html" id="lp-view-html" />
                            <Label htmlFor="lp-view-html">HTML</Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <RadioGroupItem value="pdf" id="lp-view-pdf" />
                            <Label htmlFor="lp-view-pdf">PDF</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {viewAs === "pdf" && (
                        <div className="space-y-4">
                          <FieldLabel>PDF Options</FieldLabel>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Layout:</p>
                            <RadioGroup value={layout} onValueChange={setLayout} className="flex gap-6">
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="portrait" id="lp-layout-portrait" />
                                <Label htmlFor="lp-layout-portrait">Portrait</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="landscape" id="lp-layout-landscape" />
                                <Label htmlFor="lp-layout-landscape">Landscape</Label>
                              </div>
                            </RadioGroup>
                          </div>
                          <div className="space-y-2">
                            <p className="text-sm text-muted-foreground">Paper Size:</p>
                            <RadioGroup value={paperSize} onValueChange={setPaperSize} className="flex gap-6">
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="a4" id="lp-paper-a4" />
                                <Label htmlFor="lp-paper-a4">A4</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <RadioGroupItem value="letter" id="lp-paper-letter" />
                                <Label htmlFor="lp-paper-letter">US Letter</Label>
                              </div>
                            </RadioGroup>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {listPrintTemplate && (
                    <div className="space-y-3 rounded-lg border border-crm-line bg-crm-canvas p-4">
                      <p className="text-sm leading-relaxed">
                        <span className="font-semibold">Info:</span> If you notice any misalignment,{" "}
                        <span className="font-semibold">switch to the Alternate PDF generator.</span>
                      </p>
                      <Select value={generator} onValueChange={setGenerator}>
                        <SelectTrigger className="bg-crm-surface">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {pdfGenerators.map((g) => (
                            <SelectItem key={g} value={g}>
                              {g}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {listPrintCategory === "Mail Merge Template" && (
                    <p className="text-sm text-muted-foreground">Monthly usage limit:5/1000</p>
                  )}
                </>
              ) : listPrintCategory === "Canvas View" ? (
                <>
                  <div className="space-y-2">
                    <FieldLabel>Paper Format</FieldLabel>
                    <Select value={format} onValueChange={handleFormatChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {paperFormats.map((f) => (
                          <SelectItem key={f} value={f}>
                            {f}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>Choose Print View</FieldLabel>
                    <Select value={printViewTemplate} onValueChange={setPrintViewTemplate}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {canvasPrintViewTemplates.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {printViewTemplate && (
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>
                          {format.startsWith("A4") ? "A4" : "Letter"} <Info className="inline size-3.5" /> • {layoutLabel}
                        </span>
                        <button
                          type="button"
                          className="text-crm-accent hover:underline"
                          onClick={() => setPrintViewTemplate("")}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>Print Record in</FieldLabel>
                    <Select value={printRecord} onValueChange={setPrintRecord}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {printRecordOptions.map((o) => (
                          <SelectItem key={o} value={o}>
                            {o}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <FieldLabel>Margin</FieldLabel>
                    </div>
                    <Slider value={[margin]} min={0} max={50} step={1} onValueChange={(v) => setMargin(v[0] ?? 0)} />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>50</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="margin-same-list"
                        checked={marginSame}
                        onCheckedChange={(v) => setMarginSame(!!v)}
                      />
                      <Label htmlFor="margin-same-list">Margin same for all sides</Label>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <FieldLabel>Paper Size</FieldLabel>
                    <Select value={paperSize} onValueChange={setPaperSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="letter">Letter (8.5 x 11 inches)</SelectItem>
                        <SelectItem value="a4">A4 (8.27 x 11.69 inches)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>Layout</FieldLabel>
                    <Select value={layout} onValueChange={setLayout}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="portrait">Portrait View</SelectItem>
                        <SelectItem value="landscape">Landscape View</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>Column Size</FieldLabel>
                    <Select value={columnSize} onValueChange={setColumnSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Actual Size">Actual Size</SelectItem>
                        <SelectItem value="Fit to Page">Fit to Page</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>Page Order</FieldLabel>
                    <Select value={pageOrder} onValueChange={setPageOrder}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Over then down">Over then down</SelectItem>
                        <SelectItem value="Down then over">Down then over</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>Font Size</FieldLabel>
                    <Select value={fontSize} onValueChange={setFontSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Small">Small</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3 border-t border-crm-line pt-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="row-number"
                        checked={rowNumber}
                        onCheckedChange={(v) => setRowNumber(!!v)}
                      />
                      <Label htmlFor="row-number">Include row number</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="grid-lines"
                        checked={gridLines}
                        onCheckedChange={(v) => setGridLines(!!v)}
                      />
                      <Label htmlFor="grid-lines">Include grid lines</Label>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-crm-line pt-4">
                    <FieldLabel>Headers</FieldLabel>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="header-view"
                        checked={headerViewName}
                        onCheckedChange={(v) => setHeaderViewName(!!v)}
                      />
                      <Label htmlFor="header-view">View Name</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="header-date"
                        checked={headerDate}
                        onCheckedChange={(v) => setHeaderDate(!!v)}
                      />
                      <Label htmlFor="header-date">Current Date</Label>
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-crm-line pt-4">
                    <FieldLabel>Footers</FieldLabel>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="footer-page"
                        checked={footerPageNumber}
                        onCheckedChange={(v) => setFooterPageNumber(!!v)}
                      />
                      <Label htmlFor="footer-page">Page Number</Label>
                    </div>
                  </div>
                </>
              )}
            </aside>

          </div>
        </SheetContent>
      </Sheet>
    );
  }

  if (mode === "mailing") {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="left"
          className="flex w-full flex-col gap-0 bg-crm-canvas p-0 sm:max-w-none [&>button]:hidden"
        >
          <header className="flex items-center gap-3 border-b border-crm-line bg-crm-surface px-6 py-3">
            <SheetTitle className="text-xl">Address Label Printer</SheetTitle>
            {!!recordCount && (
              <span className="text-sm text-muted-foreground">({recordCount} records)</span>
            )}
            <SheetDescription className="sr-only">
              Configure and print mailing labels for the selected records.
            </SheetDescription>
            <div className="ml-auto flex items-center gap-3">
              <Button variant="outline" className="rounded-lg" onClick={close}>
                Close
              </Button>
              <Button className="rounded-lg" onClick={() => toast("Printing mailing labels…")}>
                <Printer className="size-4" />
                Print
              </Button>
            </div>
          </header>

          <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <MailingLabelsDocument
                labelHeight={labelHeight}
                columns={Number(labelColumns)}
              />
            </div>

            <aside className="w-full shrink-0 space-y-6 overflow-y-auto border-t border-crm-line bg-crm-surface p-6 lg:w-80 lg:border-l lg:border-t-0">
              <div className="space-y-2">
                <FieldLabel>Choose Category</FieldLabel>
                <Select value={labelCategory} onValueChange={setLabelCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Default mailing labels">Default mailing labels</SelectItem>
                    <SelectItem value="Canvas mailing labels">Canvas mailing labels</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {labelCategory === "Default mailing labels" ? (
                <>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <FieldLabel>Label Height</FieldLabel>
                  <span className="text-sm text-muted-foreground">{labelHeight}px</span>
                </div>
                <Slider
                  value={[labelHeight]}
                  min={80}
                  max={320}
                  step={5}
                  onValueChange={(v) => setLabelHeight(v[0] ?? 150)}
                />
              </div>

              <div className="space-y-2">
                <FieldLabel>Labels per row</FieldLabel>
                <Select value={labelColumns} onValueChange={setLabelColumns}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 columns</SelectItem>
                    <SelectItem value="3">3 columns</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <FieldLabel>Paper Size</FieldLabel>
                <RadioGroup value={labelPaper} onValueChange={setLabelPaper} className="flex gap-6">
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="a4" id="label-a4" />
                    <Label htmlFor="label-a4">A4</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="letter" id="label-letter" />
                    <Label htmlFor="label-letter">Letter</Label>
                  </div>
                </RadioGroup>
              </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <FieldLabel>Choose Print View</FieldLabel>
                    <Select
                      value={canvasMailingTemplate}
                      onValueChange={setCanvasMailingTemplate}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a mailing label" />
                      </SelectTrigger>
                      <SelectContent>
                        {canvasMailingTemplates.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>Print Record in</FieldLabel>
                    <Select value={printRecord} onValueChange={setPrintRecord}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Per Page">Per Page</SelectItem>
                        <SelectItem value="Continuous">Continuous</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <FieldLabel>Margin</FieldLabel>
                    <Slider
                      value={[margin]}
                      min={0}
                      max={50}
                      step={1}
                      onValueChange={(v) => setMargin(v[0] ?? 0)}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>0</span>
                      <span>50</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="label-margin-same"
                      checked={marginSame}
                      onCheckedChange={(v) => setMarginSame(!!v)}
                    />
                    <Label htmlFor="label-margin-same">Margin same for all sides</Label>
                  </div>
                </>
              )}
            </aside>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        side="left"
        className="flex w-full flex-col gap-0 bg-crm-canvas p-0 sm:max-w-none [&>button]:hidden"
      >
        <header className="flex items-center gap-3 border-b border-crm-line bg-crm-surface px-6 py-3">
          <SheetTitle className="text-xl">{title}</SheetTitle>
          {mode === "export" && exportOptionsVisible && (
            <div className="relative" ref={switchToRef}>
              <button
                type="button"
                onClick={() => setSwitchToOpen((o) => !o)}
                className="flex items-center gap-1.5 rounded-lg border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent"
              >
                {downloadMode === "individual" ? "Switch to" : "Jump to"}
                {switchToOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
              </button>
              {switchToOpen && (
                <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-lg border bg-popover shadow-md">
                  <div className="flex items-center gap-2 border-b px-3 py-2">
                    <Search className="size-4 shrink-0 text-muted-foreground" />
                    <input
                      className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                      placeholder="Search"
                      autoFocus
                    />
                  </div>
                  {["Deal Alpha Project", "Q2 Car Sale Jackson", "Premium Package Upgrade", "Deal Sprint May", "Deal Blue Expansion", "Enterprise Contract"].map((record) => (
                    <button
                      key={record}
                      type="button"
                      className="block w-full px-4 py-2.5 text-left text-sm hover:bg-accent"
                      onClick={() => { toast(`Navigating to ${record}…`); setSwitchToOpen(false); }}
                    >
                      {record}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          {mode === "export" && !!recordCount && (
            <span className="text-sm text-muted-foreground font-medium">
              {recordCount} Record{recordCount > 1 ? "s" : ""} Selected
            </span>
          )}
          {canvasRecords && (
            <span className="text-sm text-muted-foreground">({recordCount} records)</span>
          )}
          <SheetDescription className="sr-only">
            Configure {mode === "print" ? "print" : "PDF export"} options for this quote.
          </SheetDescription>
          <div className="ml-auto flex items-center gap-3">
            {canvasRecords && (
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>1 - {recordCount}</span>
                <button type="button" aria-label="Previous record" className="text-muted-foreground">
                  <ChevronLeft className="size-5" />
                </button>
                <button type="button" aria-label="Next record" className="text-muted-foreground">
                  <ChevronRight className="size-5" />
                </button>
              </div>
            )}
            <Button variant="outline" className="rounded-lg" onClick={close}>
              Cancel
            </Button>
            {mode === "print" && (
              <Button className="rounded-lg" onClick={() => toast("Printing quote…")}>
                <Printer className="size-4" />
                Print
              </Button>
            )}
            {mode === "export" && (
              <Button className="rounded-lg" onClick={() => toast(downloadMode === "individual" ? "Downloading individual files…" : "Downloading PDF…")}>
                <Download className="size-4" />
                Download
              </Button>
            )}
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <div className="relative flex min-h-0 flex-1 flex-col">
          <div className="relative min-h-0 flex-1 overflow-y-auto p-6">
            {canvasRecords &&
              (printCategory === "Canvas View" ? !!printViewTemplate : !!listPrintTemplate) && (
              <span className="absolute right-8 top-8 rounded-md border border-crm-line bg-crm-surface px-3 py-1.5 text-sm">
                1 / {recordCount} Pages
              </span>
            )}
            {isPrintListView || isListViewCategory ? (
              <>
                <div className="mx-auto flex max-w-4xl justify-end">
                  <span className="mb-2 rounded-md bg-crm-surface px-3 py-1 text-sm shadow-sm">
                    1 / 18 Pages
                  </span>
                </div>
                <LeadsTableDocument
                  viewName={headerViewName}
                  currentDate={headerDate}
                  rowNumber={rowNumber}
                  gridLines={gridLines}
                  fontSize={fontSize}
                  pageNumber={footerPageNumber}
                />
              </>
            ) : canvasRecords ? (
              printCategory === "" ? (
                <p className="grid h-full place-items-center text-sm text-muted-foreground">
                  Choose a category to preview
                </p>
              ) : printCategory === "Canvas View" ? (
                printViewTemplate ? (
                  <LeadDocument />
                ) : (
                  <p className="grid h-full place-items-center text-sm text-muted-foreground">
                    Choose the template to preview
                  </p>
                )
              ) : printCategory === "Email Templates" ? (
                listPrintTemplate ? (
                  <EmailDocument templateName={listPrintTemplate} />
                ) : (
                  <p className="grid h-full place-items-center text-sm text-muted-foreground">
                    Choose the template to preview
                  </p>
                )
              ) : listPrintTemplate ? (
                <LeadDocument />
              ) : (
                <p className="grid h-full place-items-center text-sm text-muted-foreground">
                  Choose the template to preview
                </p>
              )
            ) : isDefaultPrint ? (
              <LeadDocument name="Stepen" />
            ) : template ? (
              (listViewExport && category === "Email Template") || isPrintEmailTemplate ? (
                <EmailDocument templateName={template} />
              ) : (
                <QuoteDocument />
              )
            ) : (
              <p className="grid h-full place-items-center text-sm text-muted-foreground">
                Choose the template to preview
              </p>
            )}
          </div>

          {/* Bottom navigation + zoom bar — export mode */}
          {mode === "export" && exportOptionsVisible && (
            <div className="flex items-center justify-center gap-4 border-t border-crm-line bg-crm-surface px-6 py-2">
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-crm-canvas disabled:opacity-40"
                disabled={currentPage <= 1}
              >
                {downloadMode === "single" ? <ChevronDown className="size-4" /> : <ChevronLeft className="size-4" />}
              </button>
              <span className="min-w-[60px] text-center text-sm">
                {currentPage} / 45
              </span>
              <button
                type="button"
                aria-label="Next page"
                onClick={() => setCurrentPage((p) => Math.min(45, p + 1))}
                className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-crm-canvas disabled:opacity-40"
                disabled={currentPage >= 45}
              >
                {downloadMode === "single" ? <ChevronUp className="size-4" /> : <ChevronRight className="size-4" />}
              </button>
              <span className="mx-2 h-4 w-px bg-border" />
              <button
                type="button"
                aria-label="Zoom out"
                onClick={() => setZoom((z) => Math.max(25, z - 25))}
                className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-crm-canvas"
              >
                <ZoomOut className="size-4" />
              </button>
              <span className="min-w-[40px] text-center text-sm">{zoom}%</span>
              <button
                type="button"
                aria-label="Zoom in"
                onClick={() => setZoom((z) => Math.min(200, z + 25))}
                className="grid size-7 place-items-center rounded-full text-muted-foreground hover:bg-crm-canvas"
              >
                <ZoomIn className="size-4" />
              </button>
            </div>
          )}
          </div>

          <aside className="w-full shrink-0 space-y-6 overflow-y-auto border-t border-crm-line bg-crm-surface p-6 lg:w-80 lg:border-l lg:border-t-0">
            {!canvasRecords && mode === "export" && (
              <div className="space-y-2">
                <FieldLabel>{listViewExport ? "Choose Category" : "Template Category"}</FieldLabel>
                <Select value={category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder={listViewExport ? "Select category" : "Select Templates"} />
                  </SelectTrigger>
                  <SelectContent>
                    {(listViewExport ? (listExportCategoryOverride ?? listExportCategories) : categoryOptions).map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {!canvasRecords && mode === "export" && (listExportNeedsFormat || isExportCanvas) && (
              <div className="space-y-2">
                <FieldLabel>Choose Format</FieldLabel>
                <Select value={format} onValueChange={handleFormatChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Format" />
                  </SelectTrigger>
                  <SelectContent>
                    {paperFormats.map((f) => (
                      <SelectItem key={f} value={f}>
                        {f}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {!canvasRecords &&
              mode === "export" &&
              !isListViewCategory &&
              (listViewExport
                ? !!category && (!listExportNeedsFormat || !!format)
                : isExportCanvas
                  ? !!format
                  : !!category) && (
                <div className="space-y-2">
                  <FieldLabel>
                    {listViewExport ? listExportTemplateLabel : exportTemplateLabel}
                  </FieldLabel>
                  <Select value={template} onValueChange={setTemplate}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Templates" />
                    </SelectTrigger>
                    <SelectContent>
                      {(listViewExport ? listExportTemplateOptions : exportTemplateOptions).map(
                        (t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                </div>
              )}

            {mode === "export" && exportOptionsVisible && (
              <div className="space-y-2">
                <FieldLabel>Export as</FieldLabel>
                <RadioGroup
                  value={downloadMode}
                  onValueChange={(v) => setDownloadMode(v as "single" | "individual")}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="individual" id="export-individual" />
                    <Label htmlFor="export-individual">Separate file</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="single" id="export-single" />
                    <Label htmlFor="export-single">Single file (Combined)</Label>
                  </div>
                </RadioGroup>
              </div>
            )}

            {isListViewCategory && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <FieldLabel>Paper Size</FieldLabel>
                  <Select value={paperSize} onValueChange={setPaperSize}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="letter">Letter (8.5 x 11 inches)</SelectItem>
                      <SelectItem value="a4">A4 (8.27 x 11.69 inches)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Layout</FieldLabel>
                  <Select value={layout} onValueChange={setLayout}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="portrait">Portrait View</SelectItem>
                      <SelectItem value="landscape">Landscape View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Column Size</FieldLabel>
                  <Select value={columnSize} onValueChange={setColumnSize}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Actual Size">Actual Size</SelectItem>
                      <SelectItem value="Fit to Page">Fit to Page</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Page Order</FieldLabel>
                  <Select value={pageOrder} onValueChange={setPageOrder}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Over then down">Over then down</SelectItem>
                      <SelectItem value="Down then over">Down then over</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <FieldLabel>Font Size</FieldLabel>
                  <Select value={fontSize} onValueChange={setFontSize}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Small">Small</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3 border-t border-crm-line pt-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="lv-row-number" checked={rowNumber} onCheckedChange={(v) => setRowNumber(!!v)} />
                    <Label htmlFor="lv-row-number">Include row number</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="lv-grid-lines" checked={gridLines} onCheckedChange={(v) => setGridLines(!!v)} />
                    <Label htmlFor="lv-grid-lines">Include grid lines</Label>
                  </div>
                </div>
                <div className="space-y-3 border-t border-crm-line pt-4">
                  <FieldLabel>Headers</FieldLabel>
                  <div className="flex items-center gap-2">
                    <Checkbox id="lv-header-view" checked={headerViewName} onCheckedChange={(v) => setHeaderViewName(!!v)} />
                    <Label htmlFor="lv-header-view">View Name</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="lv-header-date" checked={headerDate} onCheckedChange={(v) => setHeaderDate(!!v)} />
                    <Label htmlFor="lv-header-date">Current Date</Label>
                  </div>
                </div>
                <div className="space-y-3 border-t border-crm-line pt-4">
                  <FieldLabel>Footers</FieldLabel>
                  <div className="flex items-center gap-2">
                    <Checkbox id="lv-footer-page" checked={footerPageNumber} onCheckedChange={(v) => setFooterPageNumber(!!v)} />
                    <Label htmlFor="lv-footer-page">Page Number</Label>
                  </div>
                </div>
              </div>
            )}

            {!canvasRecords && mode === "print" && (
              <>
                <div className="space-y-2">
                  <FieldLabel>Choose a Template Category</FieldLabel>
                  <Select value={category} onValueChange={handleCategoryChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Templates" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {!isDefaultPrint && (
                  <div className="space-y-2">
                    <FieldLabel>{secondLabel}</FieldLabel>
                    <Select value={template} onValueChange={handleSecondChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Templates" />
                      </SelectTrigger>
                      <SelectContent>
                        {secondOptions.map((t) => (
                          <SelectItem key={t} value={t}>
                            {t}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </>
            )}

            {((isInventory && template) || isDefaultPrint) && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <FieldLabel>View as</FieldLabel>
                  <RadioGroup value={viewAs} onValueChange={setViewAs} className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="html" id="view-html" />
                      <Label htmlFor="view-html">HTML</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="pdf" id="view-pdf" />
                      <Label htmlFor="view-pdf">PDF</Label>
                    </div>
                  </RadioGroup>
                </div>

                {viewAs === "pdf" && (
                  <div className="space-y-4">
                    <FieldLabel>PDF Options</FieldLabel>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Layout:</p>
                      <RadioGroup value={layout} onValueChange={setLayout} className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="portrait" id="print-layout-portrait" />
                          <Label htmlFor="print-layout-portrait">Portrait</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="landscape" id="print-layout-landscape" />
                          <Label htmlFor="print-layout-landscape">Landscape</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Paper Size:</p>
                      <RadioGroup
                        value={paperSize}
                        onValueChange={setPaperSize}
                        className="flex gap-6"
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="a4" id="print-paper-a4" />
                          <Label htmlFor="print-paper-a4">A4</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="letter" id="print-paper-letter" />
                          <Label htmlFor="print-paper-letter">US Letter</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </div>
            )}

            {((isInventory || isMailMerge) && template || isDefaultPrint) && (
              <div className="space-y-3 rounded-lg border border-crm-line bg-crm-canvas p-4">
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">Info:</span> If you notice any misalignment,{" "}
                  <span className="font-semibold">switch to the Alternate PDF generator.</span>
                </p>
                <Select value={generator} onValueChange={setGenerator}>
                  <SelectTrigger className="bg-crm-surface">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {pdfGenerators.map((g) => (
                      <SelectItem key={g} value={g}>
                        {g}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {isCanvas && (template || canvasRecords) && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <FieldLabel>Choose Print View</FieldLabel>
                  <Select value={printViewTemplate} onValueChange={setPrintViewTemplate}>
                    <SelectTrigger className="bg-crm-surface">
                      <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                      {canvasPrintViewTemplates.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {printViewTemplate && (
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>
                        {paperLabel} <Info className="inline size-3.5" /> • {layoutLabel}
                      </span>
                      <button
                        type="button"
                        className="text-crm-accent hover:underline"
                        onClick={() => setPrintViewTemplate("")}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>

                {printViewTemplate && (
                  <>
                    <div className="space-y-2">
                      <FieldLabel>Print Record in</FieldLabel>
                      <Select value={printRecord} onValueChange={setPrintRecord}>
                        <SelectTrigger className="bg-crm-surface">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {printRecordOptions.map((o) => (
                            <SelectItem key={o} value={o}>
                              {o}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <FieldLabel>Margin</FieldLabel>
                      </div>
                      <Slider
                        value={[margin]}
                        min={0}
                        max={50}
                        step={1}
                        onValueChange={(v) => setMargin(v[0] ?? 0)}
                      />
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>0</span>
                        <span>50</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="margin-same-canvas-print"
                          checked={marginSame}
                          onCheckedChange={(v) => setMarginSame(!!v)}
                        />
                        <Label htmlFor="margin-same-canvas-print">Margin same for all sides</Label>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {exportOptionsVisible && (
              <div className="space-y-2">
                <FieldLabel>File Name</FieldLabel>
                <Input value={fileName} onChange={(e) => setFileName(e.target.value)} />
                {downloadMode === "individual" ? (
                  <p className="rounded-md bg-crm-canvas px-3 py-2 text-xs text-muted-foreground">
                    Type &quot;#&quot; to insert merge field.
                  </p>
                ) : (
                  <p className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                    <span className="font-semibold">Note:</span> Merge fields are not supported for &apos;Single File (Combined)&apos;
                  </p>
                )}
              </div>
            )}

            {exportOptionsVisible && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <FieldLabel>Layout</FieldLabel>
                  <RadioGroup value={layout} onValueChange={setLayout} className="flex gap-6">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="portrait" id="layout-portrait" />
                      <Label htmlFor="layout-portrait">Portrait</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value="landscape" id="layout-landscape" />
                      <Label htmlFor="layout-landscape">Landscape</Label>
                    </div>
                  </RadioGroup>
                </div>

                {!(listViewExport ? listExportNeedsFormat : isExportCanvas) && (
                  <div className="space-y-2">
                    <FieldLabel>Paper Size</FieldLabel>
                    <RadioGroup
                      value={paperSize}
                      onValueChange={setPaperSize}
                      className="flex gap-6"
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="a4" id="paper-a4" />
                        <Label htmlFor="paper-a4">A4</Label>
                      </div>
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="letter" id="paper-letter" />
                        <Label htmlFor="paper-letter">US Letter</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}
              </div>
            )}

            {exportOptionsVisible && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <FieldLabel>Password Protection</FieldLabel>
                  <Switch
                    checked={passwordProtection}
                    onCheckedChange={(v) => {
                      setPasswordProtection(v);
                      if (!v) {
                        setPassword("");
                        setPwPopoverOpen(false);
                      }
                    }}
                    aria-label="Password protection"
                  />
                </div>
                {passwordProtection && (
                  <Popover open={pwPopoverOpen} onOpenChange={setPwPopoverOpen}>
                    <PopoverAnchor asChild>
                      <Input
                        value={password}
                        placeholder="Enter password"
                        onChange={(e) => {
                          const value = e.target.value;
                          setPassword(value);
                          const idx = value.lastIndexOf("#");
                          if (idx !== -1 && !value.slice(idx + 1).includes(" ")) {
                            setPwQuery(value.slice(idx + 1).toLowerCase());
                            setPwPopoverOpen(true);
                          } else {
                            setPwPopoverOpen(false);
                          }
                        }}
                      />
                    </PopoverAnchor>
                    <PopoverContent
                      align="start"
                      className="w-64 max-h-80 overflow-y-auto p-0"
                      onOpenAutoFocus={(e) => e.preventDefault()}
                    >
                      {(() => {
                        const groups = mergeFieldGroups
                          .map((g) => ({
                            ...g,
                            fields: g.fields.filter((f) =>
                              f.toLowerCase().includes(pwQuery),
                            ),
                          }))
                          .filter((g) => g.fields.length > 0);
                        if (groups.length === 0) {
                          return (
                            <p className="px-3 py-2 text-sm text-muted-foreground">
                              No matching fields
                            </p>
                          );
                        }
                        return groups.map((g) => (
                          <div key={g.module} className="py-1">
                            <p className="px-3 py-1.5 text-xs font-semibold text-muted-foreground">
                              {g.module}
                            </p>
                            {g.fields.map((f) => (
                              <button
                                key={f}
                                type="button"
                                className="block w-full px-3 py-2 text-left text-sm hover:bg-accent"
                                onClick={() => {
                                  setPassword((prev) => {
                                    const idx = prev.lastIndexOf("#");
                                    if (idx === -1) return prev;
                                    return `${prev.slice(0, idx)}#${f}#`;
                                  });
                                  setPwPopoverOpen(false);
                                }}
                              >
                                {f}
                              </button>
                            ))}
                          </div>
                        ));
                      })()}
                      <p className="sticky bottom-0 border-t bg-popover px-3 py-2 text-xs text-muted-foreground">
                        Only Date, Email and Number type fields are allowed. You can also type any
                        characters, numbers or special characters.
                      </p>
                    </PopoverContent>
                  </Popover>
                )}
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="set-default"
                    checked={setDefault}
                    onCheckedChange={(v) => setSetDefault(v === true)}
                  />
                  <Label htmlFor="set-default">Set as default file format for the org</Label>
                </div>
              </div>
            )}

            {mode === "print" && !canvasRecords && (
              <div className="space-y-2 pt-2">
                <div className="flex gap-3">
                  <Button className="rounded-lg" onClick={() => toast("Printing quote…")}>
                    <Printer className="size-4" />
                    Print
                  </Button>
                  <Button variant="outline" className="rounded-lg" onClick={close}>
                    Cancel
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Monthly usage limit:0/1000</p>
              </div>
            )}
          </aside>
        </div>
      </SheetContent>
    </Sheet>
  );
}

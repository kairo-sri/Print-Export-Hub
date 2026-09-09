"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Sparkles,
  Star,
  ChevronDown,
  ChevronRight,
  Plus,
  Settings2,
  Users,
  Type,
  Image,
  Minus,
  Square,
  Columns3,
  Table2,
  Layers,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link,
  Link2Off,
  ImageIcon,
  Undo2,
  Redo2,
  ChevronUp,
  X,
  Pencil,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";

// ─── Data ────────────────────────────────────────────────────────────────────

type SetupItem = string | { label: string; new: boolean };

const setupSections: { title: string; items: SetupItem[] }[] = [
  {
    title: "General",
    items: ["Personal Settings", "Users", "Company Settings", "Calendar Booking", "Motivator"],
  },
  {
    title: "Security Control",
    items: [
      "Profiles", "Roles and Sharing", "Zoho Mail Add-on Users", "Compliance Settings",
      "Territory Management", "Trusted Domain", "Support Access", "Single Sign-On(SAML)",
      "Security Policies", "Active Directory Sync", "Login History", "Audit Log",
    ],
  },
  {
    title: "Channels",
    items: ["Email", "Telephony", "Business Messaging", "Notification SMS", "Webforms", "Social", "Chat", "Portals"],
  },
  {
    title: "Customization",
    items: [
      "Modules and Fields", "Pipelines", "Wizards", "Kiosk Studio",
      { label: "Canvas", new: true }, "Customize Home page", "Translations",
      "Templates", { label: "Teamspace", new: true },
    ],
  },
  {
    title: "Automation",
    items: ["Workflow Rules", "Actions", "Schedules", "Assignment", "Scoring Rules", "Cadences"],
  },
  {
    title: "Process Management",
    items: ["Blueprint", "Approval Processes", "Review Processes", { label: "Connected Workflow", new: true }],
  },
  {
    title: "Experience Center",
    items: ["Signals", "CommandCenter", "Segmentation"],
  },
  {
    title: "Data Administration",
    items: ["Import", "Export", "Data Backup", "Storage", "Recycle Bin", "Admin Tools", "Sandbox", "Copy Customization"],
  },
  {
    title: "Marketplace",
    items: ["All", "Zoho", "Google", "Microsoft", "Facebook", "LinkedIn", "QuickBooks"],
  },
  {
    title: "Developer Hub",
    items: [
      { label: "MCP for AI Agents", new: true }, "APIs and SDKs", "Connections",
      "Variables", "Circuits", "Functions", "Widgets", "Data Model",
      { label: "SlyteUI", new: true }, "Queries",
    ],
  },
];

const crmModules = [
  "Contacts", "Leads", "Quotes", "Deals", "Accounts",
  "Invoices", "Sales Orders", "Purchase Orders", "Products",
];

const templateTabs = ["Email", "Inventory", "Mail Merge"] as const;
type TemplateTab = typeof templateTabs[number];

const templateSubNav = [
  { label: "All Templates", group: false },
  { label: "Favorites", group: false },
  { label: "Associated Templates", group: false },
  { label: "Created by me", group: false },
  { label: "Shared with me", group: false },
  { label: "Public Email Templates", group: true },
  { label: "Bulk Mails", group: true },
  { label: "Thank you Emails", group: true },
  { label: "Zoho Sign", group: true },
];

const templates = [
  { name: "Test", module: "Quotes", preview: "Test", modifiedBy: "Sridhar", modifiedDate: "Aug 20", lastUsed: "", stats: "" },
  { name: "Heeny penny", module: "Leadzz", preview: "Henny penny", modifiedBy: "Sridhar", modifiedDate: "Jul 30", lastUsed: "Jul 30", stats: "0%\n0/1" },
  { name: "Api 2", module: "Leadzz", preview: "api 2", modifiedBy: "Sridhar", modifiedDate: "Jul 22", lastUsed: "Jul 22", stats: "" },
  { name: "Api Test", module: "Leadzz", preview: "Api Test", modifiedBy: "Sridhar", modifiedDate: "Jul 22", lastUsed: "Jul 22", stats: "0%\n0/1" },
  { name: "Pacifico", module: "Leadzz", preview: "Pacifico test", modifiedBy: "Sridhar", modifiedDate: "Jul 22", lastUsed: "Jul 22", stats: "0%\n0/1" },
  { name: "Invoices Zoho Sign Template", module: "Invoices", preview: "$SENDER_NAME$ from $ORG_NAME$ requests you to sign ...", modifiedBy: "Sridhar", modifiedDate: "Jun 25", lastUsed: "", stats: "" },
  { name: "Purchase Orders Zoho Sign Template", module: "Purchase Orders", preview: "$SENDER_NAME$ from $ORG_NAME$ requests you to sign ...", modifiedBy: "Sridhar", modifiedDate: "Jun 25", lastUsed: "", stats: "" },
  { name: "Sales Orders Zoho Sign Template", module: "Sales Orders", preview: "$SENDER_NAME$ from $ORG_NAME$ requests you to sign ...", modifiedBy: "Sridhar", modifiedDate: "Jun 25", lastUsed: "", stats: "" },
  { name: "Quotes Zoho Sign Template", module: "Quotes", preview: "$SENDER_NAME$ from $ORG_NAME$ requests you to sign ...", modifiedBy: "Sridhar", modifiedDate: "Jun 25", lastUsed: "", stats: "" },
  { name: "Deals Zoho Sign Template", module: "Deals", preview: "$SENDER_NAME$ from $ORG_NAME$ requests you to sign ...", modifiedBy: "Sridhar", modifiedDate: "Jun 25", lastUsed: "", stats: "" },
  { name: "Account Zoho Sign Template", module: "Accounts", preview: "$SENDER_NAME$ from $ORG_NAME$ requests you to sign ...", modifiedBy: "Sridhar", modifiedDate: "Jun 25", lastUsed: "", stats: "" },
  { name: "Contacts Zoho Sign Template", module: "Contacts", preview: "$SENDER_NAME$ from $ORG_NAME$ requests you to sign ...", modifiedBy: "Sridhar", modifiedDate: "Jun 25", lastUsed: "", stats: "" },
];

const moduleColors: Record<string, string> = {
  Quotes: "text-blue-600", Leadzz: "text-green-600", Invoices: "text-purple-600",
  "Purchase Orders": "text-orange-600", "Sales Orders": "text-teal-600",
  Deals: "text-red-600", Accounts: "text-indigo-600", Contacts: "text-pink-600",
};

const editorComponents = [
  { label: "TEXT",       Icon: Type },
  { label: "IMAGE",      Icon: ImageIcon },
  { label: "SPACER",     Icon: Minus },
  { label: "IMAGE+TEXT", Icon: Image },
  { label: "BUTTON",     Icon: Square },
  { label: "COLUMNS",    Icon: Columns3 },
  { label: "TABLE",      Icon: Table2 },
  { label: "BACKGROUND", Icon: Layers },
];

// ─── Attach Record as PDF Dialog ─────────────────────────────────────────────

const leadsFields = [
  "Lead Status", "Annual Revenue", "Lead Source", "Company", "Industry",
  "Country", "Rating", "Converted", "Email Opt Out", "No. of Employees",
];
const operators = ["is", "is not", "contains", "doesn't contain", "is empty", "is not empty", "starts with"];

const templateCategoriesByModule: Record<string, string[]> = {
  Leads: ["Default Print", "Mail Merge Templates", "Email Templates", "Canvas Templates"],
  Quotes: ["Inventory Templates", "Mail Merge Templates", "Canvas Templates"],
  Contacts: ["Default Print", "Mail Merge Templates", "Email Templates", "Canvas Templates"],
};

const templatesByCategory: Record<string, string[]> = {
  "Default Print": ["Default Lead Print"],
  "Mail Merge Templates": ["Lead Summary", "Follow-up Letter", "Welcome Letter"],
  "Email Templates": ["Heeny penny", "Api 2", "Api Test", "Pacifico"],
  "Canvas Templates": ["Lead Card View", "Lead Detail Canvas"],
  "Inventory Templates": ["Quote Template", "Invoice Template"],
};

type Condition = { id: number; field: string; operator: string; value: string };

function AttachRecordAsPDFDialog({ onCancel, onDone, className, module = "Leads", initialFileName }: { onCancel: () => void; onDone: (fileName: string) => void; className?: string; module?: string; initialFileName?: string }) {
  const [templateCategory, setTemplateCategory] = useState("");
  const [template, setTemplate] = useState("");
  const [layout, setLayout] = useState("portrait");
  const [paperSize, setPaperSize] = useState("a4");
  const [setAsDefault, setSetAsDefault] = useState(false);
  const [fileName, setFileName] = useState(initialFileName ?? "");
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState("");

  const categories = templateCategoriesByModule[module] ?? [];
  const templates = templateCategory ? (templatesByCategory[templateCategory] ?? []) : [];

  return (
    <div className={cn("flex flex-col overflow-hidden bg-white", className)}>
      {/* Heading */}
      <div className="border-b border-gray-100 px-5 py-4">
        <h2 className="text-base font-semibold text-gray-900">Attach Record as PDF</h2>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
        {/* ── PDF Export Options ── */}
        <div className="space-y-6">
          <p className="text-sm font-semibold text-foreground">Export to PDF Options</p>

          {/* Choose Category */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Choose Category</Label>
            <Select value={templateCategory} onValueChange={(v) => { setTemplateCategory(v); setTemplate(""); }}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent className="z-[200]">
                {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Template */}
          {templateCategory && templateCategory !== "Default Print" && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Template</Label>
              <Select value={template} onValueChange={setTemplate}>
                <SelectTrigger><SelectValue placeholder="Select template" /></SelectTrigger>
                <SelectContent className="z-[200]">
                  {templates.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Layout + Paper Size — shown once template selected */}
          {(template || templateCategory === "Default Print") && (
            <>
              <div className="space-y-2">
                <Label className="text-sm font-medium">Layout</Label>
                <RadioGroup value={layout} onValueChange={setLayout} className="flex gap-6">
                  <div className="flex items-center gap-2"><RadioGroupItem value="portrait" id="pdf-layout-p" /><Label htmlFor="pdf-layout-p">Portrait</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="landscape" id="pdf-layout-l" /><Label htmlFor="pdf-layout-l">Landscape</Label></div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Paper Size</Label>
                <RadioGroup value={paperSize} onValueChange={setPaperSize} className="flex gap-6">
                  <div className="flex items-center gap-2"><RadioGroupItem value="a4" id="pdf-paper-a4" /><Label htmlFor="pdf-paper-a4">A4</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="letter" id="pdf-paper-l" /><Label htmlFor="pdf-paper-l">US Letter</Label></div>
                </RadioGroup>
              </div>

              {/* File Name */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">File Name</Label>
                <MergeFieldInput value={fileName} onChange={setFileName} placeholder="Enter file name" mergeFields={fileNameMergeFields} />
                <p className="rounded-md bg-crm-canvas px-3 py-2 text-xs text-muted-foreground">Type "#" to insert merge field.</p>
              </div>

              {/* Password Protection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Password Protection</Label>
                  <Switch
                    checked={passwordEnabled}
                    onCheckedChange={(v) => { setPasswordEnabled(v); if (!v) setPassword(""); }}
                    aria-label="Password protection"
                  />
                </div>
                {passwordEnabled && (
                  <div className="space-y-1.5">
                    <MergeFieldInput value={password} onChange={setPassword} placeholder="Enter password" mergeFields={passwordMergeFields} />
                    <p className="rounded-md bg-crm-canvas px-3 py-2 text-xs text-muted-foreground">Type "#" to insert merge field.</p>
                  </div>
                )}
              </div>

              {/* Set as default */}
              <div className="flex items-center gap-2 pt-1">
                <Checkbox
                  id="pdf-set-default"
                  checked={setAsDefault}
                  onCheckedChange={(v) => setSetAsDefault(!!v)}
                />
                <Label htmlFor="pdf-set-default" className="cursor-pointer text-sm font-normal">Set as default for the org</Label>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-2 border-t border-gray-100 px-5 py-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-5 py-2 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => onDone(fileName)}
          className="rounded-md bg-crm-accent px-5 py-2 text-sm font-medium text-white hover:bg-crm-accent/90"
        >
          Done
        </button>
      </div>
    </div>
  );
}

// ─── Attachments Panel ───────────────────────────────────────────────────────

type PdfAttachment = { id: number; fileName: string };

const fileNameMergeFields = [
  "Record Name", "Owner", "Module", "Date", "Subject",
  "Account Name", "Stage", "Created By", "Modified By",
];
const passwordMergeFields = ["DOB", "EmailID", "PhoneNumber"];

function MergeFieldInput({
  value,
  onChange,
  placeholder,
  mergeFields,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  mergeFields: string[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    onChange(val);
    // show dropdown when last char typed is #
    setOpen(val.endsWith("#"));
  };

  const insertField = (field: string) => {
    const replaced = value.endsWith("#") ? value.slice(0, -1) + `{${field}}` : value + `{${field}}`;
    onChange(replaced);
    setOpen(false);
    inputRef.current?.focus();
  };

  // close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
      />
      {open && (
        <div className="absolute left-0 top-full z-[200] mt-1 w-56 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
          {mergeFields.map((f) => (
            <button
              key={f}
              type="button"
              onMouseDown={(e) => { e.preventDefault(); insertField(f); }}
              className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-crm-accent/10 hover:text-crm-accent"
            >
              <span className="text-xs font-mono text-crm-accent">#</span> {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type DynCondition = { id: number; field: string; operator: string; value: string };

function DynamicConditionModal({ pdfAttachments, onClose }: { pdfAttachments: PdfAttachment[]; onClose: () => void }) {
  const [conditions, setConditions] = useState<DynCondition[]>([{ id: 1, field: "", operator: "", value: "" }]);
  const [nextId, setNextId] = useState(2);
  const [addAttachOpen, setAddAttachOpen] = useState(false);
  const [selectedAttachments, setSelectedAttachments] = useState<string[]>([]);

  const staticFiles = [
    { icon: "img", label: "RadhaKrishna.png", size: "3.16 MB" },
    { icon: "link", label: "1 file from Record Attachment" },
    ...pdfAttachments.map((a) => ({ icon: "pdf", label: a.fileName ? `${a.fileName}.pdf` : "attachment.pdf" })),
  ];

  const toggleAttachment = (label: string) =>
    setSelectedAttachments((prev) => prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]);

  const addCondition = () => {
    setConditions((prev) => [...prev, { id: nextId, field: "", operator: "", value: "" }]);
    setNextId((n) => n + 1);
  };

  return (
    <div className="fixed inset-0 z-[75] flex items-center justify-center bg-black/40">
      <div className="w-[580px] rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h2 className="text-base font-semibold text-gray-900">Dynamic Condition - Attachments</h2>
          <button type="button" onClick={onClose} className="grid size-7 place-items-center rounded-full text-gray-400 hover:bg-gray-100">
            <X className="size-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 px-6 py-5">
          {conditions.map((cond, idx) => (
            <div key={cond.id} className="rounded-lg border border-gray-200 p-4">
              <p className="mb-1 text-sm font-semibold text-gray-800">Condition {idx + 1}</p>
              <p className="mb-3 text-xs text-gray-500">If the below conditions matches,</p>
              <div className="flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-gray-300 text-xs text-gray-500">{idx + 1}</span>
                <select className="h-9 flex-1 rounded border border-gray-300 px-2 text-sm text-gray-700 outline-none focus:border-crm-accent">
                  <option value="">None</option>
                  {leadsFields.map((f) => <option key={f}>{f}</option>)}
                </select>
                <select className="h-9 flex-1 rounded border border-gray-300 px-2 text-sm text-gray-700 outline-none focus:border-crm-accent">
                  <option value="">None</option>
                  {operators.map((o) => <option key={o}>{o}</option>)}
                </select>
                <input className="h-9 flex-1 rounded border border-gray-300 px-3 text-sm text-gray-700 outline-none focus:border-crm-accent" placeholder="" />
                <button type="button" className="grid size-7 place-items-center rounded-full border border-crm-accent text-crm-accent hover:bg-crm-accent/5">
                  <Plus className="size-4" />
                </button>
              </div>

              {/* Send Attachments */}
              <div className="mt-4">
                <p className="mb-2 text-sm font-semibold text-gray-800">Send Attachments</p>
                <div className="relative inline-block">
                  <button
                    type="button"
                    onClick={() => setAddAttachOpen((v) => !v)}
                    className="flex items-center gap-1.5 rounded border border-crm-accent px-3 py-1.5 text-sm font-medium text-crm-accent hover:bg-crm-accent/5"
                  >
                    Add Attachments <ChevronDown className="size-3.5" />
                  </button>
                  {addAttachOpen && (
                    <div className="absolute left-0 top-full z-10 mt-1 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                      {staticFiles.map((f) => (
                        <button
                          key={f.label}
                          type="button"
                          onClick={() => { toggleAttachment(f.label); setAddAttachOpen(false); }}
                          className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {f.icon === "img" && (
                            <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.5}>
                              <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>
                            </svg>
                          )}
                          {f.icon === "link" && (
                            <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-gray-400" fill="none" stroke="currentColor" strokeWidth={1.5}>
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" strokeLinecap="round"/>
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" strokeLinecap="round"/>
                            </svg>
                          )}
                          {f.icon === "pdf" && (
                            <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-red-500" fill="currentColor">
                              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z"/>
                            </svg>
                          )}
                          <span className="truncate">{f.label}</span>
                          {f.size && <span className="ml-auto shrink-0 text-xs text-gray-400">({f.size})</span>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          <button type="button" onClick={addCondition} className="rounded border border-crm-accent px-4 py-1.5 text-sm font-medium text-crm-accent hover:bg-crm-accent/5">
            Add Condition
          </button>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-md border border-gray-300 px-5 py-2 text-sm text-gray-600 hover:bg-gray-50">Cancel</button>
          <button type="button" onClick={onClose} className="rounded-md bg-crm-accent px-5 py-2 text-sm font-medium text-white hover:bg-crm-accent/90">Done</button>
        </div>
      </div>
    </div>
  );
}

function AttachmentsPanel({ onClose, module }: { onClose: () => void; module?: string }) {
  const [attachDropdownOpen, setAttachDropdownOpen] = useState(false);
  const [showAttachAsPDF, setShowAttachAsPDF] = useState(false);
  const [editingPdf, setEditingPdf] = useState<PdfAttachment | null>(null);
  const [pdfAttachments, setPdfAttachments] = useState<PdfAttachment[]>([]);
  const [nextPdfId, setNextPdfId] = useState(1);
  const [showDynamic, setShowDynamic] = useState(false);

  const attachAsPDFLabel = "Attach Record as PDF";

  const options = [
    "Upload from Computer",
    "Attach from Record Attachment",
    attachAsPDFLabel,
  ];

  const handleOptionSelect = (opt: string) => {
    setAttachDropdownOpen(false);
    if (opt === attachAsPDFLabel) { setEditingPdf(null); setShowAttachAsPDF(true); }
  };

  const handlePdfDone = (fileName: string) => {
    if (editingPdf) {
      setPdfAttachments((prev) => prev.map((a) => a.id === editingPdf.id ? { ...a, fileName } : a));
    } else {
      setPdfAttachments((prev) => [...prev, { id: nextPdfId, fileName }]);
      setNextPdfId((n) => n + 1);
    }
    setShowAttachAsPDF(false);
    setEditingPdf(null);
  };

  return (
    <>
      {showAttachAsPDF && (
        <>
          <div className="fixed inset-0 z-[69] bg-black/30" onClick={() => { setShowAttachAsPDF(false); setEditingPdf(null); }} />
          <AttachRecordAsPDFDialog
            className="fixed right-0 top-0 z-[70] h-full w-80 border-l border-gray-200 shadow-2xl"
            onCancel={() => { setShowAttachAsPDF(false); setEditingPdf(null); }}
            onDone={handlePdfDone}
            module={module}
            initialFileName={editingPdf?.fileName}
          />
        </>
      )}

      {showDynamic && (
        <DynamicConditionModal
          pdfAttachments={pdfAttachments}
          onClose={() => setShowDynamic(false)}
        />
      )}

      <div className="flex w-80 shrink-0 flex-col border-l border-gray-200 bg-white">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
          <button type="button" onClick={onClose} className="grid size-6 shrink-0 place-items-center rounded text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="size-4" />
          </button>
          <span className="flex items-center gap-1.5 text-base font-semibold text-gray-900">
            Attachments
            {pdfAttachments.length > 0 && (
              <span className="flex size-5 items-center justify-center rounded-full bg-gray-100 text-xs font-medium text-gray-600">{pdfAttachments.length}</span>
            )}
          </span>
          <button type="button" onClick={() => setShowDynamic(true)} className="ml-auto text-xs font-medium text-crm-accent hover:underline">Set Dynamic Condition</button>
        </div>

        {/* Drop zone — single line */}
        <div className="relative mx-4 mt-4 flex items-center justify-between rounded-lg border border-dashed border-gray-300 px-3 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg viewBox="0 0 24 24" className="size-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path d="M12 16V8m0 0L9 11m3-3 3 3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" strokeLinecap="round"/>
              <path d="M17 8a4 4 0 0 0-7.42-2" strokeLinecap="round"/>
            </svg>
            Drag and drop the files here, or
          </div>
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setAttachDropdownOpen((v) => !v)}
              className="flex items-center gap-1 rounded border border-crm-accent px-3 py-1 text-xs font-medium text-crm-accent hover:bg-crm-accent/5"
            >
              Attach from <ChevronDown className="size-3" />
            </button>
            {attachDropdownOpen && (
              <div className="absolute right-0 top-full z-10 mt-1 w-56 rounded-lg border border-gray-200 bg-white shadow-lg">
                {options.map((opt) => (
                  <button key={opt} type="button" onClick={() => handleOptionSelect(opt)}
                    className="flex w-full items-center px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50">
                    {opt}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Attachment cards */}
        <div className="mx-4 mt-3 space-y-2">
          {/* PDF attachments */}
          {pdfAttachments.map((att) => {
            const name = att.fileName ? `${att.fileName}.pdf` : "attachment.pdf";
            return (
              <div key={att.id} className="rounded-lg border border-gray-200 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  {/* PDF icon */}
                  <svg viewBox="0 0 24 24" className="size-4 shrink-0 text-red-500" fill="currentColor">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5z"/>
                  </svg>
                  <span className="min-w-0 flex-1 truncate text-sm text-gray-700">{name} <span className="text-gray-400">- (dynamic)</span></span>
                  <button type="button" onClick={() => { setEditingPdf(att); setShowAttachAsPDF(true); }} className="shrink-0 text-gray-400 hover:text-gray-600">
                    <Pencil className="size-3.5" />
                  </button>
                  <button type="button" onClick={() => setPdfAttachments((prev) => prev.filter((a) => a.id !== att.id))} className="shrink-0 text-gray-400 hover:text-red-500">
                    <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="12" cy="12" r="9"/><path d="M9 12h6" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notes */}
        <div className="mx-4 mt-3 rounded-lg bg-yellow-50 px-4 py-3">
          <p className="mb-2 text-xs font-semibold text-gray-700">Note:</p>
          <ul className="space-y-1.5">
            {[
              "You can add Static files upto 10 MB.",
              "Maximum of 10 files can be attached.",
              "Dynamic files will be sent as downloadable link.",
            ].map((note) => (
              <li key={note} className="flex items-start gap-1.5 text-xs text-gray-600">
                <span className="mt-0.5 shrink-0">•</span>
                {note}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

// ─── Email Template Editor ────────────────────────────────────────────────────

export function EmailTemplateEditorStandalone({ onClose }: { onClose: () => void }) {
  return <EmailTemplateEditor onClose={onClose} />;
}

function EmailTemplateEditor({ onClose, module }: { onClose: () => void; module?: string }) {
  const [showAttachments, setShowAttachments] = useState(false);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col overflow-hidden">
      {/* Dark top bar */}
      <div className="flex h-14 shrink-0 items-center gap-3 bg-[#1c1c2e] px-4">
        {/* App icon */}
        <div className="grid size-8 shrink-0 place-items-center rounded bg-[#2a2a3e]">
          <div className="grid size-4 grid-cols-2 gap-0.5">
            {[0,1,2,3].map(i => <div key={i} className="rounded-sm bg-white/60" />)}
          </div>
        </div>

        {/* Name + subject */}
        <div className="flex flex-col justify-center">
          <input
            defaultValue=""
            placeholder="Enter a template name"
            className="h-6 w-56 bg-[#2e2e44] px-2 text-sm text-white placeholder-white/50 outline-none focus:bg-[#3a3a55]"
          />
          <span className="mt-0.5 px-2 text-xs text-white/40">Enter Template Subject</span>
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAttachments((v) => !v)}
            className="text-sm font-medium text-[#5b9cf6] hover:underline"
          >
            Attachments
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-white/10"
          >
            Cancel
          </button>
          <button
            type="button"
            className="rounded border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-white/10"
          >
            Preview
          </button>
          <div className="flex overflow-hidden rounded">
            <button
              type="button"
              className="bg-crm-accent px-4 py-1.5 text-sm font-semibold text-white hover:bg-crm-accent/90"
            >
              Save
            </button>
            <button
              type="button"
              className="border-l border-white/20 bg-crm-accent px-2 py-1.5 text-white hover:bg-crm-accent/90"
            >
              <ChevronDown className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Left components panel */}
        <aside className="flex w-[230px] shrink-0 flex-col overflow-hidden border-r border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-4 py-3">
            <span className="text-sm font-semibold text-gray-700">All Components</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            <div className="grid grid-cols-2 gap-2">
              {editorComponents.map(({ label, Icon }) => (
                <button
                  key={label}
                  type="button"
                  className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-2 py-4 text-center transition-colors hover:border-crm-accent/40 hover:bg-crm-accent/5"
                >
                  <Icon className="size-6 text-gray-500" />
                  <span className="text-[11px] font-medium tracking-wide text-gray-500">{label}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Bottom hint */}
          <div className="border-t border-gray-100 px-4 py-3">
            <p className="text-[11px] text-gray-400">
              <span className="font-semibold text-gray-500">HINT:</span> Type # to insert merge field.{" "}
              <button type="button" className="text-crm-accent hover:underline">More</button>
            </p>
            <div className="mt-2 flex gap-3">
              {[
                <circle key="c" cx="12" cy="12" r="10" />,
              ].map((_, i) => (
                <button key={i} type="button" className="grid size-8 place-items-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                    {i === 0 && <><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></>}
                    {i === 1 && <><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></>}
                    {i === 2 && <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></>}
                  </svg>
                </button>
              ))}
              <button type="button" className="grid size-8 place-items-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
                </svg>
              </button>
              <button type="button" className="grid size-8 place-items-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                </svg>
              </button>
              <button type="button" className="grid size-8 place-items-center rounded border border-gray-200 text-gray-400 hover:bg-gray-50">
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </button>
            </div>
          </div>
        </aside>

        {/* Canvas */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-[#e8e8e8]">
          {/* Rich text toolbar */}
          <div className="flex shrink-0 flex-wrap items-center gap-0.5 border-b border-gray-300 bg-white px-2 py-1.5">
            <select className="h-7 rounded border border-gray-200 px-1.5 text-xs text-gray-700">
              <option>Arial</option><option>Times New Roman</option><option>Courier New</option>
            </select>
            <select className="h-7 w-14 rounded border border-gray-200 px-1 text-xs text-gray-700">
              {[8,9,10,11,12,14,16,18,24,36].map(s => <option key={s}>{s}</option>)}
            </select>
            <span className="mx-1 h-5 w-px bg-gray-200" />
            {[Bold, Italic, Underline, Strikethrough].map((Icon, i) => (
              <button key={i} type="button" className="grid size-7 place-items-center rounded text-gray-600 hover:bg-gray-100">
                <Icon className="size-4" />
              </button>
            ))}
            <span className="mx-1 h-5 w-px bg-gray-200" />
            {/* Subscript / superscript */}
            <button type="button" className="grid size-7 place-items-center rounded text-gray-600 hover:bg-gray-100 text-xs font-bold">X<sub>2</sub></button>
            <button type="button" className="grid size-7 place-items-center rounded text-gray-600 hover:bg-gray-100 text-xs font-bold">X<sup>2</sup></button>
            <span className="mx-1 h-5 w-px bg-gray-200" />
            {/* Color + alignment + lists */}
            {[AlignLeft, AlignCenter, AlignRight].map((Icon, i) => (
              <button key={i} type="button" className="grid size-7 place-items-center rounded text-gray-600 hover:bg-gray-100">
                <Icon className="size-4" />
              </button>
            ))}
            <span className="mx-1 h-5 w-px bg-gray-200" />
            {[List, ListOrdered].map((Icon, i) => (
              <button key={i} type="button" className="grid size-7 place-items-center rounded text-gray-600 hover:bg-gray-100">
                <Icon className="size-4" />
              </button>
            ))}
            <span className="mx-1 h-5 w-px bg-gray-200" />
            {[Link, Link2Off, ImageIcon].map((Icon, i) => (
              <button key={i} type="button" className="grid size-7 place-items-center rounded text-gray-600 hover:bg-gray-100">
                <Icon className="size-4" />
              </button>
            ))}
            <span className="mx-1 h-5 w-px bg-gray-200" />
            <div className="ml-auto flex items-center gap-0.5">
              <button type="button" className="grid size-7 place-items-center rounded text-gray-600 hover:bg-gray-100">
                <Undo2 className="size-4" />
              </button>
              <button type="button" className="grid size-7 place-items-center rounded text-gray-600 hover:bg-gray-100">
                <Redo2 className="size-4" />
              </button>
            </div>
          </div>

          {/* Canvas area */}
          <div className="flex-1 overflow-y-auto p-8">
            <div className="mx-auto w-full max-w-[600px]">
              {/* Active text block */}
              <div className="relative">
                {/* Left + handle */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2">
                  <div className="grid size-6 place-items-center rounded bg-crm-accent text-white shadow">
                    <Plus className="size-3.5" />
                  </div>
                </div>
                {/* Block */}
                <div className="relative border-2 border-crm-accent bg-white">
                  <div
                    className="min-h-[48px] px-4 py-3 text-sm text-gray-400 outline-none"
                    contentEditable
                    suppressContentEditableWarning
                  >
                    Type your text here...
                  </div>
                  {/* Right controls */}
                  <div className="absolute -right-8 top-0 flex flex-col gap-0.5">
                    <button type="button" className="grid size-6 place-items-center rounded bg-crm-accent text-white hover:bg-crm-accent/80">
                      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2}>
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                      </svg>
                    </button>
                    <button type="button" className="grid size-6 place-items-center rounded bg-crm-accent text-white hover:bg-crm-accent/80">
                      <X className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showAttachments && (
          <AttachmentsPanel onClose={() => setShowAttachments(false)} module={module} />
        )}
      </div>
    </div>
  );
}

// ─── Create Template Modal ────────────────────────────────────────────────────

function CreateTemplateModal({
  onCancel,
  onNext,
}: {
  onCancel: () => void;
  onNext: (module: string) => void;
}) {
  const [module, setModule] = useState("Contacts");

  return (
    <div className="fixed inset-0 z-[55] flex items-center justify-center bg-black/40">
      <div className="w-80 rounded-xl bg-white shadow-2xl">
        <div className="px-6 py-5">
          <h2 className="mb-5 text-lg font-semibold text-gray-900">Create Email Template</h2>
          <div className="flex items-center gap-3">
            <label className="shrink-0 text-sm text-gray-600">Select Module</label>
            <div className="relative flex-1">
              <select
                value={module}
                onChange={(e) => setModule(e.target.value)}
                className="h-8 w-full appearance-none rounded border border-gray-300 pl-3 pr-8 text-sm text-gray-800 outline-none focus:border-crm-accent"
              >
                {crmModules.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onNext(module)}
            className="rounded-md bg-crm-accent px-4 py-2 text-sm font-medium text-white hover:bg-crm-accent/90"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Setup sidebar nav ────────────────────────────────────────────────────────

function SetupSidebar({
  activePage,
  onNavigate,
}: {
  activePage: string | null;
  onNavigate: (page: string) => void;
}) {
  const [expanded, setExpanded] = useState<string[]>(["Channels", "Customization", "Automation", "Process Management"]);

  const toggle = (title: string) =>
    setExpanded((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title],
    );

  return (
    <aside className="flex w-52 shrink-0 flex-col overflow-hidden border-r border-crm-line bg-crm-surface">
      <div className="p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search"
            className="h-8 w-full rounded-md border border-crm-line bg-crm-canvas pl-8 pr-3 text-xs outline-none focus:border-crm-accent"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {setupSections.map((section) => {
          const isOpen = expanded.includes(section.title);
          return (
            <div key={section.title}>
              <button
                type="button"
                onClick={() => toggle(section.title)}
                className="flex w-full items-center justify-between px-4 py-2 text-xs font-semibold text-foreground hover:bg-crm-canvas"
              >
                {section.title}
                {isOpen ? (
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                ) : (
                  <ChevronRight className="size-3.5 text-muted-foreground" />
                )}
              </button>
              {isOpen && (
                <div className="pb-1">
                  {section.items.map((item) => {
                    const label = typeof item === "string" ? item : item.label;
                    const isNew = typeof item !== "string" && item.new;
                    const isActive = activePage === label;
                    return (
                      <button
                        key={label}
                        type="button"
                        onClick={() => onNavigate(label)}
                        className={cn(
                          "flex w-full items-center gap-1.5 px-6 py-1.5 text-left text-xs transition-colors",
                          isActive
                            ? "bg-crm-accent/10 font-medium text-crm-accent"
                            : "text-muted-foreground hover:bg-crm-canvas hover:text-foreground",
                        )}
                      >
                        {label}
                        {isNew && <Sparkles className="size-3 shrink-0 text-yellow-400" />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}

// ─── Templates page ───────────────────────────────────────────────────────────

function TemplatesPage() {
  const [activeTab, setActiveTab] = useState<TemplateTab>("Email");
  const [activeSubNav, setActiveSubNav] = useState("All Templates");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [editorModule, setEditorModule] = useState("Leads");

  return (
    <>
      {showCreateModal && (
        <CreateTemplateModal
          onCancel={() => setShowCreateModal(false)}
          onNext={(mod) => { setEditorModule(mod); setShowCreateModal(false); setShowEditor(true); }}
        />
      )}
      {showEditor && <EmailTemplateEditor onClose={() => setShowEditor(false)} module={editorModule} />}

      <div className="flex min-h-0 flex-1 flex-col overflow-hidden bg-crm-canvas">
        {/* Templates header */}
        <div className="flex shrink-0 items-center gap-4 border-b border-crm-line bg-crm-surface px-6 py-3">
          <h2 className="text-lg font-semibold text-foreground">Templates</h2>
          <div className="flex items-center gap-1 rounded-full border border-crm-line bg-crm-canvas p-0.5">
            {templateTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "bg-crm-accent text-white"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="flex items-center gap-1.5 rounded-md border border-crm-line bg-crm-surface px-3 py-1.5 text-sm text-foreground hover:bg-crm-canvas"
            >
              All Modules <ChevronDown className="size-4 text-muted-foreground" />
            </button>
            <div className="relative">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search Template"
                className="h-8 w-44 rounded-md border border-crm-line bg-crm-canvas pl-8 pr-3 text-sm outline-none focus:border-crm-accent"
              />
            </div>
          </div>
        </div>

        {/* Body: sub-nav + list */}
        <div className="flex min-h-0 flex-1 overflow-hidden">
          {/* Sub-nav */}
          <aside className="flex w-48 shrink-0 flex-col border-r border-crm-line bg-crm-surface py-3">
            <button
              type="button"
              onClick={() => setShowCreateModal(true)}
              className="mx-3 mb-3 flex items-center justify-center gap-1.5 rounded-md bg-crm-accent px-3 py-2 text-sm font-medium text-white hover:bg-crm-accent/90"
            >
              <Plus className="size-4" /> New Template
            </button>
            {templateSubNav.map(({ label, group }) => (
              <button
                key={label}
                type="button"
                onClick={() => setActiveSubNav(label)}
                className={cn(
                  "flex w-full items-center gap-2 px-4 py-2 text-left text-sm transition-colors",
                  activeSubNav === label
                    ? "font-medium text-crm-accent"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
                {group && <Users className="size-3.5 shrink-0 text-muted-foreground" />}
              </button>
            ))}
          </aside>

          {/* Template list */}
          <div className="min-h-0 flex-1 overflow-auto bg-crm-surface">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 bg-crm-surface">
                <tr className="border-b border-crm-line text-left text-xs font-medium text-muted-foreground">
                  <th className="w-10 px-4 py-3">
                    <input type="checkbox" className="rounded border-crm-line" />
                  </th>
                  <th className="px-4 py-3">Template Name</th>
                  <th className="w-40 px-4 py-3">Modified By</th>
                  <th className="w-32 px-4 py-3">Last Used</th>
                  <th className="w-24 px-4 py-3">Stats</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((t) => (
                  <tr key={t.name} className="border-b border-crm-line hover:bg-crm-canvas">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-crm-line" />
                        <Star className="size-4 text-muted-foreground/40 hover:text-yellow-400" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-medium text-foreground">{t.name}</div>
                      <div className="mt-0.5 flex items-center gap-1.5 text-xs">
                        <span className={cn("font-medium", moduleColors[t.module] ?? "text-blue-600")}>
                          {t.module}
                        </span>
                        <span className="text-muted-foreground">·</span>
                        <span className="truncate text-muted-foreground">{t.preview}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-foreground">{t.modifiedBy}</div>
                      <div className="text-xs text-muted-foreground">{t.modifiedDate}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{t.lastUsed || "-"}</td>
                    <td className="px-4 py-3">
                      {t.stats ? (
                        <div className="whitespace-pre-line text-xs text-muted-foreground">{t.stats}</div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Main SetupView ───────────────────────────────────────────────────────────

export function SetupView({ onBack }: { onBack: () => void }) {
  const [query, setQuery] = useState("");
  const [activePage, setActivePage] = useState<string | null>(null);

  const isDetailPage = activePage !== null;

  const filtered = query.trim()
    ? setupSections
        .map((s) => ({
          ...s,
          items: s.items.filter((item) => {
            const label = typeof item === "string" ? item : item.label;
            return label.toLowerCase().includes(query.toLowerCase());
          }),
        }))
        .filter((s) => s.items.length > 0)
    : setupSections;

  return (
    <div className="fixed inset-0 z-50 flex flex-col overflow-hidden bg-[#eef0f5]">
      {/* Top bar */}
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-crm-line bg-crm-surface px-4">
        <button
          type="button"
          onClick={() => {
            if (isDetailPage) setActivePage(null);
            else onBack();
          }}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {isDetailPage ? "Setup Home" : null}
        </button>

        {isDetailPage && <Settings2 className="size-4 text-muted-foreground" />}

        {!isDetailPage && (
          <>
            <h1 className="text-base font-semibold text-foreground">Setup</h1>
            <div className="relative ml-4 w-64">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search Setup"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="h-8 w-full rounded-md border border-crm-line bg-crm-canvas pl-8 pr-3 text-sm outline-none focus:border-crm-accent"
              />
            </div>
            <div className="ml-auto">
              <button
                type="button"
                className="rounded-md border border-crm-line bg-crm-surface px-3 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-crm-canvas"
              >
                Customize Setup
              </button>
            </div>
          </>
        )}
      </div>

      {/* Body */}
      {isDetailPage ? (
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <SetupSidebar activePage={activePage} onNavigate={setActivePage} />
          {activePage === "Templates" ? (
            <TemplatesPage />
          ) : (
            <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
              {activePage} — coming soon
            </div>
          )}
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {filtered.map((section) => (
              <div
                key={section.title}
                className="rounded-xl border border-crm-line bg-crm-surface p-5 shadow-sm"
              >
                <h2 className="mb-3 text-sm font-semibold text-foreground">{section.title}</h2>
                <ul className="space-y-1.5">
                  {section.items.map((item) => {
                    const label = typeof item === "string" ? item : item.label;
                    const isNew = typeof item !== "string" && item.new;
                    return (
                      <li key={label}>
                        <button
                          type="button"
                          onClick={() => setActivePage(label)}
                          className="flex w-full items-center gap-1.5 text-left text-sm text-muted-foreground transition-colors hover:text-crm-accent"
                        >
                          {label}
                          {isNew && <Sparkles className="size-3 shrink-0 text-yellow-400" />}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

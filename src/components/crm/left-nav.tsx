import {
  Home,
  BarChart3,
  PieChart,
  Bot,
  Search,
  Target,
  Contact,
  Building2,
  Handshake,
  CheckSquare,
  Users,
  Phone,
  Package,
  FileText,
  ClipboardList,
  ShoppingCart,
  Receipt,
  Inbox,
  Megaphone,
  Truck,
  BookOpen,
  PanelsTopLeft,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";

const topItems = [
  { label: "Home", icon: Home },
  { label: "Workqueue", icon: PanelsTopLeft },
  { label: "Reports", icon: BarChart3 },
  { label: "Analytics", icon: PieChart },
  { label: "Agents", icon: Bot },
];

const modules = [
  { label: "Leadzz", icon: Target, to: "/leadzz" },
  { label: "Contacts", icon: Contact },
  { label: "Accounts", icon: Building2 },
  { label: "Deals", icon: Handshake },
  { label: "Tasks", icon: CheckSquare },
  { label: "Meetings", icon: Users },
  { label: "Calls", icon: Phone },
  { label: "Products", icon: Package },
  { label: "Quotes", icon: FileText, to: "/quotes" },
  { label: "Sales Orders", icon: ClipboardList },
  { label: "Purchase Orders", icon: ShoppingCart },
  { label: "Invoices", icon: Receipt },
  { label: "SalesInbox", icon: Inbox },
  { label: "Campaigns", icon: Megaphone },
  { label: "Vendors", icon: Truck },
  { label: "Price Books", icon: BookOpen },
] as { label: string; icon: React.ComponentType<{ className?: string }>; to?: string }[];

export function LeftNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <aside className="hidden w-[300px] shrink-0 flex-col bg-crm-nav text-crm-nav-foreground lg:flex">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-full bg-crm-nav-active text-sm font-bold">
            Z
          </span>
          <span className="text-lg font-semibold">Zoho CRM</span>
          <ChevronDown className="size-4 text-crm-nav-muted" />
        </div>
        <PanelsTopLeft className="size-5 text-crm-nav-muted" />
      </div>

      <nav className="space-y-0.5 px-3 pb-3">
        {topItems.map(({ label, icon: Icon }) => (
          <NavRow key={label} label={label} Icon={Icon} />
        ))}
      </nav>

      <div className="border-t border-white/10" />

      <div className="flex items-center gap-2 px-4 py-4">
        <span className="grid size-8 shrink-0 place-items-center rounded-md bg-crm-accent text-xs font-bold">
          CT
        </span>
        <span className="truncate text-base font-semibold">CRM Teamspace</span>
        <ChevronDown className="size-4 shrink-0 text-crm-nav-muted" />
        <MoreHorizontal className="ml-auto size-5 shrink-0 text-crm-nav-muted" />
      </div>

      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-crm-nav-muted" />
          <Input
            placeholder="Search"
            className="h-9 border-white/15 bg-white/5 pl-9 text-crm-nav-foreground placeholder:text-crm-nav-muted"
          />
        </div>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-6">
        {modules.map(({ label, icon: Icon, to }) => (
          <NavRow key={label} label={label} Icon={Icon} to={to} active={!!to && pathname === to} />
        ))}
      </nav>
    </aside>
  );
}

function NavRow({
  label,
  Icon,
  active,
  to,
}: {
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  active?: boolean | undefined;
  to?: string | undefined;
}) {
  const className = cn(
    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors hover:bg-white/10",
    active && "bg-crm-nav-active font-medium",
  );

  if (to) {
    return (
      <Link to={to} className={className}>
        <Icon className="size-[18px] text-crm-nav-muted" />
        <span className="truncate">{label}</span>
      </Link>
    );
  }

  return (
    <button type="button" className={className}>
      <Icon className="size-[18px] text-crm-nav-muted" />
      <span className="truncate">{label}</span>
    </button>
  );
}
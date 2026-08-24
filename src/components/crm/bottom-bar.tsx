import {
  MessageSquare,
  Users,
  Contact,
  MonitorSmartphone,
  Megaphone,
  Activity,
  GitBranch,
  Timer,
  History,
  Accessibility,
  HelpCircle,
  ScanLine,
} from "lucide-react";

export function BottomBar() {
  return (
    <footer className="flex h-14 shrink-0 items-center gap-3 border-t border-crm-line bg-crm-nav px-4 text-crm-nav-muted">
      <div className="hidden items-center gap-6 text-xs md:flex">
        <Chip icon={MessageSquare} label="Chats" />
        <Chip icon={Users} label="Channels" />
        <Chip icon={Contact} label="Contacts" />
      </div>

      <input
        aria-label="Smart Chat"
        placeholder="Here is your Smart Chat (Ctrl+Space)"
        className="mx-auto h-9 w-full max-w-2xl rounded-md border border-white/15 bg-white/5 px-3 text-sm text-crm-nav-foreground outline-none placeholder:text-crm-nav-muted focus:border-crm-accent"
      />

      <div className="flex items-center gap-3">
        <MonitorSmartphone className="size-5" />
        <ScanLine className="size-5" />
        <div className="relative">
          <Megaphone className="size-5" />
          <span className="absolute -top-2 right-0 grid size-4 place-items-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
            1
          </span>
        </div>
        <Activity className="hidden size-5 sm:block" />
        <GitBranch className="hidden size-5 sm:block" />
        <Timer className="hidden size-5 sm:block" />
        <History className="hidden size-5 sm:block" />
        <Accessibility className="hidden size-5 sm:block" />
        <span className="flex items-center gap-1.5 rounded-full bg-crm-accent px-3 py-1.5 text-xs font-medium text-crm-nav-foreground">
          <HelpCircle className="size-4" />
          Help
        </span>
      </div>
    </footer>
  );
}

function Chip({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <span className="flex flex-col items-center gap-0.5">
      <Icon className="size-5" />
      {label}
    </span>
  );
}
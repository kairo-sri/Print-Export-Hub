import {
  Search,
  Plus,
  Bell,
  Calendar,
  Settings,
  Grid3x3,
  UserCircle2,
  Languages,
  Package2,
} from "lucide-react";

export function TopBar({ title = "Quotes" }: { title?: string }) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-crm-line bg-crm-surface px-4">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>

      <div className="relative mx-auto w-full max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search records"
          aria-label="Search records"
          className="h-10 w-full rounded-full border border-crm-line bg-crm-canvas pl-9 pr-4 text-sm outline-none focus:border-crm-accent"
        />
      </div>

      <div className="flex items-center gap-1.5 text-muted-foreground">
        <IconBtn label="Create">
          <Plus className="size-5 text-crm-accent" />
        </IconBtn>
        <IconBtn label="Translate">
          <Languages className="size-5" />
        </IconBtn>
        <div className="relative">
          <IconBtn label="Notifications">
            <Bell className="size-5" />
          </IconBtn>
          <span className="absolute right-0.5 top-0.5 grid size-4 place-items-center rounded-full bg-destructive text-[10px] font-semibold text-destructive-foreground">
            1
          </span>
        </div>
        <IconBtn label="Calendar">
          <Calendar className="size-5" />
        </IconBtn>
        <IconBtn label="Marketplace">
          <Package2 className="size-5" />
        </IconBtn>
        <IconBtn label="Settings">
          <Settings className="size-5" />
        </IconBtn>
        <IconBtn label="Account">
          <UserCircle2 className="size-6" />
        </IconBtn>
        <IconBtn label="Apps">
          <Grid3x3 className="size-5" />
        </IconBtn>
      </div>
    </header>
  );
}

function IconBtn({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid size-9 place-items-center rounded-full transition-colors hover:bg-crm-canvas"
    >
      {children}
    </button>
  );
}
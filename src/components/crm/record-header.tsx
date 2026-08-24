import { ArrowLeft, ChevronDown, ChevronLeft, ChevronRight, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ActionsMenu } from "./actions-menu";
import { Link } from "@tanstack/react-router";

export function RecordHeader() {
  return (
    <div className="flex flex-wrap items-start gap-4 border-b border-crm-line bg-crm-surface px-6 py-4">
      <Link
        to="/quotes"
        aria-label="Back to quotes"
        className="mt-1 grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-crm-canvas"
      >
        <ArrowLeft className="size-5" />
      </Link>

      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">Quote 1</h2>
        <button
          type="button"
          className="mt-1 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <Tag className="size-4 text-crm-accent" />
          Add Tags
        </button>
      </div>

      <div className="ml-auto flex flex-wrap items-center gap-2">
        <Button variant="outline" className="rounded-lg">
          Convert
          <ChevronDown className="size-4" />
        </Button>
        <Button variant="outline" className="rounded-lg">
          Edit
        </Button>
        <div className="flex overflow-hidden rounded-lg border border-input">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium hover:bg-crm-canvas"
          >
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
        <ActionsMenu />
        <div className="flex items-center">
          <button
            type="button"
            aria-label="Previous record"
            className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-crm-canvas"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            aria-label="Next record"
            className="grid size-9 place-items-center rounded-full text-muted-foreground hover:bg-crm-canvas"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
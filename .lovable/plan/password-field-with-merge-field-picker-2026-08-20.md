# Password field with merge-field picker

## Behaviour

When **Password Protection** is toggled on, a password input appears directly below the toggle.

- The user can type any characters, numbers, or special characters freely.
- Typing `#` opens a popover listing the allowed merge fields:
  - Date field
  - Email field
  - Number field
- Picking one replaces the typed `#` with the merge token (e.g. `#Date field#`) and closes the popover.
- The popover footer shows a note: "Only Date, Email and Number type fields are allowed."
- Typing further characters filters the list; Esc or clicking outside closes it; toggling the switch off clears and hides the input.

## Technical

- Single file: `src/components/crm/print-export-panel.tsx`
- New state: `password` string, `pwPopoverOpen` boolean.
- Render the input inside the existing password-protection block, gated on `passwordProtection`.
- Use the existing shadcn `Popover` (anchored to the input, `onOpenAutoFocus` prevented so typing continues) with a simple list of the three field options and a bordered footer note.
- Detect `#` in the change handler to open the popover; insert the token at the cursor position on select.
- No hardcoded colors — use existing CRM tokens/muted-foreground classes.

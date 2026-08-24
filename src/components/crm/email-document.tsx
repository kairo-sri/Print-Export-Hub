const templates: Record<string, { subject: string; body: string[] }> = {
  "Employee Referral": {
    subject: "You've been referred to us!",
    body: [
      "Hi [First Name],",
      "I hope this message finds you well. [Referrer Name] thought you'd be a great fit for what we do at [Company], and suggested I reach out personally.",
      "We specialize in helping businesses like yours streamline operations and grow faster. Given your background in [Industry], I believe there's a strong mutual fit worth exploring.",
      "I'd love to set up a quick 15-minute call this week or next — no agenda, just a conversation. Would that work for you?",
      "Looking forward to connecting.",
    ],
  },
  "Welcome Email": {
    subject: "Welcome aboard — glad to have you!",
    body: [
      "Hi [First Name],",
      "Welcome! We're thrilled to have you with us.",
      "Your account is all set up and ready to go. Here's a quick overview of what you can do next: explore your dashboard, set up your profile, and connect your first integration.",
      "If you run into anything or have questions, our support team is just a message away. We typically respond within a few hours.",
      "We're excited to see what you build.",
    ],
  },
  "Follow up Email": {
    subject: "Following up on our last conversation",
    body: [
      "Hi [First Name],",
      "I wanted to follow up on our conversation from last week. I know things get busy, so I didn't want my earlier note to get buried.",
      "To recap: we discussed how [Company] could help you [specific goal]. I've put together a short summary and a few next steps that I think would be valuable for your team.",
      "Would you have 20 minutes this week to reconnect? I can work around your schedule.",
      "Hope to hear from you soon.",
    ],
  },
};

export function EmailDocument({ templateName = "Employee Referral" }: { templateName?: string }) {
  const tpl = templates[templateName] ?? templates["Employee Referral"]!;

  return (
    <div className="mx-auto w-full max-w-3xl rounded-lg border border-crm-line bg-crm-surface shadow-sm">
      <div className="flex items-center justify-between border-b border-crm-line px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1">
            <span className="size-5 rounded-sm border-2 border-destructive" />
            <span className="size-5 rounded-sm border-2 border-chart-2" />
            <span className="size-5 rounded-sm border-2 border-crm-accent" />
          </div>
          <span className="text-base font-semibold text-foreground">[Company]</span>
        </div>
        <span className="text-sm text-muted-foreground">20 Aug, 2026</span>
      </div>

      <div className="space-y-2 border-b border-crm-line px-8 py-4 text-[14px]">
        <div className="flex gap-3">
          <span className="w-14 shrink-0 font-medium text-muted-foreground">To</span>
          <span className="text-crm-accent">[Lead Email]</span>
        </div>
        <div className="flex gap-3">
          <span className="w-14 shrink-0 font-medium text-muted-foreground">From</span>
          <span>Sridhar &lt;sridhar@zohotest.com&gt;</span>
        </div>
        <div className="flex gap-3">
          <span className="w-14 shrink-0 font-medium text-muted-foreground">Subject</span>
          <span className="font-medium text-foreground">{tpl.subject}</span>
        </div>
      </div>

      <div className="space-y-4 px-8 py-6 text-[14px] leading-7 text-foreground">
        {tpl.body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}

        <div className="pt-2">
          <p className="font-medium">Best regards,</p>
          <p className="mt-1 text-muted-foreground">Sridhar</p>
          <p className="text-muted-foreground">Lead Owner · [Company]</p>
          <p className="text-crm-accent">[Phone] · [Email]</p>
        </div>
      </div>
    </div>
  );
}

export const STATUS_LABEL: Record<string, string> = {
  pending: "Ingediend",
  in_review: "In behandeling",
  in_progress: "In uitvoering",
  review: "Review",
  done: "Afgerond",
  rejected: "Afgewezen",
};

export const STATUS_FLOW = ["pending", "in_review", "in_progress", "review", "done"] as const;

export const STATUS_COLOR: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  in_review: "bg-secondary/20 text-secondary",
  in_progress: "bg-secondary/30 text-secondary-foreground",
  review: "bg-primary/10 text-primary",
  done: "bg-primary/20 text-primary",
  rejected: "bg-destructive/20 text-destructive",
};

export const PRIORITY_LABEL: Record<string, string> = {
  low: "Laag",
  normal: "Normaal",
  high: "Hoog",
  urgent: "Urgent",
};

export const PRIORITY_WEIGHT: Record<string, number> = {
  urgent: 4,
  high: 3,
  normal: 2,
  low: 1,
};

export const PRIORITY_COLOR: Record<string, string> = {
  low: "text-muted-foreground",
  normal: "text-foreground",
  high: "text-amber-500",
  urgent: "text-destructive font-semibold",
};

export const QUERY_KEYS = {
  GATHERING: {
    all: ["gathering"] as const,
    list: ["gathering", "list"] as const,
    popular: ["gathering", "list", "popular"] as const,
    deadline: ["gathering", "list", "deadline"] as const,
    detail: (id: string) => ["gathering", id] as const,
    participants: (id: string) => ["gathering", id, "participants"] as const,
  },
  REVIEW: {
    all: ["review"] as const,
    list: ["review", "list"] as const,
  },
};

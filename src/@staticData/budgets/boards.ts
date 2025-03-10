export const budgetsBoards = [
  {
    id: "d0f5f951-89b1-4310-8c67-d38a4a22c94e",
    name: "NÃO ENVIADA",
    status: "warning",
  },
  {
    id: "d0f5f951-89b1-4310-8c67-d38a4a31c94e",
    name: "ENVIADA",
    status: "primary",
  },
  {
    id: "d0f5f951-89b1-4310-8c67-d38a4a28c94e",
    name: "RECUSADO",
    status: "destructive",
  },
  {
    id: "a4d54aae-6f86-49e3-8724-882ab139f5b2",
    name: "CONTRATADO",
    status: "success",
  },
  {
    id: "6a1a8b36-0861-45f1-9eb4-4a6d9b6ebe13",
    name: "DOAÇÃO",
    status: "info",
  },
];

export type budgetBoardType = (typeof budgetsBoards)[number];

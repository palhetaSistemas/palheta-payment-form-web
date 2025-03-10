export const projectsBoards = [
  {
    id: "d0f5f951-89b1-4310-8c67-d38a4a22c94e",
    name: "CONCEPÇÃO",
    status: "primary",
  },
  {
    id: "d0f5f951-89b1-4310-8c67-d38a4a31c94e",
    name: "APRESENTAÇÃO",
    status: "primary",
  },
  {
    id: "d0f5f951-89b1-4310-8c67-d38a4a28c94e",
    name: "ALTERAÇÕES",
    status: "primary",
  },
  {
    id: "a4d54aae-6f86-49e3-8724-882ab139f5b2",
    name: "REAPRESENTAÇÃO",
    status: "primary",
  },
  {
    id: "6a1a8b36-0861-45f1-9eb4-4a6d9b6ebe13",
    name: "ANOTAÇÕES",
    status: "primary",
  },
];

export type projectBoardType = (typeof projectsBoards)[number];

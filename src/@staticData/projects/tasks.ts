import avatar1 from "@/public/images/avatar/avatar-1.jpg";
import avatar2 from "@/public/images/avatar/avatar-2.jpg";
import avatar3 from "@/public/images/avatar/avatar-3.jpg";
import avatar4 from "@/public/images/avatar/avatar-4.jpg";
import img1 from "@/public/images/staticDataImage/facade1.png";
import { projectsBoards } from "./boards";

export const projectsTasks = [
  {
    boardId: projectsBoards[0].id,
    id: "2e09c2fc-9d92-4df1-a3cc-bd8c8c51d85c",
    title: "Fazenda Média",
    size: "Fazenda Média",
    desc: `Nome: André Souza \n Telefone: (41) 9 9909-0909 \n Curitiba / PR`,
    status: "inprogress",
    tags: ["design", "planning"],
    priority: "high",
    assign: [
      {
        name: "João",
        image: avatar1,
      },
      {
        name: "Gabriel",
        image: avatar2,
      },
      {
        name: "Victor",
        image: avatar3,
      },
      {
        name: "Maycon",
        image: avatar4,
      },
    ],
    image: img1,
    category: "ui & ux",
    pages: "0/7",
    messageCount: "05",
    link: "02",
    date: "31 Jan,2024",
    time: "5:19pm",
    list: [
      {
        id: "item-1",
        title: "Collect Data",
      },
      {
        id: "item-2",
        title: "Collect Icons",
      },
      {
        id: "item-1",
        title: "Make Project Layout",
      },
    ],
  },
];

export type projectTaskType = (typeof projectsTasks)[number];

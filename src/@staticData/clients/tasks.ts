import avatar1 from "@/public/images/avatar/avatar-1.jpg";
import avatar2 from "@/public/images/avatar/avatar-2.jpg";
import avatar3 from "@/public/images/avatar/avatar-3.jpg";
import avatar4 from "@/public/images/avatar/avatar-4.jpg";
import avatar5 from "@/public/images/avatar/avatar-5.jpg";
import avatar6 from "@/public/images/avatar/avatar-6.jpg";
import avatar7 from "@/public/images/avatar/avatar-7.jpg";
import avatar8 from "@/public/images/avatar/avatar-8.jpg";
import avatar9 from "@/public/images/avatar/avatar-9.jpg";
import avatar10 from "@/public/images/avatar/avatar-10.jpg";
import avatar11 from "@/public/images/avatar/avatar-11.jpg";
import avatar12 from "@/public/images/avatar/avatar-12.jpg";
import avatar13 from "@/public/images/avatar/avatar-13.jpg";
import { clientsBoards } from "./boards";

export const clientsTasks = [
  {
    boardId: clientsBoards[2].id,
    id: "2e09c2fc-9d92-4df1-a3cc-bd8c8c51d85c",
    title: "Lorem Ipsum ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    status: "inprogress",
    tags: ["design", "planning"],
    priority: "high",
    assign: [
      {
        name: "Rajib",
        image: avatar1,
      },
      {
        name: "Rakib",
        image: avatar2,
      },
      {
        name: "Rajib",
        image: avatar3,
      },
      {
        name: "Rahad",
        image: avatar4,
      },
    ],
    image: "",
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
  {
    boardId: clientsBoards[3].id,
    id: "8613e1d1-2046-4f0e-bacb-dca57db5b1a9",
    title: "Lorem Ipsum ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    status: "completed",
    tags: ["development", "planning"],
    priority: "low",
    assign: [
      {
        name: "Rajib",
        image: avatar5,
      },
      {
        name: "Rakib",
        image: avatar6,
      },
    ],
    image: "",
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
  {
    boardId: clientsBoards[4].id,
    id: "5d4818ef-9f51-48f2-80bc-2df7e50a1f64",
    title: "Lorem Ipsum ",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ",
    status: "inprogress",
    tags: ["development", "planning"],
    priority: "medium",
    assign: [
      {
        name: "Rajib",
        image: avatar7,
      },
      {
        name: "Rakib",
        image: avatar8,
      },
      {
        name: "Rajib",
        image: avatar9,
      },
      {
        name: "Rahad",
        image: avatar10,
      },
    ],
    image: "",
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

export type clientTaskType = (typeof clientsTasks)[number];

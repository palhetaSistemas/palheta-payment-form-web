import avatar3 from "@/public/images/avatar/avatar-3.jpg";
export const user = [
  {
    id: 1,
    name: "palheta",
    image: avatar3,
    password: "1234",
    email: "palheta@exemplo.com.br",
    resetToken: null,
    resetTokenExpiry: null,
    profile: null,
  },
];

export type User = (typeof user)[number];

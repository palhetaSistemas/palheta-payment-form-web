import AuthProvider from "@/src/provider/auth.provider";
import DirectionProvider from "@/src/provider/direction.provider";
import Providers from "@/src/provider/providers";
import TanstackProvider from "@/src/provider/providers.client";
import "flatpickr/dist/themes/light.css";
import moment from "moment";
import "moment/locale/pt-br";
import { Poppins } from "next/font/google";
import "simplebar-react/dist/simplebar.min.css";
import { FormContextProvider } from "../context/Contex";
import "./assets/scss/globals.scss";
import "./assets/scss/theme.scss";
const poppins = Poppins({
  weight: ["400", "600", "700"], // Add other weights here
  subsets: ["latin"],
});

moment.locale("pt-br");
export const metadata = {
  title: {
    default: "Palheta - Contrato",
  },
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html className={poppins.className} lang={lang}>
      <AuthProvider>
        <TanstackProvider>
          <Providers>
            <DirectionProvider lang={lang}>
              <FormContextProvider>{children}</FormContextProvider>
            </DirectionProvider>
          </Providers>
        </TanstackProvider>
      </AuthProvider>
    </html>
  );
}

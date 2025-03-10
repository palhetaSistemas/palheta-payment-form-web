import "./assets/scss/globals.scss";
import "./assets/scss/theme.scss";
import { Poppins } from "next/font/google";
import { siteConfig } from "@/src/config/site";
import Providers from "@/src/provider/providers";
import "simplebar-react/dist/simplebar.min.css";
import TanstackProvider from "@/src/provider/providers.client";
import AuthProvider from "@/src/provider/auth.provider";
import "flatpickr/dist/themes/light.css";
import DirectionProvider from "@/src/provider/direction.provider";
const poppins = Poppins({
  weight: ["400", "600", "700"], // Add other weights here
  subsets: ["latin"],
});
import moment from "moment";
import "moment/locale/pt-br";
import { FormContextProvider } from "../context/Contex";

moment.locale("pt-br");
export const metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
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

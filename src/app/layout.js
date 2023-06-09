export const metadata = {
  title: "Westren Collision",
};
import TopNavbar from "../components/topNavbar/topNavbar";
import "../styles/global.scss";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <TopNavbar />
        {children}
      </body>
    </html>
  );
}

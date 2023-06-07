export const metadata = {
  title: "Westren Collision",
};
import TopNavbar from "../components/topNavbar/topNavbar";
import "../styles/global.scss";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopNavbar />
        {children}
      </body>
    </html>
  );
}

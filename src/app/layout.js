export const metadata = {
  title: "Westren Collision",
};
import TopNavbar from "../components/topNavbar/topNavbar";
import "../styles/global.scss";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="true"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <body>
        <TopNavbar />
        {children}
      </body>
    </html>
  );
}

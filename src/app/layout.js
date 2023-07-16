"use client";
export const metadata = {
  title: "western Collision",
};
import TopNavbar from "../components/topNavbar/topNavbar";
import "../styles/global.scss";
import { Poppins } from "next/font/google";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistedStore } from "../store/store";
import Home from "./page";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Provider store={store}>
          <PersistGate persistor={persistedStore}>
            <TopNavbar />
            {children}
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}

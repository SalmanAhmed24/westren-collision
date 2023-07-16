"use client";
import ComingSoon from "../components/comingSoon/coming-soon";
import "../styles/home-sec.scss";
import { useSelector } from "react-redux";
import LoginPage from "./login/page";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistedStore } from "../store/store";
export default function Home() {
  const userInfo = useSelector((state) => state.userReducer);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistedStore}>
        {userInfo.user == null ? (
          <LoginPage />
        ) : (
          <main className="home-sec">
            <ComingSoon />
          </main>
        )}
      </PersistGate>
    </Provider>
  );
}

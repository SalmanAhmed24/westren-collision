"use client";
import "./topNavbar.scss";
import { LOGIN_INFO } from "../../store/action/user-action";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
function TopNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userReducer);
  const handleLogout = () => {
    dispatch(LOGIN_INFO(null));
    router.push("./login");
  };
  return userInfo.user == null ? null : (
    <nav className="top-navbar">
      <ul className="links-wrap">
        <li>Dashboard</li>
        <li
          className={pathname == "/list" ? "activeLink" : "regularLink"}
          onClick={() => router.push("/list")}
        >
          List
        </li>
        <li>Purchasing</li>
        <li
          className={pathname == "/units" ? "activeLink" : "regularLink"}
          onClick={() => router.push("/units")}
        >
          Units
        </li>
        <li>Finance</li>
        <li>Reports</li>
        <li>Link 7</li>
        <li
          className={pathname == "/settings" ? "activeLink" : "regularLink"}
          onClick={() => router.push("/settings")}
        >
          Settings
        </li>
      </ul>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
}

export default TopNavbar;

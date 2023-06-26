"use client";
import "./topNavbar.scss";
import { useRouter, usePathname } from "next/navigation";
function TopNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  return (
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
    </nav>
  );
}

export default TopNavbar;

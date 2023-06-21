"use client";
import "./topNavbar.scss";
import { useRouter, usePathname } from "next/navigation";
function TopNavbar() {
  const router = useRouter();
  const pathname = usePathname();
  console.log("pathname", pathname);
  return (
    <nav className="top-navbar">
      <ul className="links-wrap">
        <li>Dashboard</li>
        <li>List</li>
        <li>Purchasing</li>
        <li>Units</li>
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

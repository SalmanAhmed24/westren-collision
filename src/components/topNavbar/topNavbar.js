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
        <li>Link 1</li>
        <li>Link 2</li>
        <li>Link 3</li>
        <li>Link 4</li>
        <li>Link 5</li>
        <li>Link 6</li>
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

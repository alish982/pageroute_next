import NavBar from "../bar/navbar";
import SideBar from "../bar/sidebar";
import { Html} from "next/document";

export default function Layout() {
  return (
    <>
        <SideBar />
        <NavBar />
    </>
  );
}

import { TopNav } from "~/components/navigation/TopNav";
import { HomePage } from "~/components/external/HomePage";
import { SpiderChart } from "~/components/charts/SpiderChart";
import Footer from "~/components/navigation/Footer";

export default function Page() {
  return (
    <>
      <TopNav></TopNav>
      <SpiderChart></SpiderChart>
      <Footer></Footer>
    </>
  );
}

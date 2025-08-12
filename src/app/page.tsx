import { TopNav } from "~/components/navigation/TopNav";
import { HomePage } from "~/components/external/HomePage";
import { SpiderChart } from "~/components/charts/SpiderChart";

export default function Page() {
  return (
    <>
      <TopNav></TopNav>
      <SpiderChart></SpiderChart>
    </>
  );
}

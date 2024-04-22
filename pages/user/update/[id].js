import Page from "@/components/dashboard/userdetails_dash/[...id]/user_update";
import Layout from "@/components/layout/layout";
import { useRouter } from "next/router";

export default function Update() {
  const router = useRouter();

  return (
    <>
      <Layout />
      <Page id={router.query.id} />
    </>
  );
}

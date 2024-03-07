import CustomerDetail from "@/components/dashboard/customer_dash/[...id]/customer_detail";
import Layout from "@/components/layout/layout";

import { useRouter } from "next/router";

export default function cusDetails() {
  const router = useRouter();

  return (
    <div>
     <Layout />
      <CustomerDetail id={router.query.id} />
    </div>
  );
}

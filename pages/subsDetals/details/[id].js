import SubscriptionDetail from "@/components/dashboard/subscription_dash/[...id]/subscriptonDetail";
import Layout from "@/components/layout/layout";

import { useRouter } from "next/router";

export default function cusDetails() {
  const router = useRouter();

  return (
    <div>
      <Layout />
      <SubscriptionDetail id={router.query.id} />
    </div>
  );
}

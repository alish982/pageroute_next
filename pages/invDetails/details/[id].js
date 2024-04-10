import InvoiceDetails from "@/components/dashboard/invoice/[...id]/invoiceDetails";
import Layout from "@/components/layout/layout";

import { useRouter } from "next/router";

export default function cusDetails() {
  const router = useRouter();

  return (
    <div>
      <Layout />
      <InvoiceDetails id={router.query.id} />
    </div>
  );
}

import { useState } from "react";

import DataTable from "../../components/table/DataTable";
import TableToolbar from "../../components/table/TableToolbar";
import PageHeader from "../../components/ui/PageHeader";

interface Product {
  id: string;
  code: string;
  name: string;
  status: string;
}

export default function ProductListPage() {
  const [search, setSearch] = useState("");

  const products: Product[] = [];

  return (
    <>

      <PageHeader
        title="Products"
        subtitle="Manage all software products"
      />

      <TableToolbar
        search={search}
        onSearch={setSearch}
      />

      <DataTable<Product>
        columns={[
          {
            key: "code",
            title: "Code",
          },
          {
            key: "name",
            title: "Name",
          },
          {
            key: "status",
            title: "Status",
          },
        ]}
        data={products}
      />

    </>
  );
}
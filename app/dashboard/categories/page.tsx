import { Metadata } from "next";
import { DataTable } from "../products/data-table";
import { columns } from "./columns";

export const metadata: Metadata = {
  title: "Categories",
};

export const revalidate = 0;

async function getCategories() {
  const data = await fetch("http://apiparaprincipiantes.test/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
      "Cache-Control": "no-cache, private",
    },
    next: { revalidate: 0 },
  });

  return data.json();
}

export default async function Categories() {
  const data = await getCategories();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DataTable data={data} columns={columns} />
    </main>
  );
}

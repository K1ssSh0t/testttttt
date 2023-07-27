"use client";
import { Metadata } from "next";
import { DataTable } from "../products/data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export const revalidate = 0;

async function getCategories() {
  const data = await fetch(
    "https://laravel-api-production.up.railway.app/api/categories",
    {
      method: "GET",
      headers: {
        "Content-Type": "aplication/json",
        "Cache-Control": "no-cache, private",
      },
      next: { revalidate: 0 },
    }
  );

  return data.json();
}

export default async function Categories() {
  //const [categories, setCategories] = useState([]);
  /*
  useEffect(() => {
    async function getProducts() {
      const data = await fetch(
        "http://apiparaprincipiantes.test/api/categories",
        {
          method: "GET",
          headers: {
            "Content-Type": "aplication/json",
            "Cache-Control": "no-cache, private",
          },
          next: { revalidate: 0 },
        }
      ).then((res) => {
        return res.json();
      });
      setCategories(data);
    }

    getProducts();
  }, []);*/
  const data = await getCategories();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DataTable data={data} columns={columns} />
    </main>
  );
}

"use client";

import { DialogDemo } from "@/components/newProduct";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { Provider } from "jotai";
import { API_URL } from "@/atoms/categoriesAtom";

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const data = `${API_URL}videoGames`;
    console.log(data);
    async function getProducts() {
      const data = await fetch(`${API_URL}videoGames`, {
        method: "GET",
        headers: {
          "Content-Type": "aplication/json",
          "Cache-Control": "no-cache, private",
        },
      }).then((res) => {
        return res.json();
      });
      setProducts(data);
    }

    getProducts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center  p-8 gap-8 ">
      <Provider>
        <DialogDemo />
        <DataTable columns={columns} data={products} />
      </Provider>
    </main>
  );
}

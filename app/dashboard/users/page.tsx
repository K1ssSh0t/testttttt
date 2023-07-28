"use client";
import { Metadata } from "next";
import { useEffect, useState } from "react";
import { DataTable } from "../products/data-table";
import { columns } from "./columns";
import { AddUser } from "@/components/newUser";
import { API_URL } from "@/atoms/categoriesAtom";

export default function Users() {
  const [clientes, setClientes] = useState([]);
  useEffect(() => {
    async function getClients() {
      const data = await fetch(`${API_URL}clientes`, {
        method: "GET",
        headers: {
          "Content-Type": "aplication/json",
          "Cache-Control": "no-cache, private",
        },
        next: { revalidate: 0 },
      }).then((res) => {
        return res.json();
      });
      setClientes(data);
      // console.log(data);
    }

    getClients();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center  p-8 gap-8  ">
      <AddUser />
      <DataTable data={clientes} columns={columns} />
    </main>
  );
}

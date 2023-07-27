"use client";

import { DeleteProduct } from "@/components/deleteProduct";
import { UpdateProduct } from "@/components/updateProduct";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Category = {
  id: number;
  name: string;
};

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
];

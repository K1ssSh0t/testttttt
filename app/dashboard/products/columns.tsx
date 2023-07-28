"use client";

import { DeleteProduct } from "@/components/deleteProduct";
import { UpdateProduct } from "@/components/updateProduct";
import { ColumnDef } from "@tanstack/react-table";
import { categoriesAtom } from "@/atoms/categoriesAtom";
import { useAtom, useSetAtom } from "jotai";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: number;
  name: string;
  category_id: number;
  score: number;
};

// TODO: Hacer que las categorias se muestre por nombre

export const columns: ColumnDef<Product>[] = [
  { accessorKey: "id", header: "ID" },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "category_id",
    header: "Category",
    cell: ({ row }) => {
      const [categories, setCategories] = useAtom(categoriesAtom);

      const category_id = parseFloat(row.getValue("category_id"));
      const category = categories.find(
        (category: { id: number }) => category.id == category_id
      );

      return <div className="font-medium">{category.name}</div>;
    },
  },

  {
    accessorKey: "score",
    header: () => <div className="text-right">Score</div>,
    cell: ({ row }) => {
      const score = parseFloat(row.getValue("score"));

      return <div className="text-right font-medium">{score}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Accions</div>,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <>
          {" "}
          <UpdateProduct Product={product} />
          <DeleteProduct id={product.id} />
        </>
      );
    },
  },
];

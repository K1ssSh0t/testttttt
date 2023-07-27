"use client";

import { DeleteProduct } from "@/components/deleteProduct";
import { DeleteUser } from "@/components/deleteUser";
import { UpdateProduct } from "@/components/updateProduct";
import { UpdateUser } from "@/components/updateUser";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Client = {
  id: number;
  name: string;
  email: string;
  password: string;
  profile_picture: string;
};

export const columns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: () => <div className="text-right">Accions</div>,
    cell: ({ row }) => {
      const user = row.original;

      return (
        <>
          <UpdateUser User={user} />
          <DeleteUser id={user.id} />
        </>
      );
    },
  },
];

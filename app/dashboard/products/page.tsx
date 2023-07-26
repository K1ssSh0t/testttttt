import { DeleteProduct } from "@/components/deleteProduct";
import { DialogDemo } from "@/components/newProduct";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateProduct } from "@/components/updateProduct";

export const revalidate = 0; // revalidate this page every 60 seconds

async function getProducts() {
  const res = await fetch("http://apiparaprincipiantes.test/api/videoGames", {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
      "Cache-Control": "no-cache, private",
    },
    next: { revalidate: 0 },
  });
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary

    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Products() {
  const data = await getProducts();

  return (
    <main className="flex min-h-screen flex-col items-center  p-8 gap-8 ">
      <DialogDemo />
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Score</TableHead>
            <TableHead className="text-right">Accions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product: any) => {
            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.score}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <UpdateProduct Product={product} />
                  <DeleteProduct id={product.id} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}

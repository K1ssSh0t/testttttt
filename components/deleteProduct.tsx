"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function DeleteProduct({ id }: { id: number }) {
  const router = useRouter();
  function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const res = fetch(
      `http://apiparaprincipiantes.test/api/videoGames/${id}}`,
      {
        method: "DELETE",
      }
    );
    //router.push("/dashboard/products");
    console.log(res);
    router.refresh();
  }
  return (
    <Button variant={"outline"} onClick={onSubmit}>
      {" "}
      🗑️Delet
    </Button>
  );
}

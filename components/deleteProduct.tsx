"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function DeleteProduct({ id }: { id: number }) {
  const router = useRouter();
  function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    async function deleteData() {
      const data = fetch(
        `http://apiparaprincipiantes.test/api/videoGames/${id}}`,
        {
          method: "DELETE",
        }
      ).then((res) => {
        return res.json();
      });
      console.log(data);
      router.refresh();
    }

    deleteData();
  }
  return (
    <Button variant={"outline"} onClick={onSubmit}>
      {" "}
      🗑️Delet
    </Button>
  );
}

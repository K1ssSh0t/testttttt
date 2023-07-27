"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export function DeleteUser({ id }: { id: number }) {
  const router = useRouter();
  function onSubmit() {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    async function deleteData() {
      const data = await fetch(
        `http://apiparaprincipiantes.test/api/clientes/${id}}`,
        {
          method: "DELETE",
        }
      ).then((res) => {
        return res;
      });
      // console.log(data);
      router.refresh();
      window.location.reload();
    }

    deleteData();
  }
  return (
    <Button variant={"outline"} onClick={onSubmit}>
      {" "}
      🗑️ Delete
    </Button>
  );
}

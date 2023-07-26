import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
};

export default function Users() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Usuarios
    </main>
  );
}

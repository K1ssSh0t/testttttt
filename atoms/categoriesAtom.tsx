import { atom, useAtom } from "jotai";

const data = async () =>
  await fetch("http://apiparaprincipiantes.test/api/categories", {
    method: "GET",
    headers: {
      "Content-Type": "aplication/json",
      "Cache-Control": "no-cache, private",
    },
    next: { revalidate: 0 },
  }).then((res) => {
    return res.json();
  });

export const categoriesAtom = atom(data);

export const userDataAtom = atom<any>({
  id: 1,
  name: "User",
  email: "example@email.com",
  password: "000000",
});

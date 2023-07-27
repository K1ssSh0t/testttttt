import { atom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const data = async () =>
  await fetch("https://laravel-api-production.up.railway.app/api/categories", {
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

export const userDataAtom = atomWithStorage<any>("userData", {
  id: 1,
  name: "User",
  email: "example@email.com",
  password: "000000",
  profile_picture:
    "https://www.nicepng.com/png/detail/914-9142519_doge-meme-dog-doggo-funny-sticker-momo-png.png",
});
/*export const userDataAtom = atom<any>({
  id: 1,
  name: "User",
  email: "example@email.com",
  password: "000000",
  profile_picture:
    "https://www.nicepng.com/png/detail/914-9142519_doge-meme-dog-doggo-funny-sticker-momo-png.png",
});
*/

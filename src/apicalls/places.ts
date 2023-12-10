import { toast } from "react-toastify";

export const getPlaces = async (query: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/places?query=${query}`);
    if (!res.ok) {
      toast.error("Something went wrong! Please try again!");
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    toast.error("Something went wrong! Please try again!");
    console.error(error);
  }
};

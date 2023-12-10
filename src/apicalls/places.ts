import { toast } from "react-toastify";

export const getPlaces = async (query: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/places?query=${query}`);
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

import { toast } from "react-toastify";

export const decodePolyline = async (polyline: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}api/polyline`,
      {
        method: "POST",
        body: JSON.stringify({
          polyline,
        }),
      }
    );
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

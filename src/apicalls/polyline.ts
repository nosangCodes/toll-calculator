export const decodePolyline = async (polyline: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/polyline", {
      method: "POST",
       body: JSON.stringify({
        polyline,
      }),
    });
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

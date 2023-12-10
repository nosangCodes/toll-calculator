export const getPlaces = async (query: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/places?query=${query}`);
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

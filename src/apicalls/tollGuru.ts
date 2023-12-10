export const getTollsBetweenOriginAndDestination = async (
  data: TollFormData
) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tollGuru`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const getTollsByPolyline = async (data: {
  source: string;
  polyline: string;
}) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tollGuru/tolls`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

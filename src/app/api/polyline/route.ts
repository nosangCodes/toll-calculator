import { decode, encode } from "@googlemaps/polyline-codec";
export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { polyline } = body;
    const decoeded = decode(polyline, 5);
    return Response.json({ decoededPolyline: decoeded });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const res =
      await fetch(`https://api.tomtom.com/search/2/search/${query}.json?key=${process.env.PLACES_API_KEY}
        `);

    if (!res.ok) {
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
      throw new Error("Failed!");
    }
    const data = await res.json();
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

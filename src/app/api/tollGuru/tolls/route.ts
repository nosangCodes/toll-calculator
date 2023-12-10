export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const res = await fetch(
      `https://apis.tollguru.com/toll/v2/complete-polyline-from-mapping-service`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": "tm4DbMMhtQJ7PqDBPfmrmJ44BgrGTJ22",
        },
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

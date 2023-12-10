export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append("x-api-key", process.env.TOLL_GURU_API_KEY as string);
    const res = await fetch(
      `https://apis.tollguru.com/toll/v2/origin-destination-waypoints`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      return Response.json({ error: "Internal Server Error" }, { status: 500 });
    }
    const data = await res.json();
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

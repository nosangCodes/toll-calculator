export const POST = async (req: Request) => {
  console.log("request", req.body);
  try {
    const body = await req.json();
    const myHeaders = new Headers();
    myHeaders.append("content-type", "application/json");
    myHeaders.append("x-api-key", "drTgBQM7484fgRnH76PqH82rqP4tGJjN");
    // const body = {
    //   from: {
    //     address: "Kalimpong, West benagal",
    //   },
    //   to: {
    //     address: "Delhi",
    //   },
    //   waypoints: [
    //     {
    //       address: "Kolkata",
    //     },
    //   ],
    //   vehicle: {
    //     type: "2AxlesTaxi",
    //   },
    // };

    const res = await fetch(
      `https://apis.tollguru.com/toll/v2/origin-destination-waypoints`,
      {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(body),
      }
    );
    const data = await res.json();
    console.log("data", data);
    return Response.json({ data });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
};

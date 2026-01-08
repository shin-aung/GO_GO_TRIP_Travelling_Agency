import { sheets } from "@/lib/googleSheets";

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const requestedId = url.searchParams.get("id");

    if (!requestedId) {
      return new Response("Missing id query parameter", { status: 400 });
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "User!A:E",
    });

    const rows = response.data.values;

    if (!rows || rows.length <= 1) {
      return Response.json(null);
    }

    const user = rows
      .slice(1)
      .map((row) => ({
        id: row[0],
        name: row[1],
        email: row[2],
        password: row[3],
        createdAt: row[4],
      }))
      .find((u) => u.id === requestedId);

    return Response.json(user ?? null);
  }
  catch (error) {
    console.error(error);
    return new Response("Error fetching data", { status: 500 });
  }
}
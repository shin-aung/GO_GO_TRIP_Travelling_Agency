import { sheets } from "@/lib/googleSheets";

/**
 * GET: Fetch a single package by id
 * Required query param: ?id=xxx
 */

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const requestedId = url.searchParams.get("id");

    if (!requestedId) {
      return new Response("Missing id query parameter", { status: 400 });
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Packages!A:J",
    });

    const rows = response.data.values;

    if (!rows || rows.length <= 1) {
      return Response.json(null);
    }

    const item = rows
      .slice(1)
      .map((row) => ({
        id: row[0],
        countryId: row[1],
        title: row[2],
        subtitle: row[3],
        mainTitle: row[4],
        description: row[5],
        price: row[6],
        imageURL: row[7],
        duration: row[8],
        details: JSON.parse(row[9] || "[]"),
      }))
      .find((d) => d.id === requestedId);

    return Response.json(item ?? null);
  } catch (error) {
    console.error(error);
    return new Response("Error fetching data", { status: 500 });
  }
}

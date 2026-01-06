import { sheets } from "@/lib/googleSheets";

/**
 * GET: Fetch packages by countryId
 * Required query param: ?countryId=xxx
 */

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const requestedId = url.searchParams.get("countryId");

    if (!requestedId) {
      return new Response("Missing countryId query parameter", { status: 400 });
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Packages!A:J",
    });

    const rows = response.data.values;

    if (!rows || rows.length <= 1) {
      return Response.json([]);
    }

    const items = rows
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
      .filter((d) => d.countryId === requestedId);

    return Response.json(items);
  } catch (error) {
    console.error(error);
    return new Response("Error fetching data", { status: 500 });
  }
}

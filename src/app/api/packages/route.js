import { sheets } from "@/lib/googleSheets";

/**
 * GET: Fetch Country!A:C
 */
export async function GET() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Packages!A:J",
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return Response.json([]);
    }

    // Assuming first row is header
    const data = rows.slice(1).map(row => ({
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
    }));

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Error fetching data", { status: 500 });
  }
}
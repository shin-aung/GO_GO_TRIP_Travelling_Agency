import { sheets } from "@/lib/googleSheets";
import { desc } from "framer-motion/client";

/**
 * GET: Fetch Country!A:C
 */
export async function GET() {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Country!A:D",
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return Response.json([]);
    }

    // Assuming first row is header
    const data = rows.slice(1).map(row => ({
      id: row[0],
      name: row[1],
      description: row[2],
      imageURL: row[3],
    }));

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return new Response("Error fetching data", { status: 500 });
  }
}
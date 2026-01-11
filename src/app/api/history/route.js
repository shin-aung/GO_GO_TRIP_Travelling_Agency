import { sheets } from "@/lib/googleSheets";

export async function POST(req) {
  try {
    const { userId, packageId } = await req.json();
    const uniqueId = `CNT-${Date.now()}`;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      
      range: "History!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[uniqueId, userId, packageId, new Date().toISOString(), false, true]],
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response("Error saving data", { status: 500 });
  }
}

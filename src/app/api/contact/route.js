import { sheets } from "@/lib/googleSheets";

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();
    const uniqueId = `CNT-${Date.now()}`;

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      
      range: "Contact!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[uniqueId,name, email, message, new Date().toISOString()]],
      },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error(error);
    return new Response("Error saving data", { status: 500 });
  }
}

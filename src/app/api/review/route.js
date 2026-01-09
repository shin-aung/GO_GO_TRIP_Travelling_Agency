import { sheets } from "@/lib/googleSheets";

export async function POST(req) {
  try {
    const { packageId, userId, rating, comment } = await req.json();
    const uniqueId = `REV-${Date.now()}`;

    const timestamp = new Date().toISOString();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Review!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[uniqueId, packageId || "", userId, rating, comment, timestamp]],
      },
    });

    const postedData = {
      id: uniqueId,
      packageId,
      userId,
      rating,
      comment,
      date: timestamp,
    };

    return new Response(JSON.stringify({ success: true, data: postedData }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ success: false, error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}

export async function GET() {
  try {
    // Fetch reviews
    const reviewRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "Review!A:F",
    });

    const reviewRows = reviewRes.data.values?.slice(1) || [];

    // Fetch users
    const userRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "User!A:B",
    });

    const userRows = userRes.data.values?.slice(1) || [];

    // Build user lookup map
    const userMap = Object.fromEntries(
      userRows.map(([id, name]) => [id, name])
    );

    // Map reviews
    const reviews = reviewRows.map((row) => ({
      id: row[0],
      packageId: row[1] || undefined,
      userId: row[2],
      userName: userMap[row[2]] ?? "Unknown User",
      rating: Number(row[3] ?? 0),
      comment: row[4] ?? "",
      date: row[5] ?? null,
    }));

    return new Response(
      JSON.stringify({ success: true, data: reviews }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

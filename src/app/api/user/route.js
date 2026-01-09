import { sheets } from "@/lib/googleSheets";

export async function POST(req) {
  try {
    // Parse the JSON from the request
    const { name, email, password } = await req.json();

    // 1️⃣ Get existing users from the sheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "User!A:E",
    });

    const rows = response.data.values || [];

    // 2️⃣ Check if the email already exists
    const emailExists = rows.some((row) => row[2] === email); // row[2] is email column
    if (emailExists) {
      return new Response(
        JSON.stringify({ success: false, error: "Email already registered" }),
        { headers: { "Content-Type": "application/json" }, status: 400 }
      );
    }

    // 3️⃣ Generate a unique ID for the user
    const uniqueId = `User-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // 4️⃣ Append new user to Google Sheets
    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range: "User!A:E",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[uniqueId, name, email, `'${password}`, timestamp]],
      },
    });

    // 5️⃣ Respond with the posted data
    const postedData = { id: uniqueId, name, email, password, createdAt: timestamp };

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

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const requestedEmail = url.searchParams.get("email");
    const requestedPassword = url.searchParams.get("password");

    if (!requestedEmail || !requestedPassword) {
      return new Response("Missing email or password query parameter", { status: 400 });
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
      .find((u) => u.email === requestedEmail && u.password === requestedPassword);

    return Response.json(user ?? null);
  }
  catch (error) {
    console.error(error);
    return new Response("Error fetching data", { status: 500 });
  }
}
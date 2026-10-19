const MEMBER_SHEET_ID = "1rSZ7_TroiHyRhfo-h0TtM-L6ePJ0A6stmC8zM3WkSAg";
const MEMBER_SHEET_NAME = "Sheet1";

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (quoted) {
      if (character === '"' && text[index + 1] === '"') {
        value += '"';
        index += 1;
      } else if (character === '"') {
        quoted = false;
      } else {
        value += character;
      }
      continue;
    }

    if (character === '"') {
      quoted = true;
    } else if (character === ",") {
      row.push(value);
      value = "";
    } else if (character === "\n") {
      row.push(value);
      rows.push(row);
      row = [];
      value = "";
    } else if (character !== "\r") {
      value += character;
    }
  }

  if (value || row.length) {
    row.push(value);
    rows.push(row);
  }

  return rows;
}

function normalizeHeader(header) {
  return header.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_|_$/g, "");
}

function rowsToObjects(rows) {
  const [headerRow = [], ...dataRows] = rows;
  const headers = headerRow.map(normalizeHeader);

  return dataRows
    .filter((row) => row.some((value) => String(value).trim()))
    .map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] ?? ""])));
}

function isPublished(value) {
  return ["yes", "true", "1"].includes(String(value).trim().toLowerCase());
}

function extractDriveFileId(value) {
  const rawValue = String(value).trim();

  try {
    const url = new URL(rawValue);
    const queryId = url.searchParams.get("id");
    if (queryId) return queryId;

    const pathMatch = url.pathname.match(/\/d\/([^/]+)/);
    return pathMatch?.[1] || "";
  } catch {
    return "";
  }
}

function toPublicPhotoUrl(value) {
  const fileId = extractDriveFileId(value);
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1000`;
  }

  try {
    const url = new URL(String(value).trim());
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

export async function loadMembers() {
  const query = new URLSearchParams({
    tqx: "out:csv",
    sheet: MEMBER_SHEET_NAME,
    headers: "1",
    cacheBust: String(Date.now()),
  });
  const url = `https://docs.google.com/spreadsheets/d/${MEMBER_SHEET_ID}/gviz/tq?${query}`;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error(`Members request failed with ${response.status}`);

    const rows = parseCsv(await response.text());
    if (normalizeHeader(rows[0]?.[0] || "") !== "full_name") {
      throw new Error("Unexpected members response");
    }

    return rowsToObjects(rows)
      .filter((row) => isPublished(row.publish))
      .map((row, index) => ({
        id: `${index + 1}-${row.full_name}`,
        name: String(row.full_name).trim(),
        photoUrl: toPublicPhotoUrl(row.member_photo),
        photoFailed: false,
      }))
      .filter((member) => member.name);
  } finally {
    window.clearTimeout(timeout);
  }
}

export { MEMBER_SHEET_ID };

const CONTENT_SHEET_ID = "1RAMyA5fozHbLYBGTv3y_cFcZI0Vnr4KLWvgHHIKvM8U";

const SHEET_NAMES = [
  "Site Settings",
  "Homepage",
  "Committee",
  "News",
  "Events",
  "Fixtures & Results",
  "Gallery",
];

const FIRST_HEADER_BY_SHEET = {
  "Site Settings": "key",
  Homepage: "section",
  Committee: "group",
  News: "id",
  Events: "id",
  "Fixtures & Results": "id",
  Gallery: "order",
};

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

function toOrder(value) {
  const order = Number.parseInt(value, 10);
  return Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER;
}

function safeUrl(value) {
  try {
    const url = new URL(String(value).trim());
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function extractDriveFileId(value) {
  try {
    const url = new URL(String(value).trim());
    const queryId = url.searchParams.get("id");
    if (queryId) return queryId;
    return url.pathname.match(/\/d\/([^/]+)/)?.[1] || "";
  } catch {
    return "";
  }
}

function toPublicPhotoUrl(value) {
  const fileId = extractDriveFileId(value);
  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${encodeURIComponent(fileId)}&sz=w1600`;
  }
  return safeUrl(value);
}

async function fetchSheet(sheetName) {
  const query = new URLSearchParams({
    tqx: "out:csv",
    sheet: sheetName,
    headers: "1",
    cacheBust: String(Date.now()),
  });
  const url = `https://docs.google.com/spreadsheets/d/${CONTENT_SHEET_ID}/gviz/tq?${query}`;
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(url, { cache: "no-store", signal: controller.signal });
    if (!response.ok) throw new Error(`Content request failed with ${response.status}`);
    const rows = parseCsv(await response.text());
    const firstHeader = normalizeHeader(rows[0]?.[0] || "");
    if (firstHeader !== FIRST_HEADER_BY_SHEET[sheetName]) {
      throw new Error(`Unexpected content response for ${sheetName}`);
    }
    return rowsToObjects(rows);
  } finally {
    window.clearTimeout(timeout);
  }
}

export async function loadCmsContent() {
  const entries = await Promise.all(
    SHEET_NAMES.map(async (sheetName) => [sheetName, await fetchSheet(sheetName)]),
  );
  const sheets = Object.fromEntries(entries);

  const settings = Object.fromEntries(
    sheets["Site Settings"]
      .filter((row) => row.key)
      .map((row) => [row.key, row.value]),
  );

  const homepage = {};
  sheets.Homepage.filter((row) => isPublished(row.published)).forEach((row) => {
    const section = String(row.section).trim().toLowerCase();
    homepage[section] ??= {};
    homepage[section][row.key] = row.content;
  });

  const committee = sheets.Committee.filter((row) => isPublished(row.published))
    .map((row) => ({
      group: row.group,
      order: toOrder(row.order),
      number: String(row.display_number).padStart(2, "0"),
      name: row.name,
      role: row.role,
      photoUrl: safeUrl(row.photo_url),
    }))
    .sort((a, b) => a.order - b.order);

  const newsItems = sheets.News.filter((row) => isPublished(row.published))
    .map((row) => ({
      id: row.id,
      order: toOrder(row.order),
      category: row.category,
      title: row.title,
      summary: row.summary,
      date: row.date,
      imageUrl: safeUrl(row.image_url),
    }))
    .sort((a, b) => a.order - b.order);

  const events = sheets.Events.filter((row) => isPublished(row.published))
    .map((row) => ({
      id: row.id,
      order: toOrder(row.order),
      title: row.title,
      date: row.date,
      time: row.time,
      location: row.location,
      summary: row.summary,
      imageUrl: safeUrl(row.image_url),
    }))
    .sort((a, b) => a.order - b.order);

  const matchRows = sheets["Fixtures & Results"]
    .filter((row) => isPublished(row.published))
    .map((row) => ({
      id: row.id,
      type: row.type,
      order: toOrder(row.order),
      date: row.date,
      time: row.time,
      opponent: row.opponent,
      location: row.location,
      score: row.score,
      status: row.status,
    }))
    .sort((a, b) => a.order - b.order);

  const gallery = sheets.Gallery.filter((row) => isPublished(row.published))
    .map((row, index) => ({
      id: `gallery-${index + 1}-${row.order}`,
      order: toOrder(row.order),
      caption: String(row.caption || "").trim(),
      photoUrl: toPublicPhotoUrl(row.photo_url),
      photoFailed: false,
    }))
    .filter((photo) => photo.photoUrl)
    .sort((a, b) => a.order - b.order);

  return {
    settings,
    homepage,
    committee,
    newsItems,
    events,
    fixtures: matchRows.filter((row) => row.type.toLowerCase() !== "result"),
    results: matchRows.filter((row) => row.type.toLowerCase() === "result"),
    gallery,
  };
}

export { CONTENT_SHEET_ID };

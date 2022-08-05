export function baseUrl(baseId: string): URL {
  const url = new URL(`https://api.airtable.com/v0/${baseId}`);
  return url;
}

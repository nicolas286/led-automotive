export function getQuadUrl(entry: { id: string; data: { slug?: string } }) {
  return `/quads/${entry.data.slug ?? entry.id}`;
}

export function getLedUrl(entry: { id: string; data: { slug?: string } }) {
  return `/leds/${entry.data.slug ?? entry.id}`;
}
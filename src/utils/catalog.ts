export function getQuadUrl(entry: { id: string; data: { slug?: string } }) {
  return `/quads/${entry.data.slug ?? entry.id}`;
}

export const getMotoUrl = (moto) => `/motos/${moto.data.slug ?? moto.id}`;

export const getAccessoryUrl = (item: { data: { slug?: string }; id: string }) =>
  `/accessories/${item.data.slug ?? item.id}`;

export function getLedUrl(entry: { id: string; data: { slug?: string } }) {
  return `/leds/${entry.data.slug ?? entry.id}`;
}
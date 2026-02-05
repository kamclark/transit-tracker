// server/api/septa/stations.ts
// Proxies SEPTA locations API to avoid CORS issues

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const lat = query.lat as string;
  const lon = query.lon as string;
  const type = (query.type as string) || 'rail_stations';
  const radius = (query.radius as string) || '0.75';

  if (!lat || !lon) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required parameters: lat, lon',
    });
  }

  const septaUrl = `https://www3.septa.org/api/locations/get_locations.php?lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}&type=${encodeURIComponent(type)}&radius=${encodeURIComponent(radius)}`;

  try {
    const response = await $fetch(septaUrl);
    return response;
  } catch (error) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Failed to fetch from SEPTA API',
    });
  }
});

// server/api/septa/arrivals.ts
// Proxies SEPTA arrivals API to avoid CORS issues

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const stationId = query.station as string;

  if (!stationId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required parameter: station',
    });
  }

  const septaUrl = `https://www3.septa.org/api/Arrivals/index.php?station=${encodeURIComponent(stationId)}`;

  try {
    const response = await $fetch(septaUrl);
    return response;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[SEPTA Arrivals] Failed for station="${stationId}":`, message);
    throw createError({
      statusCode: 502,
      statusMessage: `Failed to fetch arrivals from SEPTA API: ${message}`,
    });
  }
});

export default defineEventHandler(async (event) => {
  const { lat, lon, type = "rail_stations", radius = "1" } = getQuery(event);

  const url = new URL("https://www3.septa.org/api/locations/get_locations.php");
  url.searchParams.set("lat", String(lat));
  url.searchParams.set("lon", String(lon));
  url.searchParams.set("type", String(type));
  url.searchParams.set("radius", String(radius));

  const res = await fetch(url.toString(), { headers: { "Accept": "application/json" } });
  if (!res.ok) {
    throw createError({ statusCode: res.status, statusMessage: "SEPTA upstream error" });
  }
  
  return await res.json();
});

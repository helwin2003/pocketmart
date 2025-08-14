// utils/fixImagePaths.js
export function fixImagePaths(data) {
  const baseUrl = import.meta.env.BASE_URL; // "/pocketmart/"
  return data.map((item) => ({
    ...item,
    image: item.image.startsWith("/")
      ? baseUrl + item.image.slice(1)
      : baseUrl + item.image,
  }));
}

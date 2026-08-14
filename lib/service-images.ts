const fallbackServiceImages = [
  "/images/gallery-milky-nude.png",
  "/images/gallery-cherry-red.png",
  "/images/gallery-blush-flower.png",
  "/images/gallery-mocha.png",
];

export function getServiceImage(id: string, image?: string | null) {
  if (image) return image;

  const index = id
    .split("")
    .reduce((total, character) => total + character.charCodeAt(0), 0) % fallbackServiceImages.length;

  return fallbackServiceImages[index];
}

export const PRODUCTS = [
  {
    id: "agrodyke-250g",
    translationKey: "products.agrodyke-250g",
    weight: "250 g",
    priceXAF: 3000,
    isPopular: false,
    image: null
  },
  {
    id: "agrodyke-500g",
    translationKey: "products.agrodyke-500g",
    weight: "500 g",
    priceXAF: 6000,
    isPopular: true,
    image: null
  },
  {
    id: "agrodyke-1kg",
    translationKey: "products.agrodyke-1kg",
    weight: "1 Kg",
    priceXAF: 12000,
    isPopular: false,
    image: null
  }
] as const;

export const CAMEROON_REGIONS = [
  { value: "adamaoua", labelKey: "regions.adamaoua" },
  { value: "centre", labelKey: "regions.centre" },
  { value: "east", labelKey: "regions.east" },
  { value: "far-north", labelKey: "regions.farNorth" },
  { value: "littoral", labelKey: "regions.littoral" },
  { value: "north", labelKey: "regions.north" },
  { value: "north-west", labelKey: "regions.northWest" },
  { value: "south", labelKey: "regions.south" },
  { value: "south-west", labelKey: "regions.southWest" },
  { value: "west", labelKey: "regions.west" }
] as const;

export const DELIVERY_FEES: Record<string, number> = {
  "littoral": 0,
  "centre": 2000,
  "west": 2500,
  "south-west": 2500,
  "north-west": 3000,
  "south": 3000,
  "east": 4000,
  "adamaoua": 4500,
  "north": 5000,
  "far-north": 5500
};

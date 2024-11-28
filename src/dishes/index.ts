import type { Food } from "@/types/food";
import { beefWithGinger } from "./fried-beef-with-ginger";
import { mchuYoun } from "./mchu-youn";
import { ngamNgov } from "./ngam-ngov";
import { friedBeefBroccoli } from "./fried-beef-with-broccoli";
import { tomyumSeafood } from "./tomyum-seafood";
import { stirFriedChickenWithBroccoli } from "./stir-fried-chicken";
import { chineseSteamedFish } from "./chinese-steamed-fish";

export const dishes: Array<Food> = [
  beefWithGinger,
  mchuYoun,
  ngamNgov,
  friedBeefBroccoli,
  tomyumSeafood,
  stirFriedChickenWithBroccoli,
  chineseSteamedFish,
];

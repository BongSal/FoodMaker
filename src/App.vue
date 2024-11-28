<template>
  <Card
    class="w-full max-w-md mx-auto rounded-none h-screen flex flex-col space-y-1"
  >
    <div
      class="w-full h-56 bg-gray-200 rounded-none flex items-center justify-center flex-shrink-0"
    >
      <img :src="food.banner_image" class="object-cover h-full w-full" />
    </div>

    <div class="flex-1 overflow-y-auto">
      <CardHeader>
        <CardTitle class="text-xl font-bold">{{ food.title }}</CardTitle>
        <p class="text-sm text-gray-600">
          {{ food.description }}
        </p>
      </CardHeader>

      <CardContent>
        <div class="space-y-4">
          <div>
            <h3 class="text-lg font-semibold mb-2">Ingredients</h3>
            <ul class="space-y-2">
              <li
                v-for="(ingredient, idx) in food.ingredients"
                :key="idx"
                class="text-sm text-gray-600"
              >
                {{ ingredient }}
              </li>
            </ul>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-2">How to cook</h3>
            <ul class="space-y-2">
              <li
                v-for="(howToCook, idx) in food.how_to_cook"
                :key="idx"
                class="text-sm text-gray-600"
              >
                {{ howToCook }}
              </li>
            </ul>
          </div>

          <!-- <Separator /> -->

          <div v-if="food.youtube_link">
            <h3 class="text-lg font-semibold mb-2">Video Link</h3>
            <a
              :href="food.youtube_link"
              class="text-sm truncate text-blue-600"
              target="_blank"
            >
              {{ food.youtube_link }}
            </a>
          </div>
        </div>
      </CardContent>
    </div>

    <CardFooter class="flex-shrink-0 gap-2">
      <Button variant="outline" class="w-full" @click="viewAllFood">
        All Food
      </Button>
      <Button class="w-full" @click="generateNewFood"> New Food </Button>
    </CardFooter>
  </Card>
</template>

<script setup lang="ts">
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { computed, ref } from "vue";
import type { Food } from "./types/food";
import { dishes } from "./dishes";

const foods: Array<Food> = dishes;

const randomIdx = ref(0);
const food = computed<Food>(() => foods[randomIdx.value]);
const generateNewFood = () => {
  const min = 0;
  const max = foods.length;
  randomIdx.value = Math.floor(Math.random() * (max - min) + min);
};
const viewAllFood = () => {};
</script>

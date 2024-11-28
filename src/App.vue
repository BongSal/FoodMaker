<template>
  <Card
    class="w-full max-w-md mx-auto rounded-none h-screen flex flex-col space-y-1"
  >
    <div
      class="w-full h-56 bg-gray-200 rounded-none flex items-center justify-center flex-shrink-0"
    >
      <img :src="food.banner_image" class="object-cover h-full w-full" />
    </div>

    <div class="flex-1 overflow-y-auto" ref="container">
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
        All Foods
      </Button>
      <Button class="w-full" @click="generateNewFood"> Next Food </Button>
    </CardFooter>

    <Dialog
      :open="isAllFoodDialogOpen"
      @update:open="isAllFoodDialogOpen = $event"
    >
      <DialogContent class="max-w-[380px]">
        <DialogHeader>
          <DialogTitle>All Foods</DialogTitle>
          <DialogDescription>
            All types of food are available here. Click on any dish to view its
            details.
          </DialogDescription>
        </DialogHeader>
        <div
          class="flex flex-col gap-2 max-h-[calc(100vh-20rem)] overflow-auto"
        >
          <Card
            v-for="(item, idx) in foods"
            :key="idx"
            class="hover:bg-gray-50 cursor-pointer"
            @click="() => handleFoodClick(idx)"
          >
            <CardContent class="p-2">
              <div class="flex items-center gap-2">
                <div class="w-14 h-14">
                  <img
                    :src="item.banner_image"
                    class="object-cover h-full w-full rounded-sm"
                  />
                </div>
                <div class="flex-1 flex flex-col">
                  <h1
                    class="font-semibold overflow-ellipsis whitespace-normal overflow-hidden"
                  >
                    {{ item.title }}
                  </h1>

                  <span
                    class="text-sm font-xs text-gray-500 overflow-ellipsis whitespace-normal overflow-hidden"
                  >
                    <!-- {{ item.description }} -->
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <DialogFooter>
          <Button @click="isAllFoodDialogOpen = false"> Close </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
import { computed, nextTick, ref } from "vue";
import type { Food } from "./types/food";
import { dishes } from "./dishes";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const foods: Array<Food> = dishes;

const container = ref<HTMLDivElement | null>(null);
const randomIdx = ref(0);
const food = computed<Food>(() => foods[randomIdx.value]);
const generateNewFood = () => {
  const min = 0;
  const max = foods.length;
  while (true) {
    const idx = Math.floor(Math.random() * (max - min) + min);
    if (idx != randomIdx.value) {
      randomIdx.value = Math.floor(Math.random() * (max - min) + min);
      break;
    }
  }
};

const isAllFoodDialogOpen = ref(false);
const viewAllFood = () => {
  isAllFoodDialogOpen.value = true;
};
const handleFoodClick = (idx: number) => {
  randomIdx.value = idx;
  isAllFoodDialogOpen.value = false;
  nextTick(() => {
    if (container.value)
      container.value.scrollTo({ top: 0, behavior: "instant" });
  });
};
</script>

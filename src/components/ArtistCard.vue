<script setup>
import { computed } from 'vue';

const props = defineProps({
  artist: { type: Object, required: true }
});

const image = computed(() => props.artist.images?.[0]?.url || null);

const followers = computed(() => {
  const total = props.artist.followers?.total;
  return typeof total === 'number'
    ? new Intl.NumberFormat('es-CL').format(total)
    : null;
});
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center gap-6 mb-8 pb-6 border-b border-slate-800">
    <img
      v-if="image"
      :src="image"
      :alt="artist.name"
      class="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover shadow-xl border-4 border-pink-500/30"
    />
    <div
      v-else
      class="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-slate-800 flex items-center justify-center text-5xl font-black text-pink-400 border-4 border-pink-500/30"
    >
      {{ artist.name?.[0] }}
    </div>

    <div class="text-center sm:text-left">
      <h2 class="text-3xl sm:text-4xl font-extrabold text-white mb-2">{{ artist.name }}</h2>
      <p v-if="followers" class="text-slate-400 text-sm">
        {{ followers }} seguidores en Spotify
      </p>
    </div>
  </div>
</template>
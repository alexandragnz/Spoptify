<script setup>
import { ref } from 'vue';
import ArtistTrackList from './components/ArtistTrackList.vue';

const femalePopIcons = [
  { name: 'Britney Spears', id: '26dSoYclwsYLMAKD3tpOr4' },
  { name: 'Christina Aguilera', id: '1l7ZsJRRS8wlW3WfJfPfNS' },
  { name: 'Beyoncé', id: '6vWDO969PvNqNYHIOW5v0m' },
  { name: 'Rihanna', id: '5pKCCKE2ajJHZ9KAiaK11H' },
  { name: 'Lady gaga', id: '1HY2Jd0NmPuamShAr6KMms' },
  { name: 'Dua Lipa', id: '6M2wZ9GZgrQXHCFfjv46we' },
  { name: 'Taylor Swift', id: '06HL4z0CvFAxyc27GXpf02' },
  { name: 'Ariana Grande', id: '66CXWjxzNUsdJxJ2JdwvnR' },
  { name: 'Doja Cat', id: '5cj0lLjcoR7YOSnhnX0Po5' },
  { name: 'Miley Cyrus', id: '5YGY8feqx7naU7z4HrwZM6' }
];

// Artista por defecto Britney Spears
const selectedArtistId = ref('26dSoYclwsYLMAKD3tpOr4');
</script>

<template>
  <main class="min-h-screen bg-slate-950 text-white p-6 md:p-12">
    <header class="max-w-4xl mx-auto mb-8 text-center">
      <h1 class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 mb-4">
        Pop Femenino Hub
      </h1>
      <p class="text-slate-400 mb-6">Explora las canciones más populares de tus artistas favoritas.</p>
      
      <!-- Botones para alternar entre artistas -->
      <div class="flex flex-wrap justify-center gap-2">
        <button
          v-for="artist in femalePopIcons"
          :key="artist.id"
          @click="selectedArtistId = artist.id"
          :class="[
            'px-4 py-2 rounded-full font-medium transition text-sm',
            selectedArtistId === artist.id
              ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/30'
              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
          ]"
        >
          {{ artist.name }}
        </button>
      </div>
    </header>

    <!-- Visualizador de Top Tracks -->
    <ArtistTrackList :artistId="selectedArtistId" />
  </main>
</template>
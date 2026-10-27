<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import ArtistCard from './ArtistCard.vue';
import { getArtist, getArtistTrackList, sortTracksByReleaseDate } from '../services/spotify';

const props = defineProps({
  artistId: { type: String, required: true }
});

const artist = ref(null);
const tracks = ref([]);
const loading = ref(true);
const error = ref(null);
const sortOrder = ref('desc');

const sortedTracks = computed(() =>
  sortTracksByReleaseDate(tracks.value, sortOrder.value)
);

async function loadArtistData() {
  loading.value = true;
  error.value = null;
  try {
    artist.value = await getArtist(props.artistId);
    tracks.value = (await getArtistTrackList(props.artistId)) ?? [];
  } catch (err) {
    console.error('Detalle del error:', err);
    error.value = 'Hubo un error al cargar la información de Spotify.';
  } finally {
    loading.value = false;
  }
  console.log('fechas:', tracks.value.map(t => t.album?.release_date ?? t.releaseDate));
}

onMounted(loadArtistData);
watch(() => props.artistId, loadArtistData);
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-slate-900 text-white rounded-3xl shadow-2xl border border-slate-800">
    
    <!-- Estado: Cargando -->
    <div v-if="loading" class="text-center py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
      <p class="text-slate-400 font-medium">Cargando música desde Spotify...</p>
    </div>

    <!-- Estado: Error -->
    <div v-else-if="error" class="bg-red-500/10 border border-red-500/30 p-6 rounded-2xl text-center text-red-400">
      <p>{{ error }}</p>
      <button 
        @click="loadArtistData" 
        class="mt-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
      >
        Reintentar
      </button>
    </div>

    <!-- Estado: Contenido -->
<div v-else>
  <ArtistCard v-if="artist" :artist="artist" />

  <!-- Lista top canciones / iframes -->

  <p v-if="!tracks.length" class="text-slate-400">
    No hay canciones disponibles.
  </p>

  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div
      v-for="track in tracks"
      :key="track.id"
      class="bg-slate-800/50 p-2 rounded-2xl border border-slate-800 hover:border-pink-500/40 transition"
    >
      <iframe
        :src="`https://open.spotify.com/embed/track/${track.id}?utm_source=generator&theme=0`"
        width="100%"
        height="152"
        frameborder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        class="rounded-xl"
      ></iframe>
    </div>
  </div>
</div>

  </div>
</template>
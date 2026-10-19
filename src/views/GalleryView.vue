<script setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import SiteFooter from "../components/SiteFooter.vue";
import SiteHeader from "../components/SiteHeader.vue";
import { useSiteContent } from "../composables/useSiteContent";

const content = useSiteContent();
const selectedPhoto = ref(null);

function closeLightbox() {
  selectedPhoto.value = null;
}

function handleEscape(event) {
  if (event.key === "Escape") closeLightbox();
}

onMounted(() => window.addEventListener("keydown", handleEscape));
onBeforeUnmount(() => window.removeEventListener("keydown", handleEscape));
</script>

<template>
  <main class="gallery-page">
    <SiteHeader />

    <section class="page-hero gallery-hero">
      <div>
        <p class="eyebrow">Life at BD Sporting’s</p>
        <h1>Club<br /><span>Gallery.</span></h1>
      </div>
      <div class="page-intro">
        <p>Moments from matches, tournaments and community events—all in one place.</p>
        <span>Only approved photos are published</span>
      </div>
    </section>

    <section class="gallery-content" aria-labelledby="gallery-heading">
      <div class="gallery-heading">
        <p class="section-label">Our moments</p>
        <h2 id="gallery-heading">Photos from the club</h2>
      </div>

      <p v-if="content.cms.loading" class="gallery-status" role="status">Loading gallery…</p>
      <p v-else-if="content.cms.error" class="gallery-status" role="status">
        The gallery is temporarily unavailable. Please try again later.
      </p>

      <div v-else-if="content.gallery.length" class="gallery-grid">
        <button
          v-for="photo in content.gallery"
          :key="photo.id"
          class="gallery-card"
          type="button"
          :aria-label="`Open ${photo.caption || 'gallery photo'}`"
          @click="selectedPhoto = photo"
        >
          <img
            v-if="!photo.photoFailed"
            :src="photo.photoUrl"
            :alt="photo.caption || 'BD Sporting’s Darmstadt gallery photo'"
            loading="lazy"
            referrerpolicy="no-referrer"
            @error="photo.photoFailed = true"
          />
          <span v-else class="gallery-image-error">Photo unavailable</span>
          <span v-if="photo.caption" class="gallery-caption">{{ photo.caption }}</span>
        </button>
      </div>

      <div v-else class="gallery-empty">
        <span aria-hidden="true">＋</span>
        <div>
          <h3>Gallery coming soon</h3>
          <p>Approved photos from club activities will appear here.</p>
        </div>
      </div>
    </section>

    <div
      v-if="selectedPhoto"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="selectedPhoto.caption || 'Gallery photo'"
      @click.self="closeLightbox"
    >
      <button class="lightbox-close" type="button" aria-label="Close photo" @click="closeLightbox">×</button>
      <figure>
        <img :src="selectedPhoto.photoUrl" :alt="selectedPhoto.caption || 'BD Sporting’s Darmstadt gallery photo'" />
        <figcaption v-if="selectedPhoto.caption">{{ selectedPhoto.caption }}</figcaption>
      </figure>
    </div>

    <SiteFooter />
  </main>
</template>

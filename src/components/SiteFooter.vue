<script setup>
import { RouterLink } from "vue-router";
import ClubLogo from "./ClubLogo.vue";

defineProps({
  taglineLines: {
    type: Array,
    default: () => ["Football. Cricket. Community.", "Proudly based in Darmstadt."],
  },
});

const footerLinks = [
  { label: "Home", to: { name: "home" } },
  { label: "About", to: { name: "home", hash: "#about" } },
  { label: "Committee", to: { name: "committee" } },
  { label: "Updates", to: { name: "home", hash: "#updates" } },
  { label: "Membership", to: { name: "home", hash: "#membership" } },
];
</script>

<template>
  <footer id="contact">
    <div class="footer-main">
      <ClubLogo />
      <p>
        <template v-for="(line, index) in taglineLines" :key="line">
          {{ line }}<br v-if="index < taglineLines.length - 1" />
        </template>
      </p>
    </div>
    <div class="footer-links">
      <RouterLink v-for="link in footerLinks" :key="link.label" :to="link.to">
        {{ link.label }}
      </RouterLink>
    </div>
    <div class="footer-bottom">
      <span>© 2026 BD Sporting’s Darmstadt</span>
      <span>Established 2024</span>
    </div>
    <div class="test-notice" role="note" aria-label="Website test notice">
      <strong>Test website</strong>
      <span>
        This site is currently in a public testing phase. Content may change,
        and comments or submissions are not being accepted at this time.
      </span>
    </div>
  </footer>
</template>

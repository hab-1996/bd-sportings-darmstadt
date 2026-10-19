<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { useSiteContent } from "../composables/useSiteContent";
import ClubLogo from "./ClubLogo.vue";

const props = defineProps({
  taglineLines: {
    type: Array,
    default: null,
  },
});

const content = useSiteContent();
const resolvedTaglineLines = computed(
  () => props.taglineLines || [content.settings.footerLine1, content.settings.footerLine2],
);

const footerLinks = [
  { label: "Home", to: { name: "home" } },
  { label: "About", to: { name: "home", hash: "#about" } },
  { label: "Committee", to: { name: "committee" } },
  { label: "Updates", to: { name: "home", hash: "#updates" } },
  { label: "Membership", to: { name: "home", hash: "#membership" } },
  { label: "Members", to: { name: "members" } },
];
</script>

<template>
  <footer id="contact">
    <div class="footer-main">
      <ClubLogo />
      <p>
        <template v-for="(line, index) in resolvedTaglineLines" :key="line">
          {{ line }}<br v-if="index < resolvedTaglineLines.length - 1" />
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
    <div
      v-if="content.settings.testNoticeEnabled"
      class="test-notice"
      role="note"
      aria-label="Website test notice"
    >
      <strong>{{ content.settings.testNoticeTitle }}</strong>
      <span>{{ content.settings.testNoticeText }}</span>
    </div>
  </footer>
</template>

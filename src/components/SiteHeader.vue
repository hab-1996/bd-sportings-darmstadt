<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useSiteContent } from "../composables/useSiteContent";
import ClubLogo from "./ClubLogo.vue";

const route = useRoute();
const content = useSiteContent();
const menuOpen = ref(false);

const navItems = computed(() => {
  const items = [
    { label: "About", to: { name: "home", hash: "#about" } },
    { label: "Committee", to: { name: "committee" } },
    { label: "Updates", to: { name: "updates" } },
    { label: "Gallery", to: { name: "gallery" } },
    { label: "Membership", to: { name: "home", hash: "#membership" } },
    { label: "Members", to: { name: "members" } },
  ];

  return route.name !== "home"
    ? [{ label: "Home", to: { name: "home" } }, ...items]
    : items;
});

function closeMenu() {
  menuOpen.value = false;
}

function handleEscape(event) {
  if (event.key === "Escape") closeMenu();
}

watch(() => route.fullPath, closeMenu);
onMounted(() => window.addEventListener("keydown", handleEscape));
onBeforeUnmount(() => window.removeEventListener("keydown", handleEscape));
</script>

<template>
  <header class="site-header">
    <RouterLink :to="{ name: 'home', hash: '#top' }" aria-label="Go to homepage">
      <ClubLogo />
    </RouterLink>

    <button
      class="menu-button"
      :class="{ open: menuOpen }"
      type="button"
      aria-label="Toggle navigation"
      :aria-expanded="menuOpen"
      aria-controls="main-navigation"
      @click="menuOpen = !menuOpen"
    >
      <span></span>
      <span></span>
    </button>

    <nav
      id="main-navigation"
      class="nav"
      :class="{ open: menuOpen }"
      aria-label="Main navigation"
    >
      <RouterLink
        v-for="item in navItems"
        :key="item.label"
        :to="item.to"
        :class="{
          active:
            (item.label === 'Committee' && route.name === 'committee') ||
            (item.label === 'Updates' && route.name === 'updates') ||
            (item.label === 'Gallery' && route.name === 'gallery') ||
            (item.label === 'Members' && route.name === 'members'),
        }"
        @click="closeMenu"
      >
        {{ item.label }}
      </RouterLink>
      <a
        class="nav-cta"
        :href="content.settings.membershipFormUrl"
        target="_blank"
        rel="noopener noreferrer"
        @click="closeMenu"
      >
        Join the club
      </a>
    </nav>
  </header>
</template>

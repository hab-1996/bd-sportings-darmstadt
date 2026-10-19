<script setup>
import { computed } from "vue";
import SiteFooter from "../components/SiteFooter.vue";
import SiteHeader from "../components/SiteHeader.vue";
import { useSiteContent } from "../composables/useSiteContent";

const content = useSiteContent();

const initials = (name) =>
  String(name)
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();

const memberCountLabel = computed(() => {
  const count = content.members.length;
  return `${count} published ${count === 1 ? "member" : "members"}`;
});
</script>

<template>
  <main class="members-page">
    <SiteHeader />

    <section class="members-hero">
      <div>
        <p class="eyebrow">Our club community</p>
        <h1>Our<br /><span>Members.</span></h1>
      </div>
      <div class="members-intro">
        <p>
          Meet the people who bring BD Sporting’s Darmstadt to life—on the field,
          beside it and throughout our community.
        </p>
        <span v-if="!content.membersCms.loading && content.membersCms.connected">
          {{ memberCountLabel }}
        </span>
      </div>
    </section>

    <section class="members-content" aria-labelledby="members-heading">
      <div class="members-heading">
        <p class="section-label">The people behind the club</p>
        <h2 id="members-heading">Club members</h2>
      </div>

      <p v-if="content.membersCms.loading" class="members-status" role="status">
        Loading member profiles…
      </p>

      <p v-else-if="content.membersCms.error" class="members-status" role="status">
        Member profiles are temporarily unavailable. Please try again later.
      </p>

      <div v-else-if="content.members.length" class="member-grid">
        <article v-for="member in content.members" :key="member.id" class="member-card">
          <div class="member-photo-frame">
            <img
              v-if="member.photoUrl && !member.photoFailed"
              :src="member.photoUrl"
              :alt="`${member.name}, BD Sporting’s Darmstadt member`"
              class="member-photo"
              loading="lazy"
              referrerpolicy="no-referrer"
              @error="member.photoFailed = true"
            />
            <span v-else class="member-initials" aria-hidden="true">
              {{ initials(member.name) }}
            </span>
          </div>
          <h3>{{ member.name }}</h3>
        </article>
      </div>

      <p v-else class="members-status">Member profiles will appear here soon.</p>
    </section>

    <SiteFooter />
  </main>
</template>

<script setup>
import { computed } from "vue";
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
import { useSiteContent } from "../composables/useSiteContent";

const content = useSiteContent();
const featuredNews = computed(() => content.newsItems[0]);
</script>

<template>
  <main>
    <SiteHeader />
    <section id="top" class="hero">
      <div class="hero-stripe" aria-hidden="true"></div>
      <div class="hero-copy">
        <p class="eyebrow">{{ content.homepage.hero.eyebrow }}</p>
        <h1>
          {{ content.homepage.hero.title_line_1 }}<br />
          <span>{{ content.homepage.hero.title_line_2 }}</span>
        </h1>
        <p class="hero-lead">
          {{ content.homepage.hero.lead }}
        </p>
        <div class="hero-actions">
          <RouterLink class="button primary" :to="{ hash: '#membership' }">
            {{ content.homepage.hero.primary_button }} <span>↗</span>
          </RouterLink>
          <RouterLink class="button ghost" :to="{ hash: '#about' }">
            {{ content.homepage.hero.secondary_button }}
          </RouterLink>
        </div>
      </div>
      <div class="hero-visual">
        <img
          class="team-photo"
          src="/team-photo.png"
          alt="BD Sporting’s Darmstadt football team"
        />
      </div>
      <div class="hero-foot">
        <span>{{ content.homepage.hero.value_1 }}</span>
        <span>{{ content.homepage.hero.value_2 }}</span>
        <span>{{ content.homepage.hero.value_3 }}</span>
      </div>
    </section>

    <section id="about" class="statement">
      <p class="section-label">{{ content.homepage.about.label }}</p>
      <div class="statement-grid">
        <h2>
          {{ content.homepage.about.heading_line_1 }}<br />
          {{ content.homepage.about.heading_line_2 }}
        </h2>
        <div>
          <p>{{ content.homepage.about.paragraph_1 }}</p>
          <p>{{ content.homepage.about.paragraph_2 }}</p>
          <p>{{ content.homepage.about.paragraph_3 }}</p>
        </div>
      </div>
    </section>

    <section id="updates" class="updates">
      <div class="section-heading dark">
        <div>
          <p class="section-label">{{ content.homepage.updates.label }}</p>
          <h2>{{ content.homepage.updates.heading }}</h2>
        </div>
        <p>{{ content.homepage.updates.intro }}</p>
      </div>
      <div class="update-grid">
        <article class="update-lead">
          <div class="update-art">
            <img
              :src="featuredNews.imageUrl || '/club-logo.png'"
              :alt="featuredNews.imageUrl ? featuredNews.title : 'BD Sporting’s Darmstadt club crest'"
            />
          </div>
          <div class="update-copy">
            <span class="pill">{{ featuredNews.category }}</span>
            <h3>{{ featuredNews.title }}</h3>
            <p>{{ featuredNews.summary }}</p>
          </div>
        </article>
        <aside class="scoreboard">
          <p class="score-label">{{ content.fixtureStatus.label }}</p>
          <div class="score-empty">
            <span aria-hidden="true">◷</span>
            <h3>{{ content.fixtureStatus.title }}</h3>
            <p>{{ content.fixtureStatus.summary }}</p>
          </div>
        </aside>
      </div>
    </section>

    <section id="membership" class="membership">
      <div>
        <p class="section-label light">{{ content.homepage.membership.label }}</p>
        <h2>
          {{ content.homepage.membership.heading_line_1 }}<br />
          {{ content.homepage.membership.heading_line_2 }}
        </h2>
      </div>
      <div class="membership-copy">
        <p>
          {{ content.homepage.membership.body }}
        </p>
        <a
          class="button white"
          :href="content.settings.membershipFormUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ content.homepage.membership.button }} <span>↗</span>
        </a>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

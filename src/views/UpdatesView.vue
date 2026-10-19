<script setup>
import { computed } from "vue";
import SiteFooter from "../components/SiteFooter.vue";
import SiteHeader from "../components/SiteHeader.vue";
import { useSiteContent } from "../composables/useSiteContent";

const content = useSiteContent();
const featuredNews = computed(() => content.newsItems[0]);
const remainingNews = computed(() => content.newsItems.slice(1));
</script>

<template>
  <main class="updates-page">
    <SiteHeader />

    <section class="page-hero updates-hero">
      <div>
        <p class="eyebrow">{{ content.homepage.updates.label }}</p>
        <h1>Club<br /><span>Updates.</span></h1>
      </div>
      <div class="page-intro">
        <p>{{ content.homepage.updates.intro }}</p>
        <span>News · Events · Fixtures · Results</span>
      </div>
    </section>

    <section class="updates updates-content" aria-labelledby="updates-heading">
      <div class="section-heading dark">
        <div>
          <p class="section-label">Latest from the club</p>
          <h2 id="updates-heading">{{ content.homepage.updates.heading }}</h2>
        </div>
        <p>Official announcements and match information will be collected here.</p>
      </div>

      <div v-if="featuredNews" class="update-grid">
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
            <time v-if="featuredNews.date">{{ featuredNews.date }}</time>
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

      <div v-if="remainingNews.length" class="news-list">
        <article v-for="item in remainingNews" :key="item.id" class="news-card">
          <span class="pill">{{ item.category }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.summary }}</p>
          <time v-if="item.date">{{ item.date }}</time>
        </article>
      </div>

      <div v-if="content.events.length" class="update-subsection">
        <div class="subsection-heading">
          <p class="section-label">Calendar</p>
          <h2>Upcoming events</h2>
        </div>
        <div class="event-list">
          <article v-for="event in content.events" :key="event.id" class="event-card">
            <p class="event-date">{{ event.date }}<span v-if="event.time"> · {{ event.time }}</span></p>
            <h3>{{ event.title }}</h3>
            <p>{{ event.summary }}</p>
            <span v-if="event.location">{{ event.location }}</span>
          </article>
        </div>
      </div>

      <div v-if="content.fixtures.length || content.results.length" class="update-subsection">
        <div class="subsection-heading">
          <p class="section-label">On the field</p>
          <h2>Fixtures &amp; results</h2>
        </div>
        <div class="match-list">
          <article v-for="match in [...content.fixtures, ...content.results]" :key="match.id" class="match-card">
            <span>{{ match.date }}<template v-if="match.time"> · {{ match.time }}</template></span>
            <h3>BD Sporting’s Darmstadt <strong v-if="match.score">{{ match.score }}</strong></h3>
            <p>vs {{ match.opponent }}</p>
            <small>{{ match.location || match.status }}</small>
          </article>
        </div>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

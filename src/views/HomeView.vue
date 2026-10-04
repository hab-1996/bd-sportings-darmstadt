<script setup>
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
import { fixtureStatus } from "../data/fixtures";
import { membershipFormUrl } from "../data/links";
import { newsItems } from "../data/news";

const featuredNews = newsItems[0];
</script>

<template>
  <main>
    <SiteHeader />
    <section id="top" class="hero">
      <div class="hero-stripe" aria-hidden="true"></div>
      <div class="hero-copy">
        <p class="eyebrow">Darmstadt · Established 2024</p>
        <h1>One club.<br /><span>Many stories.</span></h1>
        <p class="hero-lead">
          BD Sporting’s Darmstadt brings people together through sport,
          friendship and community—on and beyond the field.
        </p>
        <div class="hero-actions">
          <RouterLink class="button primary" :to="{ hash: '#membership' }">
            Become a member <span>↗</span>
          </RouterLink>
          <RouterLink class="button ghost" :to="{ hash: '#about' }">
            Discover our club
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
        <span>Play together</span>
        <span>Grow together</span>
        <span>Represent together</span>
      </div>
    </section>

    <section id="about" class="statement">
      <p class="section-label">Who we are</p>
      <div class="statement-grid">
        <h2>Built by the community.<br />Driven by the game.</h2>
        <div>
          <p>
            BD Sporting’s Darmstadt is a community-focused sports club
            established in 2024 in Darmstadt, Germany. We bring together
            members of the Bangladeshi community through sporting activities,
            friendly matches, tournaments and community events.
          </p>
          <p>
            Our club is about more than competition. It is a place where
            people can stay active, build lasting friendships and represent
            our community with pride. Guided by our values of
            <strong>Brotherhood, Respect and Unity</strong>, we aim to create a
            welcoming environment where teamwork, sportsmanship and community
            spirit come first.
          </p>
          <p>
            As we continue to grow, our goal is to provide more opportunities
            for people to participate, develop their abilities and share
            memorable experiences—both on and beyond the playing field.
          </p>
        </div>
      </div>
    </section>

    <section id="updates" class="updates">
      <div class="section-heading dark">
        <div>
          <p class="section-label">Club updates</p>
          <h2>Follow the season.</h2>
        </div>
        <p>Match reports, results, announcements and moments from the club.</p>
      </div>
      <div class="update-grid">
        <article class="update-lead">
          <div class="update-art">
            <img src="/club-logo.png" alt="BD Sporting’s Darmstadt club crest" />
          </div>
          <div class="update-copy">
            <span class="pill">{{ featuredNews.category }}</span>
            <h3>{{ featuredNews.title }}</h3>
            <p>{{ featuredNews.summary }}</p>
          </div>
        </article>
        <aside class="scoreboard">
          <p class="score-label">{{ fixtureStatus.label }}</p>
          <div class="score-empty">
            <span aria-hidden="true">◷</span>
            <h3>{{ fixtureStatus.title }}</h3>
            <p>{{ fixtureStatus.summary }}</p>
          </div>
        </aside>
      </div>
    </section>

    <section id="membership" class="membership">
      <div>
        <p class="section-label light">Join BD Sporting’s</p>
        <h2>Your next team<br />starts here.</h2>
      </div>
      <div class="membership-copy">
        <p>
          Whether you want to play, volunteer or support the club, there is a
          place for you in our community.
        </p>
        <a
          class="button white"
          :href="membershipFormUrl"
          target="_blank"
          rel="noopener noreferrer"
        >
          Get involved <span>↗</span>
        </a>
      </div>
    </section>

    <SiteFooter />
  </main>
</template>

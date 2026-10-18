<script setup>
import SiteHeader from "../components/SiteHeader.vue";
import SiteFooter from "../components/SiteFooter.vue";
import { useSiteContent } from "../composables/useSiteContent";

const content = useSiteContent();
</script>

<template>
  <main class="committee-page">
    <SiteHeader />
    <section class="committee-hero">
      <div>
        <p class="eyebrow">Current leadership</p>
        <h1>Our<br /><span>Committee.</span></h1>
      </div>
      <div class="committee-intro">
        <p>
          The Ad Hoc Committee of BD Sporting’s Darmstadt was formed on
          {{ content.committeeDetails.formationDate }} for a {{ content.committeeDetails.term }}.
        </p>
        <span>
          Established {{ content.committeeDetails.establishedYear }} · {{ content.committeeDetails.location }}
        </span>
      </div>
    </section>

    <section class="committee-content">
      <div class="committee-section leadership-section">
        <div class="committee-section-heading">
          <p class="section-label">Leadership</p>
          <h2>Committee leadership</h2>
        </div>
        <div class="leadership-grid">
          <article v-for="person in content.leadership" :key="person.name" class="person-card featured">
            <div class="person-card-top">
              <span class="person-number">{{ person.number }}</span>
              <img v-if="person.photoUrl" class="person-photo" :src="person.photoUrl" :alt="person.name" />
            </div>
            <div>
              <h3>{{ person.name }}</h3>
              <p>{{ person.role }}</p>
            </div>
          </article>
        </div>
      </div>

      <div class="committee-section">
        <div class="committee-section-heading">
          <p class="section-label">Committee</p>
          <h2>Joint Conveners</h2>
        </div>
        <div class="people-grid">
          <article v-for="person in content.jointConveners" :key="person.name" class="person-card">
            <div class="person-card-top">
              <span class="person-number">{{ person.number }}</span>
              <img v-if="person.photoUrl" class="person-photo" :src="person.photoUrl" :alt="person.name" />
            </div>
            <div>
              <h3>{{ person.name }}</h3>
              <p>{{ person.role }}</p>
            </div>
          </article>
        </div>
      </div>

      <div class="committee-section">
        <div class="committee-section-heading">
          <p class="section-label">Committee</p>
          <h2>Committee Members</h2>
        </div>
        <div class="people-grid">
          <article v-for="person in content.committeeMembers" :key="person.name" class="person-card">
            <div class="person-card-top">
              <span class="person-number">{{ person.number }}</span>
              <img v-if="person.photoUrl" class="person-photo" :src="person.photoUrl" :alt="person.name" />
            </div>
            <div>
              <h3>{{ person.name }}</h3>
              <p>{{ person.role }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="advisory-section">
      <div class="committee-section-heading">
        <p class="section-label">Guidance</p>
        <h2>Advisory Board</h2>
      </div>
      <div class="advisor-grid">
        <article v-for="person in content.advisoryBoard" :key="person.name" class="advisor-card">
          <div class="advisor-card-top">
            <span>{{ person.number }}</span>
            <img v-if="person.photoUrl" class="person-photo" :src="person.photoUrl" :alt="person.name" />
          </div>
          <h3>{{ person.name }}</h3>
          <p>{{ person.role }}</p>
        </article>
      </div>
    </section>

    <SiteFooter :tagline-lines="['Brotherhood. Respect. Unity.', 'Proudly based in Darmstadt.']" />
  </main>
</template>

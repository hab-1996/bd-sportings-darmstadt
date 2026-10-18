import { reactive } from "vue";
import {
  advisoryBoard as staticAdvisoryBoard,
  committeeDetails as staticCommitteeDetails,
  committeeMembers as staticCommitteeMembers,
  jointConveners as staticJointConveners,
  leadership as staticLeadership,
} from "../data/committee";
import { events as staticEvents } from "../data/events";
import {
  fixtures as staticFixtures,
  fixtureStatus,
  results as staticResults,
} from "../data/fixtures";
import { membershipFormUrl } from "../data/links";
import { newsItems as staticNewsItems } from "../data/news";
import { loadCmsContent } from "../services/contentApi";

const withPhoto = (people) => people.map((person) => ({ ...person, photoUrl: "" }));

const state = reactive({
  settings: {
    siteName: "BD Sporting’s Darmstadt",
    establishedYear: staticCommitteeDetails.establishedYear,
    location: staticCommitteeDetails.location,
    membershipFormUrl,
    footerLine1: "Football. Cricket. Community.",
    footerLine2: "Proudly based in Darmstadt.",
    testNoticeEnabled: true,
    testNoticeTitle: "Test website",
    testNoticeText:
      "This site is currently in a public testing phase. Content may change, and comments or submissions are not being accepted at this time.",
  },
  homepage: {
    hero: {
      eyebrow: "Darmstadt · Established 2024",
      title_line_1: "One club.",
      title_line_2: "Many stories.",
      lead: "BD Sporting’s Darmstadt brings people together through sport, friendship and community—on and beyond the field.",
      primary_button: "Become a member",
      secondary_button: "Discover our club",
      value_1: "Play together",
      value_2: "Grow together",
      value_3: "Represent together",
    },
    about: {
      label: "Who we are",
      heading_line_1: "Built by the community.",
      heading_line_2: "Driven by the game.",
      paragraph_1:
        "BD Sporting’s Darmstadt is a community-focused sports club established in 2024 in Darmstadt, Germany. We bring together members of the Bangladeshi community through sporting activities, friendly matches, tournaments and community events.",
      paragraph_2:
        "Our club is about more than competition. It is a place where people can stay active, build lasting friendships and represent our community with pride. Guided by our values of Brotherhood, Respect and Unity, we aim to create a welcoming environment where teamwork, sportsmanship and community spirit come first.",
      paragraph_3:
        "As we continue to grow, our goal is to provide more opportunities for people to participate, develop their abilities and share memorable experiences—both on and beyond the playing field.",
    },
    updates: {
      label: "Club updates",
      heading: "Follow the season.",
      intro: "Match reports, results, announcements and moments from the club.",
    },
    membership: {
      label: "Join BD Sporting’s",
      heading_line_1: "Your next team",
      heading_line_2: "starts here.",
      body: "Whether you want to play, volunteer or support the club, there is a place for you in our community.",
      button: "Get involved",
    },
  },
  committeeDetails: { ...staticCommitteeDetails },
  leadership: withPhoto(staticLeadership),
  jointConveners: withPhoto(staticJointConveners),
  committeeMembers: withPhoto(staticCommitteeMembers),
  advisoryBoard: withPhoto(staticAdvisoryBoard),
  newsItems: staticNewsItems.map((item) => ({ ...item, imageUrl: "" })),
  events: [...staticEvents],
  fixtures: [...staticFixtures],
  results: [...staticResults],
  fixtureStatus,
  cms: {
    loading: false,
    connected: false,
    error: "",
  },
});

let loadPromise;

function replaceArray(target, values) {
  target.splice(0, target.length, ...values);
}

function applyCmsContent(content) {
  const settings = content.settings;
  state.settings.siteName = settings.site_name || state.settings.siteName;
  state.settings.establishedYear = Number(settings.established_year) || state.settings.establishedYear;
  state.settings.location = settings.location || state.settings.location;
  state.settings.membershipFormUrl = settings.membership_form_url || state.settings.membershipFormUrl;
  state.settings.footerLine1 = settings.footer_line_1 || state.settings.footerLine1;
  state.settings.footerLine2 = settings.footer_line_2 || state.settings.footerLine2;
  state.settings.testNoticeEnabled = String(settings.test_notice_enabled).toLowerCase() !== "no";
  state.settings.testNoticeTitle = settings.test_notice_title || state.settings.testNoticeTitle;
  state.settings.testNoticeText = settings.test_notice_text || state.settings.testNoticeText;

  state.committeeDetails.formationDate =
    settings.committee_formation_date || state.committeeDetails.formationDate;
  state.committeeDetails.term = settings.committee_term || state.committeeDetails.term;
  state.committeeDetails.establishedYear = state.settings.establishedYear;
  state.committeeDetails.location = state.settings.location;

  Object.entries(content.homepage).forEach(([section, values]) => {
    state.homepage[section] ??= {};
    Object.assign(state.homepage[section], values);
  });

  const groups = {
    Leadership: state.leadership,
    "Joint Conveners": state.jointConveners,
    "Committee Members": state.committeeMembers,
    "Advisory Board": state.advisoryBoard,
  };
  Object.entries(groups).forEach(([group, target]) => {
    replaceArray(target, content.committee.filter((person) => person.group === group));
  });

  if (content.newsItems.length) replaceArray(state.newsItems, content.newsItems);
  replaceArray(state.events, content.events);
  replaceArray(state.fixtures, content.fixtures);
  replaceArray(state.results, content.results);
  state.cms.connected = true;
}

async function load() {
  state.cms.loading = true;
  state.cms.error = "";
  try {
    applyCmsContent(await loadCmsContent());
  } catch (error) {
    state.cms.connected = false;
    state.cms.error = error instanceof Error ? error.message : "Content service unavailable";
  } finally {
    state.cms.loading = false;
  }
}

export function useSiteContent() {
  loadPromise ??= load();
  return state;
}

import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import CommitteeView from "../views/CommitteeView.vue";
import MembersView from "../views/MembersView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { title: "BD Sporting’s Darmstadt | Football, Cricket & Community" },
    },
    {
      path: "/committee",
      name: "committee",
      component: CommitteeView,
      meta: { title: "Committee | BD Sporting’s Darmstadt" },
    },
    {
      path: "/members",
      name: "members",
      component: MembersView,
      meta: { title: "Members | BD Sporting’s Darmstadt" },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth", top: 84 };
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;

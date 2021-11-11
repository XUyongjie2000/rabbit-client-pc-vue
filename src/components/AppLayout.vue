<template>
  <AppTopNav />
  <AppHeader />
  <slot />
  <AppFooter />
</template>

<script>
import AppTopNav from "@/components/AppTopNav";
import AppHeader from "@/components/AppHeader";
import AppFooter from "@/components/AppFooter";
export default {
  name: "AppLayout",
  components: { AppFooter, AppHeader, AppTopNav },
};
</script>

<style scoped></style>

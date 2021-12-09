<template>
  <div class="sidebar-logo-container" :class="{ collapse: collapse }">
    <transition name="sidebarLogoFade">
      <router-link
        v-if="collapse"
        key="collapse"
        class="sidebar-logo-link"
        to="/admin/"
      >
        <svg-icon icon-class="blog_logo" class="svg-logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/admin/">
        <svg-icon icon-class="blog_logo" class="svg-logo" />
        <h1 class="sidebar-title">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import settings from "@root/publicMethods/settings";
export default {
  name: "SidebarLogo",
  props: {
    collapse: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      title: settings.title,
    };
  },
};
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .svg-logo {
      font-size: 36px;
      display: inline-block;
      vertical-align: middle;
      color: #2d8cf0;
      margin-right: 5px !important;
    }

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 18px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      background: -webkit-linear-gradient(
              right,
              #ffffff,
              #ff0000 6.25%,
              #ff7d00 12.5%,
              #ffff00 18.75%,
              #00ff00 25%,
              #00ffff 31.25%,
              #0000ff 37.5%,
              #ff00ff 43.75%,
              #ffff00 50%,
              #ff0000 56.25%,
              #ff7d00 62.5%,
              #ffff00 68.75%,
              #00ff00 75%,
              #00ffff 81.25%,
              #0000ff 87.5%,
              #ff00ff 93.75%,
              #ffff00 100%
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-size: 200% 100%;
      animation: header-logo-animation 5s infinite linear;
    }
  }


  @keyframes header-logo-animation {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -100%, 0;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>

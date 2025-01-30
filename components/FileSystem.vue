<script setup>
const data = {
  src: {
    type: "dir",
    Icon: null,
    content: {
      components: {
        type: "dir",
        icon: null,
        content: {
          AppComponentJs: {
            type: "file",
            content: "qfsdfqsfqsdfsf",
            ext: "js",
          },
          ButtonComponentJs: {
            type: "file",
            content: "qfsdfqsfqsdfsf",
            ext: "js",
          },
        },
      },
      views: {
        type: "dir",
        icon: null,
        content: {
          HomeViewHtml: {
            type: "file",
            conntent: "sdqsdqsdqsdqsdddqd",
            ext: "html",
          },
          LoginViewHtml: {
            type: "file",
            conntent: "sdqsdqsdqsdqsdddqd",
            ext: "html",
          },
          RegisterViewHtml: {
            type: "file",
            conntent: "sdqsdqsdqsdqsdddqd",
            ext: "html",
          },
        },
      },
      appjs: {
        type: "file",
        content: "qfsdfqsfqsdfsf",
        ext: "js",
      },
    },
  },
  public: {
    type: "dir",
    icon: null,
    content: {
      robot: {
        type: "file",
        content: "qSDDqsdqdqSDQSD",
        ext: "txt",
      },
      img: {
        type: "dir",
        icon: null,
        content: {
          image1: {
            type: "file",
            ext: "png",
            content: "qSDQDQsdQSDQdqdqsqsqdsSDqsd",
          },
        },
      },
    },
  },
};
const keys = Object.keys(data);
</script>

<template>
  <ul v-for="key in keys">
    <FolderItem :name="key" />
  </ul>
</template>

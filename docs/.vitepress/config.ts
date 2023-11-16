export default {
  title: "ReactJs Core",
  themeConfig: {
    outline: [2, 6],
    nav: [
      { text: "Core", link: "/core/introduction", activeMatch: "/core/" },
      {
        text: "Components",
        link: "/components/introduction",
        activeMatch: "/components",
      },
    ],
    sidebar: {
      "/core/": [
        {
          text: "Getting started",
          items: [
            { text: "Introduction", link: "/core/introduction" },
            { text: "Tech stack", link: "/core/getting-started/tech-stack" },
            {
              text: "Command lines",
              link: "/core/getting-started/command-lines",
            },
            {
              text: "Conventions",
              link: "/core/getting-started/conventions",
            },
            {
              text: "Editor configurations",
              link: "/core/getting-started/editor-configurations",
            },
            {
              text: "Assets",
              link: "/core/getting-started/assets",
            },
          ],
        },

        {
          text: "Module",
          items: [
            { text: "Introduction", link: "/core/module/introduction" },
            { text: "Routing", link: "/core/module/routing" },
            {
              text: "Localization",
              link: "/core/module/localization",
            },
          ],
        },
        {
          text: "Api Calling",
          items: [
            { text: "Introduction", link: "/core/api-calling/introduction" },
            { text: "Model", link: "/core/api-calling/model" },
            {
              text: "Repository",
              link: "/core/api-calling/repository",
            },
            {
              text: "Call in component",
              link: "/core/api-calling/call-in-component",
            },
          ],
        },
        {
          text: "In Depth",
          items: [
            { text: "Auto Import", link: "/core/in-depth/auto-import" },
            { text: "Layout", link: "/core/in-depth/layout" },
            { text: "App Instances", link: "/core/in-depth/app-instances" },
            {
              text: "Environment Variables",
              link: "/core/in-depth/env-variables",
            },
          ],
        },
      ],
      "/components/": [
        {
          text: "Components",
          items: [
            {
              text: "Introduction",
              link: "/components/introduction",
            },
          ],
        },
      ],
    },
  },
};

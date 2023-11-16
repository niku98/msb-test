---
title: Introduction
---

# {{$frontmatter.title}}

Hi there, this is a documentation for you, who is using **ReactJs Core**.

This is project's folders structure:

```
project
│ .editorconfig
│ .env.development // Project's development environment variables
│ .env.production // Project's production environment variables
│ .env.staging // Project's staging environment variables
│ .eslintrc.json
│ .gitattributes
│ .gitignore
│ .prettierrc
│ babel.config.js
│ index.html
│ package.json
│ postcss.config.js
│ tailwind.config.js
│ tsconfig.json
│ vite.config.ts
│ env.d.ts
│
└─__test__
└─.vscode
└─coverage
└─docs
└─generator
│
└─src // All source code
│ │ App.tsx
│ │ index.tsx
│ │
│ └─@types // Project's global typescript declaration files.
│ │
│ └─assets // Project's assets/resources
│ │ │ index.ts
│ │ │
│ │ └─images
│ │ │ │ image_1.png
│ │ │ │ image_2.png
│ │ │ │ ...
│ │
│ └─layouts // Project's layouts will be defined in this folder.
│ └─pages // Project's global pages.
│ │
│ └─modules // Project's feature modules.
│ │ └─common // Project's common components.
│ │ │ └─components // Project's common components.
│ │ │ │ AppButton.tsx
│ │ │ │ AppTable.tsx
│ │ │ │ ...
│ │ │ │
│ │ │ └─hooks // Hooks that are for common business logic will be defined here.
│ │ │ └─models // Project's common business resources typing.
│ │ │ └─routes // Project's routes configurations.
│ │ │ └─styles // Project's common styles.
│ │ │ └─utilities // Project's common business logic functions.
│ │ │ └─localization // Project's localization configuration.
│ │ │ │ index.ts
│ │ │ │ constants.ts
│ │ │ │ │
│ │ │ │ └─locales // Global translation files.
│ │ │ │ │ └─en // Global English translation files.
│ │ │ │ │ └─vi // Global Vietnamese translation files.
│ │ │
│ │ └─core // Project's core features.
│ │ │ └─api // Api calling logic
│ │ │ └─app // Main app provider
│ │ │ └─auth // Authentication logic
│ │ │ └─components // Some base components
│ │ │ └─hooks // Custom hooks that project provided.
│ │ │ └─loading // Global loading provider.
│ │ │ └─models // Core models typing.
│ │ │ └─providers // Some other providers.
│ │ │ └─repository // Base repository logic to call api resource.
│ │ │ └─router // Base router logic.
│ │ │ └─utilities // Utilities functions
│ │ │
│ │ └─module_1 // Module 1.
│ │ │ └─components // Module's business/local components.
│ │ │ └─models // Module's business resources typing.
│ │ │ └─repositories // Module's definition resources api calling.
│ │ │ └─styles // Module's local styles.
│ │ │ └─utilities // Module's local business logic functions.
│ │ │ │
│ │ │ └─locales // Module's translation files.
│ │ │ │ │ en.json // Module's English translation file.
│ │ │ │ │ vi.json // Module's Vietnamese translation file.
│ │ │ │ │ index.ts // Module's merged translation file.
│ │ │ │ │ preload_en.json // Module's English preload translation file.
│ │ │ │ │ preload_vi.json // Module's Vietnamese preload translation file.
│ │ │ │ │ preload.ts // Module's merged preload translation file.
│ │ │ │ │ types.d.ts // Module's translation typescript declaration file.
│ │ │ │
│ │ │ └─pages // Module's pages components.
│ │ │ │ └─index.tsx // Module's index page.
│ │ │ │ └─child.tsx // Module's child page.
│ │ │ │
│ │ │ │ index.ts // Module's export features.
│ │ │ │
│ │ └─module_2 // Module 2.
│ │ └─module_3 // Module 3.
│ │ └─module_4 // Module 4.
│ │ ... // Other modules
│ └─templates // Templates for generator.
```

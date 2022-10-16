## Usage ##

```bash
spline --source "blog"
```

### Target Markdown Directory ###

./blog
├── introduction.mdx
├── routes.js
├── routes.json
└── tutorial-basics
    ├── congratulations.md
    ├── create-a-blog-post.md
    ├── create-a-document.md
    ├── create-a-page.md
    ├── deploy-your-site.md
    ├── markdown-features.mdx
    ├── routes.js
    └── routes.json

### React Front-End ###

./src
├── application.tsx
├── blog
│   ├── index.jsx
│   ├── introduction.jsx
│   ├── routes.json
│   ├── sidebar.jsx
│   └── tutorial-basics
│       ├── congratulations.jsx
│       ├── create-a-blog-post.jsx
│       ├── create-a-document.jsx
│       ├── create-a-page.jsx
│       ├── deploy-your-site.jsx
│       ├── index.jsx
│       ├── markdown-features.jsx
│       ├── routes.json
│       └── sidebar.jsx
├── components
│   ├── authorization
│   │   ├── index.ts
│   │   └── provider.tsx
│   ├── awaitable
│   │   └── index.tsx
│   ├── container
│   │   ├── grid.tsx
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.module.scss
│   │   ├── index.scss
│   │   └── index.tsx
│   ├── footer
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.module.scss
│   │   └── index.tsx
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.scss
│   ├── index.tsx
│   ├── menu
│   │   ├── component.tsx
│   │   ├── icons
│   │   │   ├── consul.svg
│   │   │   ├── github.svg
│   │   │   ├── gitlab.svg
│   │   │   ├── index.ts
│   │   │   ├── jira.svg
│   │   │   ├── lambda.svg
│   │   │   ├── terraform.svg
│   │   │   └── vagrant.svg
│   │   ├── index.module.scss
│   │   ├── index.scss
│   │   ├── index.ts
│   │   ├── item.tsx
│   │   ├── link
│   │   │   ├── component.d.ts
│   │   │   ├── component.d.ts.map
│   │   │   ├── component.tsx
│   │   │   ├── index.d.ts
│   │   │   ├── index.d.ts.map
│   │   │   ├── index.module.scss
│   │   │   ├── index.scss
│   │   │   └── index.tsx
│   │   ├── navigation.tsx
│   │   ├── panel.tsx
│   │   └── title.tsx
│   ├── shell
│   │   ├── index.scss
│   │   └── index.tsx
│   ├── spinner
│   │   ├── component.tsx
│   │   ├── index.module.scss
│   │   ├── index.scss
│   │   ├── index.tsx
│   │   └── scss
│   │       ├── functional.scss
│   │       └── index.scss
│   ├── strings
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.ts
│   │   ├── menu-item.d.ts
│   │   ├── menu-item.d.ts.map
│   │   └── menu-item.ts
│   ├── tag
│   │   ├── index.module.scss
│   │   ├── index.tsx
│   │   ├── scss
│   │   │   ├── functional.scss
│   │   │   └── index.scss
│   │   └── types.ts
│   ├── text
│   │   ├── index.d.ts
│   │   ├── index.d.ts.map
│   │   ├── index.module.scss
│   │   ├── index.tsx
│   │   └── scss
│   │       ├── functional.scss
│   │       └── index.scss
│   └── tile
│       ├── clickable.tsx
│       ├── default.tsx
│       ├── index.module.scss
│       ├── index.tsx
│       └── tiles.tsx
├── globals.d.ts
├── hooks
│   ├── index.ts
│   ├── use-external-click-detection.ts
│   └── use-outer-click.tsx
├── index.scss
├── index.tsx
├── mdx
│   ├── index.module.scss
│   ├── index.tsx
│   ├── languages.ts
│   └── scss
│       ├── functional.scss
│       └── index.scss
├── pages
│   ├── index.ts
│   └── login
│       ├── extractor.ts
│       ├── form.tsx
│       ├── handler.ts
│       ├── index.module.scss
│       ├── index.tsx
│       └── provider.ts
├── react-app-env.d.ts
├── styles
│   ├── colors.scss
│   ├── fonts.scss
│   ├── globals.d.ts
│   ├── globals.d.ts.map
│   ├── globals.scss
│   ├── globals.ts
│   ├── index.scss
│   ├── plex
│   │   ├── index.scss
│   │   ├── plex-mono.scss
│   │   ├── plex-sans-serif.scss
│   │   └── plex-sans.scss
│   ├── utilities.scss
│   └── variables.scss
└── vitals.ts

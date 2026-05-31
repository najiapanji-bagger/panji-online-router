# Panji Online Router

A tiny, self-hostable static publishing router for people who need one clean domain for many small pages, demos, reports, previews, and AI-generated artifacts.

The core idea is simple:

```text
https://x.panji.online/[slug]
```

Each slug is just a static folder under `public/`, so the project can be hosted on Netlify, Cloudflare Pages, GitHub Pages, or any static host.

## Why this exists

Maintainers, students, writers, and builders often produce many small outputs: HTML reports, landing pages, mockups, demos, proof-of-concepts, shareable previews, and project notes. Deploying a new app for every artifact is overkill.

Panji Online Router provides a lightweight pattern:

- one repository,
- one domain,
- many static routes,
- no database,
- no server,
- easy review in pull requests.

## Use cases

- Publish generated HTML reports under stable URLs.
- Share portfolio/demo pages from one domain.
- Host static previews created by AI coding agents.
- Maintain internal or public microsites without a backend.
- Keep a clear audit trail of published links through Git history.

## Project structure

```text
public/
  index.html              # Router homepage and active link index
  _assets/                # Shared assets
  demo/
    index.html            # Example published page
scripts/
  add-link.mjs            # Small CLI helper to add a route
```

## Quick start

Clone the repository:

```bash
git clone https://github.com/najiapanji-bagger/panji-online-router.git
cd panji-online-router
```

Run a local static server:

```bash
python3 -m http.server 8080 --directory public
```

Open:

```text
http://localhost:8080
```

## Add a new route manually

Create a folder:

```bash
mkdir -p public/my-page
```

Create:

```text
public/my-page/index.html
```

Then add the link to `public/index.html` between the route markers.

## Add a new route with the CLI

```bash
node scripts/add-link.mjs my-page "My Page"
```

This will:

1. create `public/my-page/index.html` if it does not exist,
2. add `/my-page/` to the router homepage,
3. avoid duplicate entries.

## Deployment

For Netlify:

```text
Build command: leave empty
Publish directory: public
```

For Cloudflare Pages:

```text
Build command: leave empty
Output directory: public
```

## Maintainer workflow

A simple workflow for contributors and maintainers:

1. Create a branch.
2. Add or update a route under `public/[slug]/`.
3. Preview locally.
4. Open a pull request.
5. Review the generated page, route name, and any assets.
6. Merge and deploy.

## Security notes

Do not commit:

- passwords,
- API keys,
- cookies,
- `.env` files,
- private documents,
- personal data,
- confidential screenshots.

This repository is designed for public static publishing. Treat everything committed here as public.

## Roadmap

See [`ROADMAP.md`](ROADMAP.md).

## Contributing

See [`CONTRIBUTING.md`](CONTRIBUTING.md).

## License

MIT License. See [`LICENSE`](LICENSE).

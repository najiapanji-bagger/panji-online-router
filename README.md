# panji-online-router

Single-site publishing router for:
- `https://x.panji.online/[slug]`

## Structure
- `public/index.html` → landing + daftar link aktif
- `public/_assets/` → shared static assets
- `public/[slug]/index.html` → each published page

## Create link baru
1. Buat folder slug: `public/<slug>/`
2. Tambah file: `public/<slug>/index.html`
3. Tambah link di `public/index.html`
4. Deploy ulang site

## Update link
1. Replace isi folder slug terkait (`public/<slug>/...`)
2. Deploy ulang site

## Delete link
1. Hapus folder slug: `public/<slug>/`
2. Hapus link dari `public/index.html`
3. Deploy ulang site

## Netlify config
- Build command: kosong
- Publish directory: `public`

## Security
Jangan commit password, token, secret, atau data login ke repo.

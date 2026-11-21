## SAM'S PROJECT

### Stack
- React `9.1.0`
- Vite: `6.3.5`
- Tailwind: `3.4.17`

### Services
- Vercel CLI: `66.5.0`
- Supabase: `2.76.4`
- TMDB (API)

### Libraries
- MUI: `7.1.1`
- Hero UI: `2.7.8` (considering getting rid of it, tho, I only had it for the navbar)

****

### App's purpose
Kind of a SPA (Single Page Application), or at least, the home to have the most important content, which is more detailed in the `Homepage structure`, but also, a place where my gf and I can add movies to a watchlist and rate them if we want.

Maybe this project can eventually include a personal financial app (just the frontend), where she and I have our expenses and balance reports, feeded by our input in our Notion database (free tier). This upgrade, I'd like to do it in Go (or Rust) and maybe PostgreSQL or another light database that I can selfhost, in order for me to push me to implement a home server, which is other project I'd like to achieve. However, until I get to that point, I'll be deploying this app with the services I'm currently using, which are Vercel CLI and Supabase.

### Homepage structure
1. Navbar  (sticky to be accesible for the whole app)
2. Hero (a static song phrase displayed with a sparkles Lottiefiles animation)  
3. A little "Go down" button with a bouncing animation, inciting to scroll down into the page  
4. Embedded Spotify playlist curated by me, dedicated to my gf  
5. "Us" section, with a brief dedication for her, with a picture of us on the side
6. Countdown for the next wombat day, of course, with a wombat picture (inside joke for us)
7. A timeline for our most important milestones
8. Footer (available for the whole app)

### Movies section
This module consists in a page with the layout:

1. Search bar: to look for tv shows or movies. Its main features are add/remove a movie from the watchlist, set a movie like already seen and if already seen, can also add a rating (maybe add a review, but idk that yet)
2. Tab for watchlist/already seen movies  
  2.1. Watchlist: movies already added to the watchlist. It's only a grid layout with the movies displayed like cards, including the movie picture, name, year, and tipe (movie or TV show)  
  2.2. Already seen: movies we'd like to mark like already seen, maybe I can also add some kind of log if we've seen that movie several times

### Current project structure
```text
.
├── AGENTS.md
├── api/
│   ├── add-to-list.js
│   ├── get-watchlist.js
│   ├── remove-from-watchlist.js
│   └── search.js
├── eslint.config.js
├── index.html
├── lib/
│   ├── supabase-client.js
│   └── supabase-server.js
├── package.json
├── package-lock.json
├── postcss.config.js
├── public/
│   └── vite.svg
├── README.md
├── src/
│   ├── App.jsx
│   ├── assets/
│   ├── components/
│   ├── hooks/
│   ├── main.jsx
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── theme.js
│   └── utils/
├── tailwind.config.js
└── vite.config.js
```

### Database
Single table `watchlist` (Supabase / Postgres) holds every movie or TV show. `watched` splits the "watchlist" tab from the "already seen" tab, so there is no separate table for seen items.

Columns: `id` (int8, PK), `tmdb_id`, `type`, `title`, `year`, `poster_url`, `overview`, `watched`, `created_at`, plus `rating` and `watched_at` (added by a migration).

The schema's source of truth is `supabase/migrations/`, not this file.

> Never commit to github without asking me, and double check when you'll perform critic changes
-- Support for the PATCH /api/watchlist/:id endpoint
alter table public.watchlist
  add column if not exists rating numeric(2,1)
    check (rating is null or (rating >= 0.5 and rating <= 5)),
  add column if not exists watched_at timestamptz;

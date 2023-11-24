link to live version https://news-server-qoyx.onrender.com

# Summary

This project is back-end clone of a social news website, similar to reddit. Users can add comments, post articles, and vote on posts.

# Running Locally

1.clone this repo from GitHub: https://github.com/TomMirfin/news-server.git

- `git clone https://github.com/TomMirfin/news-server.git`

2. Install NPM dependencies

- `npm install`

3.  Setup and seed the databases

- `npm run setup-dbs`
- `npm run seed`

4.  You will need to create two files in the **root** folder of the repository

- ".env.development" include - `PGDATABASE=nc_news`
- ".env.test code include -`PGDATABASE=nc_news_test`

5. Be sure to run the test suite to check everything is working correctly:

- `npm run tests`

## Minimum version requirements-

- Node.js (v18.17.0)
- Postgres (^3.4.3)

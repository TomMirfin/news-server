# Northcoders News API

Welcome to NC News!

Summary-
This project is the backend of a social news website and forum where users can post articles, make comments, and vote on posts. You can use /api to view all endpoints

How to run locally -
1.You will need to clone the repo: https://github.com/TomMirfin/news-server

git clone [https://github.com/NathanLee3296/news-server](https://github.com/TomMirfin/news-server.git)
Install NPM dependencies from the package.json file
npm install
Setup and seed the databases
npm run setup-dbs
npm run seed
You will need to create two files in the root folder of the repository
".env.test" which will contain -PGDATABASE=nc_news_test
".env.development" which will contain - PGDATABASE=nc_news
You should then be able to run the test suite to ensure everything is working correctly!
npm run tests
Minimum version requirements-
Node.js (v21.1.0)
Postgres (^3.4.3)

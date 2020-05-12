# Worklist - Patient Tracker

This application lets a user add a patients to a list and interact with them by:

* Editing information like name, date of birth, etc.
* Completing follow ups
* Archiving patients

## Running

This application uses Rails 6 and React so you will need to start both Rails and the webpack dev server in two terminal sessions:

```
bundle exec rails server
```

```
./bin/webpack-dev-server
```

If you have [Foreman](https://github.com/ddollar/foreman) installed, you can run both of them together with:

```
npm start
```

> The above NPM script runs foreman start -f Procfile.dev

## Tests

The test suite is RSpec. To run it:

```
bundle exec rspec
```

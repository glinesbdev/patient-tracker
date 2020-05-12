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

The test suite is RSpec. The javascript packs will need to be compiled as well. To run it:

```
RAILS_ENV=test bundle exec rake webpacker:compile && bundle exec rspec
```

## Known Bugs

* There are some known issues around the chrome webdriver and Capybara that make some tests fail inconsistently.
  * Specifically the `it 'can edit the patient'` test
* Pagination doesn't fully update properly with buttons and count.
* Some things on mobile look odd.
* Form validations are happening on the server but not displayed in the React forms.

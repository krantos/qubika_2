# QUBIKA

## Technical Test

### Exercise 2: Playwright

### Steps to run tests
1. Clone this repo
```
git clone git@github.com:krantos/qubika_2.git
```

2. Have installed **Node 21.0** or above

3. Copy the `.env.example` to `.env.staging` and use set the staging values

```
cp .env.example .env.staging
```

4. Then execute

```
 yarn install
```

```
yarn playwright install
```

```
yarn test
```

if everything goes fine, you should get a green test and the report being automatically open in your default browser.

## Failure troubleshoot

To not get any surprises here are a list of possible failures

1. Visual regression testing does not match the computer in which the test is running.

   - Delete the images in the folder

   ```
   tests/qubika_playwright.test.js-snapshots
   ```

   - run again the test, and you should get a fail due to not having a screenshot to compare.
   - run again and this issue should be solved.

1. Email is wrong. Check the

   ```
   src/test_files/data.json
   ```

   file and see if indicates 'Invalid email'

   - run again the test.

1. Category UI validation could fail due to a current bug on the pagination system.

   - re run the test.
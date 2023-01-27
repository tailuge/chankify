# Chankify

Convert chinese texts into an anki formated vocabulary list.

[https://tailuge.github.io/chankify/build/](https://tailuge.github.io/chankify/build/)


# Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

# Dictionary import

The dictionary used is [CC-CEDICT](https://cc-cedict.org/editor/editor.php?handler=Download) converted to JSON dropping the simpified chinese with 

`cat Downloads/cedict_1_0_ts_utf-8_mdbg.txt | cut -d' ' -f1,3- | grep -v 'variant of' | grep -v xx5 | grep -v '(archaic)' | grep -v '^#' | sed 's/"/\\"/g' | sed 's/ \[/", "pinyin":"/' | sed 's/\] /", "meaning":"/' | sed 's/^/{ "hanzi":"/' | dos2unix | sed 's/\/$/"},/' | sed 's/:"\//:"/' > dict.json`


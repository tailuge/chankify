# Chankify
[![CodeFactor](https://www.codefactor.io/repository/github/tailuge/chankify/badge)](https://www.codefactor.io/repository/github/tailuge/chankify) [![Open in Gitpod](https://img.shields.io/badge/Gitpod-Open%20in%20Gitpod-%230092CF.svg)](https://gitpod.io/#https://github.com/tailuge/chankify) ![visitors](https://visitor-badge.glitch.me/badge?page_id=tailuge.chankify)

Convert chinese texts into an anki formated vocabulary list.

Try it here: [https://tailuge.github.io/chankify/build/](https://tailuge.github.io/chankify/build/)


# Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.


### `yarn test`

### `yarn build`

# Dictionary import

The dictionary used is [CC-CEDICT](https://cc-cedict.org/editor/editor.php?handler=Download) converted to JSON dropping the simpified chinese with 

`cat Downloads/cedict_1_0_ts_utf-8_mdbg.txt | cut -d' ' -f1,3- | grep -v 'variant of' | grep -v xx5 | grep -v '(archaic)' | grep -v '^#' | sed 's/"/\\"/g' | sed 's/ \[/", "pinyin":"/' | sed 's/\] /", "meaning":"/' | sed 's/^/{ "hanzi":"/' | dos2unix | sed 's/\/$/"},/' | sed 's/:"\//:"/' > dict.json`


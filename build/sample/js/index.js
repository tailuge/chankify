/****************************************************************************************
 *                                                                                      *
 * This file incorporates work covered by the following copyright and permission        *
 * notice:                                                                              *
 *                                                                                      *
 *      mkanki - generate decks for the Anki spaced-repetition software.                *
 *      Copyright (c) 2018  Jeremy Apthorp <nornagon@nornagon.net>                      *
 *                                                                                      *
 *      This program is free software: you can redistribute it and/or modify            *
 *      it under the terms of the GNU Affero General Public License (version 3) as      *
 *      published by the Free Software Foundation.                                      *
 *                                                                                      *
 *      This program is distributed in the hope that it will be useful,                 *
 *      but WITHOUT ANY WARRANTY; without even the implied warranty of                  *
 *      MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the                   *
 *      GNU Affero General Public License for more details.                             *
 *                                                                                      *
 ****************************************************************************************/


var SQL;
initSqlJs().then(function (sql) {
    //Create the database
    SQL = sql;
    exportDataAsAPKG();
});

// queryparam should be an array of data encoded with the following format
// https://url?data=[{"q":"question1","a":"answer1"},...]
// e.g.
// ?data=[{"q"%3A"q1"%2C"a"%3A"a1"}%2C{"q"%3A"q2"%2C"a"%3A"a2"}]

function exportDataAsAPKG() {

    const sessionId = /sessionId=(.*)/.exec(location.search);
    if (sessionId !== null) {
        console.log(`sessionId is ${sessionId[1]}`);
        const parsedData = JSON.parse(decodeURIComponent(sessionStorage.getItem(sessionId[1])));
        exportData(parsedData);
        return;
    }

    const data = /data=(.*)/.exec(location.search);

    if (data === null) {
        console.log("No data parameter, stopping.");
        return;
    }

    console.log(`data has ${data[1].length} chars.`);
    const parsedData = JSON.parse(decodeURIComponent(data[1]));
    exportData(parsedData);
}

function exportData(parsedData) {
    const date = new Date();
    const uuid = Math.floor(date.getTime() / 1000);
    console.log(uuid)
    const m = new Model({
        name: "BasicFD",
        id: `${uuid}`,
        flds: [
            { name: "Front" },
            { name: "Back" }
        ],
        req: [
            [0, "all", [0]],
        ],
        tmpls: [
            {
                name: "Card 1",
                qfmt: "{{Front}}",
                afmt: "{{FrontSide}}\n\n<hr id=answer>\n\n{{furigana:Back}}\n\n"+
                "<div><a href=\"https://translate.google.com/?sl=auto&tl=en&text={{text:Front}}&op=translate\">📖</a></div>",
            }
        ],
    });

    const d = new Deck(uuid, `Deck${uuid}`);
    const p = new Package();

    parsedData.forEach(card => {
        console.log(JSON.stringify(card));
        d.addNote(m.note([card.q, card.a]));
    });

    p.addDeck(d);
    p.writeToFile(`Deck${uuid}.apkg`);

    console.log("Done");
};

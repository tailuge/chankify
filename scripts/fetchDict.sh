if [[ $# -eq 0 ]] ; then
    echo "Scrape dictionary from wikipedia table e.g."
    echo "$0 1-1000"
    echo "$0 1001-2000"
    echo "$0 2001-3000"
    echo "$0 3001-4000"
    echo "$0 4001-5000"
    echo "$0 5001-6000"
    echo "$0 6001-7000"
    echo "$0 7001-8000"
    echo "$0 8001-9000"
    echo "$0 9001-10000"
    echo "jq -c -s 'add'  1-1000.js 1001-2000.js 2001-3000.js 3001-4000.js 4001-5000.js 5001-6000.js 6001-7000.js 7001-8000.js 8001-9000.js 9001-10000.js | sed 's/},{/},\n{/g' > dict_rank.json"
    exit 0
fi

name=$1

curl "https://en.wiktionary.org/wiki/Appendix:Mandarin_Frequency_lists/${name}" | htmlq -t "span.Hant, span.Latn, td:nth-child(4) " | sed 's/^$/####/' | tr '\n' '@' | sed 's/####/\n/g' | sed 's/^@//' | sed 's/(file)//' | cut -d'@' --output-delimiter=$'\t' -f1- | jq --raw-input --slurp 'split("\n") | map(split("\t")) | .[0:-1] | map( { "hanzi": .[0], "pinyin": .[1], "meaning": .[2] } )' > "${name}.js"


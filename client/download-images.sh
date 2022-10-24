#! /usr/bin/env bash

rm -rf tmp_imgs.json
for pageSize in $(seq 0 10); do
    curl --silent --fail "https://picsum.photos/v2/list?page=${pageSize}&limit=100" \
        | jq '[.[]| {source: .download_url,height,width}]' >> tmp_imgs.json
done

cat tmp_imgs.json | tr -d '\n' | sed 's/\[/,/2g' | rev | sed 's/\]//2g' | rev | jq . > imgs.json
rm -rf tmp_imgs.json

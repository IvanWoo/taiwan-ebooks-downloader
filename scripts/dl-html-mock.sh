#!/bin/sh
set -euo pipefail

main() {
    for id in NCL-9910002285 NTUL-9900013103; do
        echo "Id: $id"
        curl https://taiwanebook.ncl.edu.tw/en/book/$id/reader >src/__tests__/mocks/$id.html
    done
}

main

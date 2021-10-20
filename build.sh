#!/usr/bin/env bash
set -eu -o pipefail

main() {
    rm -rf chrome.zip
    zip -vr chrome.zip chrome/ -x "*.DS_Store"
}

main
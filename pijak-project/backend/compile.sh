#!/bin/bash

# Pastikan folder tujuannya ada
mkdir -p ../public/wasm

# Perintah ajaib Emscripten
emcc Opportunity.cpp -o ../public/wasm/core.js \
  -s EXPORTED_FUNCTIONS="['_getDaftarPekerjaan']" \
  -s EXPORTED_RUNTIME_METHODS="['ccall', 'cwrap']" \
  -s MODULARIZE=1 \
  -s EXPORT_NAME="createPijakModule"

echo "Compile C++ ke Wasm sukses pol! File wes meluncur ke public/wasm"
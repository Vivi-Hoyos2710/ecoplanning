#!/bin/bash

cd frontend && prettier --write './**/*.{js,jsx,ts,tsx,css,md,json}' --config ./.prettierrc && git add .

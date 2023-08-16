#!/usr/bin/env bash

RED='\033[0;31m'
GREEN="\033[0;32m"
YELLOW="\033[0;33m"
BLUE="\033[0;34m"
NC='\033[0m' # No Color

function showHelp {
    echo -e "
    OPTIONS
     - ${GREEN}development${NC} or ${YELLOW}dev${NC} - Start development server
     - ${GREEN}production${NC} or ${YELLOW}prod${NC} - Start production server
     - ${GREEN}production-build${NC} or ${YELLOW}build${NC} - Build
     - ${GREEN}connect-to-browser-container${NC} or ${YELLOW}cb${NC} - Connect to browser container
     - ${GREEN}connect-to-server-container${NC} or ${YELLOW}cs${NC} - Connect to server container
     - ${GREEN}quit${NC} or ${YELLOW}q${NC} - Quit
  "
}

commandName=
userInput=$1
showHelp=$userInput
while [[ -z "$commandName" ]]; do
    if [[ -z "$showHelp" ]]; then
        showHelp
    fi

    if [[ -z "$userInput" ]]; then
        read -r commandName
        showHelp=
    else
        commandName="$userInput"
        userInput=
    fi

    case ${commandName} in
        "development" | "dev")
            docker-compose -f ./docker-compose-production.yml -f ./docker-compose-development.yml up --build
            break
            ;;
        "production" | "prod")
            docker-compose -f ./docker-compose-production.yml up --build
            break
            ;;
        "production build" | "build")
            docker-compose -f ./docker-compose-production.yml -f ./docker-compose-build.yml up --build
            break
            ;;
        "connect to browser container" | "cb")
            docker-compose -f ./docker-compose-production.yml exec node-browser bash
            break
            ;;
        "connect to server container" | "cs")
            docker-compose -f ./docker-compose-production.yml exec node-server bash
            break
            ;;
        "quit" | "q")
            break
            ;;
        *)
            showHelp
            echo "Sorry. Unknown command \"$commandName\". Try again."
            commandName=
            showHelp='no'
            ;;
      esac
done

#!/bin/bash

# Environment variables
# cwd      => current working directory
# core     => current core configuration
# config   => current proxy configuration
# mmdb     => current mmdb configuration

cwd=$(dirname "$(realpath "$0")")
cwd_data="$cwd/data/"


function show_menu {
    clear
    echo "Choose operation:"
    echo "1. update/download core 🚀"
    echo "2. update/download mmdb 🗄️"
    echo "3: update subscription 🔄"
    echo "4: run 🐱"
    echo "0: quit 🔚"

    read -n 1 -p "input your instruct: " key
    echo ""

    case $key in
        '1')
            clear
            echo "Start update/download core 🚀"
            update_core
            pause
            show_menu
            ;;
        '2')
            clear
            echo "Start update/download mmdb 🗄️"
            update_mmdb
            pause
            show_menu
            ;;
        '3')
            clear
            echo "Start update subscription 🔄"
            update_subscription
            pause
            show_menu
            ;;
        '4')
            clear
            echo "Start running 🐱"
            running_cat
            pause
            show_menu
            ;;
        '0')
            clear
            exit 0
            ;;
        *)
            echo -e "\nInvalid choice, try again"
            pause
            show_menu
            ;;
    esac
}

function pause {
    read -n 1 -s -r -p "Type anything plz..."
}

function init {
    env_file="$cwd/.env"
    if [[ -f "$env_file" ]]; then
        echo "Load environment variables."
        source "$env_file"
    else
        echo "Environment file does not exist. Refer to the readme first!"
        exit 0
    fi

    echo $download_address

    core="$cwd_data/core"
    mmdb="$cwd_data/Country.mmdb"
    config="$cwd_data/config.yaml"
}

# Update Subscription
function update_subscription {
    bak="$config.bak"

    curl -L "$download_address" -o "$config"

    sed 's/allow-lan: false/allow-lan: true/' "$config" > "$bak"
    sed 's/mixed-port: 7890/mixed-port: 10800/' "$bak" > "$config"

    rm "$bak"
}

function update_core {
    address="https://github.com/MetaCubeX/mihomo/releases/download/v1.18.8/mihomo-linux-amd64-v1.18.8.gz"
    origin_path="$cwd_data/core.gz"

    fetch "$address" "$origin_path"

    gunzip -c ./data/core.gz > data/core
}

function update_mmdb {
    address="https://github.com/Loyalsoldier/geoip/releases/download/202409190112/Country.mmdb"
    fetch "$address" "$mmdb"
}

function fetch {
    if [[ -f "$2" ]]; then
        echo "Target file already exists. Skipping update."
    else
        curl -L "$1" -o "$2"
    fi
}

function running_cat {
    if [[ ! -f "$core" ]]; then
        echo "Core not found. Please ensure you've run option 1."
        return
    fi
    if [[ ! -f "$mmdb" ]]; then
        echo "MMDB not found. Please ensure you've run option 2."
        return
    fi
    if [[ ! -f "$config" ]]; then
        echo "Config not found. Please ensure you've run option 3."
        return
    fi

    chmod +x "$core"

    "$core" -d "$cwd_data"
}

init

show_menu

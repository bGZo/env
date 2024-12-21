#!/bin/zsh

#+-------+
#|General|
#+-------+
# NOTE: `function` & `()` is same thing.
error-exit() {
    # 1>&2 redirect stderr to stdout, see via
    # https://stackoverflow.com/questions/818255/in-the-shell-what-does-21-mean#answer-16283739
    echo "$1" 1>&2
    exit
}

#+-----------------------+
#|fix: History Commandline|
#+-----------------------+
fix-not-reading-history(){
    # via:      https://shapeshed.com/zsh-corrupt-history-file
    # license:  http://unlicense.org
    mv ~/.zsh_history ~/.zsh_history_bad
    strings -eS ~/.zsh_history_bad > ~/.zsh_history
    fc -R ~/.zsh_history
    rm ~/.zsh_history_bad
}

#+---------------------------------+
#|feat: switch on GNOME Environment|
#+---------------------------------+
gnome-swith-theme() {
    out=$(gsettings get org.gnome.desktop.interface gtk-theme) || error_exit "Not Found Theme"
    if [ $out = \'WhiteSur-dark-solid\' ]; then 
        gsettings set org.gnome.desktop.interface gtk-theme "WhiteSur-light-solid"
    elif [ $out = \'WhiteSur-light-solid\' ]; then
        gsettings set org.gnome.desktop.interface gtk-theme "WhiteSur-dark-solid"
    fi
}

#+-----------+
#|feat: Proxy|
#+-----------+
proxy(){
    local host_ip="$1"
    local host_address="$2"

    if [ -z "$host_ip" ] || [ -z "$host_port" ]; then
        echo "Usage: proxy <host_ip> <host_port>"
        return 1
    fi

    export all_proxy="http://$host_ip:$host_address"
    export http_proxy="http://$host_ip:$host_address"
    export https_proxy="http://$host_ip:$host_address"

    if which git > /dev/null 2>&1; then
        git config --global http.proxy http://$host_ip:$host_port
    fi

    if which node > /dev/null 2>&1; then
        npm config set proxy http://$host_ip:$host_port
        npm config set https-proxy http://$host_ip:$host_port
    fi

#     echo "{
# \"proxies\":
# {
#    \"default\":
#    {
#      \"httpProxy\": \"http://$host_ip:7890\",
#      \"httpsProxy\": \"http://$host_ip:7890\",

#      \"noProxy\": \"localhost\"
#    }
# }
# }" > $HOME/.docker/config.json

    echo "Proxy is ON with $host_ip:$host_address"
}

get-proxy(){
    case $(uname -s) in
        Darwin)
            # macOS
            host_ip=$(scutil --proxy | grep HTTPProxy | awk '{print $3}')
            host_port=$(scutil --proxy | grep HTTPPort | awk '{print $3}')
            ;;
        Linux)
            if [[ $(uname -r) == *Microsoft* || $(uname -r) == *WSL* ]]; then
                # WSL
                host_ip=$(grep "nameserver" /etc/resolv.conf | awk '{print $2}')
                host_port="10800" # todo
            else
                # unknown Linux machine
                host_ip="127.0.0.1"
                host_port="10800" # todo
            fi
            ;;
        *)
            echo "Unsupported OS: $os_type"
            return 1
            ;;
    esac

    echo "$host_ip:$host_port"
}

auto-proxy(){
    local proxy=$(get-proxy)

    host_ip=$(echo "$proxy" | cut -d ':' -f 1)
    host_port=$(echo "$proxy" | cut -d ':' -f 2)

    proxy "$host_ip" "$host_port"
}

proxy-close(){
    unset all_proxy
    unset http_proxy
    unset https_proxy

    if which git > /dev/null 2>&1; then
        git config --global --unset http.proxy
    fi

    if which node > /dev/null 2>&1; then
        npm config delete proxy
        npm config delete https-proxy
    fi

    echo "Proxy is OFF."
}


# open-gui-server(){
#     export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
#     export LIBGL_ALWAYS_INDIRECT=1
#     sudo /etc/init.d/dbus start &> /dev/null
# }


# +-------------------------------------------------------------------------+
# Switch (Nuphy) Keyboard to FN Mode(Temporary Method)                      |
# Via: https://www.reddit.com/r/MechanicalKeyboards/comments/tgjvp2/nuphy_air75_on_linux_issues_with_fn
#      https://www.hashbangcode.com/article/turning-or-fn-mode-ubuntu-linux |
# +-------------------------------------------------------------------------+
switchFnMode(){
    echo 0 | sudo tee /sys/module/hid_apple/parameters/fnmode
}

# todo: gsettings set org.gnome.desktop.interface cursor-size 24

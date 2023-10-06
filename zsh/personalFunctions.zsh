#!/bin/zsh

#+-------+
#|General|
#+-------+
# NOTE: `function` & `()` is same thing.
error_exit() {
    # 1>&2 redirect stderr to stdout, see via
    # https://stackoverflow.com/questions/818255/in-the-shell-what-does-21-mean#answer-16283739
    echo "$1" 1>&2
    exit
}

#+-----------------------+
#|fix: History Commandline|
#+-----------------------+
fixNotReadingHistory(){
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
swithThemeOnGnome() {
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
proxyOnTerminal(){
    local host_ip="$1"
    if [ -z "$host_ip" ]; then
        echo "Usage: proxyOnTerminal <host_ip>"
        return 1
    fi

    # FIXME: does shell have callback function to callback output to docker?
    export all_proxy="http://$host_ip:7890"
    export http_proxy="http://$host_ip:7890"
    export https_proxy="http://$host_ip:7890"
    echo "Proxy is ON."
}

proxyOnDocker(){
    local host_ip="$1"
    if [ -z "$host_ip" ]; then
        echo "Usage: proxyOnDocker <host_ip>"
        return 1
    fi

    echo "{
\"proxies\":
{
   \"default\":
   {
     \"httpProxy\": \"http://$host_ip:7890\",
     \"httpsProxy\": \"http://$host_ip:7890\",

     \"noProxy\": \"localhost\"
   }
}
}" > $HOME/.docker/config.json
    # FIXME: depand out-ip-bin
    # echo "all_proxy=http://$host_ip:7890" > $HOME/ttrss/.env
    # echo "http_proxy=http://$host_ip:7890" >> $HOME/ttrss/.env
    # echo "https_proxy=http://$host_ip:7890" >> $HOME/ttrss/.env
    # cat /mnt/c/Users/15517/bin/lan_ip >> $HOME/ttrss/.env
}

closeProxy() {
    unset all_proxy
    unset http_proxy
    unset https_proxy

    echo "Proxy is OFF."
}

openProxy(){
    # Judge this machine is WSL/WSL2, to use different proxy;
    if [[ $(uname -r) == *Microsoft* || $(uname -r) == *WSL* ]]; then
        echo "This is a WSL system."
        host_ip=$(cat /etc/resolv.conf |grep "nameserver" |cut -f 2 -d " ")
    else
        echo "This is not a WSL system. Great )"
        host_ip="127.0.0.1"
    fi

    proxyOnTerminal $host_ip
}

openClash() {
    proxyDir="$HOME/workspace/proxy"
    # NOTE!: not proxyDir="~/workspace/proxy"
    assertClash=(where clash) || error_exit "Cannot find path of clash, set it please."

    clash -d $proxyDir
}


# gitCommit(){
#     git add .
#     git status
#     echo "[bGZoCg] Input something:"
#     read git_tmp_ver # ah,zsh do not support readline(arrow key, -e in bash)
#     git commit -m $git_tmp_ver
# }


# openXAMPP(){
#     sudo ./opt/lampp/manager-linux-x64.run || error_exit "Not Found Software"
# }
# openCAJVIEWER(){
#     .~/opt/cajviewer.AppImage || error_exit "Not Found Software"
# } 
#
# out-ip-bin() {
#     ip addr show eth0 | grep 'inet ' | cut -f 6 -d ' ' | cut -f 1 -d '/' > /mnt/c/Users/15517/bin/wsl_ip
# }
# open-gui-server(){
#     export DISPLAY=$(cat /etc/resolv.conf | grep nameserver | awk '{print $2; exit;}'):0.0
#     export LIBGL_ALWAYS_INDIRECT=1
#     sudo /etc/init.d/dbus start &> /dev/null
# }

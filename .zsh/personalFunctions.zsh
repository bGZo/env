#!/bin/zsh

#+-------+
#|General|
#+-------+

function error_exit {
    # 1>&2 redirect stderr to stdout, see via
    # https://stackoverflow.com/questions/818255/in-the-shell-what-does-21-mean#answer-16283739
    echo "$1" 1>&2
    exit
}

#+---------+
#|Inpendent|
#+---------+

openProxy(){
    host_ip=$(cat /etc/resolv.conf |grep "nameserver" |cut -f 2 -d " ")
    export ALL_PROXY="http://$host_ip:7890"
    echo "HTTP Proxy on"
}
closeProxy() {
    unset ALL_PROXY
    echo "HTTP Proxy off"
}

fixNotReadingHistory(){
    # Idea from https://shapeshed.com/zsh-corrupt-history-file
    # License - http://unlicense.org
    mv ~/.zsh_history ~/.zsh_history_bad
    strings -eS ~/.zsh_history_bad > ~/.zsh_history
    fc -R ~/.zsh_history
    rm ~/.zsh_history_bad
}

gitCommit(){
    git add .
    git status
    echo "[bGZoCg] Input something:"
    read git_tmp_ver # ah,zsh do not support readline(arrow key, -e in bash)
    git commit -m $git_tmp_ver
}

openClash() {
    clashDir=(where clash) || error_exit "Cannot find path of clash, set it please."
    .$clashDir/clash -d .
}

openXAMPP(){
    sudo ./opt/lampp/manager-linux-x64.run || error_exit "Not Found Software"
}

openCAJVIEWER(){
    .~/opt/cajviewer.AppImage || error_exit "Not Found Software"
} 

swithTheme() {
    out=$(gsettings get org.gnome.desktop.interface gtk-theme) || error_exit "Not Found Theme"
    if [ $out = \'WhiteSur-dark-solid\' ]; then 
        gsettings set org.gnome.desktop.interface gtk-theme "WhiteSur-light-solid"
    elif [ $out = \'WhiteSur-light-solid\' ]; then
        gsettings set org.gnome.desktop.interface gtk-theme "WhiteSur-dark-solid"
    fi
}


#!/bin/zsh

# proxy in wsl2, wsl1 like follow:
  # export all_proxy="http://127.0.0.1:7890"
  # unset all_proxy
openProxy(){
  host_ip=$(cat /etc/resolv.conf |grep "nameserver" |cut -f 2 -d " ")
  export ALL_PROXY="http://$host_ip:7890"
  echo "HTTP Proxy on"
}
closeProxy() {
  unset ALL_PROXY
  echo "HTTP Proxy off"
}

# fix history file
fixNotReadingHistory(){
  mv ~/.zsh_history ~/.zsh_history_bad;
  strings -eS ~/.zsh_history_bad > ~/.zsh_history
  fc -R ~/.zsh_history
  rm ~/.zsh_history_bad
}

# simplify git commit
gitCommit(){
  git add .
  git status
  echo "[bGZoCg] Input something:"
  read git_tmp_ver
  git commit -m $git_tmp_ver
}

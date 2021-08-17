#!/bin/zsh
# thx: https://qastack.cn/unix/214657/what-does-zstyle-do.

# Ztyle pattern
# :completion:<function>:<completer>:<command>:<argument>:<tag>

# Define completers
zstyle ':completion:*' completer _expand _complete _correct _approximate

# Allow you to select in a menu
zstyle ':completion:*' menu select=2 #/ =long ???

# Required for completion to be in good groups (named after the tags)
zstyle ':completion:*' group-name ''

# See ZSHCOMPWID "completion matching control"
zstyle ':completion:*' matcher-list '' 'm:{a-zA-Z}={A-Za-z}' 'r:|[._-]=* r:|=*' 'l:|=* r:|=*'

 zstyle ':completion:*' auto-description 'specify: %d'
 zstyle ':completion:*' format 'Completing %d'
 eval "$(dircolors -b)"
 zstyle ':completion:*:default' list-colors ${(s.:.)LS_COLORS}
 zstyle ':completion:*' list-colors ''
 zstyle ':completion:*' list-prompt %SAt %p: Hit TAB for more, or the character to insert%s
 zstyle ':completion:*' select-prompt %SScrolling active: current selection at %p%s
 zstyle ':completion:*' use-compctl false
 zstyle ':completion:*' verbose true
 zstyle ':completion:*:*:kill:*:processes' list-colors '=(#b) #([0-9]#)*=0=01;31'
 zstyle ':completion:*:kill:*' command 'ps -u $USER -o pid,%cpu,tty,cputime,cmd'


#!/bin/zsh
# +---------+-----------------------------------------------+
# |more: https://zsh.sourceforge.io/Doc/Release/Options.html|
# +---------------------------------------------------------+

# WSL (aka Bash for Windows) doesn't work well with BG_NICE
[ -d "/mnt/c" ] && [[ "$(uname -a)" == *Microsoft* ]] && unsetopt BG_NICE

# Disable correction
unsetopt correct_all
unsetopt correct
DISABLE_CORRECTION="true"

# setopt prompt_subst(I use others' file of prompt)





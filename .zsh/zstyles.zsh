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

# **TODO/FIXME**: following are oh-my-zsh file backup research it if have time.
# # Declare modules
# zstyle ':prezto:*:*' color 'yes'
# zstyle ':prezto:module:editor' key-bindings 'emacs'
# zstyle ':prezto:module:git:alias' skip 'yes'
# zstyle ':prezto:module:prompt' theme 'redhat'
# zstyle ':prezto:module:prompt' pwd-length 'short'
# zstyle ':prezto:module:terminal' auto-title 'yes'
# zstyle ':prezto:module:autosuggestions' color 'yes'
# zstyle ':prezto:module:python' autovenv 'yes'
# zstyle ':prezto:load' pmodule \
# 	'environment' \
# 	'editor' \
# 	'history' \
# 	'git' \
# 	'utility' \
# 	'completion' \
# 	'history-substring-search' \
# 	'autosuggestions' \
# 	'prompt' \
# 	# 'autosuggestions' \

# # syntax color definition
# ZSH_HIGHLIGHT_HIGHLIGHTERS=(main brackets pattern)
# typeset -A ZSH_HIGHLIGHT_STYLES
# # ZSH_HIGHLIGHT_STYLES[command]=fg=white,bold
# # ZSH_HIGHLIGHT_STYLES[alias]='fg=magenta,bold'

# ZSH_HIGHLIGHT_STYLES[default]=none
# ZSH_HIGHLIGHT_STYLES[unknown-token]=fg=009
# ZSH_HIGHLIGHT_STYLES[reserved-word]=fg=009,standout
# ZSH_HIGHLIGHT_STYLES[alias]=fg=cyan,bold
# ZSH_HIGHLIGHT_STYLES[builtin]=fg=cyan,bold
# ZSH_HIGHLIGHT_STYLES[function]=fg=cyan,bold
# ZSH_HIGHLIGHT_STYLES[command]=fg=white,bold
# ZSH_HIGHLIGHT_STYLES[precommand]=fg=white,underline
# ZSH_HIGHLIGHT_STYLES[commandseparator]=none
# ZSH_HIGHLIGHT_STYLES[hashed-command]=fg=009
# ZSH_HIGHLIGHT_STYLES[path]=fg=214,underline
# ZSH_HIGHLIGHT_STYLES[globbing]=fg=063
# ZSH_HIGHLIGHT_STYLES[history-expansion]=fg=white,underline
# ZSH_HIGHLIGHT_STYLES[single-hyphen-option]=none
# ZSH_HIGHLIGHT_STYLES[double-hyphen-option]=none
# ZSH_HIGHLIGHT_STYLES[back-quoted-argument]=none
# ZSH_HIGHLIGHT_STYLES[single-quoted-argument]=fg=063
# ZSH_HIGHLIGHT_STYLES[double-quoted-argument]=fg=063
# ZSH_HIGHLIGHT_STYLES[dollar-double-quoted-argument]=fg=009
# ZSH_HIGHLIGHT_STYLES[back-double-quoted-argument]=fg=009
# ZSH_HIGHLIGHT_STYLES[assign]=none

# # completion detail
# zstyle ':completion:*:complete:-command-:*:*' ignored-patterns '*.pdf|*.exe|*.dll'
# zstyle ':completion:*:*sh:*:' tag-order files


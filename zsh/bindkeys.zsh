#!/bin/zsh

# [keymap] use emacs keybindings even if our EDITOR is set to vi.
# bindkey -e

# +-----------------------------------------------------------+
# |https://zsh.sourceforge.io/Doc/Release/Zsh-Line-Editor.html|
# +-----------------------------------------------------------+

# Make sure arrow key works.
case "${TERM}" in
  cons25*|linux) # plain BSD/Linux console
    bindkey '\e[H'    beginning-of-line   # home
    bindkey '\e[F'    end-of-line         # end
    bindkey '\e[5~'   delete-char         # delete
    bindkey '[D'      emacs-backward-word # esc left
    bindkey '[C'      emacs-forward-word  # esc right
    ;;
  *rxvt*) # rxvt derivatives
    bindkey '\e[3~'   delete-char         # delete
    bindkey '\eOc'    forward-word        # ctrl right
    bindkey '\eOd'    backward-word       # ctrl left
    # workaround for screen + urxvt
    bindkey '\e[7~'   beginning-of-line   # home
    bindkey '\e[8~'   end-of-line         # end
    bindkey '^[[1~'   beginning-of-line   # home
    bindkey '^[[4~'   end-of-line         # end
    ;;
  *xterm*) # xterm derivatives
    bindkey '\e[H'    beginning-of-line   # home
    bindkey '\e[F'    end-of-line         # end
    bindkey '\e[3~'   delete-char         # delete
    bindkey '\e[1;5C' forward-word        # ctrl right
    bindkey '\e[1;5D' backward-word       # ctrl left
    # workaround for screen + xterm
    bindkey '\e[1~'   beginning-of-line   # home
    bindkey '\e[4~'   end-of-line         # end
    ;;
  screen)
    bindkey '^[[1~'   beginning-of-line   # home
    bindkey '^[[4~'   end-of-line         # end
    bindkey '\e[3~'   delete-char         # delete
    bindkey '\eOc'    forward-word        # ctrl right
    bindkey '\eOd'    backward-word       # ctrl left
    bindkey '^[[1;5C' forward-word        # ctrl right
    bindkey '^[[1;5D' backward-word       # ctrl left
    ;;
esac

#**FIXME/TODO**
# diff the set above and follow, its much same...
# default keymap
# bindkey -s '\ee' 'vim\n'
# bindkey '\eh' backward-char
# bindkey '\el' forward-char
# bindkey '\ej' down-line-or-history
# bindkey '\ek' up-line-or-history
# bindkey '\eH' backward-word
# bindkey '\eL' forward-word
# bindkey '\eJ' beginning-of-line
# bindkey '\eK' end-of-line

# bindkey -s '\eo' 'cd ..\n'
# bindkey -s '\e;' 'll\n'

# bindkey '\e[1;3D' backward-word
# bindkey '\e[1;3C' forward-word
# bindkey '\e[1;3A' beginning-of-line
# bindkey '\e[1;3B' end-of-line

# bindkey '\ev' deer
# bindkey -s '\eu' 'ranger_cd\n'
# bindkey -s '\eOS' 'vim '



#!/bin/zsh

# [keymap] use emacs keybindings even if our EDITOR is set to vi.
# bindkey -e

# +-----------------------------------------------------------+
# |https://zsh.sourceforge.io/Doc/Release/Zsh-Line-Editor.html|
# +-----------------------------------------------------------+

# Make sure arrow key works.
case "${TERM}" in
  cons25*|linux) # plain BSD/Linux console
    bindkey '\e[H'    beginning-of-line         # Home: 跳转到行首
    bindkey '\e[F'    end-of-line               # End: 跳转到行尾
    bindkey '\e[5~'   delete-char               # Delete: 删除当前字符
    bindkey '[D'      emacs-backward-word       # Esc + Left Arrow: 向左移动一个单词
    bindkey '[C'      emacs-forward-word        # Esc + Right Arrow: 向右移动一个单词
    bindkey '^A'      beginning-of-line         # Ctrl + A: 跳转到行首
    bindkey '^E'      end-of-line               # Ctrl + E: 跳转到行尾
    bindkey '^L'      clear-screen              # Ctrl + L: 清屏
    bindkey '^T'      transpose-chars           # Ctrl + T: 交换光标处的字符
    bindkey '^B'      backward-char             # Ctrl + B: 向后移动一个字符
    bindkey '^F'      forward-char              # Ctrl + F: 向前移动一个字符
    bindkey '^W'      backward-kill-word        # Ctrl + W: 删除光标前一个单词
    bindkey '^U'      backward-kill-line        # Ctrl + U: 删除光标前整行
    bindkey '^K'      kill-line                 # Ctrl + K: 删除光标后整行
    bindkey '^Y'      yank                      # Ctrl + Y: 粘贴恢复删除的内容
    ;;
  *rxvt*) # rxvt derivatives
    bindkey '\e[3~'   delete-char               # Delete: 删除当前字符
    bindkey '\eOc'    forward-word              # Ctrl + Right Arrow: 向前移动一个单词
    bindkey '\eOd'    backward-word             # Ctrl + Left Arrow: 向后移动一个单词
    bindkey '\e[7~'   beginning-of-line         # Home: 跳转到行首
    bindkey '\e[8~'   end-of-line               # End: 跳转到行尾
    bindkey '^[[1~'   beginning-of-line         # Home: 跳转到行首
    bindkey '^[[4~'   end-of-line               # End: 跳转到行尾
    bindkey '^A'      beginning-of-line         # Ctrl + A: 跳转到行首
    bindkey '^E'      end-of-line               # Ctrl + E: 跳转到行尾
    bindkey '^L'      clear-screen              # Ctrl + L: 清屏
    bindkey '^T'      transpose-chars           # Ctrl + T: 交换光标处的字符
    bindkey '^B'      backward-char             # Ctrl + B: 向后移动一个字符
    bindkey '^F'      forward-char              # Ctrl + F: 向前移动一个字符
    bindkey '^W'      backward-kill-word        # Ctrl + W: 删除光标前一个单词
    bindkey '^U'      backward-kill-line        # Ctrl + U: 删除光标前整行
    bindkey '^K'      kill-line                 # Ctrl + K: 删除光标后整行
    bindkey '^Y'      yank                      # Ctrl + Y: 粘贴恢复删除的内容

    ;;
  *xterm*) # xterm derivatives
    # workaround for screen + xterm
    bindkey '\e[1~'   beginning-of-line         # home
    bindkey '\e[4~'   end-of-line               # end

    # Navigation and Cursor Movement
    bindkey '\e[H'    beginning-of-line         # home: 跳转到行首
    bindkey '\e[F'    end-of-line               # End: 跳转到行尾
    bindkey '\e[A'    up-line-or-history        # Up: 上一行历史命令
    bindkey '\e[B'    down-line-or-history      # Down: 下一行历史命令
    bindkey '\e[C'    forward-char              # Right Arrow: 向右移动一个字符
    bindkey '\e[D'    backward-char             # Left Arrow: 向左移动一个字符

    # Word Navigation
    bindkey '\e[1;5C' forward-word              # Ctrl + Right Arrow: 向前移动一个单词
    bindkey '\e[1;5D' backward-word             # Ctrl + Left Arrow: 向后移动一个单词

    # Deletion
    bindkey '\e[3~'   delete-char               # Delete: 删除当前字符
    bindkey '^H'      backward-delete-char      # Ctrl + H: 删除光标前一个字符
    bindkey '^W'      backward-kill-word        # Ctrl + W: 删除光标前一个单词
    bindkey '^U'      backward-kill-line        # Ctrl + U: 删除光标前整行
    bindkey '^K'      kill-line                 # Ctrl + K: 删除光标后整行
    bindkey '^Y'      yank                      # Ctrl + Y: 粘贴恢复删除的内容
    bindkey '^D'      delete-char               # Ctrl + D: 删除当前字符（类似删除键）

    # Search & History
    bindkey '^R'      history-incremental-search-backward # Ctrl + R: 增量搜索历史命令
    bindkey '^S'      history-incremental-search-forward  # Ctrl + S: 增量搜索历史命令（注意：某些终端可能与 XON 控制字符冲突）

    # Line Editing
    bindkey '^A'      beginning-of-line         # Ctrl + A: 跳转到行首
    bindkey '^E'      end-of-line               # Ctrl + E: 跳转到行尾
    bindkey '^L'      clear-screen              # Ctrl + L: 清屏
    bindkey '^T'      transpose-chars           # Ctrl + T: 交换光标处的字符
    bindkey '^F'      forward-char              # Ctrl + F: 向前移动一个字符（等同右箭头）
    bindkey '^B'      backward-char             # Ctrl + B: 向后移动一个字符（等同左箭头）

    # Custom Commands
    bindkey -s '\et' 'top\n'                    # Ctrl + T: 启动 top 命令
    bindkey -s '\ei' 'htop\n'                   # Ctrl + I: 启动 htop 命令
    bindkey -s '\er' 'ranger\n'                 # Ctrl + R: 启动 ranger 文件管理器

    # Miscellaneous
    bindkey '\e[1;5A' history-search-backward   # Ctrl + Up Arrow: 向上搜索历史命令
    bindkey '\e[1;5B' history-search-forward    # Ctrl + Down Arrow: 向下搜索历史命令
    bindkey '^Z'      suspend                   # Ctrl + Z: 挂起当前进程（后台运行）
    bindkey '^C'      interrupt                 # Ctrl + C: 终止当前进程
    bindkey '^X'      exit                      # Ctrl + X: 退出

    # Jump to beginning and end of history
    bindkey '^P'      previous-history          # Ctrl + P: 上一条历史命令
    bindkey '^N'      next-history              # Ctrl + N: 下一条历史命令

    ;;
  screen)
    bindkey '^[[1~'   beginning-of-line         # Home: 跳转到行首
    bindkey '^[[4~'   end-of-line               # End: 跳转到行尾
    bindkey '\e[3~'   delete-char               # Delete: 删除当前字符
    bindkey '\eOc'    forward-word              # Ctrl + Right Arrow: 向前移动一个单词
    bindkey '\eOd'    backward-word             # Ctrl + Left Arrow: 向后移动一个单词
    bindkey '^[[1;5C' forward-word              # Ctrl + Right Arrow: 向前移动一个单词
    bindkey '^[[1;5D' backward-word             # Ctrl + Left Arrow: 向后移动一个单词
    bindkey '^A'      beginning-of-line         # Ctrl + A: 跳转到行首
    bindkey '^E'      end-of-line               # Ctrl + E: 跳转到行尾
    bindkey '^L'      clear-screen              # Ctrl + L: 清屏
    bindkey '^T'      transpose-chars           # Ctrl + T: 交换光标处的字符
    bindkey '^B'      backward-char             # Ctrl + B: 向后移动一个字符
    bindkey '^F'      forward-char              # Ctrl + F: 向前移动一个字符
    bindkey '^W'      backward-kill-word        # Ctrl + W: 删除光标前一个单词
    bindkey '^U'      backward-kill-line        # Ctrl + U: 删除光标前整行
    bindkey '^K'      kill-line                 # Ctrl + K: 删除光标后整行
    bindkey '^Y'      yank                      # Ctrl + Y: 粘贴恢复删除的内容
    ;;
esac

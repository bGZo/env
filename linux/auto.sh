export BACKUPATH=$(pwd)/zsh

# Backup the root dotfiles
if [ -f ~/.zshrc ]; then
#  cp ~/.zshrc $BACKUPATH\.zshrc
  tail -n 1 ~/.zshrc
fi

if [ -f ~/.gitconfig ]; then
#  cp ~/.gitconfig $BACKUPATH\.gitconfig
  tail -n 1 ~/.gitconfig
  tail -n 1 $BACKUPATH/.gitconfig
fi

# TODO: Upload the history to private gist.
  # History list
    # .python_history
    # .sqlite_history

export BACKUPATH=workspace/dotfiles

# Backup the root dotfiles
if [ -f ~/.zshrc ]; then
  cp ~/.zshrc $BACKUPATH\.zshrc
fi

if [ -f ~/.gitconfig ]; then
  cp ~/.gitconfig $BACKUPATH\.gitconfig
fi

# TODO: Upload the history to private gist.
  # History list
    # .python_history
    # .sqlite_history

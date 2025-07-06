This is a repo for hosting my userscripts, dotfiles[^DOTFILES_INTRO], configurations and more. The releases only include userscripts for importing.

[^DOTFILES_INTRO]: https://www.freecodecamp.org/news/dotfiles-what-is-a-dot-file-and-how-to-create-it-in-mac-and-linux/


## Dotfiles

### Quick Start 


>[!IMPORTENT]
Those softwares shouold be required:

```bash
$ sudo pacman -S zsh git
```

Git should be config like:

```bash
git config --global user.name 'HX'
git config --global user.email ''
ssh-keygen -t rsa -C ""
```

Clone repo, then:

```bash
$ git submodule update --init --recursive
$ git submodule update --remote --recursive 
$ cp zsh/.zshrcBackup ~/.zshrc
$ vim ~/.zshrc
$ chsh -s /usr/bin/zsh
```

### Zsh

The construct of zsh is like this:

```bash
./zsh
|-- aliases
|-- bindkeys.zsh
|-- colors.zsh
|-- dircolors
|-- histories.zsh                 # history record rule
|-- options.zsh
|-- personalFunctions.zsh         # custom function
|-- prompt_purification_setup
|-- zsh-autosuggestions/          # submodule for complete by history
|-- zsh-syntax-highlighting/      # submodule for highlight
|-- zshenv                        # environment
`-- zstyles.zsh
```


## Userscripts

### Quick Start

Download release via: https://github.com/bGZo/env/releases. Then import zip file in tampermonkey. 

They should work well.

### Backup

```shell
unzip ~/Downloads/tampermonkey-backup-chrome-XXX.zip -d ~/workspace/userscripts/tampermonkey-temp/
rsync -avz --progress --delete ./tampermonkey-temp ./tampermonkey
rm -rf ./tampermonkey-temp
```

#### Package

```shell
zip -r tampermonkey-backup-github.zip tampermonkey/
```

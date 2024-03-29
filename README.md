# dotfiles

在類 nix 系統中，大多數應用配置的存儲方式為純文本格式（Plain text）[^DOTFILES_INTRO]，如何在不同機器中獲得相同的開發體驗，這是一個重要的課題。如果你看過一些國外的開發者，一定會注意到他們有一些同名率相當高的倉庫，`dotfiles` 就是其中之一。

因為國內大環境已 Windows 為主，而商用 UNIX 門檻又很高（MacOS很貴），所以不接觸服務器的朋友很難瞭解這部分內容。拋卻功利性的目的，這部分相比 Windows 更具開放性和定製性，即使用來消遣時間也是個不錯的選擇。

## Quick Start (based on archwsl)

```shell
# 切换中国源
sudo sed -E '/China/,/##/s/^#S(.)/S\1/g' /etc/pacman.d/mirrorlist~ > /etc/pacman.d/mirrorlist
sudo pacman -Ssyu
# 安装 必要软件
sudo pacman -S zsh git openssh
# 配置 Git
git config --global user.name 'bGZo'
git config --global user.email ''
ssh-keygen -t rsa -C ''
ssh -T git@github.com
cat ~/.ssh/id_rsa.pub
# 配置 dotfiles
cd dotfiles/
git submodule update --init --recursive
cp zsh/.zshrcBackup ~/.zshrc
vim .zshrc
# 永久切换 Shell
chsh -l
chsh -s /usr/bin/zsh
```

## Scopes

```diff
+ zsh config 
+ samba config
+ maven profiles config
+ logseq dotfile
```

---

[^DOTFILES_INTRO]: https://www.freecodecamp.org/news/dotfiles-what-is-a-dot-file-and-how-to-create-it-in-mac-and-linux/
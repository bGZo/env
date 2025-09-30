This is a repo for hosting my userscripts, dotfiles[^DOTFILES_INTRO], configurations and more. The releases only include userscripts for importing.

[^DOTFILES_INTRO]: https://www.freecodecamp.org/news/dotfiles-what-is-a-dot-file-and-how-to-create-it-in-mac-and-linux/


## Quick Start

> [!NOTE]
> `git`/ `zsh` are required, install them first if not exist.

Git should be config like:

```shell
git config --global user.name 'HX'
git config --global user.email ''
ssh-keygen -t rsa -C ""
```

Clone repo, then:

```shell
git submodule update --init --recursive
git submodule update --remote --recursive 
cp zsh/.zshrcBackup ~/.zshrc
vim ~/.zshrc
chsh -s /usr/bin/zsh
```

If you connect with ssh, you could add your client public key to `~/.ssh/authorized_keys` on server:

```shell
cat ~/.ssh/id_rsa.pub | ssh user@server 'cat >> ~/.ssh/authorized_keys'
```

Then you can login without password.  


## Zsh

The construct of zsh is like this:

```shell
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

### Package

```shell
zip -r tampermonkey-backup-github.zip tampermonkey/
```

## Proxies

> Proxies were devised to add structure and encapsulation to distributed systems.
> https://en.wikipedia.org/wiki/Proxy_server

[![Proxy Command Reference](https://github-readme-stats.vercel.app/api/gist?id=82a76ecbebf81b556a1d20a91a6bd21a&bg_color=00000000)](https://gist.github.com/bGZo/82a76ecbebf81b556a1d20a91a6bd21a)

[![subconverter](https://github-readme-stats.vercel.app/api/pin/?username=tindy2013&repo=subconverter&bg_color=00000000)](https://github.com/tindy2013/subconverter)

[![yacd](https://github-readme-stats.vercel.app/api/pin/?username=haishanh&repo=yacd&bg_color=00000000)](https://github.com/haishanh/yacd)

[![Yacd-meta](https://github-readme-stats.vercel.app/api/pin/?username=MetaCubeX&repo=Yacd-meta&bg_color=00000000)](https://github.com/MetaCubeX/Yacd-meta)


## Samba

Main ref: https://www.youtube.com/watch?v=7Q0mnAT1MRg

## Steam Deck

### Package Management

As long as Steam Deck runs on SteamOS, which is based on Arch Linux. This means you can use the `pacman` package manager to install, update, and manage software packages on your device by default.

But the SteamOS is a read-only system(immutable system by default), so you need to run following at first:

```shell
sudo steamos-readonly disable
```

Then I recommend you to use brew, because it would not be removed by system update, and it has a lot of pre-compiled packages.

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/bgzo/.zshrc
eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
```

You can review more infomation on the [Homebrew website](https://brew.sh/).

### Local Configuration

Based above reason, the following configuration files are stored in user home directory.

#### Proxy

Copy use's service to `~/.config/systemd/user/clash.service`

```shell
cp ./linux/proxies/clash.service ~/.config/systemd/user/clash.service
systemctl --user daemon-reload
systemctl --user start clash
systemctl --user status clash
systemctl --user enable clash
```

#### Samba

Install samba via brew:

```shell
brew install samba
```

Create samba directory:

```shell
mkdir -p /home/deck/.local/var/samba/private/msg.sock
chmod 700 /home/deck/.local/var/samba/private/msg.sock
```

Create samba user(only could use sudo):

```shell
sudo /home/linuxbrew/.linuxbrew/bin/smbpasswd -L -c /home/deck/env/linux/samba/deck.conf -a deck
```

Launch samba server:

```shell
/home/linuxbrew/.linuxbrew/sbin/smbd -i -d 3 -s /home/deck/env/linux/samba/deck.conf
# -i 让 smbd 以前台模式运行（不 daemonize），日志和错误会直接输出到终端，适合调试
# -d 3 设置日志等级为 3，输出较详细的调试信息（等级越高，信息越多）。
# -s 指定使用自定义的配置文件路径，而不是默认的 /etc/samba/smb.conf
```

> [!NOTE]
> Default port 445 cannot be used in my case, which meet following errors when I try to connect with nc:

```shell
nc -vz 192.168.31.29 445
nc: connectx to 192.168.31.29 port 445 (tcp) failed: Connection refused
```

So I change the port to 1445 in `/home/deck/env/linux/samba/deck.conf`.

Then I successfully connect to the port:

```shell
# 启动服务
/home/linuxbrew/.linuxbrew/sbin/smbd -i -d 3 -s /home/deck/env/linux/samba/deck.conf 

# Mac
# Connection to 192.168.31.29 port 1445 [tcp/proxima-lm] succeeded!
nc -vz 192.168.31.29 1445
```

### Link Steam Userdata and Pictures directory

The Steam userdata is stored in:

```shell
/home/deck/.local/share/Steam/userdata/
```

Create link with `/home/deck/userdata` by following command:

```shell
ln -s /home/deck/.local/share/Steam/userdata /home/deck/userdata
```

In the userdata directory, you can find your game save data by your SteamID. Identify your SteamID via [SteamID.io](https://steamid.io/).

I used 3 accounts, US, CN and TR, so I need to create 3 links, considering your situation, and run it or skip.

```shell
# US:467603290
ln -s /home/deck/.local/share/Steam/userdata/467603290/760/remote /home/deck/Pictures/bgzous
# CN:1140098148
ln -s /home/deck/.local/share/Steam/userdata/1140098148/760/remote /home/deck/Pictures/bgzocn
# TR:1420650290
ln -s /home/deck/.local/share/Steam/userdata/1420650290/760/remote /home/deck/Pictures/bgzotr
```

## Troubleshooting

### Found port process:

```shell
sudo lsof -i :445
```

### Found system run log:

```shell
journalctl --user -u smb.service -e --no-pager
```



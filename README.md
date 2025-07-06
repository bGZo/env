This is a repo to backup my scripts. 

The released only package tampermonkey scripts.

## Quick Start

### Usage

Download release package via: https://github.com/bGZo/userscripts/releases.

Then import zip file in tampermonkey.

They should work well.


## Maintenance

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


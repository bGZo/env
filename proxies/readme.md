# Proxies on Unix
This is a repo for reinventing the wheel of cfw


## Quick Start
Rename `.env.bak` to `.env`, fill require params, then run `main.sh`.

```bash
$ chmod +x ./main.sh
$ ./main.sh
```

## Run as systemd
Make sure `ExecStart` on `clash@.service` is corrent[^systemd_clash]. Then run:

```bash
$ sudo cp clash@.service /lib/systemd/system/
$ systemctl daemon-reload
$ systemctl start clash@bgzo
$ systemctl enable clash@bgzo
```


## Enhance todos
- [ ] fetch core/mmdb for lastest .
- [ ] (low) separating function from main function.


## References
[^systemd_clash]: https://github.com/Sitoi/SystemdClash

#--------------------------------+
#                  __ _ _        |
#  _ __  _ __ ___  / _(_) | ___  |
# | '_ \| '__/ _ \| |_| | |/ _ \ |
# | |_) | | | (_) |  _| | |  __/ |
# | .__/|_|  \___/|_| |_|_|\___| |
# |_|                            |
#--------------------------------|

Set-PSReadLineOption -PredictionSource History

function Output-Lan-Ip-Bin {
    $Lan_Ip = netsh interface ip show address "WLAN" | findstr "IP Address" | Select-String -Pattern '([0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*)' | %{ $_.matches.Value }
    # ipconfig | findstr /i "ipv4" | select-object -Skip 1 | select-object -First 1 | Select-String -Pattern '([0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*)' | % { $($_.matches.groups[1]).Value}

    echo "URL_PATH=$Lan_Ip" > C:\Users\15517\bin\lan_ip
    echo "Your Server: http://${Lan_Ip}:4040"
    echo "Output PC Lan IP Successfully."
}

function Netsh-Lan {
    $tmp=cat C:\Users\15517\bin\wsl_ip
    sudo netsh interface portproxy add v4tov4 listenport=4040 listenaddress=* connectport=4040 connectaddress=$tmp protocol=tcp
    echo "Port Forward Set Successfully."
    netsh interface portproxy show all
}

function Start-TTRSS {
    Output-Lan-Ip-Bin
    wsl /mnt/c/Users/15517/bin/wsl-ip.sh

    wsl sudo service docker start

    #via https://docs.docker.com/compose/compose-file/compose-file-v2/
    wsl docker-compose -f /home/bgzocg/ttrss/docker-compose.yml --env /home/bgzocg/ttrss/.env up -d

    Netsh-Lan
}

# via: https://stackoverflow.com/questions/54852529/how-to-run-dockerd-in-the-background-without-logs
# wsl sudo dockerd &> /home/bgzocg/dockerd.log &
# wsl sudo ./dockerd.sh
# TODO: how to create dockerd background with log output? Above is all unavaliable

$envPOWERSHELL_UPDATECHECK = 0
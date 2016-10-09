1. use the wpagui to add a new network:
    sudo apt-get install wpagui

the data will be saved in /etc/wpa_supplicant/wpa_supplicant.conf. The network manager will automatically try to connect to one of these networks if they are available

2) verify if the eduroam network is already in the given .conf file. If yes, it should connect automatically.

If not, add the eduroam account using wpagui and confirm that the data is saved in the .conf file

3) if it doesn't work, try with a simple network (hotspot from the mobile phone)
NOTE: we don't have to call dhclient. Network manager will do that for us.


--


sudo ifdown wlan2
sudo ifup wlan2

alternatively;

sudo ifconfig wlan2 down
sudo ifconfig wlan2 up

--

https://wiki.archlinux.org/index.php/WPA_supplicant

Connecting with wpa_passphrase

This connection method allows quickly connecting to a network whose SSID is already known, making use of wpa_passphrase, a command line tool which generates the minimal configuration needed by wpa_supplicant.


--

(alternative to dhclient)
Finally, you should obtain an IP address as indicated in the #Overview, for example:
# dhcpcd interface
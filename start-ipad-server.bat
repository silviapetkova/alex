@echo off
setlocal
cd /d "%~dp0"

echo.
echo Alex iPad test server
echo ---------------------
echo Keep this window open while testing on your iPad.
echo.
echo Open this on your iPad using this computer's current Wi-Fi IPv4 address:
echo http://YOUR-WIFI-IPV4-ADDRESS:4173/index.html
echo.
echo Do not reuse an old saved IP address. It can change after restart or Wi-Fi reconnect.
echo To find it, run ipconfig in another terminal and use the Wi-Fi IPv4 Address.
echo Example: http://192.168.1.3:4173/index.html
echo.

"C:\Users\MyLenovo\anaconda3\python.exe" serve_alex.py

echo.
echo Server stopped. You can close this window.
pause

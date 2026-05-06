@echo off
setlocal
cd /d "%~dp0"

echo.
echo Alex iPad test server
echo ---------------------
echo Keep this window open while testing on your iPad.
echo.
echo Open this on your iPad if your computer IP is 192.168.1.17:
echo http://192.168.1.17:4173/index.html
echo.
echo If that does not open, run ipconfig in another terminal and use your Wi-Fi IPv4 Address.
echo.

python -m http.server 4173 --bind 0.0.0.0

echo.
echo Server stopped. You can close this window.
pause

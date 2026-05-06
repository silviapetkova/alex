# Alex iPad Testing

## Start The App Server

Double-click `start-ipad-server.bat` in this project folder.

Keep that window open while you test on the iPad.

## Open On iPad

Make sure the iPad and this computer are on the same Wi-Fi.

Open Safari on the iPad and go to:

```text
http://192.168.1.17:4173/index.html
```

If that address does not open, run `ipconfig` on this computer and use the Wi-Fi `IPv4 Address` instead:

```text
http://YOUR-IP-ADDRESS:4173/index.html
```

## What To Test First

- Open the library and a notebook.
- Try drawing with finger or Apple Pencil.
- Switch pen, highlighter, eraser, and paper style.
- Add a text note and a sticker.
- Move and resize an item.
- Add a new page, duplicate a page, and switch pages.
- Try the Export panel.
- Rotate the iPad and check whether the layout still feels comfortable.

## If It Does Not Open

- Check that `start-ipad-server.bat` is still open.
- Accept any Windows Firewall prompt for Python on private networks.
- Confirm both devices are on the same Wi-Fi.
- Try `http://127.0.0.1:4173/index.html` on this computer first.

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import os
import sys


ROOT = Path(__file__).resolve().parent
HOST = "0.0.0.0"
PORT = 4173


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        with (ROOT / "ipad-server.log").open("a", encoding="utf-8") as log:
            log.write("%s - - [%s] %s\n" % (self.client_address[0], self.log_date_time_string(), format % args))


def main():
    os.chdir(ROOT)
    with (ROOT / "ipad-server.err.log").open("a", encoding="utf-8") as err:
      sys.stderr = err
      server = ThreadingHTTPServer((HOST, PORT), QuietHandler)
      server.serve_forever()


if __name__ == "__main__":
    main()

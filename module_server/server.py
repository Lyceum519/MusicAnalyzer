import socketserver
import json, math
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler
from optparse import OptionParser
from urllib.parse import urlparse, parse_qs, parse_qsl, urlsplit

cmp_average = __import__('cmp_average');

class RequestHandler( BaseHTTPRequestHandler ):

    def do_GET( self ):
        request_path = self.path
        param_obj = dict(parse_qsl(urlsplit(request_path).query))
        
        print(param_obj)
        param_path = param_obj.get('path')
        param_filename = param_obj.get('filename')
        
        cmp_average_list = cmp_average.getValue(self, param_path, param_filename)

        print(cmp_average_list)
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        self.end_headers();
        self.wfile.write(bytes(json.dumps({'results': cmp_average_list}), "utf-8"))

    def do_POST( self ):
        request_path = self.path

        print("\n----- Request Start ----->\n")
        print(request_path)
        request_headers = self.headers
        content_length = request_headers.get("Content-Length");

        length = int( content_length ) if content_length else 0

        print(request_headers)
        print("\n—— Body: ——>\n")
        print(self.rfile.read(length))
        print("<—— Request End ——\n")

        self.send_response(200)
        self.end_headers();

    do_PUT = do_POST
    do_DELETE = do_GET

def main():
    port = 9090
    print('Listening on localhost:%s' % port)
    server = HTTPServer(('', port), RequestHandler)
    server.serve_forever()

if __name__ == "__main__":
    parser = OptionParser()
    parser.usage = ("Creates an http-server that will echo out any GET or POST parameters\n" )
    ( options, args ) = parser.parse_args()

    main()
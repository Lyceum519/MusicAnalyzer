import socketserver
import json, math
import sys
from http.server import HTTPServer, BaseHTTPRequestHandler
from optparse import OptionParser
from urllib.parse import urlparse, parse_qs, parse_qsl, urlsplit

# music_analyzer = __import__( 'music_analyzer' );


# class MyTCPHandler(socketserver.BaseRequestHandler):
#     """
#     The RequestHandler class for our server.
#     It is instantiated once per connection to the server, and must
#     override the handle() method to implement communication to the
#     client.
#     """
#     searchEngine = None
#     # def __init__(self, request, client_address, server):
#     #     SocketServer.BaseRequestHandler.__init__(self, request, client_address, server)
#     #     return 

#     def handle(self):
#         # self.request is the TCP socket connected to the client
#         self.data = self.request.recv(8192).strip()
#         print ( "{} wrote:".format(self.client_address[0]) )
#         print ( self.data )

#         if self.searchEngine is None:
#             self.request.sendall(self.data.upper())
#         else:
#             result = self.searchEngine.getRanking( self.data )
#             self.request.sendall( result )
#         # just send back the same data, but upper-cased
        
    
        

# if __name__ == "__main__":
#     HOST, PORT = "localhost", 9090

#     # Create the server, binding to localhost on port 9999
#     server = socketserver.TCPServer((HOST, PORT), MyTCPHandler )
#     # Activate the server; this will keep running until you
#     # interrupt the program with Ctrl-C
#     # set maximum request queue size up
#     server.request_queue_size = 10;
#     server.serve_forever()

cmp_average = __import__('cmp_average');

class RequestHandler( BaseHTTPRequestHandler ):

    def do_GET( self ):
        request_path = self.path

        # print("\n----- Request Start ----->\n")
        # print(request_path)
        # print(self.headers)
        # print("<----- Request End -----\n")

        # param_obj = parse_qs(urlparse(request_path).query, keep_blank_values=True)
        param_obj = dict(parse_qsl(urlsplit(request_path).query))
        
        print(param_obj)
        param_path = param_obj.get('path')
        param_filename = param_obj.get('filename')
        
        cmp_average_list = cmp_average.getValue(self, param_path, param_filename)

        print(cmp_average_list)
        self.send_response(200)
        self.send_header('Content-Type', 'application/json')
        # self.send_header("Set-Cookie", "foo=bar")
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
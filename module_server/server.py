import socketserver
import json, math
import sys

music_analyzer = __import__( 'music_analyzer' );


class MyTCPHandler(socketserver.BaseRequestHandler):
    """
    The RequestHandler class for our server.
    It is instantiated once per connection to the server, and must
    override the handle() method to implement communication to the
    client.
    """
    searchEngine = None
    # def __init__(self, request, client_address, server):
    #     SocketServer.BaseRequestHandler.__init__(self, request, client_address, server)
    #     return 

    def handle(self):
        # self.request is the TCP socket connected to the client
        self.data = self.request.recv(8192).strip()
        print ( "{} wrote:".format(self.client_address[0]) )
        print ( self.data )

        if self.searchEngine is None:
            self.request.sendall(self.data.upper())
        else:
            result = self.searchEngine.getRanking( self.data )
            self.request.sendall( result )
        # just send back the same data, but upper-cased
        
    
        

if __name__ == "__main__":
    HOST, PORT = "localhost", 9090

    # Create the server, binding to localhost on port 9999
    server = socketserver.TCPServer((HOST, PORT), MyTCPHandler )
    # Activate the server; this will keep running until you
    # interrupt the program with Ctrl-C
    # set maximum request queue size up
    server.request_queue_size = 10;
    server.serve_forever()
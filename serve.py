from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import webbrowser, threading
PORT=8080
threading.Timer(.6, lambda:webbrowser.open(f"http://localhost:{PORT}")).start()
print(f"OpenCircuit 3D: http://localhost:{PORT}")
ThreadingHTTPServer(("127.0.0.1",PORT),SimpleHTTPRequestHandler).serve_forever()

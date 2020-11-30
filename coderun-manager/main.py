from __future__ import print_function

import docker
import tarfile
from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def test():
    return "Hello World"

@app.route("/run", methods=["POST"])
def run():
    f = open("code.py","w")
    f.write(request.json['code'])
    f.close()
    file = tarfile.open("code.tar.gz", mode='w')
    try:
        file.add('code.py')
    finally:
        file.close()
    client = docker.from_env()
    # image = client.images.pull('oraclelinux:7') hit a rate limit from dockerhub
    container = client.containers.create('oraclelinux:7',
                                         command='/bin/bash',
                                         tty=True,
                                         stdin_open=True,
                                         auto_remove=False)
    container.start()
    try:
        fasd = open("code.tar.gz","rb")
        fasd.seek(0)
        container.put_archive("/",fasd)
    finally:
        fasd.close()
    exec_log = container.exec_run( "/usr/bin/python code.py",
                                  stdout=True,
                                  stderr=True,
                                  stream=True,
                                  )
    output = b""   
    for line in exec_log[1]:
        print(line)
        output += line
    container.stop()
    container.remove()
    return output

if __name__ == '__main__':
    app.run()
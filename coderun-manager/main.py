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
    if request.json['language'] == 'python':
        f = open("code.py","w")
        f.write(request.json['code'])
        f.close()
    elif request.json['language'] == 'javascript':
        f = open("code.js","w")
        f.write(request.json['code'])
        f.close()

    file = tarfile.open("code.tar.gz", mode='w')
    try:
        if request.json['language'] == 'python':
            file.add('code.py')
        elif request.json['language'] == 'javascript':
            file.add('code.js')
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
    if request.json['language'] == 'python':
        exec_log = container.exec_run( "/usr/bin/python code.py",
                            stdout=True,
                            stderr=True,
                            stream=True,
                            )
    elif request.json['language'] == 'c++':
        # a = container.exec_run( "/usr/bin/yum install --disablerepo=ol7_developer_EPEL nodejs")
        exec_log = container.exec_run( "/usr/bin/node code.js",
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
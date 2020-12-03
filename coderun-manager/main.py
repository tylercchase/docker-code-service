from __future__ import print_function

import docker
import tarfile
from flask import Flask, request
from flask_cors import CORS
import random
import os
import time
app = Flask(__name__)
CORS(app)

@app.route("/")
def test():
    return "Hello World"

@app.route("/run", methods=["POST"])
def run():
    if request.json['language'] != 'python' and request.json['language'] != "cpp":
            return "Invalid language"

    UFID = random.getrandbits(128)
    if request.json['language'] == 'python':
        f = open(f"{UFID}code.py","w")
        f.write(request.json['code'])
        f.close()
    elif request.json['language'] == 'cpp':
        f = open(f"{UFID}code.cpp","w")
        f.write(request.json['code'])
        f.close()

    file = tarfile.open(f"{UFID}code.tar.gz", mode='w')
    try:
        if request.json['language'] == 'python':
            file.add(f"{UFID}code.py")
        elif request.json['language'] == 'cpp':
            file.add(f"{UFID}code.cpp")
    finally:
        file.close()
    client = docker.from_env()
    # image = client.images.pull('oraclelinux:7') hit a rate limit from dockerhub
    if request.json['language'] == 'python':
            container = client.containers.create('python',
                                        command='/bin/bash',
                                        tty=True,
                                        stdin_open=True,
                                        auto_remove=False)
    elif request.json['language'] == 'cpp':
        container = client.containers.create('frolvlad/alpine-gxx',
                                    command="/bin/sh",
                                    tty=False,
                                    stdin_open=True,
                                    auto_remove=False)

    container.start()
    try:
        fasd = open(f"{UFID}code.tar.gz","rb")
        fasd.seek(0)
        container.put_archive("/tmp/",fasd)
    finally:
        fasd.close()
    if request.json['language'] == 'python':
        exec_log = container.exec_run( f"/usr/bin/python /tmp/{UFID}code.py",
                            stdout=True,
                            stderr=True,
                            stream=True,
                            privileged=False,
                            )
    elif request.json['language'] == 'cpp':
        exec_log = container.exec_run( f"/usr/bin/g++ /tmp/{UFID}code.cpp -o /tmp/output",
                                    stdout=True,
                                    stderr=True,
                                    stream=True,
                                    privileged=False,
                                    workdir="/tmp"
                                    )
        time.sleep(1)
        exec_log = container.exec_run( f"./output",
                                    stdout=True,
                                    stderr=True,
                                    stream=True,
                                    workdir="/tmp"
                                    )
    output = b""   
    for line in exec_log[1]:
        print(line)
        output += line
    container.stop()
    container.remove()

    if request.json['language'] == 'python':
        os.remove(f"{UFID}code.py")
    elif request.json['language'] == 'cpp':
        os.remove(f"{UFID}code.cpp")
    os.remove(f"{UFID}code.tar.gz")
    return output

if __name__ == '__main__':
    app.run()
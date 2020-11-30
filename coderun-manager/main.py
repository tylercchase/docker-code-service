from __future__ import print_function

import docker
import tarfile
if __name__ == '__main__':
    f = open("code.py","w")
    f.write("print('hi')")
    f.close()
    file = tarfile.open("code.tar.gz", mode='w')
    try:
        file.add('code.py')
    finally:
        file.close()
    client = docker.from_env()
    image = client.images.pull('oraclelinux:7')
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
    for line in exec_log[1]:
        print(line)
    container.stop()
    container.remove()

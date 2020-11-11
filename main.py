import docker
client = docker.from_env()
code = """print('Hi')"""
# container = client.containers.run("ubuntu",f"echo -n {code} > file.py && python3 file.py", detach=True)
container = client.containers.run("ubuntu",detach=True)
output = container.exec_run("""echo -n "print('Hi')" > /home/file.py && python3 /home/file.py""",workdir="/home/")
print(output)
# containers = client.containers.list()
# container = client.containers.get(containers[0].id)
print(container.logs())
for line in container.logs(stream=True):
    print(line)
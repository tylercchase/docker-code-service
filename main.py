import docker
client = docker.from_env()
client.containers.run("hello-world", detach=True)
containers = client.containers.list()
container = client.containers.get(containers[0].id)
print(container.logs())
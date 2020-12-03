
# Installing docker
 1. Download docker
    ```
    sudo apt install docker.io
    ```

 2. Add docker group
    Note: This group has privledges similar to root user. [Read more](https://docs.docker.com/engine/security/#docker-daemon-attack-surface)
    ```
    sudo groupadd docker
    ```
    Add user to docker group
    ```
    sudo usermod -a6 docker $user
    ```

    Now to test docker is working run 
    ```
    docker run hello-world
    ```
    This will get the hello world image from dockerhub and run it.
 3. Install requirements
 ```
 pip3 install -r requirements.txt
 ```
 4. Install docker images
 ```
 docker pull python
 docker pull frolvlad/alpine-gxx
 ```
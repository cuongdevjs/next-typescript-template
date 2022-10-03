# How to run docker
```
docker-compose -f docker-compose-local.yml --project-name nodejs_appsunproperty build --no-cache base
docker-compose -f docker-compose-local.yml --project-name nodejs_appsunproperty build --no-cache nodejs
docker-compose -f docker-compose-local.yml --project-name nodejs_appsunproperty up -d
```

# How to access
```
http://localhost:20002/
```


## How to build and deploy on aks (Using on macos or linux)
* Install helm (v3.8.2) - https://helm.sh/docs/intro/install/
* Install docker (latest) - https://docs.docker.com/compose/install/
* Install docker-compose (1.29.2)

```
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /bin/docker-compose
sudo chmod +x /bin/docker-compose
```

* Run commandline by makefile for dev

```
# If the base image have not been exited yet
make build_base

# build image and push code to acr
make build_and_push_code_dev

# Install service on aks if it have not yet been installed
make install_dev

# Upgrade the helm chart to apply new docker image
## Change image.tag value to the new value that you have just built for the new docker image (From latest to the new value)
values.yaml file
image:
  repository:  xxxxxxxx
  #pullPolicy: IfNotPresent
  pullPolicy: Always
  # Overrides the image tag whose default is the chart appVersion.
  tag: "CHANGED_VALUE"


## Deploy on aks with the new docker image
make deploy_dev

## Access the docker container directly
make access_dev
```



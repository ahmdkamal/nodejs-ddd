DOCKER_CONTAINER = docker exec -it musala

start:
	echo "Starting the building"
	docker-compose up -d
	echo "Building finished"

testing:
	${DOCKER_CONTAINER} npm rum test

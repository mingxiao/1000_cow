clear_database_container:
	docker container stop db || true
	docker container rm db || true

build_database_image:
	docker build -t database ./database_app

run_database_container:
	docker run -d --name=db -p3306:3306 -e MYSQL_ROOT_PASSWORD=Admin123 database

start_database_container: clear_database_container build_database_image run_database_container

build_seeder_image:
	docker build -t seeder ./data_seeder

run_seeder_container:
	# docker run -d --name=seed_db -e MYSQL_USER=root -e MYSQL_PASSWORD=Admin123 -e MYSQL_HOST=db -e MYSQL_DB=1000_cows seeder
	docker run -d --name=seed_db -e MYSQL_USER=root -e MYSQL_PASSWORD=Admin123 -e MYSQL_HOST=172.17.0.2 -e MYSQL_DB=1000_cows seeder

start_seeder_container: clear_seeder_container build_seeder_image run_seeder_container
clear_seeder_container:
	docker container stop seed_db || true
	docker container rm seed_db || true
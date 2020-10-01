build_database_image:
	cp -r ./1000_cow_data/processed ./database_app
	docker build -t database ./database_app
	rm -r ./database_app/processed

run_database_image:
	docker run -d --name=db -p3306:3306 -e MYSQL_ROOT_PASSWORD=Admin123 database

build_seeder_image:
	docker build -t seeder ./data_seeder
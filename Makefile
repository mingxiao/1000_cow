build_database_image:
	cp -r ./1000_cow_data/processed ./dockerfiles/database
	docker build -t database ./dockerfiles/database
	rm -r ./dockerfiles/database/processed
build_database_image:
	cp -r ./1000_cow_data/processed ./database_app
	docker build -t database ./database_app
	rm -r ./database_app/processed
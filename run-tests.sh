
docker-compose -f docker-compose-test.yml up --build -d

docker-compose -f docker-compose-test.yml logs -f test | while read line
do
  if [[ $line == *"swapi-service_test_1 exited with code 0"* ]]; then
    echo "Test service exited with code 0. Shutting down Docker..."
    docker-compose -f docker-compose-test.yml down
  fi
done
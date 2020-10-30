# Restaurant Search App #

GET 
localhost:3000/restaurant/city?q=Jakarta

curl --location --request GET 'localhost:3000/restaurant/city?q=Jakarta' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiaW1vQGVtYWlsLmNvbSIsImlhdCI6MTYwMzk4MzY1M30.j7B2ftM4GnqgiyPlYgJ2xHfBcXx3V_qjlKtuPm2ZARE' \
--header 'Accept: application/json' \
--header 'user-key: 512cc60ac633050569a2ce89134911df

GET
localhost:3000/restaurant/establishment

curl --location --request GET 'localhost:3000/restaurant/establishment' \
--header 'user-key: 512cc60ac633050569a2ce89134911df' \
--data-urlencode 'city_id=74'

GET
localhost:3000/restaurant/search

curl --location --request GET 'localhost:3000/restaurant/search' \
--header 'Accept: application/json' \
--header 'user-key: 512cc60ac633050569a2ce89134911df' \
--data-urlencode 'entity_id=74' \
--data-urlencode 'entity_type=city' \
--data-urlencode 'establishment_type=20'

GET
localhost:3000/weather

curl --location --request GET 'localhost:3000/weather' \
--header 'token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJiaW1vQGVtYWlsLmNvbSIsImlhdCI6MTYwMzk4MzY1M30.j7B2ftM4GnqgiyPlYgJ2xHfBcXx3V_qjlKtuPm2ZARE' \
--data-urlencode 'q=Jakarta,ID'
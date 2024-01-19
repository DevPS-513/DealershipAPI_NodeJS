## Abstract

This code implments the dealership and review server from the Coursera Cloud Capston project, but locally because the IBM service is being decomissioned

I commented out the API authentication step, but you can create your own .env file

example would be send GET to http://127.0.0.1:5000/reviews in POSTMAN

and you will receive the list of reviews. PATCH,DELETE, ect were also implemented so it behaves exactly like the IBM cloud would in the course

[
    {
        "value": {
            "rev": "1-6d3a316e140863cdb147048888d26051"
        },
        "doc": {
            "_id": "310b6145c664ca5c3770ef71485fb8df",
            "_rev": "1-6d3a316e140863cdb147048888d26051",
            "id": 1,
            "name": "Berkly Shepley",
            "dealership": "15",
            "review": "Total grid-enabled service-desk",
            "purchase": "true",
            "purchase_date": "07/11/2020",
            "car_make": "Audi",
            "car_model": "A6",
            "car_year": 2010,
            "sentiment": "Not Defined",
            "another": "Not Defined"
        },
        "_id": "65aab3f21d5f56b65c66c40c",
        "id": "310b6145c664ca5c3770ef71485fb8df",
        "key": "310b6145c664ca5c3770ef71485fb8df",
        "__v": 0
    },

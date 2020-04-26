# backend
Нужно настроить firebase, включить в нем storage.  
Сгенерируй ключ json, сохрани в корне проекта как firebase-key.json
В .env добавь `BUCKET_NAME=icinema-f11bd`, где icinema-f11bd -- имя твоего проекта

# Admin showtime routes
```
{
    "success": false,
    "status": "overlap",
    // с каким шоутайм проблемы
    "showtime": {
        "time": "2020-04-19T16:33:41.839Z",
        "hall": "5e92c612ea88031fd4a19366",
        "film": "5e7cdb6ebbed5622d471f96c"
    },
    "badShowtimes": [
        {
            "_id": "5e9c19bc39fd862c380c0c7c",
            "time": "2020-04-19T15:33:41.839Z",
            "hall": "5e92c612ea88031fd4a19366",
            "film": "5e7cdb6ebbed5622d471f96c",
            "showtimeEndTime": "2020-04-19T17:03:41.839Z",
            // какая проблема: либо шоутайм кончается, либо шоутайм начинается
            "showtimeEnds": true,
            "showtimeStarts": false
        },
        {
            "_id": "5e9c19be39fd862c380c0c7d",
            "time": "2020-04-19T17:33:41.839Z",
            "hall": "5e92c612ea88031fd4a19366",
            "film": "5e7cdb6ebbed5622d471f96c",
            "showtimeEndTime": "2020-04-19T19:03:41.839Z",
            "showtimeEnds": false,
            "showtimeStarts": true
        }
    ]
}
```

# reports
```
query:
* date from
* date to 
в ответе 
[
  [ ],
  [ ]
]
```

# Client Routes
```
get / calendar
{
  dates: [
    '2020-01-01',
    ... 
  ]
}
-----------------
  get / showtime ? from = 2020 - 19 - 03
{
  films: {
    12: { },
    13: { },
  },
  halls: {
    csa: {
      cells: [1, 2, 5]
      structure: [[]]
    },
    abc: {
      cells: [2, 3]
      structure: [[]]
    },
  },
  hallCells: {
    '1': {
      price
      name
    },
    '2': {

    }
  },
  showtimes: [
    {
      date: '2020-19-03',
      showtimes: {
        'fim1': [
          {
            _id: '123',
            time: ts ms
            hall: '123',
            taken: ...,
          },
        ],
        'fim2': [
          {
            time: ts ms
            hall: '13131'
          },
        ]
      }
    },
    {
      date: '2020-20-03',
      showtimes: {

      }
    },
    {
      date: '2020-25-03',
      showtimes: {

      }
    }
  ]
}

---------
  POST / startPayment
{
  showtime: '_id',
    seats: [{
      row: 12,
      cell: 3,
    }, {
      row: 12,
      cell: 4,
    }]
}
блок сидений на 5 минут
setTimeout
--------------
  POST / submitPayment
{
  firstname,
    lastName,
    phone,
    transId,
    showtime
}
добавляем в tickets
возвращаем ticket
блочим место перманентно
и отключаем timeout
```
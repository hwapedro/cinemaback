# backend
Нужно настроить firebase, включить в нем storage.  
Сгенерируй ключ json, сохрани в корне проекта как firebase-key.json
В .env добавь `BUCKET_NAME=icinema-f11bd`, где icinema-f11bd -- имя твоего проекта

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
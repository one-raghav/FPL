var frisby = require('frisby');
var config = require('../config.json');
var baseUrl = config["url"];

frisby.create('games api test')
  .get(baseUrl + "/games/1")
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    "status": "success"
  })
  .expectJSONTypes({
    "status": String,
    "data": Object
  })
  .toss();


frisby.create('games api test')
  .get(baseUrl + "/games/1")
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    "status": "success"
  })
  .expectJSONTypes({
    "status": String,
    "data": Object
  })
  .toss();

var token = "";


// authenticate for token
frisby.create('games api test')
  .addHeader("Accept", "application/json")
  .post(baseUrl + "/users/authenticate", {
    "user": "admin",
    "password": "testPass1"
  })
  .expectStatus(200)
  .expectHeaderContains('content-type', 'application/json')
  .expectJSON({
    "status": "success"
  })
  .afterJSON(function(resp) {
    token = resp["data"];

    // create a team
    frisby.create('games api test')
      .addHeader("Accept", "application/json")
      .addHeader('x-access-token', token)
      .post(baseUrl + "/games", {
        "teamAId": "1",
        "teamBId": "2",
        "city": "NewYork",
        "date": "2016-10-10",
        "tournamentId": 1
      })
      .expectStatus(200)
      .expectHeaderContains('content-type', 'application/json')
      .expectJSON({
        "status": "success"
      })
      .expectJSONTypes({
        "status": String,
        "data": Object
      })
      .inspectJSON()
      .afterJSON(function(response) {

        var data = response["data"];

        var id = data["_id"];

        // read the team
        frisby.create('games api test')
          .get(baseUrl + "/games/" + id)
          .expectStatus(200)
          .expectHeaderContains('content-type', 'application/json')
          .expectJSON({
            "status": "success"
          })
          .expectJSONTypes({
            "status": String,
            "data": Object
          })
          .inspectJSON()
          .afterJSON(function(resp) {

            // delete the json
            frisby.create('games api test')
              .addHeader("Accept", "application/json")
              .addHeader('x-access-token', token)
              .delete(baseUrl + "/games/" + id)
              .expectStatus(200)
              .expectHeaderContains('content-type', 'application/json')
              .expectJSON({
                "status": "success"
              })
              .expectJSONTypes({
                "status": String,
                "message": String
              })
              .inspectJSON()
              .afterJSON(function(resp) {
                frisby.create('games api test')
                  .get(baseUrl + "/games/" + id)
                  .expectStatus(200)
                  .expectHeaderContains('content-type', 'application/json')
                  .expectJSON({
                    "status": "success"
                  })
                  .expectJSONTypes({
                    "status": String,
                    "data": Object
                  })
                  .inspectJSON()
              })
              .toss();

          })
          .toss();


      })
      .toss();


  })
  .inspectJSON()
  .toss();
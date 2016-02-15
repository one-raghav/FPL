var frisby = require('frisby');
var config = require('../config.json');
var baseUrl = config["url"];

frisby.create('teams api test')
  .get(baseUrl + "/teams/1")
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


frisby.create('teams api test')
  .get(baseUrl + "/teams/1")
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
frisby.create('teams api test')
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
    frisby.create('teams api test')
      .addHeader("Accept", "application/json")
      .addHeader('x-access-token', token)
      .post(baseUrl + "/teams", {
        "name": "test team",
        "city": "test city",
        "players": ["player 1", "player 2"],
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
        frisby.create('teams api test')
          .get(baseUrl + "/teams/" + id)
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
            frisby.create('teams api test')
              .addHeader("Accept", "application/json")
              .addHeader('x-access-token', token)
              .delete(baseUrl + "/teams/" + id)
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
                frisby.create('teams api test')
                  .get(baseUrl + "/teams/" + id)
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
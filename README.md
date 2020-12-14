# DebtPanel Developer Test

## Introduction

Welcome to the DebtPanel Developer Test repository. The aim of this test is to assess skills of incoming
developers by using a quick (but close to real world) rapid development test.

We estimate that this test should take no longer than an hour to complete and by having test built into
this repositiory developers can be sure they have correct results before submitting a completed article.

## Requirements

To run this test locally you will only need

- Node.JS version 8 or above
- Git command line client
- An editor / IDE of your choice

## What does the test need to do

The test simulates a reasonable 'real world' requirement to...

- Create a custom Express.JS server
- Connect to a remote API
- Handle the results from the API
- Apply some basic logic to the results
- Return the results of the logic as an API response

## What is this repository based on

This repository has been generated from a template that we use regularly within the company to generate APIs in a microservice environment. As such it is built to allow rapid and lightweight launching of these microservices with Express.JS servers and basic middleware included and ready to go.

# Lets get down to business...

## Remote API

`https://developer-test-service-2vfxwolfiq-nw.a.run.app`

We have a remote API running for you to connect to (the address of which is above), this remote API has the following routes exposed...

| Route       | Method | Purpose                                                               |
| ----------- | ------ | --------------------------------------------------------------------- |
| /addresses  | `GET`  | Gives a list of all accessible addresses you can search for.          |
| / creditors | `GET`  | Gives a list of all accessible creditors you can search for.          |
| /addresses  | `POST` | Allows you to filter the addresses and search for an address.         |
| /creditors  | `POST` | Allows you to filter the creditors and search for an appropriate list |

## Searching for addresses

Searching for addresses requires a number of fields to search correctly, however all fields are optional. To do a search you should provide `address1`, `address2` and `postcode` as a JSON object in the body of the request.

```curl
curl --location --request POST 'https://developer-test-service-2vfxwolfiq-nw.a.run.app/addresses' \
--header 'Content-Type: application/json' \
--data-raw '{
    "address1": "1 Newhouse Lane",
    "address2": "",
    "postcode": "NH1 7EQ"
}'
```

In response you will get back will be an array of addresses with the following structure..

| Key        | Type   | Description                                                       |
| ---------- | ------ | ----------------------------------------------------------------- |
| `id`       | string | The unique ID of this address (required for the creditors search) |
| `address1` | string | Confirmation of address line 1                                    |
| `address2` | string | Confirmation of address line 2                                    |
| `postcode` | string | Confirmation of the postcode                                      |

### Example JSON response

```json
[
  {
    "id": "7ff1ef2c-3063-588f-a977-0ce52b27f32b",
    "address1": "1 Newhouse Lane",
    "address2": "",
    "postcode": "NH1 7EQ"
  }
]
```

## Searching for Creditors

Searching for creditors is easy and only requires a `surname` and `addressId` to be provided in a JSON object in the body of the request.

```curl
curl --location --request POST 'https://developer-test-service-2vfxwolfiq-nw.a.run.app/creditors' \
--header 'Content-Type: application/json' \
--data-raw '{
    "surname": "Rogers",
    "addressId": "e29ba3b7-d101-5224-8ef2-8d81ac1f8cac"
}'
```

In response you will get back will be an array of creditors with the following structure..

| Key         | Type    | Description                                                                                                                                                         |
| ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`        | string  | The ID of the creditor for this person                                                                                                                              |
| `surname`   | string  | The surname of the person                                                                                                                                           |
| `addressID` | string  | The address ID found from searching for an address                                                                                                                  |
| `name`      | string  | The name of the creditor                                                                                                                                            |
| `value`     | integer | The pence value that is owed to this creditor **Please Note:** This value is in pence, so to get the Pound value you will need to divide by 100. E.G. 5499 = £54.99 |
| `secured`   | boolean | If the credit is secured on a property or other item                                                                                                                |

### Example JSON response

```json
[
  {
    "id": "78d9db05-59f1-5211-9499-4ad00716af04",
    "surname": "Elliott",
    "addressId": "93acd9d6-2051-53e3-9637-52d6a61fa23c",
    "name": "New Egg Ltd",
    "value": 17599,
    "secured": false
  },
  {
    "id": "65d7b826-ed62-5d4b-a36a-d617be2bc8d3",
    "surname": "Elliott",
    "addressId": "93acd9d6-2051-53e3-9637-52d6a61fa23c",
    "name": "Yorkshire Bank Mortgages",
    "value": 11786427,
    "secured": true
  },
  {
    "id": "2018b38f-c48f-5ce3-a3ff-fe86cd74266b",
    "surname": "Elliott",
    "addressId": "93acd9d6-2051-53e3-9637-52d6a61fa23c",
    "name": "Camper Van Builds Ltd",
    "value": 345691,
    "secured": false
  }
]
```

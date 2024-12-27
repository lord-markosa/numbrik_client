# Server API Response details

## delete story

```
{
    "message": "Story deleted successfully"
}

```

## get chat messages.json

```
{
    "messages": [
        {
            "timestamp": 1724562652430,
            "content": "Hemlo dear!",
            "sentBy1": true
        },
        {
            "timestamp": 1724563032347,
            "content": "Hemlo dear!",
            "sentBy1": true
        }
    ]
}
```

## new chat

```
{
    "chatId": "a461265e-8dad-49f9-9201-38da020b02d9",
    "partnerName": "testuser"
}
```

## like story

```
{
    "message": "Story liked successfully"
}
```

## post story

```
{
    "content": "New test story 3",
    "createdAt": "2024-09-07T13:36:16.550Z",
    "createdBy": "ee269329-8e8b-4c16-8863-8cd44b996633",
    "id": "ea1dbaf4-65b8-47d2-9895-1848d069ccbc",
    "_rid": "B-JBAPQd8AcJAAAAAAAAAA==",
    "_self": "dbs/B-JBAA==/colls/B-JBAPQd8Ac=/docs/B-JBAPQd8AcJAAAAAAAAAA==/",
    "_etag": "\"010059d9-0000-0300-0000-66dc56d00000\"",
    "_attachments": "attachments/",
    "_ts": 1725716176
}
```

## send message

```
{
    "timestamp": 1725736717344,
    "content": "test message 3",
    "sentBy1": true
}

```

## get user, login user, register user

```
{
    "token": "qwertyuiop",
    "username": "testuser",
    "storyList": [
        {
            "content": "Test story new",
            "createdAt": "2024-08-24T12:42:22.862Z",
            "id": "05437148-94a8-4a36-a7e9-b86c2552bb81",
            "_rid": "B-JBAPQd8AcGAAAAAAAAAA==",
            "_self": "dbs/B-JBAA==/colls/B-JBAPQd8Ac=/docs/B-JBAPQd8AcGAAAAAAAAAA==/",
            "_etag": "\"08003362-0000-0300-0000-66c9d52e0000\"",
            "_attachments": "attachments/",
            "_ts": 1724503342
        },
        {
            "content": "New Test story2_ re-edit 2!!",
            "createdAt": "2024-08-24T13:08:22.685Z",
            "createdBy": "ee269329-8e8b-4c16-8863-8cd44b996633",
            "id": "b4d90dbc-69ab-4bd7-b1fc-30bd1acef8b5",
            "_rid": "B-JBAPQd8AcIAAAAAAAAAA==",
            "_self": "dbs/B-JBAA==/colls/B-JBAPQd8Ac=/docs/B-JBAPQd8AcIAAAAAAAAAA==/",
            "_etag": "\"08003e6d-0000-0300-0000-66c9db4a0000\"",
            "_attachments": "attachments/",
            "_ts": 1724504906
        },
        {
            "content": "test post_edit 2",
            "createdAt": "2024-10-29T13:05:11.037Z",
            "createdBy": "testuser",
            "id": "556f94b7-2beb-4650-a45f-9061b0ced6d1",
            "_rid": "B-JBAPQd8AcMAAAAAAAAAA==",
            "_self": "dbs/B-JBAA==/colls/B-JBAPQd8Ac=/docs/B-JBAPQd8AcMAAAAAAAAAA==/",
            "_etag": "\"100014b2-0000-0300-0000-6720dd870000\"",
            "_attachments": "attachments/",
            "_ts": 1730207111
        }
    ],
    "likedStories": [
        "a8c38e37-7a67-4f98-ac6e-736cb19e75a7",
        "05437148-94a8-4a36-a7e9-b86c2552bb81",
        "ea1dbaf4-65b8-47d2-9895-1848d069ccbc",
        "ea1dbaf4-65b8-47d2-9895-1848d069ccbc",
        "b4d90dbc-69ab-4bd7-b1fc-30bd1acef8b5",
        "8149c90e-6b84-4a58-89c5-fbe19f0006c2",
        "b79626e2-bc8f-42e8-8c82-17ac2a99da41"
    ],
    "chats": [
        {
            "chatId": "dd43f0ed-4a54-44de-a283-2f34adecae65",
            "partnerName": "testuser2",
            "isUser1": true
        },
        {
            "chatId": "ebae858d-e7f4-4e64-aa3d-ed68779d443d",
            "partnerName": "testuser5",
            "isUser1": true
        }
    ],
    "negotiation": {
        "token": "qwertyuiop",
        "baseUrl": "qwertyuiop",
        "url": "qwertyuiop"
    }
}
```

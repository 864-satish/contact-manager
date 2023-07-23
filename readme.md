# Fluxkart.com

## About
Nodejs application to manages/identify contacts.

### Features
- Add new contacts
- Update existing contacts
- Create profiles against existing contacts

### Application uses
- Express js
- Typescript
- Typeorm
- Postgres SQL database

### Steps to setup application
1. npm install
2. npm run start

## API
URL: http://localhost:3000/identify
<br>
body: {
    "phoneNumber": "121331331",
    "email": "samplemail@gmail.org"
}
<br>
response: {
    "contact": {
        "primaryContatctId": "1",
        "emails": ["samplemail@gmail.org"],
        "phoneNumbers": ["121331331"],
        "secondaryContactIds": ["2"]
    }
}


## TODO: 
host on public platform to share endpoint
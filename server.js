const express = require('express');
const app = express();
const port = 8000;
const {faker} = require('@faker-js/faker');

// function that returns a random/fake {Company} object
const createRandomCompany = () => {
    const newRandomCompany = {
        _id: faker.string.uuid(),
        name: faker.company.name(),
        address: {
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            zipCode: faker.location.zipCode(),
            country: 'US'
        },
    };

    return newRandomCompany;
};

// function that returns a random/fake {User} object
const createRandomUser = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.firstName();
    const email = faker.internet.email({firstName, lastName, provider: 'outlook.com', allowSpecialCharacters: false})

    const newRandomUser = {
        _id: faker.string.uuid(),
        firstName,
        lastName,
        email,
        password: faker.internet.password(),
        phoneNumber: faker.phone.number('###-###-####')
    };

    return newRandomUser;
};


// -------------- ROUTES --------------

// api route that returns a random Company
app.get('/api/companies/new', (req, res) => {
    res.json( createRandomCompany() );
});

// api route that returns a random User
app.get('/api/users/new', (req, res) => {
    res.json( createRandomUser() );
});

// api route that returns a random Company & User
app.get('/api/company/user', (req, res) => {
    res.json( [ createRandomCompany(), createRandomUser() ] );
});



app.listen( port, () => console.log(`Listening on port: ${port}`) );
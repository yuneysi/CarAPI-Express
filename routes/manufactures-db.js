const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client')


router.post('/all', async (req, res) => {
    const client = new PrismaClient();
    client.$connect();
    const result = [];
    const newManufacturers = req.body;
    console.log(newManufacturers);
    newManufacturers.forEach( async(manufacturer) =>{
        const newManufacturer = await client.manufacturer.create({
            data: {
                ...manufacturer
            },
        });

        result.push(newManufacturer);
    });

    await client.$disconnect();
    res.json(result).send();
});

router.post('/', async (req, res) => {
    const client = new PrismaClient();
    client.$connect();

    const newManufacturer = {name, foundingYear, headquarters} = req.body;
    console.log(newManufacturer);
    const data = {
        name,
        foundingYear: parseInt(foundingYear),
        headquarters
    }
    const result = await client.manufacturer.create({
        data: {
            ...newManufacturer
        },
    })
    await client.$disconnect();
    res.json(result).send();
});


router.get('/', async (req, res, next) => {

    const client = new PrismaClient();
    client.$connect();
    const manufacturers = await client.manufacturer.findMany();
    await client.$disconnect();

    const contentType = req.headers['content-type'];
    if(contentType !== 'application/json'){
        res.render('manufacturer', {
            title: 'CarAPI manufacturers',
            manufacturers
        })
    }else{
        res.json(manufacturers).send();
    }
});

router.delete('/', async (req, res) => {
    const client = new PrismaClient();
    client.$connect();
    const deleted = await client.manufacturer.deleteMany({});
    res.status(200).send("Deleted");
});

router.get('/', async (req, res, next) => {

    const client = new PrismaClient();
    client.$connect();
    const manufacturers = await client.manufacturer.findMany();
    await client.$disconnect();
    res.json(manufacturers).send();
});

router.get('/:manufacturerId', async (req, res) => {
    const client = new PrismaClient();
    client.$connect();
    const manufacturer = await client.manufacturer.findUnique({
        where: {
            id: parseInt(req.params.manufacturerId),
        }
    });
    if (!manufacturer)
        return res.status(404).send('Manufacturer not found');

    res.json(manufacturer).send();
});

router.put('/:manufacturerId', async (req, res, next) => {
    const client = new PrismaClient();
    client.$connect();
    let manufacturer = await client.manufacturer.findUnique({
        where: {
            id: parseInt(req.params.manufacturerId),
        }
    });
    // If not found, throw a 404 error
    if (!manufacturer) {
        return res.status(404).send('Manufacturer not found');
    }

    console.log(manufacturer);

    const update = {name, foundingYear, headquarters} = req.body;
    manufacturer = {
        ...update
    }

    const updatedManufacturer = await client.manufacturer.update({
        where: {
            id: parseInt(req.params.manufacturerId),
        },
        data: manufacturer,
    });

    res.json(updatedManufacturer).send();
});

module.exports = router;

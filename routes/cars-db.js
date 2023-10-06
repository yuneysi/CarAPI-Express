const express = require('express');
const router = express.Router();
const {PrismaClient} = require('@prisma/client')

router.post('/all', async(req, res) =>{
    const client = new PrismaClient();
    client.$connect();
    const cars = req.body;
    const result = [];
    console.log(cars);
    const newCar = cars.forEach(async (car) => {
        await client.car.create({
            data: {
                ...car
            }
        });
        result.push(newCar);
        console.log(`car ${car.model} created!~`);

    });
    await client.$disconnect();

    if(contentType !== 'application/json'){
        res.render('foundCars', {
            title: 'CarAPI cars',
            cars
        })
    }else{
        res.json(result).send();
    }
});

router.post('/', async (req, res) => {
    const client = new PrismaClient();
    client.$connect();

    const newCar = {model, yearBuilt, price} = req.body;
    console.log(newCar);
    const data = {
        model,
        yearBuilt: parseInt(yearBuilt),
        price
    }
    const result = await client.car.create({
        data: {
            ...newCar
        },
    })
    await client.$disconnect();
    if(contentType !== 'application/json'){
        res.render('foundCars', {
            title: 'CarAPI cars',
            heading: "",
            result
        })
    }else{
        res.json(result).send();
    }
});

router.delete('/', async (req, res) => {
    const client = new PrismaClient();
    client.$connect();

    const result = await client.car.deleteMany({})
    await client.$disconnect();
    res.status(200).send("Deleted");
});


router.get('/', async (req, res, next) => {
    const client = new PrismaClient();
    client.$connect();
    const cars = await client.car.findMany();
    await client.$disconnect();

    const contentType = req.headers['content-type'];
    if(contentType !== 'application/json'){
        res.render('cars', {
            title: 'CarAPI cars',
            cars
        })
    }else{
        res.json(cars).send();
    }
});

router.get('/:carId', async (req, res) => {
    const client = new PrismaClient();
    client.$connect();
    const car = await client.car.findUnique({
        where: {
            id: parseInt(req.params.carId),
        }
    });
    if (!car)
        return res.status(404).send('Car not found');

    res.json(car).send();
});

router.put('/:carId', async (req, res, next) => {
    const client = new PrismaClient();
    client.$connect();
    let car = await client.car.findUnique({
        where: {
            id: parseInt(req.params.carId),
        }
    });
    // If not found, throw a 404 error
    if (!car) {
        return res.status(404).send('Car not found');
    }

    console.log(car);

    const update = {model, price, yearBuilt} = req.body;
    car = {
        ...update
    }

    const updatedCar = await client.car.update({
        where: {
            id: parseInt(req.params.carId),
        },
        data: car,
    });

    res.json(updatedCar).send();
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client')


router.post('/', async (req, res) => {
    const client = new PrismaClient();
    client.$connect();
    const newCar = {model, yearBuilt, price} = req.body;
    const newCars = dataFromBody.map( car => {
        return {
            model: car.model,
            yearBuilt:parseInt(car.yearBuilt),
            price: car.price
        }
    })

    for (const newCar1 of newCars) {
        console.log(newCar1);
        const data = {
            model,
            yearBuilt:parseInt(yearBuilt),
            price
        }
        console.log(data);


        const result = await client.car.create({
            data:{
                ...newCar1
            },
        })
    }



    await client.$disconnect();
    res.json(result).send();
});

router.get('/', async (req, res, next) => {

    const client = new PrismaClient();
    client.$connect();
    const cars =  await client.manufacturer.findMany();
    await client.$disconnect();
    res.json(cars).send();
});

router.get('/:carId', async (req, res) => {
    const client = new PrismaClient();
    client.$connect();
    const car =  await client.car.findUnique({
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
    let car =  await client.car.findUnique({
        where: {
            id: parseInt(req.params.carId),
        }
    });
    // If not found, throw a 404 error
    if(!car) {
        return res.status(404).send('Car not found');
    }

    console.log(car);

    const update = { model, price, yearBuilt } = req.body;
    car = {
        ...update
    }

    const updatedCar =  await client.car.update({
        where: {
            id: parseInt(req.params.carId),
        },
        data: car,
    });

    res.json(updatedCar).send();
});

module.exports = router;

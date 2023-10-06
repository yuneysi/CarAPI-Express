const express = require('express');
const {readFile, writeFile} = require("../public/helpers/file-handler");
const router = express.Router();
router.get('/', async (req, res, next) => {
    const data= await readFile();
    res.json(data).send();
});

router.get('/:manufacturerId', async (req, res, next) => {
    const data= await readFile();
    const item =  data.find(item => item.name.toLowerCase() == req.params.manufacturerId.toLowerCase());
    const manufacture = item ? item : [];
    res.json(manufacture).send();

});

router.get('/:manufacturerId/car', async (req, res, next) => {
    const data= await readFile();
    const item= data.find(item => item.name.toLowerCase() === req.params.manufacturerId.toLowerCase());
    const cars= item ? item.cars : [];
    res.json(cars).send();
});


router.post('/', async (req, res) => {
    const manufacturers = await readFile();

    manufacturers.push(req.body);
    await writeFile(manufacturers);

    res.json(req.body).send();
});

router.post('/:manufacturerId/car', async (req, res) => {
    const manufacturers = await readFile();
    const manufacturer = manufacturers.find(item => item.name.toLowerCase() === req.params.manufacturerId.toLowerCase());

    if (!manufacturer){
        return res.status(404).send('Manufacturer not found');
    }

    manufacturers.find(m => m.name === manufacturer.name).cars.push(req.body);
    await writeFile(manufacturers);

    res.json(req.body).send();
});

module.exports = router;

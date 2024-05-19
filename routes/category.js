const {getAllCategory, getCategoryById} = require('../repositories/categoriesRepository');
const { Router } = require('express');
const router = Router();

// get all categories
router.get('/', (req, res, next) =>{
    getAllCategory().then((allItems) => {
        res.json(allItems);
    }).catch((err) => {
        res.json(err);
    });
});


// get a specific category
router.get('/:id', (req, res, next) =>{
    const categoryId = req.params.id;
    getCategoryById(categoryId).then((category) => {
        res.json(category);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;
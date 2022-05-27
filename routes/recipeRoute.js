const express = require('express')
const { getAllRecipeName, getRecipeDetails, createNewRecipe, updateRecipe } = require('../controllers/recipeController')

const router = express.Router()

router.route('/').get(getAllRecipeName).post(createNewRecipe).put(updateRecipe)
router.route('/details/:name').get(getRecipeDetails)


module.exports = router
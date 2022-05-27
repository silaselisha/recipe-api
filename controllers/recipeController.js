const fs = require('fs')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const data = fs.readFileSync(`${__dirname}../../data/data.json`, 'utf-8')


exports.getAllRecipeName = catchAsync(async (req, res, next) => {
        const recipeData = JSON.parse(data)
        const { recipes } = recipeData
        
        const recipesNamesArray = []
        recipes.forEach((item) => {
            recipesNamesArray.push(item.name)
        })

        res.status(200).json({
            status: 'success',
            data: {
                recipesNames: recipesNamesArray
            }
        })
})

exports.getRecipeDetails = catchAsync(async (req, res, next) => {
        const recipeData = JSON.parse(data)
        const { recipes } = recipeData

        const recipeName = req.params.name
        const recipe = recipes.find(item => item.name === recipeName)

        if(!recipe) {
            return next(new AppError(`${recipeName} couldn't be found in our recipes list`, 200))
        }

        const { ingredients, instructions } = recipe
        
        res.status(200).json({
            status: 'success', 
            details: {
                ingredients,
                numSteps: instructions.length
            }
        })
})

exports.createNewRecipe = catchAsync(async (req, res, next) => {
    const postData = req.body

    const { recipes } = JSON.parse(data)
    recipes.push(postData)

    const recipe = recipes.find(item => item.name === postData.name)
    
    if(recipe) {
        return next(new AppError(`${recipe.name} already exists please add a new recipe in the menu`, 400))
    }

    fs.writeFile(`${__dirname}../../data/data.json`, JSON.stringify({recipes: recipes}),  (err) => {
        console.log('Successfully posted')
      
        res.status(201).json({
            status: 'success'
        })
    })
})

exports.updateRecipe = catchAsync(async (req, res, next) => {
    const { recipes } = JSON.parse(data)
    const recipe = req.body
    let item = recipes.find(item => item.name === recipe.name)

    if(!item) {
        return next(new AppError(`${recipe.name} does not exists please add a new recipe in the menu`, 404))
    }
    
    const index = recipes.indexOf(item)
    recipes.splice(index, 1, recipe)
    
    fs.writeFile(`${__dirname}../../data/data.json`, JSON.stringify({recipes: recipes}), 'utf-8', (err) => {
        console.log(recipes)

        res.status(204).json({
            status: 'success'
        })
    })

})
// Javascript Azure Function Docs Info
//https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2
//https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings?tabs=javascript
//https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-table-output?tabs=javascript

module.exports = async function (context, req, existingRecipeEntities) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.bindings.recipeEntities = [];
    // recipeEntities = [];

    if (req.body && req.body.food && req.body.url) {

        //Check for existing recipe
        let exists = false
        for(let i=0;i<existingRecipeEntities.length;i++){
            context.log("existingRecipeEntities[i].RowKey: ",existingRecipeEntities[i].RowKey)
            context.log("`r_${req.body.food}`: ",`r_${req.body.food}`)

            if(existingRecipeEntities[i].RowKey == `r_${req.body.food}`){
                exists = true
                context.log('set exists:',exists);
            }
        }
        if (exists){
            context.res = {
                status: 400, /* Defaults to 200 */
                body: { error: "That food already exists, please send a different food" },
                headers: {
                    'Content-Type': 'application/json'
                }
            };
        }else{
            new_recipe = {
                PartitionKey: "recipes",
                RowKey: `r_${req.body.food}`,
                url: `${req.body.url}`
            }
    
            context.bindings.recipeEntities.push(new_recipe);
    
            context.res = {
                status: 200, /* Defaults to 200 */
                headers: {
                    'Content-Type': 'application/json'
                },
                body: { newRecipe: new_recipe }
            };
        }
    } else {
        context.res = {
            status: 400, /* Defaults to 200 */
            body: { error: "Please send 'food' and 'url' in body" },
            headers: {
                'Content-Type': 'application/json'
            }
        };
    }
    context.done();


}
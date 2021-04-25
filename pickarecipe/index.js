// Javascript Azure Function Docs Info
//https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-node?tabs=v2
//https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings?tabs=javascript
//https://docs.microsoft.com/en-us/azure/azure-functions/functions-bindings-storage-table-input?tabs=javascript#usage


module.exports = async function (context, req, recipeEntities) {
    context.log('JavaScript HTTP trigger function processed a request.');

    //EX Math.floor(Math.random() * 5); -> random int from 0-4
    i = Math.floor(Math.random() * recipeEntities.length); 
    
    const recipe = recipeEntities[i]

    context.res = {
        status: 200, /* Defaults to 200 */
        body: recipe,
        headers: {
            'Content-Type': 'application/json'
        }
    };
}
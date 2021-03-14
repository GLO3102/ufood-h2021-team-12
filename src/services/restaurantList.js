export async function getRestaurantList(){

    const URL = `http://ufoodapi.herokuapp.com/unsecure/restaurants`
    const response = await fetch(URL)
    const json = await response.json()
    
    return json
    
    }
    export default {
        getForecastList,
    }
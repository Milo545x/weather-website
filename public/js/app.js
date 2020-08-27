const button = document.querySelector('#button')
const inputValue = document.querySelector('input')
const Forecast = document.querySelector('p1')
const paragraphsOne = document.querySelector('#p1')
const paragraphsTwo = document.querySelector('#p2')
const paragraphsThree = document.querySelector('#p3')
const paragraphsFour = document.querySelector('#p4')


paragraphsOne.textContent = 'Loading...'
paragraphsTwo.textContent = ''
paragraphsThree.textContent = ''
paragraphsFour.textContent = ''

button.addEventListener('click', search)
function search(e){
    e.preventDefault()
    const location = inputValue.value
    fetch('/weather?address='+ location).then((response) =>{
        response.json().then((data) =>{
            if(!location){
                paragraphsOne.textContent = 'Enter an address'
            }else if(data.error){
                paragraphsOne.textContent = data.error
            }else{
                paragraphsOne.textContent =  data.forecast
                paragraphsTwo.textContent = data.Location 
            }
        })
    })

}



// fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibmdhaG1pbG8iLCJhIjoiY2tlOHBqY3VsMGxiMDJ5cHhneXNqd2NoeSJ9.v0ckkGZgQYlxrxxDLdf0xQ&limit=1')
// .then((response) =>{
//     response.json().then((data)=>{
//         const long = data.features[0].center[0]
//         const lat = data.features[0].center[1]
//         // console.log(long + ' , ' +  lat)
//         fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+ lat + '&lon=' + long +'&lang=fr&units=metric&appid=39dcdeb7faef1c06ac25de1e4e146a74').then((res)=>{
//             res.json().then((data2) =>{
//                 const temperature = data2.current.temp
//                 console.log('temperature in' ,address ,' is',temperature, ' degrees')
//             })
//         })
//     })
// })

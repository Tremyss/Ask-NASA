console.log('Hello NASA');

const apodData = async () => {
    let apodResponse = fetch ("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    
    let apodData = await (await apodResponse).json();
    console.log(apodData);
    let dataOutput = document.querySelector(".container");
    let todaysDate = document.createElement("p");
    todaysDate.setAttribute("id", "currentDate");
    todaysDate.innerText = apodData.date
    
  
}
apodData();
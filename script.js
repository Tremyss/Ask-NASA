console.log('Hello NASA');

const renderData = (apodData) => {
    let dataOutput = document.querySelector(".container");

    let todaysDate = document.createElement("p");
    todaysDate.setAttribute("id", "currentDate");
    todaysDate.innerText = apodData.date;
    dataOutput.append(todaysDate);  

    let todaysPicture = document.createElement("img");
    todaysPicture.setAttribute("id", "currentPicture");
    todaysPicture.setAttribute("src", apodData.url);
    todaysPicture.setAttribute("style", "max-width: 100%");
    dataOutput.append(todaysPicture);
    
    let todaysTitle = document.createElement("p");
    todaysTitle.setAttribute("id", "currentTitle");
    todaysTitle.innerText = apodData.title;
    dataOutput.append(todaysTitle);

    let todaysExplanation = document.createElement("p");
    todaysExplanation.setAttribute("id", "currentExplanation");
    todaysExplanation.innerHTML = `<strong>Explanation: </strong> ${apodData.explanation}`;
    dataOutput.append(todaysExplanation);
}

// * 2 féle megoldás is van. Az 1.-nél csak egy promise-t kapok vissza, ezt be kell várni mielőtt parsolnám (ezért van 2x await)
// * A 2. megoldás intuitívabb, ahol előbb bevárom a fetch-et (így a változó neve response, nem promise) majd bevárom a parsolás eredményét

/* const getApodData = async () => {
    let promiseOfApodResponse = fetch ("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
    let apodData = await (await promiseOfApodResponse).json();
    renderData(apodData);   
} */

const getApodData = async () => {
    let apodResponse = await fetch ("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")                                   
    let apodData = await (apodResponse).json();
    renderData(apodData);   
}

getApodData();


const renderOldData = (oldData) => {
    let oldPicture = document.getElementById("currentPicture");
    oldPicture.setAttribute("src", oldData.url)
    //  todo ilyen elven ki lehet cserélni a többi adatot is
}

const getOldData = async () => {
    let chosenDate = ""
    chosenDate = "2018-06-28"
    let oldResponse = await fetch (`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${chosenDate}`);
    let oldData = await (oldResponse).json();
    console.log(oldData);
    renderOldData(oldData);    
}
getOldData();

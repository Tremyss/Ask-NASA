const renderData = (apodData) => {
    let dataOutput = document.querySelector(".container");

    let todaysDate = document.createElement("p");
    todaysDate.setAttribute("id", "currentDate");
    todaysDate.innerText = apodData.date;
    dataOutput.append(todaysDate);


    /*  let todaysPicture = document.createElement("img");
     todaysPicture.setAttribute("id", "currentPicture");
     todaysPicture.setAttribute("src", apodData.url);
     todaysPicture.setAttribute("style", "max-width: 100%");
     dataOutput.append(todaysPicture); */

    let todaysPicture = document.createElement("img");
    todaysPicture.setAttribute("id", "currentPicture");
    todaysPicture.setAttribute("style", "display: none");
    dataOutput.append(todaysPicture);

    let todaysVideo = document.createElement("iframe");
    todaysVideo.setAttribute("id", "currentVideo");
    todaysVideo.setAttribute("style", "display: none");
    dataOutput.append(todaysVideo);

    if (apodData.media_type === "image") {
        todaysPicture.setAttribute("src", apodData.url);
        todaysPicture.setAttribute("style", "width: 80%");
        todaysPicture.setAttribute("style", "display: block");
    } else {
        todaysVideo.setAttribute("src", apodData.url);
        todaysVideo.setAttribute("style", "width: 80%");
        todaysVideo.setAttribute("style", "display: block");
    }

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
    let apodResponse = await fetch("https://api.nasa.gov/planetary/apod?api_key=EjkKLw4I8MwPj41lFz5ZHlgW8kPTqhcKmHSmA8RX")
    let apodData = await (apodResponse).json();
    renderData(apodData);
    // console.log(apodData.media_type);    
}
getApodData();

// ! REPLACE TODAYS DATA WITH DATA FROM SELECTED DATE

const renderOldData = (oldData) => {
    /* let oldPicture = document.getElementById("currentPicture");
    oldPicture.setAttribute("src", oldData.url); */

    // todo azért nem működött, mert a currentVideo nem volt létrehozva (fent nem az else ág futott le, mert a mai kép egy img, nem video)
    // todo mind2 divet létrehozni előre és a tartalomtól függően csak a megjelenítése változik
    if (oldData.media_type === "image") {
        console.log("this is an image")
        // todaysVideo.setAttribute("style", "display: none");
        let oldPicture = document.getElementById("currentPicture");
        oldPicture.setAttribute("src", oldData.url);
    } else {
        console.log("this is a video")
        // todaysPicture.setAttribute("style", "display: none");
        let oldVideo = document.getElementById("currentVideo");
        oldVideo.setAttribute("src", oldData.url);
    }

    //  ? ilyen elven ki lehet cserélni a többi adatot is:
    let oldDate = document.getElementById("currentDate");
    oldDate.innerText = dateHolder.value;

    let oldTitle = document.getElementById("currentTitle")
    oldTitle.innerText = oldData.title

    let oldExplanation = document.getElementById("currentExplanation")
    oldExplanation.innerHTML = `<strong>Explanation: </strong> ${oldData.explanation}`;
}

const getOldData = async (chosenDateParam) => {
    let oldResponse = await fetch(`https://api.nasa.gov/planetary/apod?api_key=EjkKLw4I8MwPj41lFz5ZHlgW8kPTqhcKmHSmA8RX&date=${chosenDateParam}`);
    let oldData = await (oldResponse).json();
    console.log(oldData);
    renderOldData(oldData);
}

// ! DATE PICKER

// ? setup max date as today
datePicker.max = new Date().toLocaleDateString('en-ca');
// ? set first displayed date as today
datePicker.value = new Date().toLocaleDateString('en-ca');

// * Ki lehet tenni global változóba is, de a getOldData+param egy másik megoldás
//  let chosenDate = ""

let dateHolder = document.getElementById("datePicker")
const getSelectedDate = (event) => {
    // * ld 101. sor kommentje
    //  chosenDate = dateHolder.value

    // ? run the gerOldData here, so it runs when we make a change in the date picker  
    // * a getOldData fg nem a chosenDate-et kapja meg, hanem direktben a dateHolder.value-t.
    // * a getOldData fg a 87. sorban kap egy paramétert. Ezt a paramétert csak itt, a meghívásnál adom oda neki, a 109. sorban.
    getOldData(dateHolder.value);
}
dateHolder.addEventListener('change', getSelectedDate);


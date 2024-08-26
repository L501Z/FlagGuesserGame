
let countryName ="Brazil";
let score = 0;
let gametimer;
let totalCorrect = 0;
let possibleCorrect = 0;
let count;


function newGame(seconds){

    if (seconds == null || seconds == "" || !seconds || seconds === "NaN"){
        seconds = parseInt(document.getElementById("timer").innerHTML);
    }
    seconds = parseInt(document.getElementById("timer").innerHTML);
    //clearing the screen for a new game

    clearInterval(gametimer);
    timer(seconds);
    clearScreen();
    score = 0;
    totalCorrect = 0;
    possibleCorrect = 0;

    nextFlag();
}

function clearScreen(){
    document.getElementById("timer").innerHTML = "";
    document.getElementById("randomarray").innerHTML = "";
    document.getElementById("correctanswer").innerHTML = "";
    document.getElementById("score").innerHTML = "0";
    document.getElementById("percent").style.visibility = "hidden";
    document.getElementById("randomarray").style.visibility = "hidden";
    document.getElementById("nextflag").style.visibility = "visible";
    document.getElementById("totalcorrect").style.visibility = "hidden";
}

function timer(seconds){
    gametimer = setInterval(function(){
        document.getElementById("timer").innerHTML = seconds;
        --seconds;
        if (seconds < 0){
            //time up
            clearInterval(gametimer);
            document.getElementById("timer").innerHTML = "TIME UP";
            gameOver();
        }
    }, 1000);

}

function getRandomInt(max) {
    
    //random array inside the html is not ideal to store the data but since there is no private infomation it is fine

    let randomNumber = Math.floor(Math.random() * max);

    let nums = document.getElementById("randomarray").innerHTML;
    nums = nums.split(" ");

    if (nums.includes(randomNumber)){
        getRandomInt(201);
    }


    if (randomNumber <= 9){
        randomNumber = "00"+randomNumber;

        return randomNumber
    }
    else if (randomNumber <=99){
        return randomNumber = "0"+randomNumber
    }
    else{
        return randomNumber = randomNumber.toString();
    }
  }


function nextFlag(){

    //uses a random number that keys to a png of countries flag, 'randNum' stores an array to see if the country has come up before
    possibleCorrect = possibleCorrect + 1;
    //formatting vars to work with the key
    let randomNumber = getRandomInt(201);

    let numbers = document.getElementById("randomarray").innerHTML;
    numbers = numbers + " " + randomNumber;
    document.getElementById("randomarray").innerHTML = numbers;
    
    try{
    fetch("/flags/key.txt")
    .then(response => response.text())
    .then(contents => {

        //turning response of http request into string so we can format and keymatch to produce anotherflag

        let key = contents;
        let keyArray = contents.split("\n").join().replace("\r", "").split(",");
        countryName = keyArray.indexOf(randomNumber.toString()) + 1;
        countryName = keyArray[countryName];

        if (countryName === "001"){
            nextFlag();
        }

        console.log(randomNumber,countryName);
        document.getElementById("flagPic").src="/flags/"+randomNumber+countryName+".png";
        

    });
    } catch (exception){
        console.log("Not working sorry")
    }

    count = 0;



}

function guessButton(countryFlag){

    let userVal = document.getElementById("countryText").value;
    document.getElementById("countryText").value = "";
    let score = parseInt(document.getElementById("score").innerHTML);

    document.getElementById("correctanswer").innerHTML = "The correct answer was " + countryFlag;
    //'.trim' is necessary here

    if (countryFlag.toLowerCase().trim() === userVal.toLowerCase().trim()){
        score = score + 100;
        totalCorrect = totalCorrect+1;
        document.getElementById("score").innerHTML = score;
    }

    nextFlag();

}

function thirtySeconds(){
    document.getElementById("timer").innerHTML = "30";
    document.getElementById("startGame").style.visibility = "visible";
    reset("30");
}

function sixtySeconds(){
    document.getElementById("timer").innerHTML = "60";
    document.getElementById("startGame").style.visibility = "visible";
    reset("60");
}

function ninetySeconds(){
    document.getElementById("timer").innerHTML = "90";
    document.getElementById("startGame").style.visibility = "visible";
    reset("90");
}

function reset(seconds){
    document.getElementById("startGame").style.visibility = "visible";
    if (!seconds){
        seconds = "60";
    }  

    clearInterval(gametimer);

    clearScreen();
    document.getElementById("timer").innerHTML = seconds;  
}


function gameOver(){
    document.getElementById("startGame").style.visibility = "hidden";
    document.getElementById("nextflag").style.visibility = "hidden";
    let percentage = totalCorrect / possibleCorrect;
    percentage = Math.round(percentage * 100);

    document.getElementById("totalcorrect").innerHTML = "You got "+ totalCorrect+" out of "+ possibleCorrect + " possible. ";
    document.getElementById("percent").innerHTML =  percentage+ "%";
    
    document.getElementById("totalcorrect").style.visibility = "visible";
    document.getElementById("percent").style.visibility = "visible";

    console.log(possibleCorrect, totalCorrect);



}


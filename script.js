let btn = document.querySelector("#btn");
//display the tip here
const output = document.querySelector(".output");
//hall of fame tips 
const hallOfFameTips = document.querySelector(".hall-of-fame-tips");
//total tips
const totalCafeTips = document.querySelector(".total-tips");
//the input element
const cost = document.querySelector("input");
//tip per person
const tipPerPerson = document.querySelector(".tip-per-person")

//initialize the tip array
let tips = []

//THE FUNCTIONS
//function that adds up and displays all the tips from a tip array
function totalTips(newTip) {
  tips.push(+newTip)
  const totalTip = tips.reduce((tip, sum) => sum += tip)
  totalCafeTips.innerHTML = `<h3 style="color: red; margin-bottom: 10px;">Total Tips:<span> $${totalTip.toFixed(2)}</span></h3>`
  return totalTip
}

//function to display tips: Tips having 4 or more digits go to the hall of fame and get added to the tip array.  Any tip less than four digits get added to the tip array only.  Hall of Fame shoppers whose tip is 3000 or greater get a 10% discount.
//Problem:  This function is huge.  How do I break it into manageable pieces?
function tipHallOfFame() {
  const tip = getATip()
  const regex = /^\d{4,}.?\d{1,2}$/
  if (regex.test(tip)) {
    if (tip >= 3000) {
      const discountedTip = (tip * 90 / 100).toFixed(2)
      hallOfFameTips.innerHTML += `<li>$${discountedTip}</li>`
      totalTips(discountedTip)
      output.innerHTML = `<h1>You should tip $${discountedTip} on $${cost.value}. Your discount is <span style="color: red">$${tip - discountedTip}</span>.</h1>`;
      getOnePersonsTip(discountedTip)
    } else if (tip < 3000 || tip >= 1000) {
      hallOfFameTips.innerHTML += `<li>$${tip}</li>`
      totalTips(tip)
      output.innerHTML = `<h1>You should tip $${tip} on $${cost.value}. Almost got a discount!</h1>`;
      getOnePersonsTip(tip)
    }
  } else {
    totalCafeTips.innerHTML += `<li>$${tip}</li>`
    totalTips(tip)
    output.innerHTML = `<h1>You should tip $${tip} on $${cost.value}. You don't go in the hall of fame.</h1>`;
    getOnePersonsTip(tip)
  }
}

//function to split the bill amongst the people in your party
//Problem:  How do you validate an empty prompt/an invalid character?
function getOnePersonsTip(tipValue){
  let numberOfPeopleInYourParty = Number(prompt("How many people are in your party?"))
  while (numberOfPeopleInYourParty < 0) {
    numberOfPeopleInYourParty = Number(prompt("How many people are in your party?"))
    continue
  }
  const tipPerIndividual = (tipValue / numberOfPeopleInYourParty).toFixed(2)
  tipPerPerson.innerHTML = `<h3 style="color: red; margin-bottom: 10px;">Tip Per Person is $${tipPerIndividual} for a(n) ${numberOfPeopleInYourParty} person party.</h3>`
}

//function to get a tip and display its value
//ask the user how much they want to tip instead of fixing the tip amount
//if the user enters an invalid response, keep prompting the user for a valid response
//Problem:  If the user enters anything but a number, how do I handle that?
function getATip() {
  let yourTipAmount = Number(prompt("Please enter a whole number tip percent"))
  while (yourTipAmount < 0) {
    yourTipAmount = Number(prompt("Please enter a whole number tip amount"))
    continue
  }
  const tip = (cost.value * yourTipAmount / 100).toFixed(2);
  output.innerHTML = `<h1>You should tip $${tip} on $${cost.value}.</h1>`;
  return tip
}


//the event listener
btn.addEventListener("click", function() {
  //Check the validity of the entered value.  Return a message to enter a valid amount if the test fails - check zeroes are allowed, a blank value is not allowed, white space before or after the value does not affect the value.  Check that zero or more numbers allowed, followed by a decimal point that may or may not be there, and no more than two digits after the decimal point.
  const re = /^((\d*)+)((\.?\d{1,2})|(.\d{1,2}))$/
  if (re.test(cost.value)) {
    tipHallOfFame()
  } else {
    output.innerHTML = `<h1>Please enter a valid amount!</h1>`;
  }

  //clear the input after you get a tip
  cost.value = ''

  //show the tip 
  output.style.display = "block";

})

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const dropdowns=document.querySelectorAll(".dropdown select");
const button=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");

const updateExchangeRate= async ()=>{
    let amount=document.querySelector(".amount input")
    let amtVal = parseFloat(amount.value);
    console.log(amtVal);
    if(isNaN(amtVal) || amtVal < 1){
        amtVal = 1;
        amount.value="1";
    }
    console.log(fromCurr.value,toCurr.value);
    const URL=`${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}/.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[toCurr.value.toLowerCase()];
    console.log(rate);
    
    let finalAmount=amtval*rate;
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`
}

for(let select of dropdowns){
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if(select.name==="from" && currCode==="USD"){
            newOption.selected="selected";
        }
        else if(select.name==="to" && currCode==="INR"){
          newOption.selected="selected";
        }
        select.append(newOption);
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });
    }
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    console.log(countryCode);
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;

}

button.addEventListener("click", async (evt)=>{
    evt.preventDefault();
   updateExchangeRate();
});
window.addEventListener("load", () => {
    updateExchangeRate();
  });
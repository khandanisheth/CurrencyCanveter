const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let dropdowns = document.querySelectorAll(".dropdawn select");// div to select
let btn = document.querySelector("button");
let fromCurr = document.querySelector(".from select");// div to from
let toCurr = document.querySelector(".to select");// div to to

const msg = document.querySelector(".msg");//div
for (let select of dropdowns) {
    // First clear existing options (optional)
    select.innerHTML = "";
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;// 👈 Ye visible text hota hai
        newOption.value = currCode;// 👈 Ye value hoti hai (form submission mein jati hai)

        // Set default selections
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        } else if (select.name === "to" && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }
    // ✅ Add change event listener only once per select
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

// 🔁 Update Flag function (currently console logging)
let updateFlag = (element) => {
    let currCode = element.value;
    // console.log(currCode); // you can later use this to change flag image
    let countryCode = countryList[currCode];
    // console.log(countryCode);
    let newimg = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let imgchange = element.parentElement.querySelector("img");
    imgchange.src = newimg;
};
const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = "1";
    }

    const URL = `https://open.er-api.com/v6/latest/${fromCurr.value}`;
    console.log(URL);
    try {
        let response = await fetch(URL);
        let data = await response.json();
        // console.log(toCurr.value);
        let rate = data.rates[toCurr.value];
        // console.log(rate);

        let finalAmount = amtVal * rate;
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate.";
        console.error("API Error:", error);
    }
};





btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});
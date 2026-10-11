const fromDropDown = document.getElementById("from-currency-select");
const toDropDown = document.getElementById("to-currency-select");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convert-button");

// Populate Dropdowns with the currencies array
currencies.forEach((currency) => {
    const option1 = document.createElement("option");
    option1.value = currency;
    option1.text = currency;
    fromDropDown.add(option1);

    const option2 = document.createElement("option");
    option2.value = currency;
    option2.text = currency;
    toDropDown.add(option2);
})

// Set defaults

fromDropDown.value = "GHS";
toDropDown.value = "USD";

const convertCurrency = () => {
    const amountInput = document.querySelector("#amount").value;
    const fromCurrency = fromDropDown.value
    const toCurrency = toDropDown.value

    if (amountInput.length !== 0 && amountInput > 0) {
        result.innerHTML = "Fetching exchange rate..."

        // Try primary API endpoint first, fallback to open endpoint if blocked
        const primaryApi = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`
        const fallbackApi = `https://open.er-api.com/v6/latest/${fromCurrency}`;

        // Making a request to the currency API using fetch and handling the response
        fetch(primaryApi)
            .then((resp) => {
                if (!resp.ok) throw new Error("Primary API failed")
                    return resp.json()
            })
            .catch(() => fetch(fallbackApi).then((resp) => resp.json()))
            .then((data) => {
                const toExchangeRate = data.rates ? data.rates[toCurrency] :data.conversion_rates[toCurrency]
                const convertedAmount = amountInput * toExchangeRate

                result.innerHTML = `${amountInput} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`
            })
            .catch((error) => {
                console.error("Fetch Error:", error)
                result.innerHTML = "Error loading rates. Ensure network connect."
            })
    } else {
        alert("Please enter a valid amount")
    }
};

convertBtn.addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);

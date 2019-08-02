const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#forecast')
const messageTwo = document.querySelector('#location')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const address = search.value

    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""

    fetch(`http://localhost:3000/weather?address=${address}`)
        .then((response) => {
            response.json()
                .then((data) => {
                    if (data.error) {
                        messageOne.textContent = data.error
                    } else {
                        messageOne.textContent = data.forecast
                        messageTwo.textContent = data.location
                    }
                })
        })
})
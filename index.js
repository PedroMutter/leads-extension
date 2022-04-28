let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("tab-btn")

// Get the values in myLeads key from localStorage into an array
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))

if (leadsFromLocalStorage) {            // Checks if leadsFromLocalStorage has been declared with something
    myLeads = leadsFromLocalStorage     // Add the leads from localStorage to myLeads[]
    render(myLeads)                       // Calls function to make those localStorage values be rendered
}

inputBtn.addEventListener("click", function() {
    myLeads.push(inputEl.value)                                 // Push the value submited to myLeads[]
    inputEl.value = ""                                          // Reset input value after submiting
    localStorage.setItem("myLeads", JSON.stringify(myLeads))    // Stores myLeads[] (stringfied) into localStorage
    render(myLeads)                                             // Render the submited value
})

tabBtn.addEventListener("click",function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {     // Get the active and selected window tab
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})

deleteBtn.addEventListener("dblclick", function() {     // Clear localStorage, myLeads[] and then render it again (empty)
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {            // For loop to add all values from an array into listItems string
        listItems +=                                    // listItems stores an HTML formated string to all values in the array
        `
        <li>
            <a target='_blank' href='${leads[i]}'>    
                ${leads[i]}
            </a>
        </li>
        `
    }
    ulEl.innerHTML = listItems          // Add the HTML code in listItems to the ul in the HTML document
}
const URL = "https://jsonplaceholder.typicode.com/users/"

//Post request
const options = {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
        name: "Kurt Wonnegut"
    })
}

fetch(URL, options)
    .then(r => r.json())  //No error handling is this demo
    .then(data => {
        //This is where you can use the result
        console.log(data)
    })

const button = document.getElementById("load-data-btn")
button.onclick = loadData

const  tblbtn = document.getElementById("load-tbl")
tblbtn.onclick = createTable

//GET Request
function loadData() {
    fetch(URL)
        .then(function (r) {
            if (!r.ok) {
                return Promise.reject("UPPPS", r.status)
            }
            return r.json()  //Returns a promise
        })
        .then(names => {
            //Her kan vi arbejde med data
            const ul = names.map(name => `
    <li>
      ${name.name}
    </li>
    `)
            const ulAsStr = ul.join("")
            document.getElementById("my-ul").innerHTML = ulAsStr
            console.log(names)


        })
        .catch(e => {
            console.error(e)
        })
    console.log("Who was called first")
}


function createTable() {
    fetch(URL)
        .then(function (r) {
            if (!r.ok) {
                return Promise.reject("Fail")
            }
            return r.json()
        })
         .then(user => {
           const tableRows = user.map ( user => `
           <tr>
           <td>${user.id}</td>
           <td>${user.name}</td>
           <td>${user.email}</td>
           <td>${user.address.street}</td>
           <td>${user.address.city}</td>
</tr>
           
           `).join("\n")

  document.getElementById("tbl-body").innerHTML = tableRows
         }  ) }

function getUser() {
    const id = document.getElementById("input-id").value
    document.getElementById("get-user-content").style.display = "block"

    fetch(URL + id)
        .then(res => {if (!res.ok){return Promise.reject("user not found")}
        return res.json()})
        .then(user => {
            const content = document.getElementById("get-user-content")
            document.getElementById("name").innerText = user.name
            document.getElementById("email").innerText = user.email
        })


}

/*
function createTable(usersToMap){
const tableRows = usersToMap.map(user => `
<tr>
<td>${user.name}</td>
<td>${user.email}</td>

</tr>
`).join("\n")
    document.getElementById("tbl-body").innerHTML = tableRows
}*/

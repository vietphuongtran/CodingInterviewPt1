//Planning:
//1. get the data from the API
//2. wireframes
//3. project it onto the screen

//the getJSON will take in 2 arguments
//the url where you get the JSON from
//the callback method to see whether the url works
var getJSON = function(url, callback) {
    //send request to the URL
    var xhr = new XMLHttpRequest();
    //specify the  GET method
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        //if the connection is ok get the response, else return the status
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};
getJSON('http://sandbox.bittsdevelopment.com/code1/fetchemployees.php',
    function(err, data) {
        //if the error is not null call out something is wrong
        if (err !== null) {
            alert('Something went wrong: ' + err);
        } else {
            //make sure we get all the data from the api first
            console.log(data);
            console.log(data[1].employeefname); //should return Gary
            //project the data onto the screen
            //Step 1: do 1 first then get the pattern
            //Step 2: use the pattern to put it in a loop
            var name= document.getElementById("name");
            var employeebio = document.getElementById("employeebio");
            var employeeroles = document.getElementById("employeeroles");
            console.log("name");
            name.innerHTML = data[1].employeefname + ' ' + data[1].employeelname;
            if (data[1].employeeisfeatured === "1") {
                var crown = document.getElementById("crown");
                crown.innerHTML = "&#128081";
            } else {
                crown.innerHTML = "";
            }
            employeebio.innerHTML = data[1].employeebio;
            //console.log(data[1].roles.rolename)
            //should be roles[0].rolename because roles is an array
            employeeroles.innerHTML = data[1].roles[0].rolename;
            employeeroles.style.background = data[1].roles[0].rolecolor

        }
    });
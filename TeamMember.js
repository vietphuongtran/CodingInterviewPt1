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
            //How to return the length of an Json object
            console.log(Object.keys(data).length);
            console.log(data[1].employeefname); //should return Gary
            //project the data onto the screen
            //Step 1: get Gary first to learn the pattern
            // var name= document.getElementById("name");
            // var employeebio = document.getElementById("employeebio");
            // var employeeroles = document.getElementById("employeeroles");
            // var employee = document.getElementById("employee");
            // var crown = document.getElementById("crown");
            // console.log("name");
            // name.innerHTML = data[1].employeefname + ' ' + data[1].employeelname;
            // //calculate is
            // // function isEmployeeFeatured (point) {
            // //         if (point === "1") {
            // //             crown.innerHTML = "&#128081";
            // //         } else {
            // //             crown.innerHTML = "";
            // //         }
            // //     return crown.innerHTML;
            // // }
            //
            // employeebio.innerHTML = data[1].employeebio;
            // //console.log(data[1].roles.rolename)
            // //should be roles[0].rolename because roles is an array
            // employeeroles.innerHTML = data[1].roles[0].rolename;
            // employeeroles.style.background = data[1].roles[0].rolecolor;
            //Step 2: use the pattern to put it in a loop
            for (var i = 1; i <= Object.keys(data).length; i++) {
                function isEmployeeFeatured (point) {
                    if (point === "1") {
                        return "&#128081";
                    } else {
                        return "";
                    }
                }
                var img = "http://sandbox.bittsdevelopment.com/code1/employeepics/" + data[i].employeeid +".jpg";
                employee.innerHTML +=
                    "<div class= grid-item>" +
                        //"<div>" + "<img src=http://sandbox.bittsdevelopment.com/code1/employeepics/1.jpg" + ">" + "</div>" +
                        "<div class=picture><img class='employeeimg' src=" + img + " alt='Image of employee' /></div>" +
                        "<div>"+ data[i].employeefname + ' ' + data[i].employeelname +
                        "<span>" + isEmployeeFeatured (data[i].employeeisfeatured) + "</span>" + "</div>" +
                        "<div>"+ data[i].employeebio + "</div>" +
                        "<span class = roleColor>" + data[i].roles[0].rolename + "</span>" +
                    "</div>";
                var roleColor = document.getElementsByClassName("roleColor");
                var employeeimg = document.getElementsByClassName("employeeimg");
                roleColor[i-1].style.background = data[i].roles[0].rolecolor;
            }
        }
    });
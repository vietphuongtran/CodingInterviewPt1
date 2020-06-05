//Planning:
//1. get the data from the API
//2. wireframes
//3. project it onto the screen

//the getJSON will take in 2 arguments
//the url where you get the JSON from
//the callback method to see whether the url works
//callback will take 2 arguments
//the status and the response which will be a json object

// var getJSON = function(url, callback) {
//     //send request to the URL
//     var xhr = new XMLHttpRequest();
//     //specify the  GET method
//     xhr.open('GET', url, true);
//     //getback the Json file
//     xhr.responseType = 'json';
//     xhr.onload = function() {
//         var status = xhr.status;
//         //if the connection is ok get the response, else return the status
//         if (status === 200) {
//             callback(null, xhr.response);
//         } else {
//             callback(status, xhr.response);
//         }
//     };
//     xhr.send();
// };
//To do: use the fetch function to get JSON for code refactor
fetch('http://sandbox.bittsdevelopment.com/code1/fetchemployees.php')
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                for (var i = 1; i <= Object.keys(data).length; i++) {
                    //testing .map method with rolename and rolecolor
                    // var rolename = data[i].roles.map(function (role) {
                    //     return role.rolename;
                    // });
                    // var rolecolor = data[i].roles.map(function (role){
                    //     return role.rolecolor;
                    // })
                    function isEmployeeFeatured(point) {
                        if (point === "1") {
                            return "&#128081";
                        } else {
                            return "";
                        }
                    }
                    //get the image
                    var img = "http://sandbox.bittsdevelopment.com/code1/employeepics/" + data[i].employeeid + ".jpg";
                    employee.innerHTML +=
                        "<div class= flexitem>" +
                        "<div><img class='employeeimg' src=" + img + " alt='Image of employee' />" +
                        "<span>" + isEmployeeFeatured(data[i].employeeisfeatured) + "</span></div>" +
                        "<div class= employeename>" + data[i].employeefname + ' ' + data[i].employeelname + "</div>" +
                        "<div>" + data[i].employeebio + "</div>" +
                        //how to get the rolename and rolecolor
                        //Answer: using map method to get the rolename as well as the rolecolor
                        "<div>" + data[i].roles.map(function (role) {return "<span class = rolestyle style= background-color:" + role.rolecolor + ">" + role.rolename + "</span>"}).join ("    ") + "</div>" +
                        "</div>";
                }
            });
        }
    )
    .catch(function(err) {
        console.log('Fetch Error :-S', err);
    });
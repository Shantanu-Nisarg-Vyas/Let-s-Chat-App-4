const firebaseConfig = {
    apiKey: "AIzaSyB8WkRQTXHE6mgwfIfPOi9_SnQmVFju9s4",
    authDomain: "letschatwebapp-f340b.firebaseapp.com",
    databaseURL: "https://letschatwebapp-f340b-default-rtdb.firebaseio.com",
    projectId: "letschatwebapp-f340b",
    storageBucket: "letschatwebapp-f340b.appspot.com",
    messagingSenderId: "561831737410",
    appId: "1:561831737410:web:74c01ccd7009f83fe595db",
    measurementId: "G-ZWS5SFMJ1C"
};

firebase.initializeApp(firebaseConfig);

username = localStorage.getItem("username");
document.getElementById("username").value = "Welcome" + username + "!";

function getData() {
    firebase.database().ref("/").on('value',
        function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                roomname = childKey;
                row = "<div class='room_name' id=' " + roomname + "onclick='addRoom(this.id)'>#" + roomname + "</div><hr>";
            });
        });
}
getData();

function addRoom() {
    localStorage.setItem("roomname", roomname);
    window.location = "page3.html";
}

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
    window.location = "page1.html";
}
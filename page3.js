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

function logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
    window.location = "page1.html";
}

function send() {
    message = document.getElementById("message").value;
    firebase.database().ref(roomname).push({
        name: username,
        message: message,
        like: 0
    });
    document.getElementById("message").value = "";
}

message_data = ""
firebase_message_id = ""

function getData() {
    firebase.database().ref("/" + roomname).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData
                name = message_data['name'];
                message = message_data['message'];
                like = message_data['like'];
                name_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>" + message + "</h4><button class='btn btn-warning' id='" + firebase_message_id + "' value='" + like + "' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: " + like + "</span></button><hr>";
                document.getElementById("output").innerHTML += name_tag;
            }
        });
    });
}
getData();

function updateLike(message_id) {
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    no_likes = Number(likes) + 1;
    console.log(no_likes);
    firebase.database().ref(roomname).child(message_id).update({
        like: no_likes
    });
}

firebase.database().ref(roomname).child(message_id).update({
    like : no_likes
 });

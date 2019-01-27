console.log("hello")
var config = {
    apiKey: "AIzaSyA4GYa-JDS44n8D0RZSxmkAgyVMdEQRoM4",
    authDomain: "rps-multiplayer-sjt.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-sjt.firebaseio.com",
    projectId: "rps-multiplayer-sjt",
    storageBucket: "rps-multiplayer-sjt.appspot.com",
    messagingSenderId: "51666473404"
  };
firebase.initializeApp(config);

var database= firebase.database();
var convo = "";

$("#addConvo").click(function(error){
    error.preventDefault();
    convo = $("#chat-input").val();
    database.ref().push({
        convo:convo
    });
    $("#chat-input").empty();
});
database.ref().on("child_added", function(snapshot){
    var snap= snapshot.val();
    console.log(snap);
    var div = $("<div>")
    div.text(snap.convo);
    $("#convo").append(div)
},
function(errObjects){
    consloe.log(errObjects.code)
    }
)
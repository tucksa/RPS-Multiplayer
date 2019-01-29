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
var playerPicked = "";
var i=0;

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


$("#playBtn1").click(function(){
    $("#playBtn1").css("display", "none");
    setInterval(rotate, 2500);
    function rotate(){
        $("#rps div").last().fadeOut(1000, function(){
            $(this).insertBefore($("#rps div").first()).show();
        });
    }
});   
$("#rpsPic").click(function(){
    playerPicked=$(this).attr("data-name").val()
})
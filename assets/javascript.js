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
//how to code for each user seeing their own values- make array of players
//if array length is more than 2 warn new user they muust wait
//put button play functions under each user and hide of other array value
//use splice to keep array positons the same if player 2 stays and player1 leaves
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
connectedRef.on("value", function(snap) {
    if (snap.val()) {
      var con = connectionsRef.push(true);
      con.onDisconnect().remove();
    }
  });

  // When first loaded or when the connections list changes...
  connectionsRef.on("value", function(snapshot) {
    console.log(snapshot.numChildren());
    if (snapshot.numChildren()==1){
        console.log("wait for your opponent")
    }else if (snapshot.numChildren()==2){
        console.log("Play!")
    }else 
        console.log("Wait your turn...")
  });
  
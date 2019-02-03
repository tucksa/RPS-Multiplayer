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
var user1Picked = "";
var user2Picked= "";
var p1rot;
var p2rot;
// $("#signUp").click(function(e){
//     e.preventDefault();
//     var userName= $("#userName").val();
//     var email = $("#emailInput").val();
//     var password = $("#passwordInput").val();
//     firebase.auth().createUserWithEmailAndPassword(email, password)
//     .then(function(user){
//         user.updateProfile({userName:userName});
//     });
//     $("#login").atrr("display", "none");
// });

// $('#signIn').click(function(e){
//     e.preventDefault();
//     var email = $("#emailInput").val();
//     var password = $("#passwordInput").val();
//     firebase.auth().signInWithEmailAndPassword(email, password);
//     $("#userName").empty();
//     $("#emailInput").empty();
//     $("#passwordInput").empty(); 
//     $("#login").attr("display", "none");
// });
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
connectedRef.on("value", function(snap) {

    // If they are connected..
    if (snap.val()) {
  
      // Add user to the connections list.
      var con = connectionsRef.push(true);
  
      // Remove user from the connection list when they disconnect.
      con.onDisconnect().remove();
    }
  });
  // When first loaded or when the connections list changes...
connectionsRef.on("value", function(snapshot) {
    if(snapshot.numChildren()==1){
        $("#status").text("wait for opponent");
    }else if (snapshot.numChildren()==2){
        $("#status").text("Play!");
    }else if (snapshot.numChildren()>2){
        $("#status").text("Wait your turn...");
    }
  });

// firebase.auth().onAuthStateChanged(function(user) {
//     if (user) {
     
//         databas.ref("/player").push({
//             player: firebase.auth().currentUser
//         }) 
//     } else {
      
//     }
//   });



$("#addConvo").click(function(error){
    error.preventDefault();
    convo = $("#chat-input").val();
    database.ref("/chat").push({
        convo:convo
    });
    $("#chat-input").html(" ");
});
database.ref("/chat").on("child_added", function(snapshot){
    var snap= snapshot.val();
    var div = $("<div>")
    div.append(snap.convo);
    $("#convo").append(div)
},
function(errObjects){
    consloe.log(errObjects.code)
    }
)


$("#playBtn").click(function(){
    $("#playBtn").css("display", "none");
    p1rot= setInterval(rotate, 2500);
    function rotate(){
        $("#rps1 div").last().fadeOut(1000, function(){
            $(this).insertBefore($("#rps1 div").first()).show();
        });

    }
});  

$("#play2Btn").click(function(){
    $("#play2Btn").css("display", "none");
    p2rot= setInterval(rotate, 2500);
    function rotate(){
        $("#rps2 div").last().fadeOut(1000, function(){
            $(this).insertBefore($("#rps2 div").first()).show();
        });
    }
})


$("#rps1Pic").click(function(){
    user1Picked=$(this).attr("data-name").val()
    clearInterval(p1rot);
    $("#rps1").css("display", "none");
})

$("#rps2Pic").click(function(){
    user2Picked=$(this).attr("data-name").val()
    clearInterval(p2rot);
    $("#rps2").css("display", "none");
})

// firebase.auth().onAuthStateChanged(authStateChangedListener);
// function authStateChangeListener(user){
//     if(user){
//         //do login opperations
//         Chat.onlogin();
//         Game.onlogin();
//     }else {//signout
//         window.location.reload()
//     }

//how to code for each user seeing their own values- make array of players
//if array length is more than 2 warn new user they muust wait
//put button play functions under each user and hide of other array value
//use splice to keep array positons the same if player 2 stays and player1 leaves
// var connectionsRef = database.ref("/connections");
// var connectedRef = database.ref(".info/connected");

// connectedRef.on("value", function(snap) {
//     if (snap.val()) {
//       var con = connectionsRef.push(true);
//       con.onDisconnect().remove();
//     }
//   });

//   // When first loaded or when the connections list changes...
//   connectionsRef.on("value", function(snapshot) {
//     console.log(snapshot.numChildren());
//     var key = snapshot.child(key);
//     console.log(key);
//     if (snapshot.numChildren()==1){
//         console.log("wait for your opponent")
//     }else if (snapshot.numChildren()==2){
//         console.log("Play!")
//     }else 
//         console.log("Wait your turn...")
//   });
  

function urlGen(f){
   var i1 = 'https://kforney1205.github.io/agentjoin/kiosk.html?';
   var i2 = 'conference=mp'
   var i3 = document.getElementById('videoID').value;
   f.action = i1 + i2 + i3;
   return true;
}
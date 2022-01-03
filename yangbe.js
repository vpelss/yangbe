var activebowl;
var computeristhinking = 0;
var readingvalue = 0;

var bowlarray = new Array();
var readingvalue = new Array();
//get array of all bowl classes
bowlarray = getElementsByStyleClass('bowl');
//set id's in the bowl classes
for (variable in bowlarray)
    {
    bowlarray[variable].id = 'bowl' + variable; //name the bowl
    readingvalue[variable] = 0; //at the same time, create a array variable for the bowls reading count for the reading output
    }    

//set up board
for (a = 0; a < maxbowls ; a++) 
{           
if ( document.getElementById('bowl' + a) )
	{    
    var noOfRocks = Math.floor(Math.random() * maxrocks) + 1;
    
    for (b = 0; b < noOfRocks ; b++) 
        {
        var Rock = Math.floor(Math.random() * varietyofrocks) + 1;
        oDiv = document.createElement("IMG");
        oDiv.className = "stone";
        oDiv.src = "images/rock" + Rock + ".gif";
        oDiv.onclick=function()
            {
            if (computeristhinking == 1) {return};
            
            if (activebowl != undefined)
             {    
             if ( this.parentNode != activebowl ) //erase all borders on rocks in old 
                {
                rocknode = activebowl.firstChild; //get first child
                if (rocknode && rocknode.className == 'stone') 
                    {
                    do
                        {
                        rocknode.style.borderWidth = "0";
                        rocknode.style.borderStyle = "none";
                        }
                    while (rocknode = rocknode.nextSibling)
                    }
                }
             }
                
            if ( this.style.borderStyle.indexOf('solid' , 0) != -1 )
                {
                this.style.borderWidth = "0";
                this.style.borderStyle = "none";
                }
            else
                {
                this.style.borderWidth = "1px";
                this.style.borderStyle = "solid";
                }
            activebowl = this.parentNode;
            };
        document.getElementById('bowl' + a).appendChild(oDiv);	
        }  
	}
}

function keyinput(keyCode)
{
if (selectedrocks() == 0) {return} //no rocks selected yet

if (keyCode == 46) //delete key
    {
    DeleteHighlightedRocks();
    if (countrocks() == 0)
        {
        gameover(1); //user wins
        return;
        }
    document.getElementById('dummy').innerHTML = 'My move. Hmmmmm....';
    computeristhinking = 1;
    setTimeout("computersmove()",delay);
    }; 
}

function DeleteHighlightedRocks()
{
if (! activebowl) {return} //no active active bowl yet, so just quit

rockarray = activebowl.childNodes;
for (a = 0; a < rockarray.length  ; a++)
    {
    if (rockarray[a].className == 'stone')
        {
        if ( rockarray[a].style.borderStyle.indexOf('solid' , 0) != -1 ) 
                        {
                        rockarray[a].parentNode.removeChild(rockarray[a]);
                        if (a = 0) {a = 0} //go back one so we don't miss any
                        else {a = a -1}
                        }
        }
    }
}

function computersmove()
{
xor = 0;
biggestbowl = 0;
rockcount  = 0;
var buildnumber = '';

//calculate the  winning move if possible
for (a = 0; a < maxbowls ; a++) 
    {           
    if ( document.getElementById('bowl' + a) )
        {//calc xor
        xor = xor ^ document.getElementById('bowl' + a).childNodes.length;
        buildnumber = buildnumber + document.getElementById('bowl' + a).childNodes.length;
        //tempstring = tempstring + '[' + document.getElementById('bowl' + a).childNodes.length + ']';
        readingvalue[a] = readingvalue[a] + (buildnumber * 1);
        }
    }

goofmove  = Math.floor(Math.random() *  difficultyrange) + 1; //1 - 10
if ( goofmove > document.getElementById('difficulty').value )
    {
    xor = 0; //just random pick. throw the move.
    }

if (xor != 0)
    {
     //find finalbowlcount = (bowl ^ xor) that has a result that is less than the bowl....
    for (a = 0; a < maxbowls ; a++) 
        {           
        if ( document.getElementById('bowl' + a) )
            {
            finalbowlcount = xor ^ document.getElementById('bowl' + a).childNodes.length;
            if ( finalbowlcount < document.getElementById('bowl' + a).childNodes.length )     
                {break}
            }
        }
    take = document.getElementById('bowl' + a).childNodes.length - finalbowlcount;
    //document.getElementById('dummy').innerHTML = document.getElementById('dummy').innerHTML + '(' + tempstring + ' take=' + take + ' xor=' + xor + ' finalbowlcount=' + finalbowlcount + ' bowl=' + a + ')';
    removerrocks(a , take);
    document.getElementById('dummy').innerHTML = document.getElementById('dummy').innerHTML + ' I think I am winning.';
    }
else
    {//we are on the run. so just pick random pile and random rocks. hope player makes mistake!
    pickrandomrocks();
    } 
computeristhinking = 0; //we are done. let the human play 

//document.getElementById('dummy').innerHTML = document.getElementById('dummy').innerHTML  + readingvalue.toString(); 

if (countrocks() == 0)
        {
        gameover(0); //user loses
        }
}

function pickrandomrocks()
{
take = 0;
do 
        {
        bowl = Math.floor(Math.random() * (maxbowls-1));
        if (document.getElementById('bowl' + bowl))
            {
            numberofrocks = document.getElementById('bowl' + bowl).childNodes.length;
            if (numberofrocks != 0)
                {
                take = Math.floor(Math.random() * numberofrocks) + 1;
                removerrocks(bowl ,take);
                }
            }
        }
while (take == 0)  
}

function removerrocks(bowl , take)
{
for (a = 0; a < take ; a++)
    {
    rock = document.getElementById('bowl' + bowl).firstChild;
    rock.parentNode.removeChild(rock);
    } 
document.getElementById('dummy').innerHTML = 'I took ' + take + ' stones from bowl ' + (bowl + 1) + '.';
}

function countrocks()
{
rockcount = 0;
for (a = 0; a < maxbowls ; a++) 
    {           
    if ( document.getElementById('bowl' + a) )
        {
        rockcount = rockcount + document.getElementById('bowl' + a).childNodes.length; //to see if I win! 
        }
    }
return rockcount;    
}

function selectedrocks()
{
//get array of all stone classes
stonearray = getElementsByStyleClass('stone');
//are there ant with borders?
for (variable in stonearray)
    {
    if ( stonearray[variable].style.borderStyle.indexOf('solid' , 0) != -1 ) 
        {return 1}
    } 
return 0; //no stones with borders were found
}

function getElementsByStyleClass (className) {
  var all = document.all ? document.all :
    document.getElementsByTagName('*');
  var elements = new Array();
  for (var e = 0; e < all.length; e++)
    if (all[e].className == className)
      elements[elements.length] = all[e];
  return elements;
}

var Cookie   = new Object();
Cookie.day   = 86400000;
Cookie.week  = Cookie.day * 7;
Cookie.month = Cookie.day * 31;
Cookie.year  = Cookie.day * 365;

function getCookie(name) {
  var cookies = document.cookie;
  var start = cookies.indexOf(name + '=');
  if (start == -1) return null;
  var len = start + name.length + 1;
  var end = cookies.indexOf(';',len);
  if (end == -1) end = cookies.length;
  return unescape(cookies.substring(len,end));
}

function setCookie(name, value, expires, path, domain, secure) {
  value = escape(value);
  expires = (expires) ? ';expires=' + expires.toGMTString() :'';
  path    = (path)    ? ';path='    + path                  :'';
  domain  = (domain)  ? ';domain='  + domain                :'';
  secure  = (secure)  ? ';secure'                           :'';

  document.cookie =
    name + '=' + value + expires + path + domain + secure;
}

function deleteCookie(name, path, domain) {
  var expires = ';expires=Thu, 01-Jan-70 00:00:01 GMT';
  (path)    ? ';path='    + path                  : '';
  (domain)  ? ';domain='  + domain                : '';

  if (getCookie(name))
    document.cookie = name + '=' + expires + path + domain;
}

function gameover(didhumanwin)
{
var visitor = document.getElementById('visitor').value;
var totalreading = '';

//calculate / get reading values
for (a = 0; a < maxbowls ; a++) 
    {           
    if ( document.getElementById('bowl' + a) )
        {
        readingvalue[a] = readingvalue[a] % 78; //must ensure we have same number of output as cards % mod division
        totalreading = totalreading + readingvalue[a] + ','; //build reading output numbers
        }
    }


var core_path = '/cgi/yangbe/core.cgi?vars=core_vars.cgi&databasefile=../../yangbe/databases/yangbe.cgi&templatefile=../../yangbe/templates/index.html';
var pathh = core_path + '&records=' + totalreading + '&custom1=' + visitor + '&custom10=' + readingvalue;

if (didhumanwin == 1)
    {
    alert(visitor + " you took the last rock. Concentrate on that of what you wish to know. When you are ready, continue.");
    window.open(pathh , '_blank' , 'fullscreen=1,scrollbars=yes');
    }
else
    {
    alert(visitor + " I took the last rock. I cannot give you an accurate Numerology reading until you succeed.");
    }    
location.reload();
}

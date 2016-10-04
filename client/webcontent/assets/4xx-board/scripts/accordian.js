
var BOSS = 'accordian__boss';
var BOSSCOLLAPSED = 'accordian__boss--collapsed';
var ITEM = 'accordian__item';
var ITEMHEADER = 'accordian__header';
var ITEMCOLLAPSED = 'accordian__item--collapsed';

var accordianElemsList = document.getElementsByClassName(ITEM);
var accordianElemsHeader = document.getElementsByClassName(ITEMHEADER);
var accordianElemBoss = document.getElementsByClassName(BOSS);

function setClassAs(elem, className, addClass){
    
    if(addClass){
        elem.className = elem.className+' '+className;
    } else {
        pattern = new RegExp(className, 'g');
        elem.className = elem.className.replace(pattern, '');
    }
}

function expandAccordian(elem){
    setClassAs(elem, ITEMCOLLAPSED, false);
}

function collapseAccordian(elem){
    setClassAs(elem, ITEMCOLLAPSED, true);
}

var count = 0;
function toggleAccordian(evt){
    var parentId = evt.currentTarget.getAttribute('data-Parent');
    var targetElem = document.getElementById(parentId);
    
    if(targetElem.className.indexOf(ITEMCOLLAPSED) === -1 ) {
        collapseAccordian(targetElem);
        if(document.getElementsByClassName(ITEMCOLLAPSED).length === accordianElemsList.length){
          Array.prototype.forEach.call(accordianElemBoss, function(elem){
            setClassAs(elem, BOSSCOLLAPSED, true);
          });
        }
    } else {
        expandAccordian(targetElem);
        if(document.getElementsByClassName(ITEMCOLLAPSED).length !== 0){
          Array.prototype.forEach.call(accordianElemBoss, function(elem){
            setClassAs(elem, BOSSCOLLAPSED, false);
          });
        }
    }
}

function attachEvent(elem){
    elem.addEventListener("click",toggleAccordian);
}

function toggleAllAccordian(evt){
    var targetElem = evt.currentTarget;

    evt.preventDefault();

    if(targetElem.className.indexOf(BOSSCOLLAPSED) === -1 ) {
        setClassAs(targetElem, BOSSCOLLAPSED, true);

        Array.prototype.forEach.call(accordianElemsList, collapseAccordian);
    } else {
        setClassAs(targetElem, BOSSCOLLAPSED, false);

        Array.prototype.forEach.call(accordianElemsList, expandAccordian);
    }
}

function bindEvent(elem){
    elem.addEventListener("click",toggleAllAccordian);
}

if(accordianElemsHeader.length){
    Array.prototype.forEach.call(accordianElemsHeader, attachEvent);
    Array.prototype.forEach.call(accordianElemBoss, bindEvent);
}else{
    Array.prototype.forEach.call(accordianElemBoss, setClassAs)
}

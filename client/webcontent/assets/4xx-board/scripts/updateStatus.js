
var CHECKBOX = 'input__checkbox';
var RESULTITEM = 'resultItem';
var SELECTED = 'result__item--assesed';

var checkboxElems = document.getElementsByClassName(CHECKBOX);

function setClassAs(elem, className, addClass){
    if(addClass){
        elem.className = elem.className+' '+className;
    } else {
        pattern = new RegExp(className, 'g');
        elem.className = elem.className.replace(pattern, '');
    }
}

function sendUpdateRequest(evt){
    var elem = evt.currentTarget;
    evt.preventDefault();
    var xhr = new XMLHttpRequest();
    var url = '/update/status';

    xhr.onreadystatechange = handleRequest.bind(elem);
    
        url += '?AssesmentState='+elem.AssesmentState.value+'&SerialId='+elem.SerialNo.value+'&comment='+elem.Comment.value;

    xhr.open('GET', url);
    xhr.send();
}

function handleRequest(evt){
    var xhr = evt.target;
    
    if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        successHandler.call(this,xhr.responseText);
    }
}

function successHandler(data){
    
    var targetElem;
    data = JSON.parse(data);

    if(data.results && data.results.length){
        targetElem = document.getElementById(RESULTITEM+data.results[0].index);
        if( data.AssesmentState === 'true') {
            setClassAs(targetElem, SELECTED, true);
        } else {
            setClassAs(targetElem, SELECTED, false);
        }
        hideCommentBox();
    } else {
        documen.getElementById('formError').innerText = "Unable to add/revert comment and status";
    }
    
}

function failureHandler(err){
    console.log('error ',err,'\n arguments:: ', arguments);
}

function showCommentBox(){
    document.addEventListener('keyup',removeLightbox);
    var elem = document.getElementById('lightbox');
    elem.style.display = 'block';
}

function hideCommentBox(){
    console.log("hideCommentBox");
    var elem = document.getElementById('lightbox');
    elem.style.display= 'none';
    document.removeEventListener('keyup',removeLightbox);
}

function updateStatus(evt){
    var targetElem = evt.currentTarget;
    var formElm = document.getElementById('updateStatus');
    formElm.SerialNo.value = targetElem.value;
    formElm.AssesmentState.value = targetElem.checked;
    
    showCommentBox();
}

function bindEvent(elem){
    elem.addEventListener("change",updateStatus);
}

function removeLightbox(evt){
    if(evt.which === 27){
        hideCommentBox();
    }
}

if(checkboxElems.length){
    Array.prototype.forEach.call(checkboxElems, bindEvent);
    document.getElementsByClassName('input__reset')[0].addEventListener('click',hideCommentBox);
    document.getElementById('updateStatus').addEventListener('submit',sendUpdateRequest);
}

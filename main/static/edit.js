

var content;
var previous;

function initiateDocs() {
   content = document.getElementById('sampleeditor');
}

function format(command, value) {

    document.execCommand(command, false, value);
    content.focus();

}

function replacing(cmd){

    //console.log(window.getSelection());
    //console.log(window.getSelection().anchorNode.parentNode.previousElementSibling);
    var p = window.getSelection().anchorNode.parentNode;
    var li = document.createElement('li');
    li.innerHTML = p.innerHTML;
    var ele = document.createElement(cmd);
    ele.append(li);
    //console.log(ele);
    (p.previousElementSibling).after(ele);
    p.remove();
    content.focus();
    //console.log(window.getSelection().anchorNode.parentNode.tagName);

}

function setUrl() {

    var url = document.getElementById('txtFormatUrl').value;
    var sText = document.getSelection();
    document.execCommand('insertHTML', false, '<a href="' + url + '">' + sText + '</a>');
    document.getElementById('txtFormatUrl').value = '';

}

function setImage() {
    var file = document.querySelector("input[type=file]").files[0];

    var reader = new FileReader();

    let dataURI;

    reader.addEventListener(
        "load",
        function() {
            dataURI = reader.result;

            //     console.log(window.getSelection());
            const div = document.createElement("div");
            const img = document.createElement("img");
            const label = document.createElement("label");
            img.src = dataURI;
            img.className = 'content-image';
            div.appendChild(img);
            label.innerHTML = "Fig.";
            div.appendChild(label);
            div.className = 'image-container';
            //console.log(window.getSelection());
            if (window.getSelection().anchorNode.parentNode.innerHTML.trim()[0] == '<'){
                (previous).after(div);
                previous.remove();
            }
            else{
                (window.getSelection().anchorNode.parentNode).after(div);
            }
            range = document.createRange();
            range.setStartAfter(label);
            range.collapse(true);

            //make the cursor there
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);

        },
        false
    );

    if (file) {
        //console.log(file);
        reader.readAsDataURL(file);
    }
}

$(document.getElementById('sampleeditor')).keydown(function(e) {

    /*
    // know enter key is pressed
    if (e.keyCode === 13) {

        //console.log(this);
        var p = window.getSelection().anchorNode.parentNode;
        // insert selected tag
        //console.log(window.getSelection());
        if(p.tagName == 'LABEL' || window.getSelection().anchorNode.parentNode.className == 'img-container' ){
            var element = document.createElement('p');
            element.innerHTML = "<br>";
            (p.parentNode).after(element);
            previous = element;
            element.focus();

            range = document.createRange();
            range.setStartBefore(element);
            range.collapse(true);

            //make the cursor there
            var sel = window.getSelection();
            //console.log(sel);
            sel.removeAllRanges();
            sel.addRange(range);
            return false;
        }

        //Checking for empty li tag

        if(p.tagName == 'UL' || p.tagName == 'OL' )
        {
            //console.log(p.parentNode);
            console.log(window.getSelection().anchorNode);

            if (p.parentNode.tagName == 'UL' || p.parentNode.tagName == 'OL' )
            {
                var element = document.createElement('li');
            }
            else{
                var element = document.createElement('p');
                element.innerHTML = "<br>";
                previous = element;
            }
            (p).after(element);
            if (window.getSelection().anchorNode.tagName == 'LI'){
            //console.log(window.getSelection().anchorNode);
            (window.getSelection().anchorNode).remove();
            }

            element.focus();

            range = document.createRange();
            range.setStartBefore(element);
            range.collapse(true);

            //make the cursor there
            var sel = window.getSelection();
            //console.log(sel);
            sel.removeAllRanges();
            sel.addRange(range);
            return false;
        }
        //Checking for presence of text in tag
        if(p.innerHTML.trim()[0] !== '<')
        {
            if(p.tagName == 'LI')
            {
                //console.log(p.tagName);
                return true;
            }
            else{
                //console.log(p.tagName);
                var element = document.createElement('p');
                element.innerHTML = "<br>";
                console.log(p+'1');
                (p).after(element);
                previous = element;

                element.focus();

                range = document.createRange();
                range.setStartBefore(element);
                range.collapse(true);

                //make the cursor there
                var sel = window.getSelection();
                //console.log(sel);
                sel.removeAllRanges();
                sel.addRange(range);
                return false;
            }

        }

        //console.log(window.getSelection().anchorNode.parentNode);
        return false;

    }*/

    if(e.which == 8){
        //console.log(content.innerHTML.trim())
        //add p tag if not there
        notAllowedList = ['<p><br></p>', '<h3><br></h3>', '<h2><br></h2>'];
        if(notAllowedList.indexOf(content.innerHTML.trim()) > -1 )
        {
            return false;
        }

    }

});
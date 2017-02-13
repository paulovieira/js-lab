
var htmlEmailMessage = `

    <h1>Heading 1</h1>
    <h2>Heading 2</h2>
    <h3>Heading 3</h3>
    <h4>Heading 4</h4>
    <h5>Heading 5</h5>
    <h6>Heading 6</h6>
    <hr>
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        <b>Etiam eget ligula eu lectus lobortis condimentum. </b>
        <i>Aliquam nonummy auctor massa. </i>
        <b><i>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. </i></b>
    </p>
    <p>
        <span style="text-decoration: underline;">Nulla at risus. </span>
        Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
    </p>
    <p>
        <ul>
            <li>item 1</li>
            <li>item 2</li>
            <li>item 3</li>
        </ul>
    </p>

    <img src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAcjAAAAJDU0NWQ3ZTMyLTZkOTEtNDY5YS04ZTc0LTU5ZGU1MDkzODkwOA.png">

    <img width="50" height="50" src="data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7" />

`



// the width of this container should be such that: width + padding = 790px  
var htmlEmailContainer = `<div id="container-email-message" style="border: solid 1px green; padding: 20px; width: 751px; position: absolute; top: ${ $(window).height() }px; ">
    </div>`;


$('body')
    .append(htmlEmailContainer)
    .find('div#container-email-message')
    .append(htmlEmailMessage);

 
html2canvas($('div#container-email-message').get(0), {
 
    onrendered: function(canvas) {

        $('div#container-email-message').remove(); 

        setWhiteBackground(canvas);
        //var img = document.createElement('img');
        //img.src = canvas.toDataURL("image/jpeg");
 
        var pdf = new jsPDF()
        pdf.addImage(canvas.toDataURL("image/jpeg"), 'JPEG', 0, 0)

        $('div#container-pdf-viewer')
            .append('<object type="application/pdf" width="100%" height="100%"></object>')
            .find('object')
            .prop('data', pdf.output('datauristring'))

        $('button#download')
            .prop('disabled', false)
            .on('click', () => { pdf.output('save', 'email.pdf') });

        $('button#new-window')
            .prop('disabled', false)
            .on('click', () => { pdf.output('dataurlnewwindow') });
    }

})


// http://stackoverflow.com/questions/32160098/change-html-canvas-black-background-to-white-background-when-creating-jpg-image
function setWhiteBackground(canvas){

    var ctx = canvas.getContext('2d')
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;

    for(var i = 0; i < data.length; i += 4){
        if(data[i+3] < 255){
            data[i] = 255 - data[i] 
            data[i+1] = 255 - data[i+1]; 
            data[i+2] = 255 - data[i+2]; 
            data[i+3] = 255 - data[i+3]; 
        }
    }

    ctx.putImageData(imgData,0,0);    
};


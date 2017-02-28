
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
        <span style="text-decoration: underline;">Nulla at risus. </span>
        Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
    </p>
    <p>
        <span style="text-decoration: underline;">Nulla at risus. </span>
        Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
    </p>
    <p>
        <span style="text-decoration: underline;">Nulla at risus. </span>
        Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
    </p>
    <p>
        <span style="text-decoration: underline;">Nulla at risus. </span>
        Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
    </p>
    <p>
        <span style="text-decoration: underline;">Nulla at risus. </span>
        Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
    </p>
    <p>
        <span style="text-decoration: underline;">Nulla at risus. </span>
        Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
    </p>
    <p>
        <span style="text-decoration: underline;">Nulla at risus. </span>
        Quisque purus magna, auctor et, sagittis ac, posuere eu, lectus. Nam mattis, felis ut adipiscing.
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

	<div>
	imagem using link
    <img src="https://media.licdn.com/mpr/mpr/shrink_200_200/AAEAAQAAAAAAAAcjAAAAJDU0NWQ3ZTMyLTZkOTEtNDY5YS04ZTc0LTU5ZGU1MDkzODkwOA.png">
	</div>
	
	<div>
	image using base64 embedding
    <img width="50" height="50" src="data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7" />
	</div>

`;

/**/
htmlEmailMessage += `
    <p> --------------- 2 ---------------</p>
    ${ htmlEmailMessage}
`;

htmlEmailMessage += `
    <p><span style="text-decoration: underline;">1 Nulla at risus.fwb euif bweiu fbiuwe bfuiw ebfiuwb eiuf bweui fbwiue bfiuwbe fuw ufb weiubfuiwe fuwb iuf 1 2 3 4 5 6 7 8 bwiue bfuiwb fiuw bfiuw bfiuw bfiu wiuw  </span></p>
    <p><span style="text-decoration: underline;">2 Nulla at risus. </span></p>
    <p><span style="text-decoration: underline;">3 Nulla at risus. </span></p>
    <p><span style="text-decoration: underline;">4 Nulla at risus. </span></p>
    <p><span style="text-decoration: underline;">5 Nulla at risus. </span></p>
    <p><span style="text-decoration: underline;">6 Nulla at risus. </span></p>    
    <p><span style="text-decoration: underline;">7 Nulla at risus. </span></p>    
`;




    // the width of this container should be around 794 x 1122 (px), which are the A4 dimensions
    // http://stackoverflow.com/questions/20927182/simulate-a4-page-in-html
    var A4 = {
        width: 794, 
        height: 1122
    };

    // this container shoun't have height (so that it will expand as necessary to accomodate all the content)
    var htmlEmailContainer = `
        <div id="container-email-message" style="width: ${ A4.width }px; position: absolute; top: ${ $(window).height() }px; no-border: solid 1px red;">
            <div style="no-border: solid 1px blue;">
            </div>
        </div>
    `;


$('body')
    .append(htmlEmailContainer)
    .find('div#container-email-message > div')
    .append(htmlEmailMessage);


html2canvas($('div#container-email-message').get(0), {
 
    onrendered: function(canvas) {

        $('div#container-email-message').remove(); 

        var pdf = new jsPDF();
        var numPages = Math.ceil(canvas.height / A4.height);
        var pdfPaddingH = 10, pdfPaddingV = 15;

        if (numPages === 1) { 
            setWhiteBackground(canvas);

            pdf.addImage(
                canvas.toDataURL("image/jpeg"), 'jpeg',
                pdfPaddingH, pdfPaddingV,
                210 - 2 * pdfPaddingH, 297 * (canvas.height / A4.height)
            );

            var img = document.createElement('img');
            img.src = canvas.toDataURL("image/jpeg");
            $('body').append(img);
            $('body').append('<br>');
        }
        else {
            var canvasTemp;
            var sx, sy, syPreviousPage = -1, repeatedPixelsInNextPage = 20;

            while (true) {

                sx = 0;
                if (syPreviousPage < 0) {
                    sy = 0 
                }
                else {
                    sy = syPreviousPage + A4.height - repeatedPixelsInNextPage;
                }

                syPreviousPage = sy;

                if (sy > canvas.height){
                    break;
                }
                else if (sy > 0) {
                    pdf.addPage();
                }

                canvasTemp = document.createElement('canvas');
                canvasTemp.width = A4.width;
                canvasTemp.height = A4.height;

                // referece: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
                canvasTemp.getContext('2d').drawImage(
                    canvas, 
                    sx, sy, A4.width, A4.height, 
                    0,  0,  A4.width, A4.height
                );

                setWhiteBackground(canvasTemp);

                pdf.addImage(
                    canvasTemp.toDataURL("image/jpeg"), 'jpeg', 
                    pdfPaddingH, pdfPaddingV, 
                    210 - 2 * pdfPaddingH, 297 - 2 * pdfPaddingV
                );
                
                var img = document.createElement('img');
                img.src = canvasTemp.toDataURL("image/jpeg");
                $('body').append(img);
                $('body').append('<hr style="margin: 20px 0px">');
            }
        }


debugger;
        $('div#container-pdf-viewer')
            .append('<object no-type="application/pdf" width="100%" height="100%"></object>')
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


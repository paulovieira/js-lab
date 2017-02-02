var $draggable = $('[data-resid="res1"]').draggabilly({
    containment: '.grid-container',
    //grid: [200,100]
});

$draggable.on( 'dragEnd', function( event, pointer ) {
    //debugger;
    var $this = $(this);
    var left = parseInt($this.css('left'), 10);
    var top = parseInt($this.css('top'), 10);
    console.log(left + ' ' + top);
})

var $draggable2 = $('[data-resid="res2"]').draggabilly({
    containment: '.grid-container',
    grid: [200,100]
});

$draggable2.on( 'dragStart', function( event, pointer ) {
    //debugger;
    var $this = $(this);
    var left = parseInt($this.css('left'), 10);
    var top = parseInt($this.css('top'), 10);

    $this.attr('data-start-left', left);
    $this.attr('data-start-top', top);

    console.log(left + ' ' + top);
})

$draggable2.on( 'dragEnd', function( event, pointer ) {
    //debugger;
    var $this = $(this);
    var left = parseInt($this.css('left'), 10);
    var top = parseInt($this.css('top'), 10);

    if(left > 400){
        console.log('return to the original position')
    }
    console.log(left + ' ' + top);
})

// var ele = document.getElementsByClassName("dragtarget")[0];
var boxes = document.getElementsByClassName('dragtarget'),
i = boxes.length;
while (i--)
  var ele = boxes[i];

// var ele = document.getElementById('dragtarget');
var mover = false, x, y, posx, posy, first = true;

//enable the pointer to drag
ele.onmousedown = function(){
  mover = true;
};

//disable the drag pointer
ele.onmouseup = function(){
  mover = false;
  first = true;
};

//while move is moving which is dragging
ele.onmousemove = function(e){
  if(mover)
  {
    if(first)
    {
      x = e.offsetX;
      y = e.offsetY;
      first = false;
    }
    posx = e.pageX - x;
    posy = e.pageY - y;
    this.style.left = posx + 'px';
    this.style.top = posy + 'px';
  };
}
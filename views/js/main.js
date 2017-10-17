var nav = document.getElementById('nav');
var contentBox = document.getElementById('contentBox');
var navs = nav.children;
var contents = contentBox.children;

    // click change tag

    for(var i=0;i<navs.length;i++){
        navs[i].index = i;
        navs[i].onclick=function(){

            for (var i = 0; i < navs.length; i++) {

                navs[i].classList.remove('active');
            }
            this.classList.add('active');

            for (var j = 0; j < contents.length; j++) {

                contents[j].classList.remove('show');
                contents[j].classList.add('hide');
            }
            contents[this.index].classList.remove('hide');
            contents[this.index].classList.add('show');
        }
    }

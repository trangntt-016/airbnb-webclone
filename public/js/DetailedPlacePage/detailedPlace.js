let sliderImages = document.querySelectorAll('.slide'),
    arrowRight = document.getElementById('arrow-right'),
    arrowLeft = document.getElementById('arrow-left'),
    current = 0;

    arrowRight.addEventListener('click',()=>{
        current++;
        if(current > sliderImages.length - 1){
            current = sliderImages.length-1;
        }
        nextSlide();
        setactive_next();
    })

    arrowLeft.addEventListener('click',()=>{
        current--;
        if(current<0){
            current = 0;
        }
        console.log(current);   
        previousSlide();
        setactive_previous();
    })
    //Clear our images
    function reset(){
        for(var i = 0; i < sliderImages.length; i++){
            sliderImages[i].style.display = 'none';
        }
    }

    function startSlide(){
        reset();
        displayButton();
        setactive_next();
        sliderImages[0].style.display = 'flex';
        sliderImages[1].style.display = 'flex'
    }

    function nextSlide(){
        sliderImages[current-1].style.display = 'none';
        sliderImages[current].style.display = 'flex';
        if(current < sliderImages.length-1){
            sliderImages[current+1].style.display = 'flex'
        }

    }

    function previousSlide(){
        if(current < sliderImages.length-2){
            sliderImages[current+2].style.display = 'none';
        }
        sliderImages[current+1].style.display = 'flex';
        sliderImages[current].style.display = 'flex'
    }

    function setactive_next(){
        var btn = document.querySelectorAll('.button-display');
        for(var i = 0; i <sliderImages.length;i++){
            if(i === current){
                if(current != 0){
                    btn[current-1].className = btn[current-1].className.replace(' active','');
                }
                btn[current].classList.add('active');
                return;
            }
        }
    }

    function setactive_previous(){
        var btn = document.querySelectorAll('.button-display');
        for(var i = 0; i <sliderImages.length;i++){
            if(i === current){
                btn[current+1].className = btn[current+1].className.replace(' active','');
                btn[current].classList.add('active');
                return;
            }
        }
    }

    function displayButton(){
        var btnHTML = document.getElementById('slider-button-wrapper');
        for(var i = 0; i < sliderImages.length; i++){
            var btn = document.createElement("div");
            btn.classList.add('button-display');
            btnHTML.appendChild(btn);
        }

    }

    startSlide();

    

    //Host info readmore
    var i = 0;
    function readmore(){
        if(i==0){
            document.getElementById('more').style.display='inline';
            document.getElementById('dots').style.display = 'none';
            document.getElementById('readmore').innerHTML = 'read less';
            i = 1;
        }
        else{
            document.getElementById('more').style.display='none';
            document.getElementById('dots').style.display = 'inline';
            document.getElementById('readmore').innerHTML = 'read more';
            i = 0;
        }

    }
    document.getElementById('readmore').addEventListener('click',()=>{
        readmore();
    });
    

$(function(){
    var currentIndex = 1;
    var indexNum = 3;
    var isDetailOn = false;
    var currentPageIndex = 0;
    let option = {
        threshold: 1.0
    }

    var observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting){
                return;
            }
            currentPageIndex = $(entry.target).index();
            console.log(currentPageIndex);
        })
    }, option);
    $(".scroll-area").each(function(){
        observer.observe(this);
    })

    $("button[name='detail-button']").click(function(){
        $("button[name='detail-button']").css('display','none');
        $("#about-my-skill-detail").css('display', 'flex');
        isDetailOn = true;
        changeSelect();
    });

    $(".skill-img-src").click(function(){
        if(isDetailOn){
            currentIndex = $(".skill-img .skill-img-src").index(this);
            currentIndex++;
            changeSelect();
        }
    })
    

    function changeSelect(){
        $(".about-my-skill-container").each(function(){
            $(this).css('display', 'none');
        });
        $(".about-my-skill-container:nth-child("+currentIndex+")").css('display','block');

        $(".skill-img-src").each(function(){
            $(this).css('opacity','0.4');
        });
        $(".skill-img:nth-child(" + currentIndex + ") .skill-img-src").css('opacity','1.0');
        
        $(".proficiency-part").each(function(){
            $(this).css('display', 'none');
        });
        $(".interest-part").each(function(){
            $(this).css('display', 'none');
        });

        currentIndex += indexNum;
        $(".proficiency-part:nth-child("+currentIndex+")").css('display','block');
        currentIndex += indexNum;
        $(".interest-part:nth-child("+currentIndex+")").css('display','block');
    }
});
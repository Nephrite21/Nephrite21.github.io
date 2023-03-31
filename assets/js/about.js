$(function(){
    var currentIndex = 1;
    var indexNum = 3;
    var isDetailOn = false;
    var currentPageIndex = 1;
    let option = {
        threshold:0.3
    }
    var observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(!entry.isIntersecting){
                return;
            }
            currentPageIndex = $(entry.target).index();
            changePageIndicator();
            console.log(currentPageIndex);
        })
    }, option);

    $(".page-indicator-button").hover(function(){
        $(".page-indicator-button").children(".indicator-text").css('display','block');
    },function(){
        $(".page-indicator-button").children(".indicator-text").css('display','none');
    })

    $(".page-indicator-button").click(function(){
        var cPI = $(this).index() +2;
        var offset = $(".scroll-area:nth-child("+cPI+")");
        $(".scroll-area").css("scroll-snap-align", "none");
        $("html, body").animate({ scrollTop: "+=" + offset.offset().top },100);
        $(".scroll-area").css("scroll-snap-align", "start");
    });


    $(".scroll-area").each(function(){
        observer.observe(this);
    });
    

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


    function changePageIndicator(){
        $(".indicator-dot").removeClass("activated");
        $(".page-indicator-button:nth-child("+currentPageIndex+") .indicator-dot").addClass("activated");
    }

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
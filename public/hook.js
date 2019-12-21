

function initHook() {

    //Check if Hook pre-defined HTML classes exist 
    if (document.querySelector('.main-hook') && document.querySelector('.quickside')) {
    
     //Set Background Color from here to avoid conflicting with your main style
        document.body.style.backgroundColor = '#282828';   

    //STORE DOM VARIABLES
    const frameLoader = document.createElement('div')
    const quickSideContainer = document.createElement('div')
    const playListHolder = document.createElement('div')
    playListHolder.className = 'playlist'
    quickSideContainer.className = 'quickside-container'
    frameLoader.className = 'frame-loader'
    document.querySelector('#marraine-hook').append(playListHolder)
    document.querySelector('.quickside').append(quickSideContainer)
    document.querySelector('.main-hook').append(frameLoader)
   
    // Create Loader El
    let spin = document.createElement('div')
    spin.className = 'spin';
    frameLoader.append(spin)
    
   // Place words on Sidebar
    const quicksideText = document.createElement('h4')
    quicksideText.textContent = 'Next Playlist'
    const quicksideExit = document.createElement('i')
    quicksideExit.textContent = 'close'
    quicksideExit.className = 'material-icons'
    quickSideContainer.append(quicksideText, quicksideExit)

    //Create Element for Menu
    const quicksideCaller = document.createElement('i')
    quicksideCaller.textContent = 'menu'
    quicksideCaller.className = 'material-icons'
    document.querySelector('.main-hook').append(quicksideCaller)


    //DECLARE api KEY AND URL
    let apiKey = 'AIzaSyBncusUSn_V4kfe9n3XJYDMMtykScs6X4w'
    let URL = 'https://www.googleapis.com/youtube/v3/playlistItems'
    

    let options = {
        part: 'snippet',
        key: apiKey,
        maxResults: 50,
        playlistId: mainPlayListId 
   }
    

  //Load Video function
    function loadVids() {
        $.getJSON(URL, options, function (data) {
            let id = data.items[0].snippet.resourceId.videoId
            mainVid(id)
            resultsLoop(data)
        })

      
            $.getJSON(URL, secondOptions = {
                part: 'snippet',
                key: apiKey,
                maxResults: 50,
                playlistId: nextPlayListId
            }, function (data) {
                let id = data.items[0].snippet.resourceId.videoId
                resultsLoop2(data)
            })
        
    }

    loadVids()
   

    //IFRAME VIDEO
    function mainVid(id) {
        document.querySelector('.video-holder').innerHTML = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?rel=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
    }


//LOOP THROUGHT PLAYLIST ITEMS
    function resultsLoop(data) {
        data.items.forEach((item) => {
     
            //GET DATE from TY
            let thumb = item.snippet.thumbnails.medium.url
            let smallThumb = item.snippet.thumbnails.default.url
            let title = item.snippet.title
            let channelTitle = item.snippet.channelTitle
            let desc = item.snippet.description.substring(0, 50) + '...'
            let vid = item.snippet.resourceId.videoId
      
            
            document.querySelector('.playlist').innerHTML +=
            `<article class="item" data-key="${vid}">
                <div class="art-split">
                 <img src="${thumb}" class="thumb">
               </div>
             <div class="art-split last">
                <h3>${title}</h3>
                <p>${channelTitle}</p>
            </div>
            </article>`
        });

}
    


function resultsLoop2(data) {
    data.items.forEach((item) => {
 
        let thumb = item.snippet.thumbnails.medium.url
        let smallThumb = item.snippet.thumbnails.default.url
        let title = item.snippet.title
        let channelTitle = item.snippet.channelTitle
        let desc = item.snippet.description.substring(0, 50) + '...'
        let vid = item.snippet.resourceId.videoId
        
        //Place also on sidebar // QuickSide
        document.querySelector('.quickside-container').innerHTML +=
         `<article class="item" data-key="${vid}">
           <div class="art-split">
             <img src="${smallThumb}" class="thumb">
           </div>
          <div class="art-split last">
            <h3>${title}</h3>
            <p>${channelTitle}</p>
          </div>
          </article>`
        
    });
    
}

//SET click EVENT
$('.playlist').on('click', 'article', function() {
    var id = $(this).attr('data-key')
    mainVid(id)
    $('html, body').animate({ scrollTop: 0 }, 'slow');
})
    //SET click EVENT
$('.quickside-container').on('click', 'article', function() {
    var id = $(this).attr('data-key')
    mainVid(id)
    $('html, body').animate({ scrollTop: 0 }, 'slow');
})

    //Next Playlist toggler
$('.quickside').on('click', '.material-icons', function () {
    $('.quickside').css('transform', 'translateX(-100%)')
    $('.main-hook i').css('opacity', '1')
})
$('.main-hook').on('click', '.material-icons', function () {
    $('.quickside').css('transform', 'translateX(0%)')
    $(this).css('opacity', '0')
})



    // Wait for DOM to be loaded
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            frameLoader.style.display = 'none'
        }, 3000)
       
      })
    }
    

  }

  initHook()


     

   

// version
 var appVersion ='v1.00';

//file to cache

var file =[
    './',
    './index.html',
    './css/bootstrap.css',
    './css/flexslider.css',
    './css/font-awesome.css',
    './css/owl.carousel.css',
    './css/owl.theme.css',
    './css/style.css',
    './images/angle.png',
    './images/b.jpg',
    './images/b1.jpg',
    './images/b2.jpg',
    './images/bg.jpg',
    './images/bg4.jpg',
    './images/bg5.jpg',
    './images/bg7.jpg',
    './images/bg8.jpg',
    './images/t1.jpg',
    './images/t2.jpg',
    './images/t3.jpg',
    './images/t4.jpg',
    './images/test1.jpg',
    './images/test2.jpg',
    './images/test3.jpg',
    './images/close.png',
    './images/dott.png',
    './images/left.png',
    './images/move-up.png',
    './images/next.png',
    './images/play-button.png',
    './images/prev.png',
    './images/right.png',
    './js/bootstrap.js',
    './js/easing.js',
    './js/jquery.flexslider.js',
    './js/jquery-2.1.4.min.js',
    './js/move-top.js',
    './js/owl.carousel.js',
    './js/responsiveslides.min.js',
    './js/SmoothScroll.min.js',
    './manifest.json'
]


//Install

self.addEventListener('install', event =>{
    event.waitUntil(
    caches.open(appVersion)
        .then(cache=>{
            return cache.addAll(file)
            .catch(err=>{
                console.error('Error adding file to cache', err);
            })
        })
    
    
    )
    
    console.info('SW Installed');
    self.skiWaiting();
})


//Activate

self.addEventListener('activate',event=>{
    event.waitUntil(
    caches.keys()
        .then(cacheNames=>{
          return Promise.all(
          cacheNames.map(cache =>{
              if(cache !==appVersion){
                  console.info('Deleting old cache', cache)
                  return caches.delete(cache);
              }
              
          })
          
          )  
            
        })
    )
    
    return self.clients.clain();
})


//Fetch  

self.addEventListener('fetch', event=>{
    console.info('SW fetch', event.request.url);
    event.respondWith(
    caches.match(event.request)
        .then(res=>{
            return res || fetch(event.request);
        })
    )
    
})




   
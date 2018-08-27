var streamapi = "https://wind-bow.glitch.me/twitch-api-streams/";
var channelapi ="https://wind-bow.glitch.me/twitch-api-channels/";
var channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

function allStreamCall(streamchannel) {
    var logo,name,game,status,statusdesc,channel_link;
    
    var streamchannel_url=streamapi+streamchannel+"?callback=?";
    var channel_url=channelapi+streamchannel+"?callback=?";
    
    
    
    $.getJSON(streamchannel_url,function(data){
        if(data.status == '404'){
            game = " ";
            status = 'offline';
            statusdesc = "offline";
        } else if(data.status =='422') {
            game = " ";
            status="offline";
            statusdesc="offline";
        } else {
            data=data.stream;
            if(data===null){
                game = " ";
                status="offline";
                statusdesc = "";
                logo = "";
            } else {
                game = data.channel.game;
                status = "online";
                statusdesc = ":" + data.channel.status;
            }
        }
        
    $.getJSON(channel_url, function(data){
        name = data.display_name;
        logo = data.logo;
        channel_link = data.url;
        if(data.status=='404') {
            name=streamchannel;
            channel_link=data.url;
            logo= data.logo;
        } else if(data.status=='422') {
            name=streamchannel;
            channel_link: data.url;
            logo= data.logo;
        } else if(logo===null){
            logo="http://buildingscholars.utep.edu/web/images/no_avatar_m.png"
        } 
        
        var result = "\
        <div class= 'row' id = '"+status+"'>\
        <div class='col-md-3 col-xs-4'>\
        <span class='logo'><img class='img img-circle' src='"+logo+"''></span>\
        <a href='"+channel_link+"'>\
        <span class='name text-center'>"+name+"</span>\
        </a>\
        </div>\
        <div class='col-md-9 col-xs-8 text-center' id='statusdescription'> <span class='game'>"+game+"</span> <span class='status'>"+statusdesc+"</span> </div> </div>";
        
      if (status=='offline')
    $('.results').append(result);
    else
    $('.results').prepend(result);
        
    });

    });
        
    };

$(document).ready(function(){
    channels.forEach(function(channel){
        allStreamCall(channel);
    });
    
$('#all').click(function(){
    var all =$('.results .row');
    all.each(function(index){
        $(this).css({'display':'block'});
    });
});

   
$('#online').click(function(){
    var online=$('.results .row');
    online.each(function(index){
    var toggle=$(this).attr('id');
    if(toggle=='online'){
        $(this).css({'display':'block'});
    }
    else if(toggle=='offline'){
        $(this).css({'display':'none'});
    }
    });
});   
    
    $('#offline').click(function(){
    var offline=$('.results .row');
    offline.each(function(index){
    var toggle=$(this).attr('id');
    if(toggle=='offline'){
        $(this).css({'display':'block'});
    }
    else if(toggle=='online'){
        $(this).css({'display':'none'});
    }
    });
});
    
    
});
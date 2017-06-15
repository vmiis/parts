var _header_opacity_Home="1"
var _header_opacity="1"
var _redirect_module="";
var home_module_name='home';
//------------------------------------
$vm.root_layout_content_slot="content_slot__ID";
$vm.root_layout_header='header__ID';
$vm.root_layout_footer='footer__ID';
//------------------------------------
//for old vm.js
g_vm.root_layout_content_slot="content_slot__ID";
g_vm.root_layout_header='header__ID';
g_vm.root_layout_footer='footer__ID';
//------------------------------------
window.onmessage=function(e){
    if(e.data.username==undefined || e.data.user_id==undefined) return;
    $vm.user=e.data.username;
    $vm.user_id=e.data.user_id;
    $VmAPI.set_token(e.data.token,e.data.api_url,e.data.username,e.data.user_id,e.data.nickname);
    location.reload(true);
    g_user=e.data.username;
    login_changed();
};
//------------------------------------
$('#D__ID').on('login_changed',function(){
    login_changed();
});
//------------------------------------
$('#D__ID').on('login_changed_v2',function(){
    login_changed_v2();
});
//------------------------------------
$('#nav__ID li').on('click',function(event){
    event.stopPropagation();
    process_click(this);
    var name=$(this).attr('data-name');
    if(name!==undefined){ //close
        /*
        if($vm.mobile===1){
            $("#menu_button__ID").triggerHandler('click');
            $vm.mobile=0;
        }
        */
        if( $('#nav__ID').find(".button").hasClass('menu-opened')==true ){
            $('#nav__ID').find(".button").triggerHandler('click');
        }
    }
});
//---------------------------------------------
$('#m_nav__ID li').on('click',function(event){
    event.stopPropagation();
    process_click(this);
    var name=$(this).attr('data-name');
    if(name!==undefined){ //close
        $("#menu_button__ID").triggerHandler('click');
    }
});
//---------------------------------------------
var load_module=function(name){
    var mid;//=$vm.module_list[name][0];
    var url;//=$vm.module_list[name][1];
    if(Array.isArray($vm.module_list[name])===true){
        mid=$vm.module_list[name][0];
        url=$vm.module_list[name][1];
    }
    else{
        mid=$vm.module_list[name]['table_id'];
        url=$vm.module_list[name]['url'];
    }
    var id=$vm.module_list[name].id;
    if(id==undefined) id=$vm.id();
    $vm.module_list[name].id=id;
    var param={
        name:name,
        pid:id,//$vm.id(url+mid),
        slot:$vm.root_layout_content_slot,
        url:$vm.url(url),
    }
    $vm.load_module(param);
    process_background(name);
}
//------------------------------------
var process_background=function(name){
    //$('#content_slot__ID').css('transition','all 0.7s ease-in-out');
    if(typeof(overwrite_process_background)!=='undefined'){
        overwrite_process_background(name);
    }
    else{
        if(name==home_module_name){
            $('#content_slot__ID').css('background','rgba(255, 255, 255, 0');
            $('#header__ID').css('opacity',_header_opacity_Home);
        }
        else{
            $('#content_slot__ID').css('background','rgba(255, 255, 255, 1');
            $('#header__ID').css('opacity',_header_opacity);
        }
    }
    if(name==home_module_name){
        $('#control_prev__ID').show();$('#control_next__ID').show();
        //$('#slider__ID').show();
        $('body').css('overflow-y','hidden');
        $('body').css('overflow-x','hidden');
    }
    else{
        $('#control_prev__ID').hide();$('#control_next__ID').hide();
        //$('#slider__ID').hide();
        $('body').css('overflow-y','visible');
        $('body').css('overflow-x','visible');
    }
}
//------------------------------------
var process_click=function(li){
    var name=$(li).attr('data-name');
    var a=$(li).attr('data-a');
    var b=$(li).attr('data-b');
    var m=$(li).attr('data-m');
    if(name!==undefined){
        load_module(name);
        process_background(name);
    }
    else if(m!==undefined)  $(this).vm6('load_module',  m, $vm.root_layout_content_slot);
    else if(a!==undefined){
        window.open(a+"?d=1");
        return;
    }
    else if(b!==undefined){
        //if(b==='1') window.open($VmAPI.api_base+"signin.aspx?url="+window.location.href,"Sign In","width=600, height=600");
        if(b==='1') window.open($VmAPI.api_base+"signin.html?url="+window.location.href,"Sign In","width=600, height=600");
        else if(b==='2') signout();
        else if(b==='5'){
            localStorage.clear();
            alert('The local storage is cleared');
            return;
        }
    }
    else{
        return;
    }
}
//------------------------------------
var login_changed=function(){
    $vm.user=$VmAPI.get_username();
    if($vm.user=="" || $vm.user==null) $vm.user="guest";
    //$vm.user=g_user;
    //$vm.user_id=g_user_id;
    $('#sign__ID').text($vm.user);
    if($vm.user!='guest'){
        $('#username__ID').text('Login as '+ $vm.user);
        $('#signin__ID').hide();
        $('#myaccount__ID').show();
        $('#signout__ID').show();
        $('#create__ID').hide();
        $('#m_signin__ID').hide();
        $('#m_signout__ID').show();
    }
    else{
        $('#username__ID').text('');
        $('#signin__ID').show();
        $('#myaccount__ID').hide();
        $('#signout__ID').hide();
        $('#create__ID').show();
        $('#m_signin__ID').show();
        $('#m_signout__ID').hide();
    }
    if(_redirect_module!=='') load_module(_redirect_module);
    else load_module('home');
};
//---------------------------------------------
var login_changed_v2=function(){
    $vm.user=$VmAPI.get_username();
    if($vm.user=="" || $vm.user==null) $vm.user="guest";
    //$vm.user=g_user;
    //$vm.user_id=g_user_id;
    $('#sign__ID').html($vm.user);
    if($vm.user!='guest'){
        $('#username__ID').text('Login as '+ $vm.user);
        $('#signin__ID').hide();
        $('#signout__ID').show();
        $('#m_signin__ID').hide();
        $('#m_signout__ID').show();
    }
    else{
        $('#username__ID').text('');
        $('#signin__ID').show();
        $('#signout__ID').hide();
        $('#m_signin__ID').show();
        $('#m_signout__ID').hide();
    }
};
//---------------------------------------------
var signout=function(){
    $VmAPI.clear_token();
    $VmAPI.request({data:{cmd:'signout'},callback:function(c){
        g_user="guest";
        g_user_id="";
        $vm.user="guest";
        $vm.user_id="";
        login_changed();
        location.reload(true);
    }});
};
//---------------------------------------------
var layout_resize=function(){
    var slideWidth=window.innerWidth;
    var slideHeight=window.innerHeight;
    var slideCount = $('#slider__ID ul li').length;
    var sliderUlWidth = slideCount * slideWidth;
    $('#slider__ID').css({ width: '100%', height: slideHeight });
    $('#slider__ID ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });

    var header_height=$('#header__ID').outerHeight();
    $vm.min_height=$(window).height()-header_height-$('#footer__ID').outerHeight();
    $('#content_slot__ID').css('min-height',$vm.min_height+'px');
};
//------------------------------------
window.addEventListener("resize", function(){ layout_resize(); });
//------------------------------------
on_load();
setTimeout(function () {
    layout_resize();
}, 500);
//------------------------------------

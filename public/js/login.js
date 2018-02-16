$(document).ready(() => {

    var sendMessage = (type, message) => {
        return new PNotify({
            type: type,
            text: message,
        });
    }


    $('#frm_login').submit(e => {
        e.preventDefault()
        $.post('/educativo/home', $('#frm_login').serialize(), data => {
           if(data.login!==''){
               $('#content_body').css({'display':'block'})
               $('#content_form').css({'display':'none'})
               sendMessage('success',data.message)
           }else{
                sendMessage('error',data.message)
           }
        })
    })
})
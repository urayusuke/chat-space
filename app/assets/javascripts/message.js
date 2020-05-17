$(function(){
  function buildHTML(message){
    if (message.image) {
      var html =  
      `<div class = "chat-main__message-list">
        <p class ="chat-main__message-list-name">
          ${message.user_name}
        </p>
        <p class = "chat-main__message-list-date">
          ${message.created_at}
        </p>
        </div>
        <div class ="chat-main__message-list">
          <p class="chat-main__message-list-comment">
            ${message.content}
          </p>
        <img src =${message.image}> 
        </div>`
    return html;
    } else {
      var html = 
      `<div class = "chat-main__message-list">
        <p class ="chat-main__message-list-name">
          ${message.user_name}
        </p>
        <p class = "chat-main__message-list-date">
          ${message.created_at}
        </p>
      </div>
      <div class ="chat-main__message-list">
        <p class="chat-main__message-list-comment">
          ${message.content}
        </p>
      </div>`
    return html;
    }
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message').append(html);
      $('.chat-main__message-list')[0].reset;
      $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
      $('.chat-main__message-form-btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});
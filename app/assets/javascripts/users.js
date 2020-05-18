$(function(){
  function addUser(user) {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">${user.name}</p>
        <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
      </div>
    `
    $("#user-search-result").append(html);
  }

  function addNoUser() {
    var html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `
    $("#user-search-result").append(html);
  }

  function addMember(id,name) {
    var html = `
    <div class="chat-group-user clearfix" id="${id}">
    <input name = "group[user_ids][]" type="hidden" value="${id}">
    <p class = "chat-group-user__name">${name}</p>
    </div>`
    $("#chat-group-users").append(html)
  }

  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();   
    $.ajax({
      type: "GET",    
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user) {
          addUser(user);
        });
      } else if (input.length == 0) {
        return false;
      } else {
        addNoUser();
      }
    })
    .fail(function() {
      alert("ユーザー検索に失敗しました");
    });
  });
  $(document).on('click',".chat-group-user__btn--add", function(){
    var id = $(this).attr("data-user-id");
    var name = $(this).attr("data-user-name");
    $(this).parent().remove();
    addMember(id,name);
  });
  $(document).on('click', ".user-search-remove", function() {
    $(this).parent().remove();
  });
});
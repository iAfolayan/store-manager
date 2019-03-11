(function() {
  document.addEventListener('DOMContentLoaded', populate);
}());


async function populate() {
  const users = await User.get();
  const tbody = document.querySelector('.usersDisplay');
  users.map(function(user){
    tbody.appendChild(UserTemplate.view(user));
  });
}

async function disabledAccount() {
  const msg = await User.disable(userId);
  if (msg) {
    Action.notify(msg, 'success');

    setTimeout(function(){
      window.location = 'viewUsers.html';
      return Action.notify(response.msg)
    }, 3000)
  }
  toggleModal();
}

function disableAction(usrId) {
  userId = usrId;
  toggleModal();
}
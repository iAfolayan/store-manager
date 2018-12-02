async function handleSubmit(event) {
  event.preventDefault();
  const signupForm = document.querySelector('#signupForm');
  const formData = {
     staffId: signupForm.staffId.value,
     title: signupForm.title.value,
     password: signupForm.password.value,
     firstname: signupForm.firstname.value,
     lastname: signupForm.lastname.value,
     emailaddress: signupForm.emailaddress.value,
     phonenumber: signupForm.phoneNumber.value,
     role: signupForm.role.value,
     gender: signupForm.gender.value,
     avatar: signupForm.profileImage.value,
     contactaddress: signupForm.address.value
   };
   const msg = await User.add(formData);
   if (msg) {
    Action.notify(msg, 'success');
    setTimeout(function() {
      window.location = 'createUser.html';
      return Action.notify(response.msg, 'success');
    }, 3000);
  };
}
document.querySelector('#newUser').addEventListener('click', handleSubmit);
(function() {
  document.addEventListener('DOMContentLoaded', populate);
}());

async function populate() {
  const { staffId } = jwt_decode(token);  
  console.log('USER>>>>>>', staffId)
  const user = await User.getById(staffId);
 
console.log(user);
  // document.querySelector('.productDisplay').innerHTML = productList;
}
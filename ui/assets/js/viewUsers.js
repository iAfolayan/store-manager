/* eslint-disable no-multi-assign */
/* eslint-disable max-len */
/* eslint-disable no-undef */
// Protect page if user is not admin
if (decoded.role !== 1) window.location = '../index.html';

/**
 * @method tabulateUsers
 * @param {*} sn - User Serial number
 * @param {*} id - User Identity number
 * @param {*} staffId - Staff identity
 * @param {*} userFirstname - Staff First name
 * @param {*} userLastname Staff Last name
 * @returns {data} - Returns available users
 */
const tabulateUsers = (sn, id, staffId, userFirstname, userLastname) => `<tr>
<td>${sn}.</td>
<td>${staffId}</td>
<td>${userLastname}</td>
<td>${userFirstname}</td>
<td>
  <button class="editBtn" onclick="makeUserAnAdmin('${id}')">Make Admin</button>
  <button class="deleteBtn">Disable</button>
</td>
</tr>`;

const url = `${hostedServer}auth/users`;

fetch(url, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    authorization: token
  }
})
  .then(data => data.json())
  .then((response) => {
    let sn = 0;
    if (response.data === 0) return userFeedbackMessage('No user found', 'danger');
    const users = response.data
      // eslint-disable-next-line no-return-assign
      .map(user => tabulateUsers(sn += 1, user.id, user.staffid, user.firstname, user.lastname)).join('');

    document.querySelector('.usersDisplay').innerHTML = users;
  })
  .catch(err => userFeedbackMessage('No User found', 'danger'));

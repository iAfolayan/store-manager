const Action = (function() {
  function notify(msg, type) {
    const messageBox = document.querySelector('#messageBox');
  
    messageBox.textContent = msg;
    messageBox.classList.add(type);
  
    setTimeout(() => {
      messageBox.setAttribute('style', 'display: none;');
    }, 5000);
  }

  return { notify };
}());

const Request = (function() {
  function handle(url, opts, callback, errMsg) {
    const options = Object.assign({}, opts, {
      headers: {
        'Content-Type': 'application/json',
        ...opts.headers
      },
    });
  
    console.log('url -->', url, options);
    
    return fetch(url, options)
      .then(function(rawResponse) {
        return rawResponse.json();
      })
      .then(callback)
      .catch(function(err) {
        if (err && errMsg) return Action.notify(errMsg, 'danger');
      });
  };
  
  return { handle };
}());

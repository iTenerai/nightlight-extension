function getCookies(domain, name, callback) {
    chrome.cookies.get({"url": domain, "name": name}, function(cookie) {
        if(callback) {
            callback(cookie.value);
        }
    });
}

async function fetchData() {
    var username = document.getElementById('nightlight-extension-username');
    var pfp = document.getElementById('nightlight-extension-pfp');
    var redirect = document.getElementById('nightlight-extension-redirect');

    getCookies("https://night-light.cz/", "username", function(id) {
        if(id === "" || id === null) return;
        else{
            username.innerHTML = id;
            pfp.src = "https://night-light.cz/userData/posts/" + id + "/profilePicture.gif";
            redirect.href = "https://night-light.cz/u/"+ id;
        }
    });

}

fetchData();
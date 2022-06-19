function getCookies(domain, name, callback) {
    chrome.cookies.get({
        "url": domain,
        "name": name
    }, function (cookie) {
        if (callback) {
            if (cookie === null) {
                callback(null)
            } else {
                callback(cookie.value);
            }
        }
    });
}

async function fetchData() {
    var div = document.getElementById('fetchDataDiv');
    var normdiv = document.getElementById('diva');
    var notloggedindiv = document.getElementById('notloggedindiv');
    normdiv.style.display = "none";
    div.style.display = "flex";
    var username = document.getElementById('nightlight-extension-username');
    var pfp = document.getElementById('nightlight-extension-pfp');
    var redirect = document.getElementById('nightlight-extension-redirect');
    var stats = document.getElementById('nightlight-extension-stats');

    var password = "something";

    getCookies("https://night-light.cz/", "password", function (id) {
        password = id;
    });

    getCookies("https://night-light.cz/", "username", function (id) {
        if (id === "" || id === null) {
            normdiv.style.display = "none";
            div.style.display = "none";
            notloggedindiv.style.display = "flex";
        } else {

            //Get NLAPI reference
            var nlapi = getNLAPI(id, password);

            //Get user object
            var user = nlapi.getUser(id);

            //Fetch JSON
            user.getAll().then((data) => {
                console.log(data);
                stats.innerHTML = "Followers " + data['followers'].length + " | Following " + data['following'].length
            });
            username.innerHTML = id;
            pfp.src = "https://night-light.cz/userData/posts/" + id + "/profilePicture.gif";
            redirect.href = "https://night-light.cz/u/" + id;
            setTimeout(() => {
                normdiv.style.display = "block";
                div.style.display = "none";
            }, 1000);
        }
    });

}

document.getElementById("syncbutton").addEventListener("click", () => {
    fetchData();
});

document.getElementById("loginbutton").addEventListener("click", () => {
    window.open("https://night-light.cz/account/login", 'popUpWindow', 'height=400,width=600,left=10,top=10,,scrollbars=yes,menubar=no');
    return false;
});


fetchData();
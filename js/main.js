window.addEventListener("load", () => {

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };

    setLoading(true);
    window.api.send("getAccount");
    window.api.once("account", (account) => {

        if (document.getElementById("nickname")) document.getElementById("nickname").innerText = account.pseudonyme;
        if (document.getElementById("playerName")) document.getElementById("playerName").innerText = account.pseudonyme;
        if (document.getElementById("rank")) document.getElementById("rank").innerText = account.rank;
        document.getElementById("skinHead").src = account.skin;

        if (document.getElementById("adminSidebar")) {
            if (account.rank == "Administrateur" || account.rank == "Modérateur" || account.rank == "Modérateur-Test") document.getElementById("adminSidebar").innerHTML = '<li class="sidebar-item"><a role="button" id="adminSidebar"><div class="row"><div class="col-3"><img src="img/fire_resistance.webp" style="width: 50px;"></div><div class="ps-3 col-9"><span class="navlink-text"><small>Dommioss:</small><br>Administration</span></div></div ></a ></li> ';
        
        }

        const ctx = document.getElementById("skinHead").getContext("2d");
        ctx.imageSmoothingEnabled = false;
        const img = new Image();
        img.onload = () => ctx.drawImage(img, 8, 8, 8, 8, 0, 0, 64, 64);
        img.src = account.skinUrl;

        setLoading(false);
    });

    let lastMessage = null;
    setLoading(true);
    window.api.send("getGameStatus");
    window.api.on("gameStatus", (gameStatus) => {

        if (lastMessage === null) {
            lastMessage = gameStatus.message;
            setLoading(false);
        }

        if (gameStatus.message !== lastMessage) {
            toastr.info(gameStatus.message, "Lancement du jeu");
            lastMessage = gameStatus.message;
        }
    });

    document.getElementById("logout").addEventListener("click", () => {

        setLoading(true);
        window.api.send("logout");
        window.api.once("loggedOut", (completed) => {

            if (completed) {
                document.location.assign("login.html");
                return;
            }

            toastr.error("Un problème est survenu lors de la déconnexion.", "Déconnexion");
            setLoading(false);
        });
    });
});
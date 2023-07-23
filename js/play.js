window.addEventListener("load", () => {

    setLoading(true);
    window.api.send("getAccount");
    window.api.once("account", (account) => {

        if (document.getElementById("firstName")) document.getElementById("firstName").innerText = account.firstName;
        if (document.getElementById("names")) document.getElementById("names").innerText = account.firstName + " " + account.lastName;
        setLoading(false);
    });

    if (document.getElementById("playDYL")) document.getElementById("playDYL").addEventListener("click", () => {

        window.api.send("play");

    });


    document.getElementById("adminSidebar").addEventListener("click", () => {

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

        window.api.send("adminLaunch");

        toastr.info('Lancement du module <b>Dommioss: Administration</b> en cours');
    });

    window.api.on("gameStatus", (gameStatus) => {
        if (document.getElementById("playDYL")) document.getElementById("playDYL").disabled = gameStatus.launched;
        document.getElementById("progressbar").style.width = (gameStatus.progress / gameStatus.max * 100) + "%";
    });
});
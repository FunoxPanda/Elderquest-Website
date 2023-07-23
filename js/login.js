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
    window.api.send("loginWithRefreshToken");
    window.api.once("loggedWithRefreshToken", (completed) => {

        if (!completed) {
            setLoading(false);
            return;
        }

        document.location.assign("play.html");
    });

    setLoading(true);
    window.api.send("getConfig");
    window.api.once("config", (config) => {

        if (typeof config.email === "string") {
            document.getElementById("email").value = config.email;
            document.getElementById("password").focus();
        } else {
            document.getElementById("email").focus();
        }

        setLoading(false);
    });

    document.getElementById("processLogin").addEventListener("click", () => {

        setLoading(true);
        window.api.send("loginWithCredentials", document.getElementById("email").value, document.getElementById("password").value);
        window.api.once("loggedWithCredentials", (error) => {

            if (error) {
                toastr.error(error, "Connexion");
                setLoading(false);
                return;
            }

            document.location.assign("play.html");
        });
    });
});
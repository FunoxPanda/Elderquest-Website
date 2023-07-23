window.addEventListener("load", () => {

    setLoading(true);
    window.api.send("getConfig");

    window.api.on("config", (config) => {

        document.getElementById("stayOpen").checked = config.stayOpen;
        document.getElementById("ram").value = config.ram;
        setLoading(false);
    });

    document.getElementById("save").addEventListener("click", () => {

        setLoading(true);
        window.api.send("setConfig",
            document.getElementById("stayOpen").checked,
            parseInt(document.getElementById("ram").value));
    });
});
let loadings = 0;
const setLoading = (loading) => {
    loadings += loading ? 1 : -1;
    if (loadings === 0) {
        document.getElementById("loader").style.opacity = "0";
        setTimeout(() => document.getElementById("loader").style.display = "none", 400);
    } else {
        document.getElementById("loader").style.display = "";
        document.getElementById("loader").style.opacity = "";
    }
}
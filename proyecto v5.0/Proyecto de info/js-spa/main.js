import { Navbar } from "./components/navbar.js";
import { Footer } from "./components/footer.js";
import { router } from "./router.js";
import { back } from "./components/goback.js";
import {headerUsuario} from "./components/headerUsuario.js";









document.getElementById("navbar").innerHTML = Navbar();
//document.getElementById("navbar").innerHTML = Navbar();

document.getElementById("goback").innerHTML = back();


//document.getElementById("headerUsuario").innerHTML = headerUsuario();
document.getElementById("footer").innerHTML = Footer();

window.addEventListener("hashchange", router);
window.addEventListener("load", router);

const usuario =document.getElementById ( "Input-usuario")
const contraseña = document.getElementById ("Input-contraseña")
const btnlogin = document.getElementById("btn")

function login()
{
 if  (usuario.value === "Agostina" && contraseña.value === "1234")
    window.location = "pages/indexusuario.html"
   

else if (usuario.value === "Admin"  && contraseña.value === "1234")
{
    window.location ="pages/indexadmin.html"
}
else{
    alert("Datos incorrectos, vuelva a cargar")
}

}

btnlogin.addEventListener('click',login)

















/* // Obtención de elementos del DOM
const $submit = documento.getElementById ("submit"),
$password = document.getElementById("password"),
$username = document.getElementById("username"),
$visible = document.getElementById("visible");

//funciona para mostrar u ocultar la contraseña
document.addEventListener("change", (e)=>{
    if(e.target === $visible){
        if($visible.checked === false) $password.type = "password" //contraseña oculta
        else $password.type="text"; //contraseña visible
    }
});
//funcion para manejar el cuando hacemos clik en algun lugar del documento osea en el boton 
document.addEventListener("click" ,(e) =>{

    if(e.target === $submit){
        //validacion de campos vacios 
        if($password.value !== "" && $username.value !== "" && $password.value === "adminn1234" && $username.value==="agos juarez") {
         
            e.preventDefault (); //evita que se envie solo el formulario
            
            windonw.location.href="pagges/indexadmin.html";
        }

        else if($password.value !== "" && $username.value !== "" && $password.value=="usuario1234"){

            e.preventDefault ();

                window.location.href="pagges/indexusuario.html";
        }
        else{
            alert ("acceso denegado");
        }
    }
}) */
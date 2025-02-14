function validate()
        {
            event.preventDefault();
            var email=document.getElementById("email").value;
            var pswrd=document.getElementById("password").value;
            var cpswrd=document.getElementById("cpassword").value;
            var emailPattern =  /^[a-zA-Z0-9]+@[a-zA-Z0-9-]++^(?=_)(?=.)(?:\.[a-zA-Z0-9-]+)*$/;
            var passPattern= /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,14}$/;
            var c=3;
            if(!emailPattern.test(email))
            {
                document.getElementById("alert").innerHTML=" Email format error";
                document.getElementById("alert").style.backgroundColor='red';
                c--;
            }     
            else if(pswrd.length<8)
            {       
                document.getElementById("alert").innerHTML="Password should contain atleast 8 charecters";
                document.getElementById("alert").style.backgroundColor='red';
                c--;
            }
            else if(!passPattern.test(pswrd))
            {
                document.getElementById("alert").innerHTML=" Password format error";
                document.getElementById("alert").style.backgroundColor='red';
                c--;
            }
            else if(pswrd!=cpswrd)
            {
                    document.getElementById("alert").innerHTML="Passwords are not same";
                    document.getElementById("alert").style.backgroundColor='red';
                    c--;
            }

            if(c==3)
            {
                document.getElementById("alert").innerHTML="Account created Successfully..!!!";
                document.getElementById("alert").style.backgroundColor="green";
                setTimeout(function(){ window.location.href="success.html"}, 500);
            }
        }
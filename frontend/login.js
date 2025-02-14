function validate()
        {
            event.preventDefault();
            var email=document.getElementById("email").value;
            var pswrd=document.getElementById("pswrd").value;
            var emailPattern =  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
            var c=2;
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
            if(c==2)
            {
                document.getElementById("alert").innerHTML="Your details are validated";
                document.getElementById("alert").style.backgroundColor="green";
                setTimeout(function(){ window.location.href="success.html"}, 500);
            }
        }
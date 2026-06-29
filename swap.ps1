 = Get-Content index.html;  = [0..302];  = [303..501];  = [502..543];  = [544..(.Length - 1)];  =  +  +  + ;  | Set-Content index.html -Encoding UTF8; echo done

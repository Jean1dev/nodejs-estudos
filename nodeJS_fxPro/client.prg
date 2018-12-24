LOCAL test

CLEAR 
test = NEWOBJECT('client')
test.testar()

*-------------------------------------------------------
DEFINE CLASS client as Custom
*-------------------------------------------------------

	http = NULL
	
	FUNCTION init()
		this.http = CREATEOBJECT("Microsoft.XMLHTTP")
	ENDFUNC 
	
	FUNCTION testar()
		LOCAL ret
		ret = this.http.open('GET', 'http://localhost:8080/')
		this.http.send()

		DO WHILE this.http.readyState <> 4
			?'caiu'
		ENDDO 
		CLEAR 
		?LEFT(this.http.responseText, 1000)
	ENDFUNC 

ENDDEFINE 

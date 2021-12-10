{"deny-list": ["merchant-A", "merchant-B"]}

{"deny-list": "merchant-B"]}

{ "violations": ["merchant-denied"], "account": { "deny-list": ["merchant-A", "merchant-B"], "available-limit": 950, "active-card": true } }

===========================
{"account": {"active-card": true, "available-limit": 100, "deny-list": ["merchant-A", "merchant-B"]}, "violations": []}


# Evento novo
deny
quando um evento desse, adc em uma lista de merchant proibidos

# nova regra no autorizador
quando eu receber uma transacao de um merchant proibido a operacao deve falhar

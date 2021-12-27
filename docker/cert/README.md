# Generate ssl certificate

1. Run commands (as common name use *.localdomain)
 
 - `openssl genrsa -des3 -out dockerDomain.key 2048`
 - `openssl req -newkey rsa:2048 -nodes -keyout dockerDomain.key -out dockerDomain.csr`
 - `openssl x509 -signkey dockerDomain.key -in dockerDomain.csr -req -days 3650 -out dockerDomain.crt`
 - `openssl req -x509 -sha256 -days 3650 -newkey rsa:2048 -keyout dockerRootCA.key -out dockerRootCA.crt`
 - `openssl x509 -req -CA dockerRootCA.crt -CAkey dockerRootCA.key -in dockerDomain.csr -out dockerDomain.crt -days 3650 -CAcreateserial -extfile dockerDomain.ext`

2. Copy certificate `dockerRootCA.crt` to `/etc/ca-certificates/trust-source/anchors/`
3. Install root certificate. Run command `sudo update-ca-trust`

## Links

### 1. Get configutation links

http://localhost:8080/realms/sample-realm/.well-known/openid-configuration

## Token Testing

```
curl --location 'http://localhost:8080/realms/sample-realm/protocol/openid-connect/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=password' \
--data-urlencode 'client_id=sample-client' \
--data-urlencode 'username=user1' \
--data-urlencode 'password=12345' \
--data-urlencode 'client_secret=s2dDsU2alTffPh471iiFonDXHybZLjsq'
```
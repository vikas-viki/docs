### JWT (JSON Web Token)

JWT is a compact, URL-safe token format used to securely transmit information between two parties. It is widely used for stateless(server doesn't need to store any data, its all in payload) authentication in web applications.


`JWT consists of three parts, separated by dots:`
**`header.payload.signature`**

Header: Contains metadata about the token, e.g., algorithm (alg) and type (typ).

Payload: Contains claims (data) like user ID, roles, expiry time, etc.

Signature: Ensures the token hasn’t been tampered with. Created by signing the header and payload with a secret or private key.

`the payload is base64url encoded data that we embed. it can be read by anyone and is always stored in jwt. base64url encoded, which is not encryption, just a way to turn data it into a string safe for URLs.`


```js
const payload = { userId: 123, role: "admin" };
const jsonStr = JSON.stringify(payload);
const base64Str = Buffer.from(jsonStr).toString('base64');
```

#### verification of jwt
*when the server recieves a jwt, to verify, what it does is, it extracts the header and payload (which everyone can), but it has the secrect which only it knows. it uses that secret to sign the data again, then compares the new signature with old one to verify that its not tempered.*


1. What is JWT?
Answer: A JSON Web Token (JWT) is a compact, self-contained token that securely transmits information between parties, and can be verified and trusted because it is digitally signed.

2. How does JWT authentication work?
Answer: The server generates a JWT after verifying user credentials. The client stores the JWT and sends it with requests (usually in the Authorization header). The server validates the token and grants access.

3. What are the three parts of a JWT?
Answer: Header, Payload, and Signature.

4. What is a claim in JWT?
Answer: A claim is a piece of information about the user or token. Claims can be registered (iss, exp), public, or private.

5. What is the difference between HS256 and RS256?
Answer: HS256 uses a shared secret for signing (HMAC), while RS256 uses a private key to sign and a public key to verify. RS256 is better for distributed systems.

6. How do you revoke a JWT?
Answer: Since JWT is stateless, revocation can be implemented using a blacklist of jtis, short-lived access tokens with refresh tokens, or token introspection endpoints.

7. Where should JWTs be stored on the client side?
Answer: Securely in memory or in httpOnly cookies. Avoid localStorage to prevent XSS attacks.

8. What is the purpose of the exp claim?
Answer: It defines the expiration time of the token, after which it is no longer valid.

9. Can JWT payload data be trusted?
Answer: Not blindly. While the signature ensures integrity, the payload itself is not encrypted (unless using JWE). Sensitive data should not be stored in JWT payload.

10. What are some security best practices for JWT?
Answer:

Always use HTTPS

Use short expiry times for access tokens

Prefer RS256 for distributed verification

Validate iss, aud, exp, nbf

Do not store sensitive information in the payload

Implement token revocation strategy
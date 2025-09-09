# 🔒 TLS Handshake Explained

## 1. Client Hello
Your browser (the client) says:

> “I want to talk securely.”

It sends:
- Supported TLS versions  
- Supported cipher suites (algorithms for encryption)  
- A random number (used later for key generation)  

---

## 2. Server Hello + Certificate
The server responds:
- Chooses a TLS version + cipher suite from what the client offered.  
- Sends its **SSL/TLS certificate**, which contains:
  - Domain name (`example.com`)  
  - Server’s public key  
  - Issuer info (CA that signed it)  
  - Validity period  
  - Digital signature from the CA  

---

## 3. Certificate Verification (Browser Checks Cert)
The browser (or client library like `curl`) now verifies the certificate:
- ✅ Is it signed by a trusted **Certificate Authority (CA)** in the system’s root store?  
- ✅ Is the domain (`example.com`) correct?  
- ✅ Is it still valid (not expired, not revoked)?  

👉 If these checks fail → you see **“Not Secure” / certificate error** in the browser.  

---

## 4. Key Exchange (Using the Cert’s Public Key)
Now the client and server need a **shared session key** (for encryption).  

- **Old TLS (RSA):**
  - Client generates a session key.  
  - Encrypts it with the server’s **public key** (from the certificate).  
  - Sends it to the server.  
  - Server decrypts it with its **private key**.  

- **Modern TLS (ECDHE):**
  - Both sides exchange **ephemeral keys** (Diffie-Hellman).  
  - Server signs its DH key with its cert’s **private key** to prove authenticity.  
  - Both compute the same **session key independently**.  

# Common HTTP Status Codes

| Code | Name                       | Use Case Example                                                                  |
| ---- | -------------------------- | --------------------------------------------------------------------------------- |
| 200  | OK                         | Successful GET/POST request (e.g., fetching user profile).                        |
| 201  | Created                    | Resource successfully created (e.g., user registered, order placed).              |
| 202  | Accepted                   | Request accepted for processing, but not completed yet (e.g., async job started). |
| 204  | No Content                 | Request succeeded, no body to return (e.g., successful DELETE).                   |
| 301  | Moved Permanently          | Resource moved to a new URL (SEO-friendly redirects).                             |
| 302  | Found (Temporary Redirect) | Temporarily redirect to another URL (e.g., login redirect).                       |
| 304  | Not Modified               | Cached resource is still valid, no need to re-download.                           |
| 400  | Bad Request                | Invalid input (e.g., missing fields in JSON body).                                |
| 401  | Unauthorized               | Authentication required or token invalid/expired.                                 |
| 403  | Forbidden                  | Authenticated but not allowed (e.g., user tries admin-only action).               |
| 404  | Not Found                  | Resource doesn’t exist (e.g., wrong ID in URL).                                   |
| 405  | Method Not Allowed         | Using unsupported HTTP method (e.g., PUT on a read-only endpoint).                |
| 409  | Conflict                   | Resource state conflict (e.g., trying to create duplicate record).                |
| 422  | Unprocessable Entity       | Validation failed (e.g., email format incorrect).                                 |
| 429  | Too Many Requests          | Rate limiting (e.g., API request quota exceeded).                                 |
| 500  | Internal Server Error      | Unexpected server crash or bug.                                                   |
| 502  | Bad Gateway                | Server received invalid response from upstream.                                   |
| 503  | Service Unavailable        | Server temporarily overloaded or down for maintenance.                            |
| 504  | Gateway Timeout            | Upstream server took too long to respond.                                         |

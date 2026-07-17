# Reference Server Layout

This is the backend shape behind the extension prototype.

```text
backend
  api
    src
      auth.ts
      regions.ts
      sessions.ts
      signatures.ts
      health.ts
    migrations
    tests
  gateway
    docker
      haproxy.cfg
      squid.conf
      dante.conf
    terraform
      modules
        region
        gateway
        load-balancer
        egress-ip-pool
```

## Gateway Options

- HAProxy: TLS termination, CONNECT routing, rate limits.
- Squid: mature HTTP/HTTPS proxy with ACLs and auth helpers.
- Dante: SOCKS5 proxy support.
- Envoy: modern L4/L7 proxying and rich telemetry.

## Credential Strategy

1. Extension authenticates with the API.
2. API checks subscription and device trust.
3. API creates a proxy credential valid for 5 to 30 minutes.
4. Gateway validates credentials through a local cache or internal auth endpoint.
5. Extension renews before expiry while connected.

## Region Rollout Checklist

- Reserve static egress IPs.
- Deploy at least two gateways in separate zones.
- Attach regional load balancer.
- Configure proxy auth validation.
- Register region metadata in the control plane.
- Run leak tests from browser clients.
- Add status page and synthetic probes.

# Example — Custom Domain

Assumindo que você já possui um domínio configurado na Azion.

```bash
azion-flow deploy --build-dir dist --bucket my-bucket --domain example.com
```

Se desejar armazenar na config local, crie `.azionflow/config.json`:

```json
{
  "bucket": "my-bucket",
  "domain": "example.com",
  "buildDir": "dist"
}
```

# Tiny static file server for previewing the site: powershell -File serve.ps1
$root = $PSScriptRoot
$l = New-Object System.Net.HttpListener
$l.Prefixes.Add("http://localhost:8080/")
$l.Start()
Write-Host "Serving $root at http://localhost:8080/"
$types = @{ ".html"="text/html"; ".css"="text/css"; ".js"="application/javascript"; ".svg"="image/svg+xml"; ".png"="image/png"; ".jpg"="image/jpeg" }
while ($l.IsListening) {
  $ctx = $l.GetContext()
  $p = [Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath.TrimStart('/'))
  if ($p -eq "") { $p = "index.html" }
  $f = Join-Path $root $p
  if (Test-Path $f -PathType Leaf) {
    $b = [IO.File]::ReadAllBytes($f)
    $ext = [IO.Path]::GetExtension($f)
    if ($types[$ext]) { $ctx.Response.ContentType = $types[$ext] }
    $ctx.Response.OutputStream.Write($b, 0, $b.Length)
  } else { $ctx.Response.StatusCode = 404 }
  $ctx.Response.Close()
}

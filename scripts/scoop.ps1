$username = $env:USERNAME
$scoopPath = "C:\Users\$username\scoop"
$currentScoop = [Environment]::GetEnvironmentVariable("SCOOP", "User")
if ($currentScoop -eq $null) {
    [Environment]::SetEnvironmentVariable("SCOOP", $scoopPath, "User")
    Write-Output "SCOOP environment variable set to $scoopPath"
} else {
    Write-Output "SCOOP environment variable already exists with value: $currentScoop"
}


$currentUserPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$newPathEntry = "%SCOOP%\shims"
if (-not $currentUserPath.Contains($newPathEntry)) {
    $updatedPath = "$currentUserPath;$newPathEntry"
    [Environment]::SetEnvironmentVariable("PATH", $updatedPath, "User")
    Write-Output "Path updated: $updatedPath"
} else {
    Write-Output "Path already contains $newPathEntry"
}
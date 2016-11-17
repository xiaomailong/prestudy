Import-Module ServerManager
Get-WindowsFeature | out-file B:\WindowsServer2016Features.txt
Add-WindowsFeature -Name NET-Framework-Features
Add-WindowsFeature -Name XPS-Viewer
Add-WindowsFeature -Name Windows-TIFF-IFilter
Add-WindowsFeature -Name Telnet-Client
Add-WindowsFeature -Name NET-Framework-45-ASPNET
Add-WindowsFeature -Name Biometric-Framework


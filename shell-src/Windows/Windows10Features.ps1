#Import-Module ServerManager
#Get-WindowsFeature | out-file B:\Windows10Features.txt

dism.exe /online /enable-feature /featurename:NetFX3 /Source:X:\sources\sxs\microsoft-windows-netfx3-ondemand-package.cab
#Add-WindowsFeature -Name NET-Framework-Features
#Add-WindowsFeature -Name XPS-Viewer
#Add-WindowsFeature -Name Windows-TIFF-IFilter
#Add-WindowsFeature -Name Telnet-Client
#Add-WindowsFeature -Name NET-Framework-45-ASPNET
#Add-WindowsFeature -Name Biometric-Framework


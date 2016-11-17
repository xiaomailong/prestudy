# Windows Server 2016 DataCenter
slmgr.vbs /ipk CB7KF-BWN84-R7R2Y-793K2-8XDDG
slmgr.vbs /skms 54.223.212.31
slmgr.vbs /ato

# 启用无线模块
Import-Module ServerManager
Add-WindowsFeature -Name Wireless-Networking
Add-WindowsFeature -Name Net-Framework-Features

# Get-WindowsFeature | out-file B:\WindowsServer2016Features.txt

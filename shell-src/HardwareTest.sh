#!/bin/bash
# Author:Yingtao.Gu
# Copyright (c) 2016.1
# Script listed as  below:

##########Main  Title################
echo -e "Which item you want to choose[1-6] ? \nYou can type exit to exit this interactive window.\n1.CPU\n2.RAM\n3.Disk\n4.HCA\n5.NIC\n6.MotherBoard\nThe results will be saved in the opt directory."
read Choice

##########Public variable############
Begin=####################################################Begin####################################################
End=#####################################################End#####################################################
echo1="----->"
save="/opt/ServerInformationCollection"

#########1.CPU######
if [ $Choice -eq 1 ];then
    PHNUM=`/usr/bin/lscpu  | egrep  Socket | gawk -F: ' { print$2 }'`
    CONUM=`/usr/bin/lscpu | egrep ^Core | awk '{ print$4 }'`
    echo "$Begin" 2>&1 | tee -a $save
    echo -e "Cpu Mode is $echo1`/usr/bin/lscpu | egrep "Model name" | gawk -F: '{ print $2 }'| tr -d " "`" 2>&1 | tee -a $save
    echo "Phsical Cpu is $echo1 `/usr/bin/lscpu  | egrep  Socket | gawk -F: ' { print$2 }'|tr -d " "`" 2>&1 | tee -a $save
    echo "Phsical Core is $echo1`expr $PHNUM \* $CONUM`"
    echo "Cpu Total Thread is $echo1 `/usr/bin/lscpu  | egrep  "^CPU\(s\)\:" | gawk -F: ' { print$2 }'|tr -d " "`" 2>&1 | tee -a $save
    echo "$End" 2>&1 | tee -a $save

#########2.Memory######
elif [ $Choice -eq 2 ];then
    echo "$Begin" 2>&1 | tee -a $save
    echo "`/usr/sbin/dmidecode -t memory | egrep -A8 -i size  | egrep "(Locator:|Size:|Speed:|Manufacturer:)" | egrep -vi "No Module Installed" | egrep -A4 -i  Size  | egrep -vi "Bank Locator:"`" 2>&1 | tee -a $save
    echo "$End" 2>&1 | tee -a $save

########3.LSI########
elif [ $Choice -eq 3 ];then
    echo -e "which item you want to choose[1-2] ? \n1.Megaraid Card\n2.SAS Hba Card"
    read choice2
    if [ $choice2 -eq 1 ] ; then
        RAID=`/usr/sbin/lspci | egrep -i RAID | awk '{ print $12 }'`
        if  [ "$RAID" == "2208" ] || [ "$RAID" == "2108" ];then
            echo "$Begin" 2>&1 | tee -a $save
            echo "`/opt/MegaRAID/MegaCli/MegaCli64 -AdpAllInfo  -aALL | egrep "Product Name|FW Version|Serial No"`" 2>&1 | tee -a $save
            echo "`/opt/MegaRAID/MegaCli/MegaCli64 -PDList -aALL | egrep -i "Raw Size|Enclosure Device ID:|Slot Number:|Firmware state|Inquiry Data|foreign"  | sort`" 2>&1 | tee -a $save
            echo "`/opt/MegaRAID/MegaCli/MegaCli64   -LDGetNum -aAll`" 2>&1 | tee -a $save
            echo "`/opt/MegaRAID/MegaCli/MegaCli64  -CfgDsply -a0 | egrep "RAID Level"`" 2>&1 | tee -a $save
            echo "$End" 2>&1 | tee -a $save
        else
            echo "$Begin" 2>&1 | tee -a $save
            echo "Here are not any megaraid card can be detected" 2>&1 | tee -a $save
            echo "$End" 2>&1 | tee -a $save
        fi
    elif [ $choice2 -eq 2 ];then
        SERIAL=`/usr/sbin/lspci | egrep -i serial | awk '{ print$11 }'`
        if [ "$SERIAL" == SAS2308 ] || [ "$SERIAL" == SAS2008 ];then
            SERNUM=`/usr/sbin/lspci | egrep -i Serial | wc -l`
            echo "$Begin" 2>&1 | tee -a $save
                for ((i=0;i<$SERNUM;i++));do
                    echo -e "`/opt/smartmgr/scripts/sas2ircu $i display |  egrep "Controller type|Firmware version|Volume ID|Status of volume|Enclosure #|Slot #|State|Size|Model Number|Firmware Revision|Serial No" | sort`" 2>&1 | tee -a $save
                done
            echo "$End" 2>&1 | tee -a $save
        else
            echo "$Begin" 2>&1 | tee -a $save
            echo "Here are not any sas hba card can be detected " 2>&1 | tee -a $save
            echo "$End" 2>&1 | tee -a $save
        fi
    else
        echo "$Begin" 2>&1 | tee -a $save
        echo "Here are not any Lsi SAS and Raid card can be detected." 2>&1 | tee -a $save
        echo "$End" 2>&1 | tee -a $save
    fi

########4.IB########
elif [ $Choice -eq 4 ];then
    MT=`/usr/sbin/lspci | egrep -i mt`
    if [ -n "$MT" ];then
        echo "$Begin" 2>&1 | tee -a $save
        echo "`/usr/sbin/lspci | egrep -i mellanox`" 2>&1 | tee -a $save
        ME=`/usr/sbin/lspci  | egrep -i mt | awk -F: '{ print$1 }'`
            for i1 in $ME;do
                echo "`/usr/sbin/lspci -vv -s 0000:$i1:00.0 |grep SN |awk -F ': ' '{print$2}'`" 2>&1 | tee -a $save
            done
        echo "$End" 2>&1 | tee -a $save
    else
        echo "$Begin" 2>&1 | tee -a $save
        echo "Here are not any Mellanox ib card can be detected" 2>&1 | tee -a $save
        echo "$End" 2>&1 | tee -a $save
    fi

######5.NIC#######
elif [ $Choice -eq 5 ];then
    echo "$Begin" 2>&1 | tee -a $save
    echo "`/usr/sbin/lspci  | egrep -i network | egrep -v MT`" 2>&1 | tee -a $save
    echo "$End" 2>&1 | tee -a $save

######6.MotherBoard######
elif [ $Choice -eq 6 ];then
    echo "$Begin" 2>&1 | tee -a $save
    echo -e "`/usr/sbin/dmidecode  -s  bios-vendor`\n`/usr/sbin/dmidecode  -s  bios-version`\n`/usr/sbin/dmidecode  -s  bios-release-date`\n`/usr/sbin/dmidecode  -s  system-product-name`\n`/usr/sbin/dmidecode  -s   baseboard-serial-number`" 2>&1 | tee -a $save
    echo "$End" 2>&1 | tee -a $save
else
    echo "Please do it carefully!!!" 2>&1 | tee -a $save
fi

#!/bin/bash
python import.py --entity teams -f ./teams1.csv

python import.py --entity tournment --name season2014-15 --start 2014/06/01 --end 2015/06/01
python import.py --entity games -f ./E0_2014-15.csv --tournmentId 0

python import.py --entity tournment --name season2015-16 --start 2015/06/01 --end 2016/06/01
python import.py --entity games -f ./E0.csv --tournmentId 1

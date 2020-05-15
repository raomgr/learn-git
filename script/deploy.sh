#!/bin/bash
##path##
basedir=/home/work/xiaodou
baseop=moycpbss-web

function init_env
{
        mkdir -p $basedir/$baseop
}

function deploy
{
        cd $basedir/$baseop
        tar zxf $basedir/$baseop/*.tar.gz
        replace_param
        init_nginx
}

function replace_param
{
        fileName=$(uuidgen).sh
        for i in $(ls $basedir/$baseop/conf | egrep '*.properties$')
        do
            lineNum=$(cat $basedir/$baseop/conf/$i|wc -l)
            for j in $(seq $lineNum)
            do
                lineContent=$(sed "$j!d;s/\n/ /g" $basedir/$baseop/conf/$i)
                echo $lineContent|awk -F '=' '{print "sed -i \"s%{"$1"}%"$2"%g\" '$basedir/$baseop/static/js/*'"}' >> $fileName
                /bin/bash $fileName && /bin/rm -rf $fileName
            done
        done
}

function init_nginx
{
    if [ -f $basedir/$baseop/conf/moycp.bss.conf ];then
        cp -f $basedir/$baseop/conf/moycp.bss.conf /etc/nginx/conf.d/
        service nginx restart > /dev/null && echo "Deploy Success!"
    fi
}

init_env
deploy

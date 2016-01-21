#!/bin/sh

FTP_ACCOUNTS[0]="live@example.com"
FTP_ACCOUNTS[1]="beta@example.com"

echo "-------- Select FTP account --------"
select FTP_ACCOUNT in ${FTP_ACCOUNTS[*]};
do
    echo '------- Do you want to upload app on "'$FTP_ACCOUNT'"? -------'
    select YN in 'Yes' 'No';
    do
        case $YN in
            Yes )
                # create mount folder
                mkdir -p ~/.remote-folder

                # mount live remote folder
                sshfs "$FTP_ACCOUNT":/ ~/.remote-folder -o auto_unmount

                RETVAL=$?
                if [ $RETVAL -eq 0 ]
                then
                    # sync local folder with remote folder
                    rsync -azv --no-o --no-g --delete --delete-excluded --delete-after --progress \
                    --include "dummy" \
                    --include ".htaccess" \
                    --include "/index.php" \
                    --include "/build" \
                    --include "/src" \
                    --exclude "/*" \
                    --exclude "/src/browser" \
                    --exclude ".gitignore" \
                    --exclude "composer.json" \
                    --exclude "composer.lock" \
                    --exclude "/.ssh/*" \
                    --filter "P /.ssh/*" \
                    . \
                    ~/.remote-folder

                    # umount  remote folder
                    fusermount -u -z ~/.remote-folder
                else
                    echo '----- ERROR ----'
                fi
                exit;;
            No )
                exit;;
        esac
    done
done
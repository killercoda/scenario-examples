echo waiting for finish-background-script to finish
while [ ! -f /tmp/background3 ]; do sleep 1; done
echo DONE

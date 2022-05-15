echo waiting for step1-background-script to finish
while [ ! -f /tmp/background1 ]; do sleep 1; done
echo DONE
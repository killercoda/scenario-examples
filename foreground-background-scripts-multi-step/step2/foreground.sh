echo waiting for step2-background-script to finish
while [ ! -f /tmp/background2 ]; do sleep 1; done
echo DONE
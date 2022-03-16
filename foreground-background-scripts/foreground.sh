#!/bin/bash

echo -n "Installing scenario..."

while [ ! -f /tmp/finished ]; do
    echo -n '.'
    sleep 1;
done

echo -n " done"
echo
echo

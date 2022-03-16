#!/bin/bash

if kubectl get pod my-pod; then exit 1; fi

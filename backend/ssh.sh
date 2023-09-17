#!/bin/bash

# This script is for local connection to EC2 instance ONLY. It assumes proper ssh keys have been installed.
ssh -i ~/.ssh/dataflow-production-ec2-ssh-key.pem ec2-user@50.18.16.43

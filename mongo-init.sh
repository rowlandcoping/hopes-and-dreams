#!/bin/bash
# MongoDB initialization script using environment variables

mongosh -u "$MONGO_INITDB_ROOT_USERNAME" -p "$MONGO_INITDB_ROOT_PASSWORD" --authenticationDatabase admin <<EOF
use $MONGO_DATABASE

db.createUser({
  user: "$MONGO_APP_USERNAME",
  pwd: "$MONGO_APP_PASSWORD",
  roles: [
    {
      role: "readWrite",
      db: "$MONGO_DATABASE"
    }
  ]
})

print('Application user created successfully')
EOF
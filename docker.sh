#! /bin/sh

# export command
x_command="export U_ID=$(id -u) G_ID=$(id -g)"

# docker up
if [ $1 = 'up' ]; then

    # up
    $x_command && docker-compose up

# docker down
elif [ $1 = 'down' ]; then

    # down
    $x_command && docker-compose down

# docker node
elif [ $1 = 'node' ]; then

    # down
    $x_command && docker-compose exec node bash

# no command
else

    # show usage
    cat <<EOM
usage: ./docker.sh [up|down]
    up
        docker compose up
    down
        docker compose down
    node
        exec node bash
EOM
fi
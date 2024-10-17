cleanup() {
    echo "shutting down"
    kill $server_pid1 $server_pid2
    exit
}

cd .. 
npm run start &
server_pid1=$!
cd ../karma/
npm run build
npm run start &
server_pid2=$!

wait
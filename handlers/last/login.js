module.exports = (client) => {
    client.login(process.env.CLIENT_TOKEN)
    .then(() => {
        console.log('Logged in successfully!'.green);
    })
    .catch(() => {
        console.log('Failed to login.'.red);
        process.exit(1);
    })
}

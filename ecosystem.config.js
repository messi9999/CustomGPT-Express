module.exports = {
    apps: [
      {
        name: 'server',
        script: 'server.js',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '1G',
        env: {
          NODE_ENV: 'development',
          // other environment variables for development
        },
        env_production: {
          NODE_ENV: 'production',
          // other environment variables for production
        }
      }
    ]
  };
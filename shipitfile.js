var chalk = require('chalk');

module.exports = function (shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-shared')(shipit);

  shipit.initConfig({
    default: {
      workspace: 'build',
      deployTo: '~/beta.cityheartschicago.org',
      repositoryUrl: 'https://github.com/lacroixdesign/www.cityheartschicago.org.git',
      branch: 'feature/webpack',
      ignores: ['.git', 'node_modules', 'assets', 'etc', '.*'],
      keepReleases: 5,
      shallowClone: true,
      shared: {
        dirs: [
          'craft/storage/userphotos',
          'public/content',
        ],
        // files: [],
      }
    },
    production: {
      servers: 'forge@104.131.117.184' // TODO move this to .env
    }
  });

  // Install npm dependencies

  shipit.blTask('npm-install', function () {
    shipit.log(chalk.green('Installing npm dependencies'));
    return shipit.local('cd ' + shipit.config.workspace + ' && npm install')
      .then( function () {
        shipit.log(chalk.green('Successfully installed npm dependencies'));
        shipit.emit('installed-npm-packages');
      })
      .catch( function () {
        shipit.log(chalk.bgRed('Failed to install npm dependencies'));
      });
  });

  // Install Composer dependencies

  shipit.blTask('composer-install', function () {
    shipit.log(chalk.green('Installing Composer dependencies'));
    return shipit.local('cd ' + shipit.config.workspace + ' && composer update')
      .then( function () {
        shipit.log(chalk.green('Successfully installed Composer dependencies'));
        shipit.emit('installed-composer-packages');
      })
      .catch( function () {
        shipit.log(chalk.bgRed('Failed to install Composer dependencies'));
      });
  });

  // Build production assets

  shipit.blTask('build', ['npm-install', 'composer-install'], function () {
    // ...
    shipit.emit('built');
  });

  shipit.task('deploy', [
    'deploy:init',
    'deploy:fetch',
    'build',
    'deploy:update',
    'deploy:publish',
    'deploy:clean'
  ]);

  // Deploy

  shipit.on('deploy:init', function () {
    shipit.start('build');
  });
};

import * as yargs from 'yargs';
import chalk from 'chalk';

const dimmed = chalk.dim;
const greyed = chalk.gray;
const bold = chalk.bold;

export const argv = yargs
    // header
    .usage(`\nYou can run commands with "cognito-backup-restore" or the shortcut "cbr"\n
    Usage: $0 <command> [options]`)

    // backup command
    .command('backup', dimmed`Backup/export all users in specified user pool`, (yargs) => {
        return yargs.option('mode', {
            default: 'backup'
        })
    })

    // restore command
    .command('restore', dimmed`Restore/import users to a single user pool`, (yargs) => {
        return yargs.option('mode', {
            default: 'restore'
        })
    })

    // examples
    .example('$0 backup', greyed`Follow the interactive guide to backup userpool(s)`)
    .example('$0 restore', greyed`Follow the interactive guide to backup userpool`)
    .example('$0 backup -p <PROFILE> [OPTIONS]', greyed`Backup using the options provided`)
    .example('$0 restore -p <PROFILE> [OPTIONS]', greyed`Restore using the options provided`)

    // options
    .option('profile', {
        alias: ['p'],
        describe: dimmed`Use a specific profile from your credential file`,
        conflicts: ['aws-access-key', 'aws-secret-key'],
        string: true,
    })
    .option('region', {
        alias: ['r'],
        describe: dimmed`The region to use. Overrides config/env settings`,
        string: true,
    })
    .option('aws-access-key', {
        alias: ['key', 'k'],
        describe: dimmed`The AWS Access Key to use. Overrides config/env settings`,
        conflicts: ['profile'],
        string: true,
    })
    .option('aws-secret-key', {
        alias: ['secret', 's'],
        describe: dimmed`The AWS Secret Key to use. Overrides config/env settings`,
        conflicts: ['profile'],
        string: true
    })
    .option('userpool', {
        alias: ['pool'],
        describe: dimmed`The Cognito pool to use`,
        string: true
    })
    .option('file', {
        alias: ['f'],
        describe: dimmed`Path to export/import json data to/from`,
        string: true
    })

    // help
    .help('help', dimmed`Show help`)
    .alias('help', 'h')
    .showHelpOnFail(false, bold`Specify --help for available options`)

    // version
    .version('version', dimmed`Show version number`, (function () { return require('../../package').version; })())
    .alias('version', 'v')

    // footer
    .epilog(dimmed`\nPlease report any issues/suggestions here:\nhttps://github.com/rahulpsd18/cognito-backup-restore/issues\n`)
    .strict()
    .wrap(Math.min(100, yargs.terminalWidth()))
    .argv;
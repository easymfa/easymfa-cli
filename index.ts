#!/usr/bin/env node

const colors = require('colors');
const yargs = require('yargs');
const credentials = require('./credentials');

(async () => {
    const argv = yargs
        .usage(
            'Usage: $0 --profile [string] --serial-number [string] --token [number]\n\nEasyMFA is a command line application that gets AWS credentials given a MFA token and serial number and saves it to a specified profile in the AWS credential file.'
        )
        .options({
            'token': {
                alias: 't',
                demandOption: true,
                description: 'The value provided by the MFA device.',
                number: true
            },
            'serial-number': {
                alias: 's',
                demandOption: true,
                description: 'The identification number of the MFA device that is associated with the IAM user. The value is either the serial number for a hardware device (such as GAHT12345678) or an Amazon Resource Name (ARN) for a virtual device (such as arn:aws:iam::123456789012:mfa/user).',
                string: true
            },
            'profile': {
                alias: 'p',
                demandOption: true,
                description: 'The profile name to update in the AWS credentials file.',
                string: true
            }
        }
    ).strict().argv;

    if (argv.token && argv.serialNumber && argv.profile) {
        try {
            await credentials.setCredentials(argv.profile, argv.serialNumber, argv.token);
            console.log(colors.green(`[${argv.profile}] was successfully updated!`))
        } catch (e) {
            console.error(colors.red(`Error: ${e.message}`));
            process.exit(1);
        }
        return;
    }

    let errorMessage = '';

    if (!argv.token) {
        errorMessage += 'Invalid token, please provide a valid number.\n';
    }

    if (!argv.serialNumber) {
        errorMessage += 'Invalid serial-number, please provide a valid string.\n';
    }

    if (!argv.profile) {
        errorMessage += 'Invalid profile, please provide a valid profile.\n';
    }

    yargs.showHelp();
    console.error(colors.red(errorMessage));
    process.exit(1);
})();

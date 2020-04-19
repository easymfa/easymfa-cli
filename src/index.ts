#!/usr/bin/env node

const colors = require('colors');
const yargs = require('yargs');
const credentials = require('./credentials');

(async () => {
    const argv = yargs
        .usage(
            'Usage: $0 --profile string --serial-number string --token string [--duration number]\n\nEasyMFA is a command line application that gets AWS credentials given a MFA token and serial number and saves it to a specified profile in the AWS credential file.'
        )
        .options({
            'profile': {
                alias: 'p',
                demandOption: true,
                description: 'The profile name to update in the AWS credentials file.',
                string: true
            },
            'serial-number': {
                alias: 's',
                demandOption: true,
                description: 'The identification number of the MFA device that is associated with the IAM user. The value is either the serial number for a hardware device (such as GAHT12345678) or an Amazon Resource Name (ARN) for a virtual device (such as arn:aws:iam::123456789012:mfa/user).',
                string: true
            },
            'token': {
                alias: 't',
                demandOption: true,
                description: 'The value provided by the MFA device.',
                string: true
            },
            'duration': {
                alias: 'd',
                demandOption: false,
                description: 'The duration, in seconds, that the credentials should remain valid. Acceptable durations for IAM user sessions range from 900 seconds (15 minutes) to 129600 seconds (36 hours), with 43200 seconds (12 hours) as the default. Sessions for AWS account owners are restricted to a maximum of 3600 seconds (one hour). If the duration is longer than one hour, the session for AWS account owners defaults to one hour.',
                number: true
            }
        })
        .strict().argv;

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

    if ((argv.duration !== undefined && isNaN(argv.duration)) || argv.duration < 900 || argv.duration > 129600) {
        errorMessage += 'Invalid duration, please provide a valid number between 900 and 129600.\n';
    }

    if (errorMessage) {
        yargs.showHelp();
        console.error(colors.red(errorMessage));
        process.exit(1);
    }
    
    try {
        const newCreds = await credentials.setCredentials(argv.profile, argv.serialNumber, argv.token, argv.duration);
        console.log(colors.green(`AWS credential profile [${argv.profile}] was successfully updated!`))
        console.log(colors.green(`Session expires: ${newCreds.Expiration}`));
    } catch (e) {
        console.error(colors.red(`Error: ${e.message}`));
        process.exit(1);
    }
})();

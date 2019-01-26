import AWS = require('aws-sdk');
import os = require('os');
import path = require('path');

const ini = require('prop-ini');

export function setCredentials(profile: string, serialNumber: string, token: string) : Promise<void> {
    return new Promise((resolve, reject) => {
        const sts = new AWS.STS();

        sts.getSessionToken({
            SerialNumber: serialNumber,
            TokenCode: token
        }, (err, data) => {
            if (err) {
                reject(err);
                return;
            } else {
                const newCreds = data.Credentials;
                if (newCreds) {
                    const credPath = path.join(os.homedir(), '.aws');
                    const credFile = path.join(credPath, 'credentials');

                    const propIni = ini.createInstance({});
                    const awsCreds = propIni.decode({ file: credFile });

                    if (awsCreds.sections[profile]) {
                        propIni.addData(newCreds.AccessKeyId, profile, 'aws_access_key_id');
                        propIni.addData(newCreds.SecretAccessKey, profile, 'aws_secret_access_key');
                        propIni.addData(newCreds.SessionToken, profile, 'aws_session_token');
                        propIni.encode({ file: credFile });
                    }
                }

                resolve();
            }
        });
    });
}

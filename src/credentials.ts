import AWS = require('aws-sdk');
import os = require('os');
import path = require('path');
import fs = require('fs');

const ini = require('prop-ini');

export function setCredentials(profile: string, serialNumber: string, token: number, duration?: number) : Promise<AWS.STS.Credentials> {
    const credPath = path.join(os.homedir(), '.aws');
    const credFile = path.join(credPath, 'credentials');

    if (!fs.existsSync(credFile)) {
        return Promise.reject({
            message: 'AWS credential file ~/.aws/credentials does not exist.'
        });
    }

    const propIni = ini.createInstance({});
    const awsCreds = propIni.decode({ file: credFile });

    if (!awsCreds || !awsCreds.sections || Object.keys(awsCreds.sections).length <= 1) {
        return Promise.reject({
            message: 'AWS credential file does not contain any profiles.'
        });
    }

    return new Promise((resolve, reject) => {
        const sts = new AWS.STS();

        sts.getSessionToken({
            SerialNumber: serialNumber,
            TokenCode: `${token}`,
            DurationSeconds: duration
        }, (err, data) => {
            if (err) {
                reject(err);
            } else {
                const newCreds = data.Credentials;
                if (newCreds) {
                    if (awsCreds.sections[profile]) {
                        propIni.addData(newCreds.AccessKeyId, profile, 'aws_access_key_id');
                        propIni.addData(newCreds.SecretAccessKey, profile, 'aws_secret_access_key');
                        propIni.addData(newCreds.SessionToken, profile, 'aws_session_token');
                        propIni.encode({ file: credFile });
                        resolve(newCreds);
                    } else {
                        reject({ message: `Could not retrieve profile [${profile}] from the AWS credential file.` });
                    }
                } else {
                    reject({ message: `Get-Session-Token call came back with no credentials.` });    
                }
            }
        });
    });
}

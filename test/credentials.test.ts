const credentials = require('../src/credentials');
const fs = require('fs');
const propIni = require('prop-ini');

it(`should error with message when credentials file doesn't exist.`, async () => {
    fs.existsSync = jest.fn();
    fs.existsSync.mockReturnValue(false);

    try {
        await credentials.setCredentials('', '', 1);
    } catch (e) {
        expect(e).toEqual({
            message: 'AWS credential file ~/.aws/credentials does not exist.'
        });
    }
});

it(`should error with mesage when credentials file is empty.`, async () => {
    fs.existsSync = jest.fn();
    fs.existsSync.mockReturnValue(true);

    propIni.createInstance = jest.fn();
    propIni.createInstance.mockReturnValue({
        decode: () => {}
    });

    try {
        await credentials.setCredentials('', '', 1);
    } catch (e) {
        expect(e).toEqual({
            message: 'AWS credential file does not contain any profiles.'
        });
    }
});

<pre>
   ,ggggggg,                                 ,ggg, ,ggg,_,ggg,   ,gggggggggggggg         ,ggg,  
 ,dP""""""Y8b                               dP""Y8dP""Y88P""Y8b dP""""""88""""""        dP""8I  
 d8'    a  Y8                               Yb, `88'  `88'  `88 Yb,_    88             dP   88  
 88     "Y8P'                                `"  88    88    88  `""    88            dP    88  
 `8baaaa                                         88    88    88      ggg88gggg       ,8'    88  
,d8P""""        ,gggg,gg    ,g,     gg     gg    88    88    88         88   8       d88888888  
d8"            dP"  "Y8I   ,8'8,    I8     8I    88    88    88         88     __   ,8"     88  
Y8,           i8'    ,8I  ,8'  Yb   I8,   ,8I    88    88    88   gg,   88    dP"  ,8P      Y8  
`Yba,,_____, ,d8,   ,d8b,,8'_   8) ,d8b, ,d8I    88    88    Y8,   "Yb,,8P    Yb,_,dP       `8b,
  `"Y8888888 P"Y8888P"`Y8P' "YY8P8PP""Y88P"888   88    88    `Y8     "Y8P'     "Y8P"         `Y8
                                         ,d8I'                                                  
                                       ,dP'8I                                                   
                                      ,8"  8I                                                   
                                      I8   8I                                                   
                                      `8, ,8I                                                   
                                       `Y8P"                                                    
</pre>

EasyMFA is a command line application that gets AWS credentials given a MFA token and serial number and saves it to a specified profile in the AWS credential file.

# Install
```sh
npm install -g @easymfa/easymfa-cli
```

# Usage
```sh
easymfa --profile [string] --serial-number [string] --token [number]
```

# Help
```sh
easymfa --help

Usage: easymfa --profile [string] --serial-number [string] --token [number]

EasyMFA is a command line application that gets AWS credentials given a MFA
token and serial number and saves it to a specified profile in the AWS
credential file.

Options:
  --help               Show help                                       [boolean]
  --version            Show version number                             [boolean]
  --token, -t          The value provided by the MFA device. [number] [required]
  --serial-number, -s  The identification number of the MFA device that is
                       associated with the IAM user. The value is either the
                       serial number for a hardware device (such as
                       GAHT12345678) or an Amazon Resource Name (ARN) for a
                       virtual device (such as
                       arn:aws:iam::123456789012:mfa/user).  [string] [required]
  --profile, -p        The profile name to update in the AWS credentials file.
                                                             [string] [required]
```

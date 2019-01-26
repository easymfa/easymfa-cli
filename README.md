     ______                __  __ ______      
    |  ____|              |  \/  |  ____/\    
    | |__   __ _ ___ _   _| \  / | |__ /  \   
    |  __| / _` / __| | | | |\/| |  __/ /\ \  
    | |___| (_| \__ \ |_| | |  | | | / ____ \ 
    |______\__,_|___/\__, |_|  |_|_|/_/    \_\
                      __/ |                   
                     |___/                    

EasyMFA is a command line application that gets AWS credentials given a MFA token and serial number and saves it to a specified profile in the AWS credential file.

# Install
```sh
npm install -g easymfa
```

# Usage
```sh
easymfa --profile [string] --serial-number [string] --token [number]
```

# Help
```sh
easymfa --help
```
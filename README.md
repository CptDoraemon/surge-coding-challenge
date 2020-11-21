# Surge coding challenge

[Live Demo](https://cptdoraemon.github.io/surge-coding-challenge/)

## Node version
v12.18.3

## How to start?
RUN npm install && npm start

## Which port?
It should open a new page automatically, in case it doesn't:  
http://localhost:3000/

## Known issues
Typescript and React Create App just released new versions with breaking ~~bugs~~ changes, the app may not start correctly
if you wanna run it locally.  
In case you meet error like:
```
~/surge-code-challenge/node_modules/react-scripts/scripts/utils/verifyTypeScriptSetup.js:239
      appTsConfig.compilerOptions[option] = value;
                                          ^

TypeError: Cannot assign to read only property 'jsx' of object '#<Object>'
```
A temporary solution is try to remove the tsconfig.json file and RUN npm start again.

import React from "react";
import { NativeModules } from 'react-native'
import io from "socket.io-client";
const scriptURL = NativeModules.SourceCode.scriptURL;
const address = scriptURL.split('://')[1].split('/')[0];
const hostname = address.split(':')[0];

export const socket = io(`http://${hostname}:5000`);
const SocketContext = React.createContext(socket);

export default SocketContext;
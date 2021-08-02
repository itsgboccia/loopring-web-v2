import React from 'react';
import { accountFull } from '@loopring-web/common-resources';

export enum WalletNotificationStatus {
    none = 'none',
    error = 'error',
    pending = 'pending',
    success = 'success',
}

export type  WalletNotificationInterface = {
    status: keyof typeof WalletNotificationStatus
    message: string,
    handleClick?: (event: React.MouseEvent) => void,
}


export type WalletConnectBtnProps = {
    handleClick: (_e: React.MouseEvent) => {},
    accountState?:accountFull,
}